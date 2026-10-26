import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
import {providerPath,knowledgePath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
const base="https://smarttech.b2badgen.com",publicBase="https://www.b2badgen.com/smarttech";
const page=(path,method="GET")=>worker.fetch(new Request(base+path,{method,headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
test("missing provider/knowledge aliases permanently resolve to real canonical pages",async()=>{
 const item=catalog.knowledge.find(item=>item.id===1);
 for(const [from,target] of [["/anbieter/sap",providerPath("SAP")],["/anbieter/sap-zzzzz",providerPath("SAP")],["/smarttech/anbieter/sap",providerPath("SAP")],["/artikel/1-veralteter-titel",knowledgePath(item)],["/impressum.html","/impressum"],["/e-world","/region/eworld"]]){
  const r=await page(from);assert.equal(r.status,301,from);assert.equal(r.headers.get("location"),publicBase+target);assert.equal(await r.text(),"");
  assert.equal((await page(target)).status,200,target);
 }
 const english=await page("/en/providers/sap");assert.equal(english.status,301);assert.ok(english.headers.get("location").startsWith(publicBase+"/en/providers/sap-"));
 const head=await page("/anbieter/sap","HEAD");assert.equal(head.status,301);assert.equal(await head.text(),"");
});
test("relevant missing document paths reach a populated bilingual search by 301",async()=>{
 for(const [from,searchPath] of [["/alte-links/cloud-backup","/suche"],["/en/old-links/cloud-backup","/en/search"]]){
  const r=await page(from);assert.equal(r.status,301);const location=new URL(r.headers.get("location"));assert.equal(location.origin+location.pathname,publicBase+searchPath);assert.equal(location.searchParams.get("q"),"cloud backup");
  const target=await page(searchPath+location.search);assert.equal(target.status,200);const html=await target.text();assert.ok(html.includes('name="q"'));assert.ok(html.includes("noindex"));assert.ok(html.includes("/wissen/")||html.includes("/en/knowledge/"));assert.doesNotMatch(html,/__VINEXT_RSC_|rel="modulepreload"/);
 }
});
test("unmatched URLs keep 404 with useful search, and assets/APIs/writes never become redirects",async()=>{
 const unknown=await page("/zzzz-no-matching-record-zzzz");assert.equal(unknown.status,404);assert.equal(unknown.headers.get("location"),null);const html=await unknown.text();assert.ok(html.includes('name="q"'));assert.ok(html.includes(publicBase+"/suche"));
 for(const path of ["/assets/sap.js","/api/sap","/.env","/wp-admin/sap","/anbieter/sap.json","/wissen/999999999-zzzz-unknown"]){const r=await page(path);assert.equal(r.status,404,path);assert.equal(r.headers.get("location"),null,path);}
 const post=await page("/anbieter/sap","POST");assert.notEqual(post.status,301);assert.notEqual(post.status,302);
 const english404=await page("/en/zzzz-no-matching-record-zzzz");assert.equal(english404.status,404);const englishHtml=await english404.text();assert.ok(englishHtml.includes("Page not found"));assert.ok(englishHtml.includes(publicBase+"/en/search"));
 const poisoned=await page("/anbieter/sap?redirect=https://evil.example/");assert.equal(poisoned.status,301);assert.equal(poisoned.headers.get("location"),publicBase+providerPath("SAP"));
 for(const key of ["__proto__","constructor"]){const r=await page("/"+key);assert.equal(r.status,404);assert.equal(r.headers.get("location"),null);}
 const empty=await page("/suche?q=zzzz-no-matching-record-zzzz");assert.equal(empty.status,200);assert.ok((await empty.text()).includes("Keine passenden Inhalte"));
 const escaped=await page('/suche?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E');const escapedHtml=await escaped.text();assert.ok(!escapedHtml.includes('<script>alert(1)</script>'));
});

test("English trailing slash uses the public prefix and retains query filters",async()=>{
 for(const method of ["GET","HEAD"]){
  const response=await page("/en/?q=SAP&space=Mobilit%C3%A4t",method);assert.equal(response.status,301);assert.equal(response.headers.get("location"),publicBase+"/en?q=SAP&space=Mobilit%C3%A4t");assert.equal(await response.text(),"");
 }
 assert.equal((await page("/en")).status,200);
});

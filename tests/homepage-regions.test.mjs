import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
const {default:worker}=await import("../dist/server/index.js");
const page=path=>worker.fetch(new Request("https://smarttech.b2badgen.com"+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
test("homepage prioritises regional reports and a working E-world search in both languages",async()=>{
 const exhibitors=JSON.parse(await readFile(new URL("../app/eworld-2027.generated.json",import.meta.url),"utf8"));assert.equal(exhibitors.length,798);
 for(const prefix of ["","/en"]){
  const en=!!prefix,home=await(await page(prefix||"/")).text();
  assert.ok(home.indexOf('id="regionen"')<home.indexOf('role="tablist"'));
  const section=home.slice(home.indexOf('id="regionen"'),home.indexOf('role="tablist"'));
  for(const slug of ["essen","metropole-ruhr","nuernberg","mittelfranken","wittlich","muenchen-stadt","muenchen-landkreis"]){const path=prefix+"/region/"+slug;assert.ok(section.includes(`href="${path}"`));assert.equal((await page(path)).status,200,path);}
  for(const term of ["N-ERGIE","Portazon","M-net","Unterhaching","Oberhaching"])assert.ok(section.includes(term));
  assert.ok(section.includes(en?"not been reconfirmed live":"nicht erneut live bestätigt"));
  assert.ok(section.includes(`action="${prefix}/region/eworld"`));assert.ok(section.includes('method="get"'));assert.ok(section.includes('name="q"'));
  assert.ok(section.includes('id="homepage-exhibitor-search"'));assert.ok(section.includes('for="homepage-exhibitor-search"'));
  const result=await(await page(prefix+"/region/eworld?q=N-ERGIE")).text();assert.ok(result.includes("3N134"));assert.ok(result.includes("n-ergie-aktiengesellschaft-10dzt"));
 }
});

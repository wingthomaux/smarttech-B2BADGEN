import assert from "node:assert/strict";
import test from "node:test";
import {providerPath,englishProviderPath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const origin="https://smarttech.b2badgen.com";
const page=path=>worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
test("Wittlich distinguishes city, district and Trier services with dated source evidence and a real catalogue connection",async()=>{
  for(const locale of ["de","en"]){
    const en=locale==="en",prefix=en?"/en":"",response=await page(prefix+"/region/wittlich");assert.equal(response.status,200);const html=await response.text();
    for(const id of ["wittlich-character","wittlich-connections","wittlich-evidence","wittlich-source-heat","wittlich-source-faq"])assert.ok(html.includes(`id="${id}"`));
    assert.equal((html.match(/id="wittlich-source-/g)||[]).length,7);
    assert.ok(html.includes(en?"not confirmation of an awarded contract":"keine Bestätigung eines vergebenen Auftrags"));
    assert.ok(html.includes(en?"No documented link between that contract and A EINS or Portazon":"Keine belegte Verbindung dieses Auftrags mit A EINS oder Portazon"));
    assert.ok(html.includes(en?"without an app or booking test":"kein eigener App- oder Buchungstest"));
    assert.ok(html.includes("HRB 12294")&&html.includes("HRB 45102"));
    const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
    const article=schemas.find(s=>s['@type']==="Article");assert.equal(article.dateModified,"2026-11-08");
    const sources=article.citation.filter(s=>typeof s==="object");assert.equal(sources.length,7);
    assert.equal(sources.find(s=>s.url.includes("waermenetz-wengerohr")).datePublished,undefined);
    assert.equal(sources.find(s=>s.url.includes("postid=116755")).datePublished,"2023-03-03");
    const provider=(en?englishProviderPath:providerPath)("Telekom Deutschland");assert.ok(html.includes(`href="${provider}"`));
    const linked=await page(provider);assert.equal(linked.status,200);const linkedHtml=await linked.text();assert.ok(linkedHtml.includes('id="wittlich-reference"'));assert.ok(linkedHtml.includes(prefix+"/region/wittlich#wittlich-connections"));
  }
});

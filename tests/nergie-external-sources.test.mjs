import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
const {default:worker}=await import("../dist/server/index.js");
const origin="https://smarttech.b2badgen.com";
const page=path=>worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
test("N-ERGIE external evidence distinguishes approval, planning and performance across both languages",async()=>{
  for(const prefix of ["","/en"]){
    const en=!!prefix;
    for(const suffix of [en?"/providers/n-ergie-aktiengesellschaft-10dzt":"/anbieter/n-ergie-aktiengesellschaft-10dzt","/region/nuernberg","/region/mittelfranken"]){
      const response=await page(prefix+suffix);assert.equal(response.status,200);const html=await response.text();
      assert.ok(html.includes('id="external-evidence"'));
      for(const id of ["seismic-permit","waste-wood-permit","heat-planning"])assert.ok(html.includes(`id="${id}"`));
      assert.ok(html.includes("2026-10-30")&&html.includes("2026-07-14"));
      assert.ok(html.includes("N-ERGIE Kraftwerke GmbH"));
      assert.ok(html.includes(en?"Publication date not stated":"Veröffentlichungsdatum auf der geprüften Seite nicht ausgewiesen"));
      assert.ok(html.includes(en?"not a specific connection commitment":"keine konkrete Anschlusszusage"));
      assert.ok(html.includes(en?"neither a successful discovery":"weder einen erfolgreichen Fund"));
      assert.ok(html.includes(en?"no independent performance confirmation":"eine unabhängige Leistungsbestätigung"));
      const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
      const evidence=schemas.find(s=>s['@id']===origin+prefix+suffix+"#external-evidence");assert.ok(evidence);assert.equal(evidence.citation.length,6);
      for(const citation of evidence.citation){assert.ok(citation.url.startsWith("https://"));assert.ok(!('datePublished' in citation));}
    }
  }
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const provider=catalog.companies.find(p=>p.name==="N-ERGIE Aktiengesellschaft");assert.equal(provider.knowledge.length,0);assert.equal(provider.items.length,0);
});

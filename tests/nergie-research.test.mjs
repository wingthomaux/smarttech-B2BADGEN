import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
import {providerPath,englishProviderPath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const origin="https://smarttech.b2badgen.com";
const page=path=>worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
const names=["Diehl Metering GmbH","TRICERA energy GmbH","ENERTRAG SE","BTC Business Technology Consulting","SAP","Thüga SmartService GmbH","RheinEnergie AG"];
test("N-ERGIE dossier has source limits, accurate publication counts and reversible catalogue connections in DE/EN",async()=>{
  for(const en of [false,true]){
    const path=en?englishProviderPath:providerPath;
    const response=await page(path("N-ERGIE Aktiengesellschaft"));assert.equal(response.status,200);const html=await response.text();
    for(const section of ["nergie-research","nergie-connections","nergie-publications","nergie-primary-sources","nergie-selection"])assert.ok(html.includes(`id="${section}"`));
    assert.equal((html.match(/id="nergie-source-/g)||[]).length,10);
    assert.ok(html.includes(en?"Historical · replaced gateway administrator":"Historisch · abgelöster Gateway-Administrator"));
    assert.ok(html.includes(en?"not a bilateral supply or ownership relationship":"keine nachgewiesene bilaterale Liefer- oder Beteiligungsbeziehung"));
    assert.ok(html.includes(en?"does not establish a network-wide N-ERGIE rollout":"belegt keinen flächendeckenden Rollout bei N-ERGIE"));
    assert.ok(html.includes(en?"concerns NEW Netz, not N-ERGIE Netz":"betreffen NEW Netz, nicht N-ERGIE Netz"));
    assert.ok(!html.includes(en?"No individually catalogued trade or portal publications yet.":"Noch keine einzeln erfassten Fach- oder Portalpublikationen."));
    const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
    const dossier=schemas.find(s=>s['@id']===origin+path("N-ERGIE Aktiengesellschaft")+"#nergie-research");assert.equal(dossier.citation.length,10);
    const undated=dossier.citation.filter(s=>/diehl.com|wer-wir-sind|np2024/.test(s.url));assert.equal(undated.length,3);assert.ok(undated.every(s=>!s.datePublished));
    for(const name of names){
      assert.ok(html.includes(`href="${path(name)}"`));
      const linked=await page(path(name));assert.equal(linked.status,200);const linkedHtml=await linked.text();
      assert.ok(linkedHtml.includes('id="nergie-cross-reference"'));assert.ok(linkedHtml.includes(path("N-ERGIE Aktiengesellschaft")+"#nergie-connections"));
    }
  }
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const provider=catalog.companies.find(p=>p.name==="N-ERGIE Aktiengesellschaft");assert.equal(provider.knowledge.length,0);assert.equal(provider.items.length,0);
});

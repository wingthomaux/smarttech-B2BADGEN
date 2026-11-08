import assert from "node:assert/strict";
import test from "node:test";
import {providerPath,englishProviderPath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const origin="https://smarttech.b2badgen.com";
const page=path=>worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
const names=["Diehl Metering GmbH","TRICERA energy GmbH","ENERTRAG SE","BTC Business Technology Consulting","SAP","Thüga SmartService GmbH","RheinEnergie AG"];
test("Nuremberg and Middle Franconia regionalise the evidence without inventing local rollout or relationships",async()=>{
  for(const en of [false,true]){
    const prefix=en?"/en":"",path=en?englishProviderPath:providerPath;
    for(const region of ["nuernberg","mittelfranken"]){
      const response=await page(prefix+"/region/"+region);assert.equal(response.status,200);const html=await response.text();
      for(const id of ["regional-research","regional-cases","regional-connections","regional-publications"])assert.ok(html.includes(`id="${id}"`));
      assert.equal((html.match(/id="nergie-source-/g)||[]).length,9);
      assert.ok(html.includes(en?"Historical · replaced gateway administrator":"Historisch · abgelöster Gateway-Administrator"));
      assert.ok(html.includes(en?"Does not establish a direct SAP project partnership":"Keine belegte direkte Projektpartnerschaft mit SAP"));
      assert.ok(html.includes(en?"neither a regional base for every participant":"keinen Sitz aller Beteiligten in der Region"));
      if(region==="nuernberg"){
        assert.ok(html.includes('id="sandreuth"')&&html.includes('id="water-iot"'));assert.ok(!html.includes('id="regional-grid"'));
        assert.ok(html.indexOf(en?"Location-specific Nuremberg/Fürth projects":"Ortsbezogene Projekte Nürnberg/Fürth")<html.indexOf(en?"Company-wide and cross-regional IT/project connections":"Unternehmensweite und überregionale IT-/Projektbezüge"));
      }else{
        assert.ok(html.includes('id="regional-grid"')&&html.includes('id="renewables-operations"')&&html.includes('id="regional-control"'));
        assert.ok(html.includes(en?"not a region-wide Middle Franconia rollout":"keinen flächendeckenden Rollout in Mittelfranken"));
      }
      const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
      for(const match of html.matchAll(/href="#(nergie-source-[^"]+)"/g))assert.ok(ids.has(match[1]),match[1]);
      const article=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s['@type']==="Article");assert.equal(article.dateModified,"2026-11-08");assert.ok(article.citation.some(url=>url.includes("gwadriga")));
      for(const name of names)assert.ok(html.includes(`href="${path(name)}"`));
    }
    for(const name of names){const response=await page(path(name));assert.equal(response.status,200);const html=await response.text();for(const region of ["nuernberg","mittelfranken"])assert.ok(html.includes(prefix+"/region/"+region+"#regional-connections"));}
  }
});

import assert from "node:assert/strict";
import test from "node:test";
const {default:worker}=await import("../dist/server/index.js");
const page=path=>worker.fetch(new Request("https://smarttech.b2badgen.com"+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
test("regional character differs by region and keeps dates, source provenance and network boundaries visible",async()=>{
  for(const en of [false,true])for(const region of ["nuernberg","mittelfranken"]){
    const response=await page((en?"/en":"")+"/region/"+region);assert.equal(response.status,200);const html=await response.text();
    assert.ok(html.includes('id="regional-character"'));assert.ok(html.indexOf('id="regional-character"')<html.indexOf('id="regional-context"'));
    assert.ok(html.includes(en?"Regional finding:":"Regionaler Befund:"));assert.ok(html.includes(en?"N-ERGIE context:":"Bezug zu N-ERGIE:"));
    const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const article=schemas.find(s=>s['@type']==="Article");assert.ok(article);
    if(region==="nuernberg"){
      for(const id of ["heat-baseline","building-stock","historic-network","local-heat-sources"])assert.ok(html.includes(`id="${id}"`));
      assert.ok(html.includes("2022")&&html.includes(en?"5.96":"5,96")&&html.includes("1937"));
      assert.ok(html.includes(en?"not measured consumption for 2026":"keine Verbrauchsmessung für 2026"));
      assert.ok(html.includes(en?"treatment plant 1":"Kläranlage 1"));
      assert.ok(article.citation.some(url=>url.includes("20250623_jan_steinbach")));
    }else{
      for(const id of ["urban-rural","solar-flexibility","planning-geography"])assert.ok(html.includes(`id="${id}"`));
      assert.ok(html.includes("R 7")&&html.includes("R 8"));
      assert.ok(html.includes(en?"company accounts":"Unternehmensangaben"));assert.ok(html.includes(en?"does not establish N-ERGIE supply":"keine N-ERGIE-Versorgung"));
      assert.ok(article.citation.some(url=>url.includes("el_00025")));
      assert.ok(!html.includes('id="heat-baseline"'));
    }
  }
});

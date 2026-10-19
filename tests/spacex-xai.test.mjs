import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath} from "../app/catalog-paths.ts";
import {matchesFreeText} from "../app/solution-topics.ts";
const json=async file=>JSON.parse(await readFile(new URL(`../app/${file}`,import.meta.url),"utf8"));
const [catalog,expansion,profiles,translations,ledger]=await Promise.all([json("catalog.generated.json"),json("expansion-spacex-20261008.json"),json("provider-profiles-spacex-20261008.json"),json("english-spacex-20261008.json"),json("validation-ledger.json")]);

test("SpaceX group references preserve products, canonical identity and source review boundaries",()=>{
  const space=catalog.companies.find(company=>company.name==="SpaceX");
  const ai=catalog.companies.find(company=>company.name==="SpaceXAI");
  assert.equal(providerPath(space.name),"/anbieter/spacex-10v2p");
  assert.equal(space.knowledge.length,7);
  assert.equal(ai.knowledge.length,12);
  assert.ok(ai.variants.some(value=>matchesFreeText(value,"xAI")));
  assert.equal(catalog.companies.filter(company=>["xAI","Grok","Grokipedia"].includes(company.name)).length,0);
  const validated=new Set(ledger.batches.flatMap(batch=>batch.assetIds));
  assert.equal(expansion.filter(item=>validated.has(item.id)).length,11);
  for(const item of expansion.filter(item=>item.origin==="Beobachtet"))assert.equal(validated.has(item.id),false);
  const wiki=expansion.find(item=>item.url==="https://grokipedia.com/");
  assert.equal(wiki.origin,"Beobachtet");
  assert.match(wiki.note,/nicht geprüft/);
  assert.equal(expansion.filter(item=>item.additionalProviders?.includes("SpaceXAI")).length,1);
  assert.ok(expansion.filter(item=>item.provider==="SpaceXAI").every(item=>!item.additionalProviders?.includes("SpaceX")),"Products are not represented as parent-company co-delivery");
});

test("SpaceX and SpaceXAI render bilingual profiles with reciprocal links and distinct resources",async()=>{
  const {default:worker}=await import("../dist/server/index.js");
  const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
  const ctx={waitUntil(){},passThroughOnException(){}};
  for(const locale of ["de","en"]){
    for(const [name,other] of [["SpaceX","SpaceXAI"],["SpaceXAI","SpaceX"]]){
      const path=locale==="en"?englishProviderPath(name):providerPath(name);
      const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);
      assert.equal(response.status,200);
      const html=await response.text();
      const relatedPath=locale==="en"?englishProviderPath(other):providerPath(other);
      assert.ok(html.includes(`href="${relatedPath}"`));
      assert.ok(html.includes(profiles[name].summary[locale].slice(0,50)));
      for(const item of expansion.filter(item=>item.provider===name)){
        const resourcePath=locale==="en"?englishKnowledgePath(item,translations[item.title]):knowledgePath(item);
        assert.ok(html.includes(resourcePath),`${name} ${locale}: ${item.title}`);
      }
    }
  }
});

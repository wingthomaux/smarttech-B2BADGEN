import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath} from "../app/catalog-paths.ts";
import {applyMediaTaxonomy,belongsToSpace} from "../app/media-taxonomy.ts";
import {matchesSolutionTopic,solutionTopics} from "../app/solution-topics.ts";
const json=async file=>JSON.parse(await readFile(new URL(`../app/${file}`,import.meta.url),"utf8"));
const [catalog,profiles,expansion,translations,ledger]=await Promise.all([json("catalog.generated.json"),json("provider-profiles-marconomy-20261008.json"),json("expansion-marconomy-20261008.json"),json("english-marconomy-20261008.json"),json("validation-ledger.json")]);
const validated=new Set(ledger.batches.flatMap(batch=>batch.assetIds));

test("marconomy intake preserves provider identity, gated access and historical dates",()=>{
  assert.equal(Object.keys(profiles).length,17);
  const pages=expansion.filter(item=>item.sourcePortals.includes("marconomy"));
  assert.equal(pages.length,32);
  for(const item of pages){
    assert.equal(item.origin,"Beobachtet");
    assert.equal(validated.has(item.id),false);
    assert.equal(item.datePublished,undefined);
    assert.match(item.note,/Registrierungsformular/);
  }
  assert.equal(expansion.filter(item=>validated.has(item.id)).length,16);
  assert.equal(validated.has(790003),false,"Blocked Agorapulse product page is not validated");
  const webinar=pages.find(item=>item.id===790119);
  assert.deepEqual(webinar.additionalProviders,["movingimage"]);
  assert.equal(webinar.eventPeriod,"23.09.2021");
  assert.equal(catalog.knowledge.filter(item=>item.url===webinar.url).length,1);
  for(const name of Object.keys(profiles))assert.equal(catalog.companies.filter(company=>company.name===name).length,1);
  assert.ok(!expansion.some(item=>/campaignone|logic joe|netzkern|festool/i.test(item.provider)));
});

test("business marketing retains its primary area and relevant media links after regeneration",()=>{
  const business=catalog.knowledge.find(item=>item.id===790000);
  assert.equal(business.space,"Unternehmen und Verwaltung");
  assert.equal(belongsToSpace(business,"Medien und Öffentlichkeit"),true);
  assert.deepEqual(applyMediaTaxonomy(business),business);
  const social=catalog.knowledge.find(item=>item.id===790003);
  assert.equal(social.space,"Medien und Öffentlichkeit");
  for(const [id,topic] of [[790000,"marketing-automation"],[790005,"dam"],[790112,"pim"],[790007,"cms"],[790010,"sales-enablement"],[790003,"social-media"]]){
    assert.ok(matchesSolutionTopic(catalog.knowledge.find(item=>item.id===id),solutionTopics.find(item=>item.id===topic)),topic);
  }
});

test("new provider and marconomy pages render in both languages with source backlinks",async()=>{
  const {default:worker}=await import("../dist/server/index.js");
  const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
  const ctx={waitUntil(){},passThroughOnException(){}};
  for(const locale of ["de","en"]){
    for(const [name,profile] of Object.entries(profiles)){
      const response=await worker.fetch(new Request(`http://localhost${(locale==="en"?englishProviderPath(name):providerPath(name))}`),env,ctx);
      assert.equal(response.status,200,name);
      const html=await response.text();
      assert.ok(html.includes(profile.summary[locale].slice(0,65)),`${name} ${locale} summary`);
      assert.ok(html.includes(profile.officialUrl),`${name} ${locale} official source`);
    }
    const response=await worker.fetch(new Request(`http://localhost/${locale==="en"?"en/portals":"portale"}/marconomy`),env,ctx);
    assert.equal(response.status,200);
    const html=await response.text();
    assert.match(html,/marconomy\.de/);
    const item=expansion.find(item=>item.id===790119);
    const path=locale==="en"?englishKnowledgePath(item,translations[item.title]):knowledgePath(item);
    assert.ok(html.includes(path),`${locale} webinar link`);
    const detail=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);
    assert.equal(detail.status,200);
    assert.ok((await detail.text()).includes(locale==="en"?"behind the registration form was not read":"Registrierungsformular wurden nicht gelesen"));
  }
});

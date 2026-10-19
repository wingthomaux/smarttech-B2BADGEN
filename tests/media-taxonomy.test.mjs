import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {applyMediaTaxonomy,classifyMediaSubject,matchesMediaFilters,belongsToSpace,mediaSpace,mediaAreas} from "../app/media-taxonomy.ts";

const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
const byId=new Map(catalog.knowledge.map(item=>[item.id,item]));

test("media classification follows the use case, independent of publisher, URL or format",()=>{
  assert.equal(byId.get(1715).space,mediaSpace);
  assert.equal(byId.get(1715).mediaArea,"Publishing und Distribution");
  assert.ok(byId.get(1715).channels.includes("Social Media"));
  assert.equal(byId.get(3745).mediaArea,"Content und Redaktion");
  assert.equal(byId.get(3669).space,mediaSpace);
  for(const id of [3016,3543,200656,200667])assert.notEqual(byId.get(id).space,mediaSpace,`Subject podcast ${id}`);
  assert.equal(classifyMediaSubject("Cloud infrastructure whitepaper"),undefined);
  assert.equal(classifyMediaSubject("Deepfake fraud prevention for banking payments"),undefined);
  assert.equal(classifyMediaSubject("Copyright compliance for software licences"),undefined);
  const item={...byId.get(1),provider:"Media Publishing",url:"https://linkedin.com/whitepaper",format:"Podcast"};
  assert.deepEqual(applyMediaTaxonomy(item),item);
  assert.equal(classifyMediaSubject("PoINT Archival Gateway mit StorageNewsletter Award ausgezeichnet"),undefined);
});

test("media area, channel and cross-cutting topic filters combine without duplicating content",()=>{
  const item=byId.get(1546);
  assert.ok(matchesMediaFilters(item,"Social Media und Communities","Social Media","KI"));
  assert.equal(matchesMediaFilters(item,"Social Media und Communities","Newsletter","KI"),false);
  assert.equal(matchesMediaFilters(item,"Content und Redaktion","Social Media","KI"),false);
  assert.equal(matchesMediaFilters(item,"alle","Social Media","Datenschutz"),false);
  assert.ok(belongsToSpace({...item,space:"Gesundheit und Life Sciences",related:[mediaSpace]},mediaSpace));
  assert.equal(mediaAreas.length,8);
  for(const item of catalog.knowledge.filter(item=>item.mediaArea)){
    assert.ok(mediaAreas.some(area=>area.name===item.mediaArea));
    assert.deepEqual(applyMediaTaxonomy(item),item,"Classification remains stable on regeneration");
  }
});

test("German and English media deep links render the selected filters and matching cards",async()=>{
  const {default:worker}=await import("../dist/server/index.js");
  const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
  const ctx={waitUntil(){},passThroughOnException(){}};
  for(const locale of ["de","en"]){
    const params=new URLSearchParams({space:mediaSpace,area:"Social Media und Communities",channel:"Social Media",topic:"KI"});
    const response=await worker.fetch(new Request(`http://localhost/${locale==="en"?"en":""}?${params}`,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(response.status,200);
    const html=(await response.text()).replaceAll("<!-- -->","");
    assert.ok(html.includes(locale==="en"?"12 impact areas":"12 Wirkungsräume"));
    const section=html.match(/<section id="pilot"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section,"Taxonomy section is rendered");
    assert.ok(section.includes(locale==="en"?"Media and the public sphere":"Medien und Öffentlichkeit"));
    assert.ok(section.includes(locale==="en"?"Social media":"Social Media"));
    assert.match(section,/href="\/(?:en\/knowledge|wissen)\/1546-/);
    assert.doesNotMatch(section,/href="\/(?:en\/knowledge|wissen)\/1715-/);
    assert.doesNotMatch(section,/href="\/(?:en\/knowledge|wissen)\/3839-/);
    for(const area of mediaAreas)assert.ok(section.includes(locale==="en"?area.nameEn:area.name),area.name);
  }
});

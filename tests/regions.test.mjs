import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
const data=JSON.parse(await readFile(new URL("../app/provider-locations.json",import.meta.url),"utf8"));
const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
const {default:worker}=await import("../dist/server/index.js");
const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}},ctx={waitUntil(){},passThroughOnException(){}};
const page=path=>worker.fetch(new Request("https://smarttech.b2badgen.com"+path,{headers:{accept:"text/html"}}),env,ctx);
const articles=html=>[...html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].map(match=>match[1]);

test("regional evidence references existing providers, valid hierarchical regions and official HTTPS sources",()=>{
 const regionIds=new Set(data.regions.map(r=>r.id));assert.equal(regionIds.size,data.regions.length);
 const names=new Set(catalog.companies.map(p=>p.name));const seen=new Set();
 for(const region of data.regions){
  assert.match(region.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);assert.ok(region.name.de&&region.name.en);
  const chain=new Set([region.id]);let parent=region.parent;
  while(parent){assert.ok(regionIds.has(parent));assert.ok(!chain.has(parent),"Region cycle");chain.add(parent);parent=data.regions.find(r=>r.id===parent).parent;}
  assert.ok(data.locations.some(location=>{let id=location.region;while(id){if(id===region.id)return true;id=data.regions.find(r=>r.id===id)?.parent;}return false;}),"No empty landing page: "+region.id);
 }
 const allowedDomains=new Set(["serviceware-se.com","siemens.com","sap.com","bechtle.com","infineon.com","m-net.de","phoenixcontact.com","igel.com","gdata.de","hornetsecurity.com","telekom.com","ionos.de","eset.com","abb.com","swissbit.com"]);
 for(const location of data.locations){
  assert.ok(names.has(location.provider),location.provider);assert.ok(regionIds.has(location.region));assert.ok(location.entity&&location.city);
  assert.ok(["headquarters","registered-office","office","development"].includes(location.kind));assert.match(location.checkedAt,/^\d{4}-\d{2}-\d{2}$/);
  const url=new URL(location.sourceUrl);assert.equal(url.protocol,"https:");assert.ok([...allowedDomains].some(domain=>url.hostname===domain||url.hostname.endsWith("."+domain)));
  const key=[location.provider,location.entity,location.city,location.kind].join("|");assert.ok(!seen.has(key));seen.add(key);
 }
});

test("all region pages have correct canonical, language alternatives, visible content and sitemap entries",async()=>{
 const sitemap=await (await page("/sitemap.xml")).text();
 for(const prefix of ["/regionen","/en/regions"]){
  const overview=await page(prefix);assert.equal(overview.status,200);const html=await overview.text();assert.ok(html.includes("15"));assert.ok(html.includes(prefix+"/deutschland"));
  for(const region of data.regions){
   const path=prefix+"/"+region.id;const response=await page(path);assert.equal(response.status,200,path);const body=await response.text();
   assert.ok(body.includes('rel="canonical" href="https://smarttech.b2badgen.com'+path+'"'),path);assert.ok(body.includes('hrefLang="en"')||body.includes('hreflang="en"'));
   assert.match(body,new RegExp('<html lang="'+(prefix.startsWith("/en")?"en":"de")+'"'));assert.ok(articles(body).length>0,path);assert.ok(sitemap.includes("<loc>https://smarttech.b2badgen.com"+path+"</loc>"));
   assert.doesNotMatch(body,/__VINEXT_RSC_|rel="modulepreload"/);
   const schema=JSON.parse(body.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);assert.equal(schema.mainEntity.numberOfItems,articles(body).length);
  }
 }
 assert.equal((await page("/regionen/nicht-vorhanden")).status,404);
});

test("regional filters combine correctly, preserve locale and have reset and empty states",async()=>{
 const html=await (await page("/regionen/bayern?q=IGEL&kind=development")).text();const cards=articles(html);
 assert.equal(cards.length,1);assert.ok(cards[0].includes("IGEL"));assert.ok(cards[0].includes("Augsburg"));assert.ok(!cards[0].includes("Bremen"));assert.ok(!cards[0].includes("Wien"));
 assert.ok(html.includes("/en/regions/bayern?q=IGEL&amp;kind=development"));assert.ok(html.includes("noindex"));assert.ok(html.includes("Zurücksetzen"));
 // Omitted action submits to the current URL, preserving a reverse proxy's /smarttech prefix.
 assert.match(html,/<form[^>]*method="get"/);assert.doesNotMatch(html,/<form[^>]*action=/);assert.ok(html.includes('name="q"'));assert.ok(html.includes('name="kind"'));
 const zero=await (await page("/regionen/bayern?q=zzzzzzzz")).text();assert.equal(articles(zero).length,0);assert.ok(zero.includes("Keine belegten Standorte"));
 const city=await (await page("/en/regions/bayern?q=Neubiberg")).text();assert.equal(articles(city).length,1);assert.ok(articles(city)[0].includes("Infineon"));
 const germany=await (await page("/regionen/deutschland?q=IGEL")).text();assert.equal(articles(germany).length,1,"Multiple locations must not duplicate providers");assert.ok(articles(germany)[0].includes("Bremen"));assert.ok(articles(germany)[0].includes("Augsburg"));assert.ok(!articles(germany)[0].includes("Wien"));
});

test("regional provider links lead to profiles with reciprocal region links in both languages",async()=>{
 for(const path of ["/regionen/hessen","/en/regions/hessen"]){
  const html=await (await page(path)).text();const card=articles(html)[0];const target=card.match(/<h2[^>]*><a[^>]*href="([^"]+)"/)[1];const response=await page(target);assert.equal(response.status,200);const profile=await response.text();
  assert.ok(profile.includes('href="'+path+'"'));assert.ok(profile.includes("Idstein"));assert.ok(profile.includes("serviceware-se.com/de/unternehmen/standorte"));
 }
});

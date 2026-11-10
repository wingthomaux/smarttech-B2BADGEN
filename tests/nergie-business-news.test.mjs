import assert from "node:assert/strict";
import test from "node:test";
import {providerPath,englishProviderPath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const origin="https://smarttech.b2badgen.com";
const page=async path=>{const r=await worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});assert.equal(r.status,200);return r.text();};
test("N-ERGIE news separates revised survey timing, provisional charges and dated regulatory context in both languages",async()=>{
 const sitemap=await page('/sitemap.xml');
 for(const locale of ['de','en']){
  const en=locale==='en',path=(en?englishProviderPath:providerPath)('N-ERGIE Aktiengesellschaft'),html=await page(path);
  assert.ok(html.includes('id="business-news"'));assert.ok(html.includes('href="#business-news"'));
  for(const id of ['geothermal-survey','grid-plan-2026','provisional-network-charges','transmission-charges-2027','agnes-regulatory-context'])assert.ok(html.includes(`id="business-news-${id}"`));
  for(const term of [en?'12 November':'12. November',en?'9 November':'9. November',en?'test surveys':'Testmessungen',en?'Provisional':'Vorläufig',en?'not November news':'keine neue Novembermeldung','erdwaerme-franken.de','vag.de','transnetbw.de','bundesnetzagentur.de','2026-08-06','2026-11-02'])assert.ok(html.includes(term),term);
  assert.ok(html.includes(en?'not a forecast of revenue':'keine Prognose zu Umsatz'));
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const news=schemas.find(s=>s['@id']===origin+path+'#business-news');assert.equal(news.dateModified,'2026-11-10');assert.ok(news.citation.includes('https://erdwaerme-franken.de/'));
  assert.ok(sitemap.includes(`${origin+path}</loc><lastmod>2026-11-10</lastmod>`));
  assert.ok(html.includes('id="nergie-publications"'));assert.ok(html.includes('id="nergie-connections"'));
 }
 const unrelated=await page(providerPath('TRICERA energy GmbH'));assert.ok(!unrelated.includes('id="business-news"'));
});

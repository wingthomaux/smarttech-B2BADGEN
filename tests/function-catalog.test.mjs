import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
import {functionProfiles,functionPath,functionsPath,industryPath,industriesPath} from "../app/function-catalog.ts";
import {providerPath,englishProviderPath,taxonomyFacetPath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const origin="https://smarttech.b2badgen.com";
const page=async path=>{const r=await worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});assert.equal(r.status,200,path);return r.text();};
const attr=s=>s.replace(/&/g,'&amp;');
test("function catalogue keeps role identities, industry contexts and personal data separate",async()=>{
 assert.equal(functionProfiles.length,10);assert.equal(new Set(functionProfiles.map(f=>f.slug)).size,10);
 const raw=JSON.stringify(functionProfiles);assert.ok(!/@|mailto:|tel:|\/users\//.test(raw));
 const catalog=JSON.parse(await readFile(new URL('../app/catalog.generated.json',import.meta.url),'utf8'));
 for(const f of functionProfiles){assert.deepEqual(Object.keys(f).sort(),['aliases','contexts','question','slug','summary','title','topics']);assert.ok(f.title.de&&f.title.en);for(const context of f.contexts){assert.equal(context.industry,'energie');for(const solution of context.solutions)assert.ok(catalog.knowledge.some(k=>k.space==='Energie und Versorgung'&&k.solution===solution),solution);}}
});
test("all bilingual function routes connect industry, solutions, provider mentions and sitemap",async()=>{
 const xml=await page('/sitemap.xml');
 for(const locale of ['de','en']){
  const overview=await page(functionsPath(locale)),industry=await page(industryPath(locale)),industries=await page(industriesPath(locale));
  assert.ok(overview.includes('DefinedTerm'));assert.ok(industries.includes(`href="${industryPath(locale)}"`));assert.ok(industry.includes('id="loesungen"'));
  for(const f of functionProfiles){
   const path=functionPath(f.slug,locale),html=await page(path);assert.ok(overview.includes(`href="${path}"`));assert.ok(industry.includes(`href="${path}"`));
   assert.ok(html.includes(`<h1`));assert.ok(html.includes(f.title[locale]));assert.ok(html.includes(`href="${industryPath(locale)}"`));
   assert.ok(html.includes(`href="${functionPath(f.slug,locale==='en'?'de':'en')}"`));
   for(const solution of f.contexts[0].solutions)assert.ok(html.includes(`href="${attr(taxonomyFacetPath('Energie und Versorgung','solution',solution,locale))}"`));
   assert.ok(xml.includes(`${origin+path}</loc><lastmod>2026-11-10</lastmod>`));
   assert.ok(!html.includes('schema.org/Person'));assert.ok(!html.includes('/users/'));
  }
  const provider=(locale==='en'?englishProviderPath:providerPath)('N-ERGIE Aktiengesellschaft'),html=await page(provider);
  assert.ok(html.includes('id="fachfunktionen"'));for(const f of functionProfiles)assert.ok(html.includes(`href="${functionPath(f.slug,locale)}"`));
  const home=await page(locale==='en'?'/en':'/');assert.ok(home.includes(`href="${functionsPath(locale)}"`));assert.ok(home.includes(`href="${industryPath(locale)}"`));
  const utility=await page((locale==='en'?englishProviderPath:providerPath)('LEW TelNet'));assert.ok(utility.includes(`href="${functionPath('it-einkauf',locale)}"`));
 }
});

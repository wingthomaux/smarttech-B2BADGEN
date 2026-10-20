import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
const {default:worker}=await import("../dist/server/index.js");
const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}},ctx={waitUntil(){},passThroughOnException(){}};
const legal=["/impressum","/datenschutz","/en/imprint","/en/privacy"];
const page=async path=>worker.fetch(new Request("https://smarttech.b2badgen.com"+path,{headers:{accept:"text/html"}}),env,ctx);
test("production identity, legal routes, document languages and footer survive a release",async()=>{
  const hosting=JSON.parse(await readFile(new URL("../.openai/hosting.json",import.meta.url),"utf8"));
  const contract=JSON.parse(await readFile(new URL("../.openai/project-contract.json",import.meta.url),"utf8"));assert.equal(hosting.project_id,contract.project_id);
  for(const path of ["/","/en",...legal,"/wissen/1-one-view-for-all-your-engineering-data"]){
    const response=await page(path);assert.equal(response.status,200,path);const html=await response.text();
    assert.match(html,new RegExp(`<html lang="${path.startsWith("/en")?"en":"de"}"`),path);
    const footer=html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];assert.ok(footer,path);for(const link of legal)assert.ok(footer.includes('href="'+link+'"'),path+" footer "+link);
    if(legal.includes(path)){assert.ok(html.includes('id="legal-content"'));assert.ok(html.includes('rel="canonical" href="https://smarttech.b2badgen.com'+path+'"'));}
  }
});
test("sitemap uses only recorded page modification dates, not source publication dates",async()=>{
  const xml=await (await page("/sitemap.xml")).text();const entries=[...xml.matchAll(/<url>(.*?)<\/url>/g)].map(match=>match[1]);const locations=entries.map(entry=>entry.match(/<loc>(.*?)<\/loc>/)[1]);assert.equal(new Set(locations).size,locations.length);
  for(const path of legal){const entry=entries.find(entry=>entry.includes('https://smarttech.b2badgen.com'+path+'</loc>'));assert.ok(entry);assert.ok(entry.includes('<lastmod>2026-10-20</lastmod>'));}
  const legacy=entries.find(entry=>entry.includes('/wissen/1-one-view-for-all-your-engineering-data</loc>'));assert.ok(legacy);assert.ok(!legacy.includes('<lastmod>'));
});
test("shared research URLs restore free text and the selected portal",async()=>{
  const html=await (await page('/?q=IGEL&portal=ComputerWeekly&tab=anbieter')).text();assert.match(html,/value="IGEL"/);assert.ok(html.includes('/en?q=IGEL&amp;portal=ComputerWeekly&amp;tab=anbieter'));assert.ok(html.includes('Suche teilen'));
});
test("production JavaScript bootstrap preserves the Cloudflare public path",async()=>{
  const html=await (await page("/")).text();
  const bootstrap=html.match(/import\("([^\"]+\.js)"\)/)?.[1];
  assert.ok(bootstrap?.startsWith("https://www.b2badgen.com/smarttech/assets/"),bootstrap);
  const name=new URL(bootstrap).pathname.split("/").at(-1);
  const bytes=await readFile(new URL("../dist/client/assets/"+name,import.meta.url));assert.ok(bytes.length>0);
});
test("read-only detail pages keep their content and structured data without hydration",async()=>{
  const html=await (await page("/en/providers/serviceware-18pih")).text();
  assert.ok(html.includes("Serviceware"));assert.ok(html.includes("application/ld+json"));
  assert.doesNotMatch(html,/__VINEXT_RSC_|import\(/);assert.doesNotMatch(html,/rel="modulepreload"/);
  const legalHtml=await (await page("/datenschutz")).text();assert.ok(legalHtml.includes('id="legal-content"'));assert.doesNotMatch(legalHtml,/__VINEXT_RSC_/);
});

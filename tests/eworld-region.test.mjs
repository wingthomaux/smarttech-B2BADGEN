import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
import {providerPath,englishProviderPath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const entries=JSON.parse(await readFile(new URL("../app/eworld-2027.generated.json",import.meta.url),"utf8"));
const origin="https://smarttech.b2badgen.com";
const page=path=>worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
test("eWorld homepage entry, full directory, source links and bilingual search work together",async()=>{
  const xml=await (await page("/sitemap.xml")).text();
  for(const en of [false,true]){
    const path=(en?"/en":"")+"/region/eworld",other=(en?"":"/en")+"/region/eworld";
    const home=await (await page(en?"/en":"/")).text();assert.ok(home.includes(`href="${path}"`));assert.ok(home.includes("eWorld · 798"));
    const response=await page(path);assert.equal(response.status,200);const html=await response.text();
    assert.ok(html.includes(`<html lang="${en?"en":"de"}"`));assert.ok(html.includes(`rel="canonical" href="${origin+path}"`));assert.ok(html.includes(`href="${other}"`));
    assert.ok(xml.includes(origin+path));assert.doesNotMatch(html,/__VINEXT_RSC_|rel="modulepreload"/);
    for(const entry of entries){assert.ok(html.includes((en?englishProviderPath:providerPath)(entry.provider)),entry.name);assert.ok(html.includes(entry.url),entry.url);}
    assert.ok(html.includes('method="get"'));assert.ok(html.includes('name="q"'));
    const filtered=await (await page(path+"?q=Snowflake")).text();assert.ok(filtered.includes(entries.find(entry=>entry.provider==="Snowflake").url));assert.ok(!filtered.includes(entries.find(entry=>entry.provider==="ABB").url));assert.ok(filtered.includes(other+"?q=Snowflake"));
    const empty=await (await page(path+"?q=zzzz-no-exhibitor-zzzz")).text();assert.ok(empty.includes(en?"No exhibitors match":"Keine Aussteller"));
    const city=await (await page(path+"?q=Berlin")).text();assert.ok(city.includes('name="q"'));assert.ok(city.includes("Berlin"));
  }
});

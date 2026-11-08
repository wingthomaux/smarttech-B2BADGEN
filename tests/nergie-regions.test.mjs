import assert from "node:assert/strict";
import test from "node:test";
import {providerPath,englishProviderPath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const origin="https://smarttech.b2badgen.com";
const page=path=>worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
test("N-ERGIE provider, regional contexts, E-world search and sitemap form a bilingual navigable path",async()=>{
  const xml=await (await page("/sitemap.xml")).text();
  for(const en of [false,true]){
    const prefix=en?"/en":"",provider=(en?englishProviderPath:providerPath)("N-ERGIE Aktiengesellschaft");
    const home=await (await page(prefix||"/")).text();
    const profile=await (await page(provider)).text();
    for(const slug of ["nuernberg","mittelfranken"]){
      const path=prefix+"/region/"+slug,response=await page(path);assert.equal(response.status,200);const html=await response.text();
      assert.ok(home.includes(`href="${path}"`));assert.ok(profile.includes(`href="${path}"`));assert.ok(html.includes(`href="${provider}"`));
      assert.ok(html.includes(`<html lang="${en?"en":"de"}"`));assert.ok(html.includes(`rel="canonical" href="${origin+path}"`));
      assert.ok(xml.includes(`${origin+path}</loc><lastmod>2026-11-08</lastmod>`));
      assert.ok(html.includes("N-ERGIE Netz GmbH"));assert.ok(html.includes("LoRaWAN"));assert.ok(html.includes("mioty"));
      assert.ok(html.includes(en?"not been independently rechecked live":"nicht zusätzlich live nachgeprüft"));
      assert.ok(html.includes(en?"not a guarantee of connection or capacity":"keine Anschluss- oder Kapazitätszusage"));
      for(const href of new Set([...html.matchAll(/<a\b[^>]*href="(\/[^"#]*)"/g)].map(m=>m[1].replaceAll("&amp;","&"))))assert.equal((await page(href)).status,200,`${path} → ${href}`);
    }
    const event=await (await page(prefix+"/region/eworld?q=N-ERGIE")).text();assert.ok(event.includes(`href="${provider}"`));assert.ok(event.includes("3N134"));
  }
});

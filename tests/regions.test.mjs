import assert from "node:assert/strict";
import test from "node:test";
const {default:worker}=await import("../dist/server/index.js");
const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
const ctx={waitUntil(){},passThroughOnException(){}};
const origin="https://smarttech.b2badgen.com";
const page=path=>worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),env,ctx);

test("regional reports render in both languages with separate identities, rights and offers",async()=>{
  const xml=await (await page("/sitemap.xml")).text();
  for(const path of ["/region/wittlich","/en/region/wittlich"]){
    const en=path.startsWith("/en/");
    const response=await page(path);assert.equal(response.status,200);
    const html=await response.text();
    assert.ok(html.includes(`<html lang="${en?"en":"de"}"`));
    assert.ok(html.includes(`rel="canonical" href="${origin+path}"`));
    assert.doesNotMatch(html,/__VINEXT_RSC_|import\(|rel="modulepreload"/);
    assert.ok(html.includes('application/ld+json'));
    for(const id of ["report","regional-frame","aeins","portazon","offers","users","source-notes"])assert.ok(html.includes(`id="${id}"`));
    assert.ok(html.includes("HRB 12294"));assert.ok(html.includes("HRB 45102"));
    assert.ok(html.indexOf('id="aeins"')<html.indexOf('id="portazon"'));
    assert.ok(html.indexOf('id="portazon"')<html.indexOf('id="offers"'));
    assert.equal(html.split(en?"No specific purchase offer":"Kein konkretes Erwerbsangebot").length-1,2);
    assert.ok(html.includes("Powered by xAI"));assert.ok(html.includes("All rights reserved. Copyright © xAI 2026."));
    assert.ok(html.includes("https://grokipedia.com/suggest"));
    const entry=xml.match(new RegExp(`<url><loc>${origin+path}</loc>(.*?)</url>`))?.[1];
    assert.ok(entry?.includes("<lastmod>2026-10-21</lastmod>"));
    // Follow every actual local link in the report, including language and privacy navigation.
    for(const href of new Set([...html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/g)].map(match=>match[1]))){
      assert.equal((await page(href)).status,200,`${path} → ${href}`);
    }
    const home=await (await page(en?"/en":"/")).text();assert.ok(home.includes(`href="${path}"`));
  }
});

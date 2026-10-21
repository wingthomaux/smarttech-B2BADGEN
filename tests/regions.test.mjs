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

for(const {slug,companies,otherRegister} of [
  {slug:"muenchen-stadt",companies:["HRB 121920","HRB 108514"],otherRegister:"HRA 80430"},
  {slug:"muenchen-landkreis",companies:["HRA 80430","HRB 165464"],otherRegister:"HRB 121920"},
])test(`${slug} keeps jurisdiction, companies, offers and bilingual navigation distinct`,async()=>{
  const xml=await (await page("/sitemap.xml")).text();
  for(const locale of ["de","en"]){
    const prefix=locale==="en"?"/en":"",path=prefix+"/region/"+slug;
    const response=await page(path);assert.equal(response.status,200);
    const html=await response.text();
    assert.ok(html.includes(`<html lang="${locale}"`));
    assert.ok(html.includes(`rel="canonical" href="${origin+path}"`));
    assert.ok(html.includes(`href="${origin}/region/${slug}"`)&&html.includes(`href="${origin}/en/region/${slug}"`));
    assert.doesNotMatch(html,/__VINEXT_RSC_|import\(|rel="modulepreload"/);
    assert.ok(html.includes('application/ld+json'));
    for(const company of companies)assert.ok(html.includes(company));
    assert.ok(!html.includes(otherRegister));
    assert.equal(html.split(locale==="en"?"No specific purchase offer":"Kein konkretes Erwerbsangebot").length-1,2);
    const context=html.match(/<section aria-labelledby="regional-frame"[\s\S]*?<\/section>/)?.[0];
    assert.ok(context?.includes("Powered by xAI"));assert.ok(!context.includes(companies[0]));
    assert.ok(html.indexOf('id="offers"')>html.indexOf(companies[1]));
    assert.ok(html.includes('id="users"')&&html.includes('id="source-notes"'));
    assert.ok(html.includes("https://www.landkreis-muenchen.de/landkreis/gemeinden-und-staedte/"));
    if(slug==="muenchen-stadt"){
      assert.ok(html.includes("https://stadt.muenchen.de/infos/statistik-schon-gewusst.html"));
      assert.ok(!html.includes("354.396")&&!html.includes("354,396"));
    }else{
      assert.ok(html.includes(locale==="en"?"354,396":"354.396"));
      assert.ok(html.includes(locale==="en"?"31 December 2024":"31. Dezember 2024"));
      assert.ok(html.includes("https://www.gemeindewerke-oberhaching.de/vertriebspartner-glasfaser"));
    }
    const entry=xml.match(new RegExp(`<url><loc>${origin+path}</loc>(.*?)</url>`))?.[1];
    assert.ok(entry?.includes("<lastmod>2026-10-21</lastmod>"));
    for(const href of new Set([...html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/g)].map(match=>match[1])))assert.equal((await page(href)).status,200,`${path} → ${href}`);
    assert.ok((await (await page(prefix||"/")).text()).includes(`href="${path}"`));
  }
});

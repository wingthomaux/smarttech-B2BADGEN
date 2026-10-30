import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
import {providerPath,englishProviderPath} from "../app/catalog-paths.ts";
const entries=JSON.parse(await readFile(new URL("../app/eworld-2027.generated.json",import.meta.url),"utf8"));
const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
const profiles=JSON.parse(await readFile(new URL("../app/provider-profiles-eworld-20261027.json",import.meta.url),"utf8"));
const {default:worker}=await import("../dist/server/index.js");
const origin="https://smarttech.b2badgen.com";
const page=path=>worker.fetch(new Request(origin+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});
test("all 798 exhibitors have distinct identities without contacts or invented resources",()=>{
  assert.equal(entries.length,798);assert.equal(entries.filter(entry=>entry.existing).length,13);
  assert.equal(entries.filter(entry=>!entry.existing).length,785);
  assert.equal(new Set(entries.map(entry=>entry.provider)).size,798);
  assert.equal(entries.filter(entry=>!entry.description).length,34);
  for(const entry of entries){
    assert.ok(!('contacts' in entry)&&!('Ansprechpartner' in entry));
    const provider=catalog.companies.find(provider=>provider.name===entry.provider);assert.ok(provider,entry.provider);
    if(!entry.existing){assert.equal(provider.items.length,0);assert.equal(provider.knowledge.length,0);}
    assert.ok(entry.url.startsWith("https://community.e-world-essen.com/organizations/allExhibitors/"));
  }
  assert.ok(catalog.companies.some(provider=>provider.name==="SAP"));
  assert.ok(entries.some(entry=>entry.provider==="SAP Deutschland SE & Co. KG"));
});
test("individual exhibition company profiles render their official sources in both languages without creating knowledge items",async()=>{
  const xml=await (await page("/sitemap.xml")).text();
  for(const [name,profile] of Object.entries(profiles)){
    const provider=catalog.companies.find(item=>item.name===name);assert.ok(provider,name);
    assert.equal(provider.knowledge.length,0);
    for(const locale of ["de","en"]){
      const path=(locale==="de"?providerPath:englishProviderPath)(name);
      const response=await page(path);assert.equal(response.status,200);const html=await response.text();
      assert.ok(html.includes(profile.summary[locale]));
      assert.ok(html.includes(locale==="de"?"Redaktionelle Auswahlfragen":"Editorial selection questions"));
      assert.ok(!html.includes(locale==="de"?"Kurzprofil · Quellenauszug":"Short profile · source excerpt"));
      for(const source of profile.officialSources)assert.ok(html.includes(source.url));
      assert.ok(xml.includes(`${origin}${path}</loc><lastmod>${profile.languageNote.de.includes("29.10.2026")?"2026-10-29":profile.languageNote.de.includes("28.10.2026")?"2026-10-28":"2026-10-27"}</lastmod>`));
    }
  }
});
test("existing, new and empty-description profiles expose source, stand, language and sitemap links",async()=>{
  const xml=await (await page("/sitemap.xml")).text();
  for(const entry of [entries.find(entry=>entry.provider==="ABB"),entries[0],entries.find(entry=>!entry.existing&&!entry.description)]){
    for(const en of [false,true]){
      const path=(en?englishProviderPath:providerPath)(entry.provider);
      const response=await page(path);assert.equal(response.status,200);const html=await response.text();
      assert.ok(html.includes(entry.url));assert.ok(html.includes("E-world 2027"));assert.ok(html.includes("2026-10-26"));
      assert.ok(html.includes(en?"not been independently rechecked live":"nicht zusätzlich live nachgeprüft"));
      assert.ok(xml.includes(origin+path));assert.ok(html.includes(en?providerPath(entry.provider):englishProviderPath(entry.provider)));
      if(!entry.existing&&!entry.description)assert.ok(html.includes(en?"No company description":"keine Unternehmensbeschreibung"));
      if(en&&!entry.existing&&entry.description)assert.ok(html.includes('lang="de"'));
    }
  }
});

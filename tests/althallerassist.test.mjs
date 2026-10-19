import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath} from "../app/catalog-paths.ts";
import {belongsToSpace,matchesMediaFilters,mediaSpace} from "../app/media-taxonomy.ts";

const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
const translations=JSON.parse(await readFile(new URL("../app/english-althallerassist-20261008.json",import.meta.url),"utf8"));
const item=catalog.knowledge.find(entry=>entry.id===780000);

test("AlthallerAssist belongs to one provider and several media views without duplication",()=>{
  assert.ok(item);
  const companies=catalog.companies.filter(company=>/althaller/i.test(company.name));
  assert.equal(companies.length,1);
  assert.equal(companies[0].name,"Althaller Communication");
  assert.ok(companies[0].knowledge.includes(780000));
  assert.ok(companies[0].knowledge.includes(820000));
  assert.equal(new Set(companies[0].knowledge).size,companies[0].knowledge.length);
  assert.equal(catalog.companies.filter(company=>company.name==="AlthallerAssist").length,0);
  assert.equal(item.datePublished,undefined);
  assert.equal(item.addedAt,"2026-10-08");
  assert.equal(item.stage,"Redaktionell geprüft");
  for(const area of ["Social Media und Communities","Content und Redaktion","Analyse und Wirkung"]){
    assert.ok(matchesMediaFilters(item,area,"Newsletter","KI"));
    assert.equal(catalog.knowledge.filter(entry=>entry.id===780000&&matchesMediaFilters(entry,area)).length,1);
  }
  assert.ok(belongsToSpace(item,"Unternehmen und Verwaltung"));
  assert.equal(matchesMediaFilters(item,"Analyse und Wirkung","Newsletter","Datenschutz"),false);
});

test("Althaller provider and product render in DE/EN with source and secondary filter links",async()=>{
  const {default:worker}=await import("../dist/server/index.js");
  const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
  const ctx={waitUntil(){},passThroughOnException(){}};
  const fetchHtml=async path=>{
    const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(response.status,200,path);
    return (await response.text()).replaceAll("<!-- -->","");
  };
  for(const locale of ["de","en"]){
    const profile=await fetchHtml(locale==="en"?englishProviderPath(item.provider):providerPath(item.provider));
    assert.ok(profile.includes(locale==="en"?"Marketing and communication leadership":"Marketing- und Kommunikationsleitung"));
    assert.ok(profile.includes("https://althallercommunication.de/assist"));
    assert.match(profile,/780000-/);
    const product=await fetchHtml(locale==="en"?englishKnowledgePath(item,translations[item.title]):knowledgePath(item));
    assert.ok(product.includes(locale==="en"?"Additional media areas":"Weitere Medienbereiche"));
    assert.ok(product.includes(locale==="en"?"Analysis and impact":"Analyse und Wirkung"));
    assert.ok(product.includes(locale==="en"?"provider":"Anbieter"));
    const params=new URLSearchParams({space:mediaSpace,area:"Analyse und Wirkung",channel:"Newsletter",topic:"KI"});
    const filtered=await fetchHtml(`${locale==="en"?"/en":"/"}?${params}`);
    const section=filtered.match(/<section id="pilot"[\s\S]*?<\/section>/)?.[0]||"";
    assert.equal((section.match(/href="\/(?:en\/knowledge|wissen)\/780000-/g)||[]).length,1);
  }
});

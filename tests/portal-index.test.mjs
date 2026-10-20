import assert from "node:assert/strict";
import test from "node:test";
import {readFile,readdir} from "node:fs/promises";
import {gzipSync} from "node:zlib";
import {decodePortalData} from "../app/decode-portal-data.ts";
import {catalogQueryString,catalogLanguageHref} from "../app/catalog-query.ts";
const json=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),"utf8"));
test("compact browser index retains every canonical identity, publication and filter field",async()=>{
  const [original,encoded]=await Promise.all([json("../app/catalog.generated.json"),json("../app/portal-client-data.generated.json")]);const data=decodePortalData(encoded.strings,encoded.payload);
  assert.equal(data.knowledge.length,original.knowledge.length);assert.equal(data.companies.length,original.companies.length);
  const used=["id","title","provider","space","related","challenge","solution","delivery","lifecycle","origin","format","url","score","stage","additionalProviders","solutionTopics","mediaPrimary","mediaArea","relatedMediaAreas","channels","topics"];
  for(let i=0;i<original.knowledge.length;i++){for(const key of used)assert.deepEqual(data.knowledge[i][key],original.knowledge[i][key],`${original.knowledge[i].id} ${key}`);assert.equal(data.knowledge[i].note,"");}
  for(let i=0;i<original.companies.length;i++){const company=data.companies[i];assert.equal(company.name,original.companies[i].name);assert.deepEqual(company.items.map(index=>data.publications[index]),original.companies[i].items);}
});
test("shared URLs round-trip punctuation, Unicode, all filters and language without losing the public prefix",()=>{
  const state={q:"KI & Daten / Größe?",portal:"ComputerWeekly",space:"Medien und Öffentlichkeit",solution:"Content & CMS",challenge:"Qualität und Geschwindigkeit",delivery:"Softwaredienst",lifecycle:"Betrieb",area:"Fachmedien",channel:"Newsletter",topic:"KI",solutionTopic:"cms",tab:"loesungen"};
  const query=catalogQueryString(state);assert.deepEqual(Object.fromEntries(new URLSearchParams(query)),state);assert.equal(catalogLanguageHref("en",query,"/smarttech"),"/smarttech/en?"+query);assert.equal(catalogLanguageHref("de",query),"/?"+query);assert.equal(catalogQueryString({q:"",portal:"alle",space:"Produktion und Produkte",tab:"wirkungsraeume"}),"");
});
test("browser catalogue bundle remains within its measured performance budget",async()=>{
  const files=await readdir(new URL("../dist/client/assets/",import.meta.url));const name=files.find(file=>/^smarttech-portal-.*\.js$/.test(file));assert.ok(name);
  const bytes=await readFile(new URL("../dist/client/assets/"+name,import.meta.url));const budget=await json("../.openai/performance-budget.json");assert.ok(bytes.length<=budget.portal_max_bytes,`${bytes.length} raw bytes exceed budget`);const zipped=gzipSync(bytes,{level:9}).length;assert.ok(zipped<=budget.portal_max_gzip_bytes,`${zipped} gzip bytes exceed budget`);console.log(`Catalogue browser bundle: ${bytes.length} raw, ${zipped} gzip bytes.`);
});

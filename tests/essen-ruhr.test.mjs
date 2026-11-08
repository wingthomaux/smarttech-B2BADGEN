import assert from "node:assert/strict";
import test from "node:test";
import {providerPath,englishProviderPath} from "../app/catalog-paths.ts";
const {default:worker}=await import("../dist/server/index.js");
const page=async path=>{const r=await worker.fetch(new Request("https://smarttech.b2badgen.com"+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});assert.equal(r.status,200,path);return r.text();};
test("Essen and Ruhr reports retain distinct evidence, language links and the exhibitor data boundary",async()=>{
 for(const prefix of ["","/en"]){
  const city=await page(prefix+"/region/essen"),ruhr=await page(prefix+"/region/metropole-ruhr");
  for(const [slug,html] of [["essen",city],["metropole-ruhr",ruhr]]){
   for(const term of ["2026-11-08","798",prefix?"26 October 2026":"26.10.2026","www.rvr.ruhr","www.messe-essen.de"])assert.ok(html.includes(term),term);
   assert.ok(html.includes(`href="${prefix}/region/eworld"`));assert.ok(html.includes(`href="${prefix?"":"/en"}/region/${slug}"`));
   assert.ok(html.includes(prefix?"not been reconfirmed live":"nicht erneut live bestätigt"));
   assert.ok(html.includes('id="regionale-anbieter"'));assert.ok(html.includes('<table'));assert.ok(html.includes('scope="row"'));
  }
  for(const term of ["Iqony Fernwärme GmbH",prefix?"8 November 2023":"08.11.2023","LoRaWAN","pressemeldung_1512694","RWE Platz 1"])assert.ok(city.includes(term),term);
  assert.ok(city.includes(prefix?"does not guarantee a connection":"keine Anschlusszusage"));
  assert.ok(!city.includes('aktuelle-bauprojekte-h2'));assert.ok(!city.includes('www.gelsenwasser.de'));
  for(const term of ["DoHa","Thyssengas","Duisburg-Hamborn","Gelsenwasser","CONNECTED.RUHR","DIGITALREGION.RUHR"])assert.ok(ruhr.includes(term),term);
  assert.ok(ruhr.includes(prefix?"undergoing approval":"im Genehmigungsverfahren"));
  assert.ok(!ruhr.includes('pressemeldung_1592966'));assert.ok(!ruhr.includes('pressemeldung_1512694'));
  const providerLink=prefix?englishProviderPath:providerPath;
  for(const [html,names] of [[city,["Stadtwerke Essen AG","Iqony GmbH","RWE","OGE (Open Grid Europe GmbH)"]],[ruhr,["Gelsenwasser AG","Hydrogen Metropole Ruhr","OGE (Open Grid Europe GmbH)"]]])for(const name of names){
   assert.ok(html.includes(`href="${providerLink(name)}"`),name);
   const provider=await page(providerLink(name));assert.ok(provider.includes(`href="${prefix}/region/${html===city?"essen":"metropole-ruhr"}#regionale-anbieter"`),name);
  }
  const event=await page(prefix+"/region/eworld?q=Essen");for(const slug of ["essen","metropole-ruhr"])assert.ok(event.includes(`href="${prefix}/region/${slug}"`));
 }
 const sitemap=await page("/sitemap.xml");for(const slug of ["essen","metropole-ruhr"])for(const prefix of ["","/en"])assert.ok(sitemap.includes(prefix+"/region/"+slug));
});

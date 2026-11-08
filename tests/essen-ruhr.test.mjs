import assert from "node:assert/strict";
import test from "node:test";
const {default:worker}=await import("../dist/server/index.js");
const page=async path=>{const r=await worker.fetch(new Request("https://smarttech.b2badgen.com"+path,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("",{status:404})}},{waitUntil(){},passThroughOnException(){}});assert.equal(r.status,200,path);return r.text();};
test("Essen and Ruhr reports retain evidence, language links and the exhibitor data boundary",async()=>{
 for(const prefix of ["","/en"]){
  for(const slug of ["essen","metropole-ruhr"]){
   const html=await page(prefix+"/region/"+slug);
   for(const term of ["2026-11-08","Iqony Fernwärme GmbH","Hydrogen Metropole Ruhr","798",prefix?"26 October 2026":"26.10.2026","www.rvr.ruhr","www.essen.de","www.business.ruhr","www.messe-essen.de"])assert.ok(html.includes(term),term);
   assert.ok(html.includes(`href="${prefix}/region/eworld"`));
   assert.ok(html.includes(`href="${prefix?"":"/en"}/region/${slug}"`));
   assert.ok(html.includes(prefix?"does not guarantee a connection":"keine Anschlusszusage"));
   assert.ok(html.includes(prefix?"not been reconfirmed live":"nicht erneut live bestätigt"));
  }
  const event=await page(prefix+"/region/eworld?q=Essen");
  for(const slug of ["essen","metropole-ruhr"])assert.ok(event.includes(`href="${prefix}/region/${slug}"`));
 }
 const sitemap=await page("/sitemap.xml");for(const slug of ["essen","metropole-ruhr"])for(const prefix of ["","/en"])assert.ok(sitemap.includes(prefix+"/region/"+slug));
});

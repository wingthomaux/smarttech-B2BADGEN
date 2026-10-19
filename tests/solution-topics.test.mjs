import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {solutionTopics,matchesSolutionTopic,matchesFreeText} from "../app/solution-topics.ts";

test("solution entry points retain established coverage and expose selected marketing sources",async()=>{
  const catalogue=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url)));
  assert.equal(solutionTopics.length,25);
  for(const topic of solutionTopics){
    const sources=new Set(catalogue.knowledge.filter(item=>matchesSolutionTopic(item,topic)).map(item=>item.url));
    const minimum=["marketing-automation","dam","pim","cms","sales-enablement","social-media"].includes(topic.id)?4:20;
    assert.ok(sources.size>=minimum,`${topic.id} has only ${sources.size} sources`);
  }
  const siem=solutionTopics.find(topic=>topic.id==="siem");
  const erp=solutionTopics.find(topic=>topic.id==="erp");
  assert.equal(matchesSolutionTopic({title:"Siemens Industrial Copilot",solution:"Industrielle KI",space:"Produktion und Produkte"},siem),false);
  assert.equal(matchesSolutionTopic({title:"Digital Enterprise",solution:"Produktentwicklung",space:"Produktion und Produkte"},erp),false);
  assert.equal(matchesSolutionTopic({id:1663,title:"ErP 2026-ready Ventilatorlösungen",solution:"Ventilatoren",space:"Produktion und Produkte"},erp),false);
  assert.equal(matchesSolutionTopic({id:4660,title:"Neo4j Fleet Manager",solution:"Graphdatenbank",space:"Digitale Infrastruktur"},solutionTopics.find(topic=>topic.id==="fleet")),false);
  const mnet=catalogue.knowledge.filter(item=>item.provider==="M-net");
  assert.equal(mnet.filter(item=>matchesSolutionTopic(item,solutionTopics.find(topic=>topic.id==="sase"))).length,4);
  assert.ok(mnet.every(item=>!item.url.includes("Whitepaper_Vernetzung.pdf")));
});

test("short search acronyms match whole tokens",()=>{
  assert.equal(matchesFreeText("Siemens", "SIEM"),false);
  assert.equal(matchesFreeText("Enterprise", "ERP"),false);
  assert.equal(matchesFreeText("SIEM / SOC", "SIEM"),true);
  assert.equal(matchesFreeText("Cloud-ERP", "ERP"),true);
});

test("all 23 reviewed Telecom Handel items are present in the catalogue",async()=>{
  const [source,catalogue]=await Promise.all([
    readFile(new URL("../app/observed-expansion-telecom-handel.json",import.meta.url)).then(JSON.parse),
    readFile(new URL("../app/catalog.generated.json",import.meta.url)).then(JSON.parse),
  ]);
  assert.equal(source.length,23);
  const ids=new Set(catalogue.knowledge.map(item=>item.id));
  for(const item of source)assert.ok(ids.has(item.id),`Missing ${item.id}`);
});

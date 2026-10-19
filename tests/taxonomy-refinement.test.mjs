import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const {knowledge}=JSON.parse(readFileSync(new URL('../app/catalog.generated.json',import.meta.url),'utf8'));
const byId=new Map(knowledge.map(item=>[item.id,item]));

test('specific publications use their subject area and ambiguous company news stays in administration',()=>{
  assert.equal(byId.get(3586).space,'Digitale Infrastruktur'); // SaaS data protection
  assert.equal(byId.get(4846).space,'Produktion und Produkte'); // battery machine building
  assert.equal(byId.get(1515).space,'Mobilität und Logistik'); // driver safety
  assert.equal(byId.get(3024).space,'Gebäude und Standorte'); // real estate operations
  assert.equal(byId.get(4154).space,'Unternehmen und Verwaltung'); // generic bottleneck system
  assert.equal(byId.get(2870).space,'Unternehmen und Verwaltung'); // compliance notice mentioning estate agents
});

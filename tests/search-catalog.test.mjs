import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {buildSearchCatalog} from "../app/search-catalog.ts";
import {matchesFreeText} from "../app/solution-topics.ts";

const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
const search=buildSearchCatalog(catalog);

test("search includes IGEL and all official resources and editorial articles",()=>{
  for(const term of ["igel","IGEL","Igel"]){
    const companies=search.companies.filter(company=>matchesFreeText(company.name,term));
    assert.equal(companies.length,1);
    assert.equal(companies[0].knowledge.length,19);
    assert.equal(search.knowledge.filter(item=>matchesFreeText(item.provider,term)).length,19);
  }
});

test("search includes every canonical company and source batch, including coauthored resources",()=>{
  assert.deepEqual(search.companies.map(company=>company.name),catalog.companies.map(company=>company.name));
  assert.deepEqual(search.knowledge.map(item=>item.id),catalog.knowledge.map(item=>item.id));
  for(const company of search.companies)assert.deepEqual(company.knowledge.map(item=>item.id),catalog.companies.find(item=>item.name===company.name).knowledge);
  assert.ok(search.companies.find(company=>company.name==="Drata").knowledge.some(item=>item.id===750001));
  const extended=buildSearchCatalog({...catalog,knowledge:[...catalog.knowledge,{...catalog.knowledge[0],id:999999,provider:"Future provider"}],companies:[...catalog.companies,{name:"Future provider",variants:[],items:[],portals:[],knowledge:[999999]}]});
  assert.equal(extended.companies.at(-1).knowledge[0].id,999999);
});

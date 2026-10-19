import {readFile,writeFile} from "node:fs/promises";

const root=new URL("../",import.meta.url);
const file="public/data/publications-update-2026-09-07.json";
const [base,updates,approved]=await Promise.all([
  "public/data/publications.json",file,"public/data/source-review/portal-update-20261006.approved.json",
].map(name=>readFile(new URL(name,root),"utf8").then(JSON.parse)));
const normal=value=>value.toLocaleLowerCase("de").replace(/[^a-z0-9äöüß]+/g," ").trim();
const catalog=JSON.parse(await readFile(new URL("app/catalog.generated.json",root),"utf8"));
const providerNames=new Map(catalog.companies.flatMap(company=>[company.name,...company.variants].map(name=>[normal(name),company.name])));
const providerKey=name=>normal(providerNames.get(normal(name))||name);
const urlKey=value=>value.split("?")[0].replace(/\/$/,"");
const rows=[...base,...updates];
const baseBefore=JSON.stringify(base);
let nextId=Math.max(...rows.map(item=>item.id))+1;
let inserted=0,merged=0;
for(const item of approved){
  if(!item.c||!item.t||!item.p.length||!/^2026-\d{2}-\d{2}$/.test(item.d)||!item.u.startsWith("https://"))throw new Error(`Invalid approved publication: ${item.u}`);
  const existing=rows.find(row=>urlKey(row.u)===urlKey(item.u)||(providerKey(row.c)===providerKey(item.c)&&normal(row.t)===normal(item.t)));
  if(existing){
    existing.p=[...new Set([...existing.p,...item.p])].sort();
    const sightings=[...(existing.sourceObservations||[]),...(item.sourceObservations||[])];
    if(urlKey(existing.u)!==urlKey(item.u))sightings.push(...item.p.map(portal=>({portal,url:item.u,datePublished:item.d})));
    if(sightings.length)existing.sourceObservations=[...new Map(sightings.map(entry=>[`${entry.portal}|${urlKey(entry.url)}`,entry])).values()];
    merged++;
  }else{
    const row={id:nextId++,...item};updates.push(row);rows.push(row);inserted++;
  }
}
if(JSON.stringify(base)!==baseBefore)await writeFile(new URL("public/data/publications.json",root),JSON.stringify(base)+"\n");
await writeFile(new URL(file,root),JSON.stringify(updates,null,2)+"\n");
console.log(JSON.stringify({inserted,merged,approved:approved.length}));

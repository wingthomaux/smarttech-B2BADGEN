import {readFile} from "node:fs/promises";

const [catalog,validation]=await Promise.all([
  readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8").then(JSON.parse),
  readFile(new URL("../app/validation-ledger.json",import.meta.url),"utf8").then(JSON.parse),
]);

const requested=process.argv[2]?.split(",").map(Number).filter(Number.isFinite);
const ids=requested?.length?requested:validation.batches.at(-1)?.assetIds||[];
const byId=new Map(catalog.knowledge.map(item=>[item.id,item]));

function decodeEntities(value){
  const named={amp:"&",quot:'"',apos:"'",nbsp:" ",lt:"<",gt:">"};
  return value.replace(/&#x([0-9a-f]+);|&#(\d+);|&([a-z]+);/gi,(_,hex,decimal,name)=>hex?String.fromCodePoint(parseInt(hex,16)):decimal?String.fromCodePoint(Number(decimal)):(named[name.toLowerCase()]||" "));
}

function normalize(value){
  return decodeEntities(value||"").normalize("NFKD").replace(/\p{M}/gu,"").toLocaleLowerCase("de").replace(/[^a-z0-9]+/g," ").trim();
}

function dateSignals(item){
  if(item.datePublished){
    const [year,month,day]=item.datePublished.split("-");
    return [item.datePublished,`${day}.${month}.${year}`,`${day}. ${month}. ${year}`,year];
  }
  return [item.addedAt?.slice(0,4),item.eventPeriod?.match(/\d{4}/)?.[0]].filter(Boolean);
}

function providerSignals(provider){
  return normalize(provider)
    .replace(/\b(gmbh|ag|se|inc|ltd|limited|international|deutschland|germany|europe|kontakt|pr|agentur)\b/g," ")
    .split(/\s+/)
    .filter(token=>token.length>=4&&!new Set(["systems","solutions","software","technologies","services","group"]).has(token));
}

async function fetchSource(item){
  let lastError;
  for(let attempt=1;attempt<=2;attempt+=1){
    try{
      const response=await fetch(item.url,{redirect:"follow",signal:AbortSignal.timeout(30000),headers:{"user-agent":"SmartTech-Editorial-Validator/1.0"}});
      const html=await response.text();
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const body=normalize(html);
      const title=normalize(item.title);
      const titleWords=title.split(" ").filter(word=>word.length>=5);
      const titleMatches=body.includes(title)||titleWords.filter(word=>body.includes(word)).length>=Math.min(4,titleWords.length);
      const dateMatches=item.origin==="Kuratiert"&&!item.datePublished?true:dateSignals(item).some(signal=>html.includes(signal));
      const signals=providerSignals(item.provider);
      const providerMatches=!signals.length||signals.some(signal=>body.includes(signal));
      return {id:item.id,status:response.status,titleMatches,dateMatches,providerMatches,url:item.url};
    }catch(error){lastError=error;if(attempt===1)await new Promise(resolve=>setTimeout(resolve,500));}
  }
  return {id:item.id,status:0,titleMatches:false,dateMatches:false,providerMatches:false,url:item.url,error:lastError?.message||"Abruf fehlgeschlagen"};
}

const items=ids.map(id=>byId.get(id));
if(items.some(item=>!item))throw new Error(`Unbekannte Asset-IDs: ${ids.filter((id,index)=>!items[index]).join(", ")}`);
const results=[];
for(let index=0;index<items.length;index+=6){results.push(...await Promise.all(items.slice(index,index+6).map(fetchSource)))}
const failed=results.filter(result=>!result.status||!result.titleMatches||!result.dateMatches||!result.providerMatches);
console.log(JSON.stringify({checked:results.length,passed:results.length-failed.length,failed},null,2));
if(failed.length)process.exitCode=1;

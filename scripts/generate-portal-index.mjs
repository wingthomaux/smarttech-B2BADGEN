import {readFile,writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {createServer} from "vite";
const root=fileURLToPath(new URL("..",import.meta.url));
const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
const vite=await createServer({appType:"custom",configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true}});
try{
  const [english,media]=await Promise.all([vite.ssrLoadModule("/app/english.ts"),vite.ssrLoadModule("/app/media-taxonomy.ts")]);
  const fields=["id","title","provider","space","related","challenge","solution","delivery","lifecycle","origin","format","url","score","stage","additionalProviders","solutionTopics","mediaPrimary","mediaArea","relatedMediaAreas","channels","topics"];
  const knowledge=catalog.knowledge.map(item=>Object.fromEntries([...fields.filter(key=>item[key]!==undefined).map(key=>[key,item[key]]),["note",""]]));
  const publications=[];
  const companies=catalog.companies.map(company=>({...company,items:company.items.map(item=>{publications.push(item);return publications.length-1;})}));
  const translations={};const values=new Set();
  function collect(value){if(typeof value==="string")values.add(value);else if(Array.isArray(value))value.forEach(collect);else if(value&&typeof value==="object")Object.values(value).forEach(collect);}
  collect([knowledge,publications,media.mediaAreas,media.mediaChannels,media.mediaTopics,"Vorstrukturiert","Anbieterzuordnung"]);
  for(const value of [...values].sort()){const translated=english.englishText(value);if(translated!==value)translations[value]=translated;}
  const titles=new Set([...knowledge.map(item=>item.title),...publications.map(item=>item.t)]);
  const machineTitles=[...titles].filter(title=>english.machineTranslated({title})).sort();
  const audit=JSON.parse(await readFile(new URL("../app/provider-audit-remaining-20261013.json",import.meta.url),"utf8"));
  const pendingNames=audit.filter(row=>!["profiled","normalized","excluded"].includes(row.decision)).map(row=>row.name).sort();
  const strings=[],ids=new Map();
  function encode(value){
    if(typeof value==="string"){if(!ids.has(value)){ids.set(value,strings.length);strings.push(value);}return -ids.get(value)-1;}
    if(typeof value==="number"&&value<0)throw new Error("Negative source number is not supported by dictionary encoding");
    if(Array.isArray(value))return value.map(encode);
    if(value&&typeof value==="object")return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,encode(item)]));
    return value;
  }
  const payload=encode({knowledge,publications,companies,translations:Object.entries(translations),machineTitles,pendingNames});
  const output=JSON.stringify({version:1,strings,payload});
  await writeFile(new URL("../app/portal-client-data.generated.json",import.meta.url),output);
  console.log(`Compact browser index: ${knowledge.length} knowledge items, ${companies.length} providers; ${Buffer.byteLength(output)} bytes.`);
}finally{await vite.close();}

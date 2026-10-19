import {createHash} from "node:crypto";
import {mkdir,readFile,rename,writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=fileURLToPath(new URL("..",import.meta.url));
const configPath=path.join(root,"public/data/source-candidates/weka-downloads.config.json");
const statePath=path.join(root,"public/data/source-state/weka-downloads.json");
const queuePath=path.join(root,"public/data/source-review/weka-downloads.pending.json");
const baseline=process.argv.includes("--baseline");
const dryRun=process.argv.includes("--dry-run");
const today=new Date().toISOString().slice(0,10);

const config=JSON.parse(await readFile(configPath,"utf8"));
if(config.status!=="active_with_review_gate")throw new Error("WEKA-Quelle muss aktiv sein und neue URLs weiterhin durch die redaktionelle Prüfschranke führen.");

const decodeXml=value=>value.replaceAll("&amp;","&").replaceAll("&quot;",'"').replaceAll("&apos;",("'")).replaceAll("&lt;","<").replaceAll("&gt;",">");
const hash=value=>createHash("sha256").update(value).digest("hex");
const atomicJson=async(file,value)=>{
  await mkdir(path.dirname(file),{recursive:true});
  const temporary=`${file}.tmp`;
  await writeFile(temporary,`${JSON.stringify(value,null,2)}\n`);
  await rename(temporary,file);
};
const response=await fetch(config.sitemapUrl,{redirect:"follow",signal:AbortSignal.timeout(30000),headers:{"user-agent":"SmartTech-Source-Monitor/1.0"}});
if(!response.ok)throw new Error(`WEKA-Sitemap: HTTP ${response.status}`);
const xml=await response.text();
const entries=[...xml.matchAll(/<url>\s*([\s\S]*?)<\/url>/gi)].map(match=>{
  const loc=match[1].match(/<loc>\s*([^<]+?)\s*<\/loc>/i)?.[1];
  const lastmod=match[1].match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/i)?.[1]||null;
  return {url:decodeXml((loc||"").trim()),sitemapLastModified:lastmod};
}).filter(entry=>entry.url.startsWith("https://www.weka.de/"));
if(entries.length<100)throw new Error(`Unerwartet kleine WEKA-Sitemap: ${entries.length} URLs.`);
entries.sort((a,b)=>a.url.localeCompare(b.url));

let state;
try{state=JSON.parse(await readFile(statePath,"utf8"))}catch(error){if(error.code!=="ENOENT")throw error}
if(!state&&!baseline)throw new Error("Noch kein WEKA-Quellenstand vorhanden. Einmalig mit --baseline initialisieren.");

if(!state){
  const initial={version:1,sourceId:config.id,sitemapUrl:config.sitemapUrl,initializedAt:today,lastCheckedAt:today,sitemapHash:hash(entries.map(entry=>`${entry.url}|${entry.sitemapLastModified||""}`).join("\n")),knownUrls:entries.map(entry=>entry.url),counts:{sitemapUrls:entries.length,newUrls:0,candidates:0}};
  if(!dryRun)await atomicJson(statePath,initial);
  console.log(JSON.stringify({source:config.label,baselineInitialized:true,dryRun,sitemapUrls:entries.length,newUrls:0,candidates:0},null,2));
  process.exit(0);
}

const known=new Set(state.knownUrls||[]);
const newEntries=entries.filter(entry=>!known.has(entry.url));
const preferred=new Set(config.preferredSections);
const excluded=new Set(config.excludedSectionsByDefault);
const relevant=/\b(?:ki|ai|iso|audit|prozess|digital|software|cyber|datenschutz|energie|einkauf|lieferant|logistik|qualitaet|nachhalt|compliance|gefahrstoff|arbeitsschutz|produktsicherheit|elektrosicherheit|managementsystem)\b/i;
const candidates=newEntries.filter(entry=>{
  const [section="",slug=""]=new URL(entry.url).pathname.replace(/^\//,"").split("/");
  return !excluded.has(section)&&preferred.has(section)&&relevant.test(slug.replaceAll("-"," "));
}).map(entry=>({...entry,status:"pending_original_page_review",requiredChecks:config.requiredChecks}));
const queue=JSON.parse(await readFile(queuePath,"utf8"));
const items=[...new Map([...(queue.items||[]),...candidates].map(item=>[item.url,item])).values()].sort((a,b)=>a.url.localeCompare(b.url));
const nextState={...state,lastCheckedAt:today,sitemapHash:hash(entries.map(entry=>`${entry.url}|${entry.sitemapLastModified||""}`).join("\n")),knownUrls:entries.map(entry=>entry.url),counts:{sitemapUrls:entries.length,newUrls:newEntries.length,candidates:candidates.length}};
if(!dryRun){await atomicJson(statePath,nextState);await atomicJson(queuePath,{...queue,updatedAt:today,items});}
console.log(JSON.stringify({source:config.label,baselineInitialized:false,dryRun,sitemapUrls:entries.length,newUrls:newEntries.length,candidates:candidates.length,pendingTotal:items.length},null,2));

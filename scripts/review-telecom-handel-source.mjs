import {writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=fileURLToPath(new URL("..",import.meta.url));
const sitemapUrl="https://www.telecom-handel.de/sitemap";
const outputPath=path.join(root,"public/data/source-review/telecom-handel.pending.json");
const allowedSections=new Set(["business-solutions","distribution","communicate"]);
const monthNumbers={Jan:"01",Feb:"02",Mär:"03",Apr:"04",Mai:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Okt:"10",Nov:"11",Dez:"12"};

const decode=value=>value
  .replaceAll("&amp;","&")
  .replaceAll("&quot;",'"')
  .replaceAll("&#039;", "'")
  .replaceAll("&nbsp;"," ")
  .replace(/<[^>]+>/g," ")
  .replace(/\s+/g," ")
  .trim();

const publicationDate=html=>{
  const match=html.match(/m-hero-article__date[^>]*>\s*(\d{1,2})\.\s*([A-Za-zÄÖÜäöü]{3})\s*(\d{4})\s*</);
  if(!match)return null;
  const month=monthNumbers[match[2]];
  return month?`${match[3]}-${month}-${match[1].padStart(2,"0")}`:null;
};

const field=(html,name)=>{
  const json=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
  if(!json)return "";
  try{return decode(String(JSON.parse(json)[name]||""))}catch{return ""}
};

const sitemapResponse=await fetch(sitemapUrl);
if(!sitemapResponse.ok)throw new Error(`Telecom-Handel-Sitemap HTTP ${sitemapResponse.status}`);
const sitemap=await sitemapResponse.text();
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(match=>match[1])
  .filter(url=>{
    const parts=new URL(url).pathname.split("/").filter(Boolean);
    return parts[0]==="themen"&&allowedSections.has(parts[1])&&parts.length===3;
  });

const items=[];
const errors=[];
let cursor=0;
const workers=Array.from({length:16},async()=>{
  while(cursor<urls.length){
    const url=urls[cursor++];
    try{
      const response=await fetch(url);
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const html=await response.text();
      const datePublished=publicationDate(html);
      if(!datePublished?.startsWith("2026-"))continue;
      items.push({
        datePublished,
        title:field(html,"headline"),
        section:new URL(url).pathname.split("/")[2],
        url,
      });
    }catch(error){errors.push({url,error:String(error.message||error)})}
  }
});
await Promise.all(workers);
items.sort((a,b)=>b.datePublished.localeCompare(a.datePublished)||a.title.localeCompare(b.title,"de"));
await writeFile(outputPath,`${JSON.stringify({source:"Telecom Handel",sitemapUrl,reviewedAt:"2026-09-17",publicationDateBasis:"Datum auf der Artikelseite; sitemap lastmod wird nicht als Publikationsdatum verwendet",items,errors},null,2)}\n`);
console.log(JSON.stringify({source:"Telecom Handel",reviewed:urls.length,published2026:items.length,errors:errors.length,output:outputPath},null,2));

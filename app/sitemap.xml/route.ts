import {portalProfiles,portalPath} from "@/app/portal-directory";
import {catalog} from "@/app/catalog";
import {absoluteUrl,englishKnowledgePath,englishProviderPath,knowledgePath,providerPath} from "@/app/catalog-paths";
import {englishText} from "@/app/english";

function entry(url:string,lastModified:string,changeFrequency:string,priority:string){return `<url><loc>${url}</loc><lastmod>${lastModified}</lastmod><changefreq>${changeFrequency}</changefreq><priority>${priority}</priority></url>`}

export function GET(){
  const generated=catalog.generatedAt.slice(0,10);
  const urls=[
    ...["/portale","/en/portals",...portalProfiles.flatMap(portal=>[portalPath(portal.name),portalPath(portal.name,"en")])].map(path=>entry(absoluteUrl(path),generated,"weekly","0.6")),
    entry(absoluteUrl("/"),generated,"daily","1.0"),
    entry(absoluteUrl("/en"),generated,"daily","0.9"),
    ...catalog.knowledge.map(item=>entry(absoluteUrl(knowledgePath(item)),item.datePublished||generated,"monthly","0.7")),
    ...catalog.knowledge.map(item=>entry(absoluteUrl(englishKnowledgePath(item,englishText(item.title))),item.datePublished||generated,"monthly","0.7")),
    ...catalog.companies.map(provider=>entry(absoluteUrl(providerPath(provider.name)),generated,"weekly","0.6")),
    ...catalog.companies.map(provider=>entry(absoluteUrl(englishProviderPath(provider.name)),generated,"weekly","0.6")),
  ];
  const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
  return new Response(xml,{headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public, max-age=3600"}});
}

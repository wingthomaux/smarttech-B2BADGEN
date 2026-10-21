import {portalProfiles,portalPath} from "@/app/portal-directory";
import {catalog} from "@/app/catalog";
import {absoluteUrl,englishKnowledgePath,englishProviderPath,knowledgePath,providerPath} from "@/app/catalog-paths";
import pageModified from "../page-modified.json";
import {englishText} from "@/app/english";

function entry(url:string,changeFrequency:string,priority:string){const path=new URL(url).pathname;const modified=(pageModified as Record<string,string>)[path];return `<url><loc>${url}</loc>${modified?`<lastmod>${modified}</lastmod>`:""}<changefreq>${changeFrequency}</changefreq><priority>${priority}</priority></url>`}

export function GET(){
  const urls=[
    ...["wittlich","muenchen-stadt","muenchen-landkreis"].flatMap(slug=>["/region/"+slug,"/en/region/"+slug]).map(path=>entry(absoluteUrl(path),"monthly","0.6")),
    ...["/portale","/en/portals",...portalProfiles.flatMap(portal=>[portalPath(portal.name),portalPath(portal.name,"en")])].map(path=>entry(absoluteUrl(path),"weekly","0.6")),
    entry(absoluteUrl("/"),"daily","1.0"),
    entry(absoluteUrl("/en"),"daily","0.9"),
    ...["/impressum","/datenschutz","/en/imprint","/en/privacy"].map(path=>entry(absoluteUrl(path),"yearly","0.3")),
    ...catalog.knowledge.map(item=>entry(absoluteUrl(knowledgePath(item)),"monthly","0.7")),
    ...catalog.knowledge.map(item=>entry(absoluteUrl(englishKnowledgePath(item,englishText(item.title))),"monthly","0.7")),
    ...catalog.companies.map(provider=>entry(absoluteUrl(providerPath(provider.name)),"weekly","0.6")),
    ...catalog.companies.map(provider=>entry(absoluteUrl(englishProviderPath(provider.name)),"weekly","0.6")),
  ];
  const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
  return new Response(xml,{headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public, max-age=3600"}});
}

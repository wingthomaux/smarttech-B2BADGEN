"use client";

import {hasPendingProviderAudit,searchCatalog,englishText,machineTranslated} from "./portal-client-data";

import {useDeferredValue,useEffect,useMemo,useState,useSyncExternalStore} from "react";
import Link from "@/app/public-link";
import {ArrowUpRight,Building2,ChevronRight,Compass,FileSearch2,Layers3,Search,ShieldCheck,Sparkles,X} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import {Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs";
import {englishKnowledgePath,englishProviderPath,knowledgePath,providerPath} from "./catalog-paths";
import {portalProfiles} from "./portal-profiles";
import {euaigfSourcesFor} from "./euaigf-source";
import {providerFamily} from "./provider-normalization";
import type {ProviderProfile} from "./provider-profiles";
import {publicationAttribution,publicationProvider} from "./publication-attribution";
import {matchesFreeText,matchesSolutionTopic,solutionTopics} from "./solution-topics";
import weeklyUpdateData from "./weekly-update.generated.json";
import {providerAccountLabel} from "./account-owners";
import {mediaSpace,mediaDescription,mediaAreas,mediaChannels,mediaTopics,matchesMediaFilters,belongsToSpace,belongsToMediaArea} from "./media-taxonomy";
import {catalogQueryString,catalogLanguageHref,catalogQueryKeys} from "./catalog-query";
import {LanguageToggle} from "./language-toggle";

export type Publication={id:number;c:string;d:string;t:string;u:string;p:string[];r:string;s:string};
type Orientation={name:string;description:string;descriptionEn:string};
type WeeklyUpdate={currentThrough:string;previousThrough:string;providers:Array<{name:string;date:string;assetCount:number;portals:string[]}>;assets:Array<{id:number;title:string;provider:string;date:string;format:string;space:string;portals:string[];sourceUrl:string}>};
export type Pilot={id:number;title:string;provider:string;space:string;related?:string[];challenge:string;solution:string;delivery:string;lifecycle:string;origin:"Beobachtet"|"Kuratiert"|"Community";format:string;url:string;note:string;score?:number;stage?:"Vorstrukturiert"|"Priorisiert 0.2"|"Automatisch zugeordnet"|"Automatisch kuratiert"|"Redaktionell geprüft";sourcePortals?:string[];providerUrl?:string;languageVariantOf?:string;addedAt?:string;eventPeriod?:string;solutionTopics?:string[];mediaArea?:string;relatedMediaAreas?:string[];channels?:string[];topics?:string[]};

const impactSpaces:Orientation[]=[
  {name:"Unternehmen und Verwaltung",description:"Finanzen, Personal, Vertrieb, Einkauf und Zusammenarbeit",descriptionEn:"Finance, HR, sales, procurement and collaboration"},
  {name:"Produktion und Produkte",description:"Fabriken, Maschinen, Engineering, Qualität und Produktlebenszyklen",descriptionEn:"Factories, machinery, engineering, quality and product lifecycles"},
  {name:"Gebäude und Standorte",description:"Büros, Campus, Kliniken sowie Gebäude- und Sicherheitstechnik",descriptionEn:"Offices, campuses, hospitals, building systems and physical security"},
  {name:"Energie und Versorgung",description:"Erzeugung, Netze, Speicher, Wasser und Wärme",descriptionEn:"Generation, grids, storage, water and heat"},
  {name:"Natur, Landwirtschaft und Ressourcen",description:"Rohstoffe, Flächen, Kreisläufe und nachhaltige Nutzung",descriptionEn:"Raw materials, land, circular systems and sustainable use"},
  {name:"Mobilität und Logistik",description:"Fahrzeuge, Bahn, Flotten, Lager und Lieferketten",descriptionEn:"Vehicles, rail, fleets, warehouses and supply chains"},
  {name:"Gesundheit und Life Sciences",description:"Versorgung, Medizintechnik, Diagnostik und Pharma",descriptionEn:"Care delivery, medical technology, diagnostics and pharma"},
  {name:"Digitale Infrastruktur",description:"Rechenzentren, Compute, Netze, Storage und Telekommunikation",descriptionEn:"Data centres, compute, networks, storage and telecommunications"},
  {name:"Handel und Konsum",description:"Handelssysteme, Kundeninteraktion und Konsumgüter",descriptionEn:"Commerce systems, customer interaction and consumer goods"},
  {name:"Bildung und Forschung",description:"Lernen, Hochschulen, Forschung und Wissenstransfer",descriptionEn:"Learning, higher education, research and knowledge transfer"},
  {name:"Space",description:"Start, Satelliten, Geodaten, Kommunikation und Bodeninfrastruktur",descriptionEn:"Launch, satellites, geodata, communications and ground infrastructure"},
  {name:mediaSpace,description:mediaDescription.de,descriptionEn:mediaDescription.en},
];

const goals:Orientation[]=[
  {name:"Umsatz und Wachstum",description:"Neue Märkte, Kunden und Geschäftsmodelle erschließen",descriptionEn:"Develop new markets, customers and business models"},
  {name:"Kosten und Produktivität",description:"Ressourcen wirksamer einsetzen und Arbeit entlasten",descriptionEn:"Use resources more effectively and reduce workload"},
  {name:"Qualität und Geschwindigkeit",description:"Bessere Ergebnisse in kürzerer Zeit erreichen",descriptionEn:"Achieve better results in less time"},
  {name:"Sicherheit und Resilienz",description:"Risiken verringern und Betriebsfähigkeit erhalten",descriptionEn:"Reduce risk and maintain operational capability"},
  {name:"Regulierung und Transparenz",description:"Pflichten erfüllen und Entscheidungen nachvollziehbar machen",descriptionEn:"Meet obligations and make decisions traceable"},
  {name:"Personal und Fähigkeiten",description:"Wissen aufbauen, Fachkräfte unterstützen und Organisationen entwickeln",descriptionEn:"Build knowledge, support specialists and develop organisations"},
  {name:"Nachhaltigkeit und Ressourcen",description:"Energie, Material und natürliche Grundlagen verantwortungsvoll nutzen",descriptionEn:"Use energy, materials and natural resources responsibly"},
];

export {pilots} from "./pilot-data";
const subscribeNavigation=(notify:()=>void)=>{window.addEventListener("popstate",notify);return ()=>window.removeEventListener("popstate",notify)};
const publicPathPrefix=()=>window.location.pathname.startsWith("/smarttech/")||window.location.pathname==="/smarttech"?"/smarttech":"";
const uniq=<T,>(values:T[])=>Array.from(new Set(values));
const formatDate=(value:string,locale:"de"|"en"="de")=>{const [y,m,d]=value.split("-");return d&&m&&y?(locale==="en"?`${d}/${m}/${y}`:`${d}.${m}.${y}`):value};
const excludedFromProviderRankings=new Set([
  "steuerberater",
  "roland franz & partner, steuerberater",
  "frtg steuerberatungsgesellschaft",
  "zu prüfen",
]);
export const isRankedProvider=(name:string)=>!excludedFromProviderRankings.has(name.trim().toLocaleLowerCase("de-DE"))&&!hasPendingProviderAudit(name);
const weeklyUpdate=weeklyUpdateData as WeeklyUpdate;

export type TaxonomyQuery=Record<string,string|string[]|undefined>;
export default function SmartTechPortal({locale="de",taxonomyQuery={}}:{locale?:"de"|"en";taxonomyQuery?:TaxonomyQuery}){
  const initialValue=(key:string)=>{const value=taxonomyQuery[key];return typeof value==="string"?value:undefined};
  const initialSpace=impactSpaces.some(space=>space.name===initialValue("space"))?initialValue("space")!:"Produktion und Produkte";
  const initialMediaValue=(key:string,options:readonly string[])=>initialSpace===mediaSpace&&options.includes(initialValue(key)||"")?initialValue(key)!:"alle";
  const isEn=locale==="en";
  const tx=(value:string)=>isEn?englishText(value):value;
  const kPath=(item:{id:number;title:string})=>publicPrefix+(isEn?englishKnowledgePath(item,englishText(item.title)):knowledgePath(item));
  const pPath=(name:string)=>publicPrefix+(isEn?englishProviderPath(name):providerPath(name));
  const data=searchCatalog.publications;
  const [profileIndex,setProfileIndex]=useState<{names:string[];get:(name:string)=>ProviderProfile|undefined}|null>(null);
  const [query,setQuery]=useState(initialValue("q")||"");
  const searchQuery=useDeferredValue(query);
  const [activeTab,setActiveTab]=useState(["wirkungsraeume","herausforderungen","loesungen","anbieter"].includes(initialValue("tab")||"")?initialValue("tab")!:"wirkungsraeume");
  const publicPrefix=useSyncExternalStore(subscribeNavigation,publicPathPrefix,()=>"");
  const [shareMessage,setShareMessage]=useState("");
  const [shareFallback,setShareFallback]=useState("");
  const [selectedSolutionTopic,setSelectedSolutionTopic]=useState<(typeof solutionTopics)[number]["id"]|null>(solutionTopics.find(topic=>topic.id===initialValue("solutionTopic"))?.id||null);
  const activeSolutionTopic=solutionTopics.find(topic=>topic.id===selectedSolutionTopic);
  const [portal,setPortal]=useState(initialValue("portal")||"alle");
  const [selectedSpace,setSelectedSpace]=useState(initialSpace);
  const [selectedChallenge,setSelectedChallenge]=useState(goals.some(goal=>goal.name===initialValue("challenge"))?initialValue("challenge")!:"alle");
  const [selectedSolution,setSelectedSolution]=useState(initialValue("solution")||"alle");
  const [selectedDelivery,setSelectedDelivery]=useState(initialValue("delivery")||"alle");
  const [selectedLifecycle,setSelectedLifecycle]=useState(initialValue("lifecycle")||"alle");
  const [selectedMediaArea,setSelectedMediaArea]=useState(initialMediaValue("area",mediaAreas.map(area=>area.name)));
  const [selectedChannel,setSelectedChannel]=useState(initialMediaValue("channel",mediaChannels));
  const [selectedMediaTopic,setSelectedMediaTopic]=useState(initialMediaValue("topic",mediaTopics));
  const [limit,setLimit]=useState(23);
  const [providerLimit,setProviderLimit]=useState(12);
  const [knowledgeSearchLimit,setKnowledgeSearchLimit]=useState(12);
  const [knowledgeLimit,setKnowledgeLimit]=useState(23);
  const [weeklyProviderLimit,setWeeklyProviderLimit]=useState(10);
  const [weeklyAssetLimit,setWeeklyAssetLimit]=useState(9);

  useEffect(()=>{
    if(profileIndex||(!query.trim()&&!selectedSolutionTopic))return;
    let active=true;
    import("./provider-profiles").then(module=>{if(active)setProfileIndex({names:module.providerProfileNames,get:module.providerProfileFor});});
    return ()=>{active=false};
  },[query,selectedSolutionTopic,profileIndex]);
  const sharedQuery=catalogQueryString({q:query,portal,solutionTopic:selectedSolutionTopic,space:selectedSpace,challenge:selectedChallenge,solution:selectedSolution,delivery:selectedDelivery,lifecycle:selectedLifecycle,area:selectedMediaArea,channel:selectedChannel,topic:selectedMediaTopic,tab:activeTab});
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    for(const key of catalogQueryKeys)params.delete(key);
    new URLSearchParams(sharedQuery).forEach((value,key)=>params.set(key,value));
    const search=params.toString();
    const next=window.location.pathname+(search?"?"+search:"")+window.location.hash;
    if(next!==window.location.pathname+window.location.search+window.location.hash)window.history.replaceState(window.history.state,"",next);
  },[sharedQuery]);
  const shareSearch=async()=>{
    const url=new URL(window.location.href);url.search=sharedQuery;
    try{await navigator.clipboard.writeText(url.href);setShareMessage(isEn?"Link copied":"Link kopiert");setShareFallback("");}
    catch{setShareFallback(url.href);setShareMessage(isEn?"Select and copy the link":"Link markieren und kopieren");}
  };
  useEffect(()=>{
    if(!data.length||window.location.hash!=="#pilot")return;
    const params=new URLSearchParams(window.location.search);
    const space=params.get("space");
    if(!space||!impactSpaces.some(entry=>entry.name===space))return;
    const challenge=params.get("challenge");
    const solution=params.get("solution");
    const delivery=params.get("delivery");
    const lifecycle=params.get("lifecycle");
    const frame=requestAnimationFrame(()=>{
      setSelectedSpace(space);
      setSelectedChallenge(challenge&&goals.some(goal=>goal.name===challenge)?challenge:"alle");
      setSelectedSolution(solution||"alle");
      setSelectedDelivery(delivery||"alle");
      setSelectedLifecycle(lifecycle||"alle");
      const area=params.get("area"),channel=params.get("channel"),topic=params.get("topic");
      setSelectedMediaArea(space===mediaSpace&&area&&mediaAreas.some(entry=>entry.name===area)?area:"alle");
      setSelectedChannel(space===mediaSpace&&channel&&mediaChannels.some(entry=>entry===channel)?channel:"alle");
      setSelectedMediaTopic(space===mediaSpace&&topic&&mediaTopics.some(entry=>entry===topic)?topic:"alle");
      setKnowledgeLimit(23);
      requestAnimationFrame(()=>document.getElementById("pilot")?.scrollIntoView({block:"start"}));
    });
    return ()=>cancelAnimationFrame(frame);
  },[data.length]);
  const knowledgeItems=searchCatalog.knowledge;
  const reviewedKnowledgeCount=useMemo(()=>knowledgeItems.filter(item=>item.stage==="Redaktionell geprüft").length,[knowledgeItems]);
  const pendingKnowledgeQaCount=knowledgeItems.length-reviewedKnowledgeCount;
  const portals=useMemo(()=>uniq(data.flatMap(item=>item.p)).sort(),[data]);
  const companies=searchCatalog.companies;
  const rankedCompanies=useMemo(()=>companies.filter(entry=>isRankedProvider(entry.name)),[companies]);
  const knowledgeByUrl=useMemo(()=>new Map(knowledgeItems.map(item=>[item.url,item] as const)),[knowledgeItems]);
  const filtered=useMemo(()=>{
    return data.filter(item=>(activeSolutionTopic?!!knowledgeByUrl.get(item.u)&&matchesSolutionTopic(knowledgeByUrl.get(item.u)!,activeSolutionTopic):matchesFreeText(`${providerAccountLabel(publicationProvider(item))} ${item.c} ${item.t} ${englishText(item.t)}`,searchQuery))&&(portal==="alle"||item.p.includes(portal)));
  },[data,searchQuery,portal,knowledgeByUrl,activeSolutionTopic]);
  const matchingProviders=useMemo(()=>{
    const term=searchQuery.trim();
    if(!term&&!activeSolutionTopic)return [];
    const indexed=new Map(companies.map(entry=>[entry.name,entry] as const));
    // Only currently published canonical entities belong in company search.
    // Historical profile keys can survive a source-name correction.
    return [...indexed.values()].filter(entry=>{
      if(activeSolutionTopic)return entry.knowledge.some(item=>matchesSolutionTopic(item,activeSolutionTopic));
      const profile=profileIndex?.get(entry.name);
      const fields=[entry.name,providerAccountLabel(entry.name),...entry.variants];
      if(profile)fields.push(profile.summary[locale],...profile.focus[locale],...profile.buyerGroups[locale]);
      return fields.some(value=>matchesFreeText(value,term));
    }).sort((a,b)=>{
      if(activeSolutionTopic)return b.knowledge.filter(item=>matchesSolutionTopic(item,activeSolutionTopic)).length-a.knowledge.filter(item=>matchesSolutionTopic(item,activeSolutionTopic)).length||a.name.localeCompare(b.name,locale);
      const aName=matchesFreeText(a.name,term)?1:0;
      const bName=matchesFreeText(b.name,term)?1:0;
      return bName-aName||Number(!!profileIndex?.get(b.name))-Number(!!profileIndex?.get(a.name))||b.items.length-a.items.length||a.name.localeCompare(b.name,locale);
    });
  },[companies,searchQuery,locale,profileIndex,activeSolutionTopic]);
  const exactProvider=!activeSolutionTopic&&matchingProviders.find(entry=>entry.name.toLocaleLowerCase(locale)===query.trim().toLocaleLowerCase(locale));
  const matchingKnowledge=useMemo(()=>{
    const term=searchQuery.trim();
    if(activeSolutionTopic)return knowledgeItems.filter(item=>matchesSolutionTopic(item,activeSolutionTopic));
    if(!term)return [];
    return knowledgeItems.filter(item=>[item.provider,...(item.additionalProviders||[]),item.title,item.solution,item.mediaArea||"",...(item.relatedMediaAreas||[]),...(item.channels||[]),...(item.topics||[]),englishText(item.title)].some(value=>matchesFreeText(value,term)));
  },[knowledgeItems,searchQuery,activeSolutionTopic]);
  const filteredKnowledge=useMemo(()=>knowledgeItems.filter(item=>belongsToSpace(item,selectedSpace)&&(selectedChallenge==="alle"||item.challenge===selectedChallenge)&&(selectedSolution==="alle"||item.solution===selectedSolution)&&(selectedDelivery==="alle"||item.delivery===selectedDelivery)&&(selectedLifecycle==="alle"||item.lifecycle===selectedLifecycle)&&(selectedSpace!==mediaSpace||matchesMediaFilters(item,selectedMediaArea,selectedChannel,selectedMediaTopic))),[knowledgeItems,selectedSpace,selectedChallenge,selectedSolution,selectedDelivery,selectedLifecycle,selectedMediaArea,selectedChannel,selectedMediaTopic]);
  const jumpToResults=()=>document.getElementById(isEn?"catalogue":"katalog")?.scrollIntoView({behavior:"smooth",block:"start"});
  const chooseSolutionTopic=(id:(typeof solutionTopics)[number]["id"])=>{setSelectedSolutionTopic(id);setQuery("");setPortal("alle");setLimit(23);setProviderLimit(12);setKnowledgeSearchLimit(12);setTimeout(jumpToResults,0)};
  const clearTaxonomyFilters=()=>{setSelectedChallenge("alle");setSelectedSolution("alle");setSelectedDelivery("alle");setSelectedLifecycle("alle");setSelectedMediaArea("alle");setSelectedChannel("alle");setSelectedMediaTopic("alle");setKnowledgeLimit(23)};
  const chooseSpace=(value:string)=>{if(!impactSpaces.some(space=>space.name===value))return;setSelectedSpace(value);clearTaxonomyFilters();setTimeout(()=>document.getElementById("pilot")?.scrollIntoView({behavior:"smooth"}),0)};
  const chooseChallenge=(value:string)=>{setSelectedChallenge(value);setKnowledgeLimit(23);const first=knowledgeItems.find(item=>item.challenge===value);if(first)setSelectedSpace(first.space);setTimeout(()=>document.getElementById("pilot")?.scrollIntoView({behavior:"smooth"}),0)};
  const reset=()=>{setQuery("");setSelectedSolutionTopic(null);setPortal("alle");setLimit(23);setProviderLimit(12);setKnowledgeSearchLimit(12)};

  return <main className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Link href={catalogLanguageHref(locale,"",publicPrefix)} className="flex items-center gap-3" aria-label={isEn?"SmartTech home":"SmartTech Startseite"}>
          <span className="grid size-8 place-items-center bg-primary text-xs font-black text-primary-foreground">ST</span>
          <span className="font-semibold">SmartTech</span>
          <span className="hidden border-l pl-3 text-sm text-muted-foreground sm:block">{isEn?"Technology knowledge for investment":"Technologiewissen für Investitionen"}</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} href={catalogLanguageHref(isEn?"de":"en",sharedQuery,publicPrefix)}/>
        </div>
      </div>
    </header>

    <section id="start" className="border-b bg-[linear-gradient(115deg,#eef4ff_0%,#fbfcfe_54%,#effbff_100%)]">
      <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker">{isEn?"Open market overview":"Offene Marktübersicht"}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-.035em] sm:text-4xl">{isEn?"What do you want to change or procure?":"Was möchten Sie verändern oder beschaffen?"}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">{isEn?"Search by challenge, solution, provider or a specific term.":"Suche nach einer Herausforderung, einer Lösung, einem Anbieter oder einem konkreten Begriff."}</p>
          </div>
          <div>
            <form onSubmit={event=>{event.preventDefault();jumpToResults()}}>
              <div className="relative shadow-[0_18px_60px_rgba(21,94,239,.12)]">
                <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-primary"/>
                <Input aria-label={isEn?"Search SmartTech":"SmartTech durchsuchen"} value={query} onChange={event=>{setSelectedSolutionTopic(null);setQuery(event.target.value);setLimit(23);setProviderLimit(12);setKnowledgeSearchLimit(12)}} placeholder={isEn?"For example: downtime, Zero Trust, Digital Twin, Akamai …":"Zum Beispiel: Produktionsausfall, Zero Trust, Digital Twin, Akamai …"} className="h-16 rounded-none border-primary/30 bg-white pl-14 pr-12 text-base shadow-none"/>
                {query&&<button type="button" aria-label={isEn?"Clear search":"Suche leeren"} onClick={()=>setQuery("")} className="absolute right-4 top-1/2 grid size-8 -translate-y-1/2 place-items-center text-muted-foreground hover:text-foreground"><X className="size-4"/></button>}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3"><Button variant="outline" size="sm" onClick={shareSearch}>{isEn?"Share search":"Suche teilen"}</Button><span role="status" aria-live="polite" className="text-xs text-muted-foreground">{shareMessage}</span></div>
              {shareFallback&&<Input aria-label={isEn?"Link to this search":"Link zu dieser Suche"} readOnly value={shareFallback} onFocus={event=>event.currentTarget.select()} className="mt-2"/>}
              {query.trim()&&<a href={isEn?"#catalogue":"#katalog"} onClick={event=>{event.preventDefault();jumpToResults()}} className="mt-3 flex min-h-11 items-center justify-between gap-3 border border-primary/25 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"><span>{matchingProviders.length.toLocaleString(isEn?"en-GB":"de-DE")} {isEn?matchingProviders.length===1?"company profile":"company profiles":matchingProviders.length===1?"Unternehmensprofil":"Unternehmensprofile"} · {matchingKnowledge.length.toLocaleString(isEn?"en-GB":"de-DE")} {isEn?"knowledge items":"Wissensobjekte"} · {filtered.length.toLocaleString(isEn?"en-GB":"de-DE")} {isEn?"publications":"Publikationen"} {isEn?"view":"ansehen"}</span><ChevronRight className="size-4 shrink-0 rotate-90"/></a>}
              {exactProvider&&<Link href={pPath(exactProvider.name)} className="mt-3 block border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm hover:bg-primary/10"><span className="text-xs font-semibold uppercase tracking-wide text-primary">{isEn?"Direct company match":"Direkter Unternehmenstreffer"}</span><strong className="mt-1 block">{providerAccountLabel(exactProvider.name)} →</strong><span className="mt-1 block text-muted-foreground">{profileIndex?.get(exactProvider.name)?.summary[locale]||euaigfSourcesFor(exactProvider.name)[0]?.context[locale]||(isEn?"Open company profile":"Unternehmensprofil öffnen")}</span></Link>}
            </form>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span><strong className="text-foreground">{data.length.toLocaleString(isEn?"en-GB":"de-DE")}</strong> {isEn?"observed publications":"beobachtete Publikationen"}</span>
              <span><strong className="text-foreground">{companies.length.toLocaleString(isEn?"en-GB":"de-DE")}</strong> {isEn?"normalised providers":"normalisierte Anbieter"}</span>
              <Link href={publicPrefix+(isEn?"/en/portals":"/portale")} className="hover:text-primary hover:underline"><strong className="text-foreground">{portalProfiles.length}</strong> {isEn?"portals":"Portale"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {isEn&&<section className="border-b bg-primary/5"><div className="mx-auto max-w-[1440px] px-5 py-4 text-sm leading-6 text-muted-foreground lg:px-10"><strong className="text-foreground">Translation notice:</strong> German catalogue text is translated automatically. Content that is already published in English retains its original title. The directly linked original source remains authoritative.</div></section>}

    <section id="neu" className="scroll-mt-20 border-b bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-kicker flex items-center gap-2"><Sparkles className="size-4"/>{isEn?"New since last update":"Neu seit dem letzten Update"}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{isEn?"New company profiles and knowledge items":"Neue Unternehmensprofile und Wissensobjekte"}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{isEn?<>Catalogue snapshot from {formatDate(weeklyUpdate.currentThrough,"en")} compared with {formatDate(weeklyUpdate.previousThrough,"en")}. New profiles include editorially documented project participants; knowledge items are counted separately. The date on each item is its catalogue capture date, not necessarily its publication date.</>:<>Katalogstand vom {formatDate(weeklyUpdate.currentThrough)} im Vergleich zum {formatDate(weeklyUpdate.previousThrough)}. Neue Profile umfassen auch redaktionell dokumentierte Projektbeteiligte; Wissensobjekte werden getrennt gezählt. Das Datum bezeichnet die Erfassung im Katalog, nicht zwingend die Veröffentlichung.</>}</p>
        </div>

        <div className="mt-7 space-y-8">
          <section aria-labelledby="new-providers-title" className="border">
            <h3 id="new-providers-title" className="border-b bg-white px-5 py-4 text-lg font-semibold">{weeklyUpdate.providers.length} {isEn?"new company profiles":"neue Unternehmensprofile"}</h3>
            <p className="border-b bg-white px-5 py-3 text-sm text-muted-foreground">{isEn?"Latest additions first. Show all to browse the full comparison period.":"Neueste Ergänzungen zuerst. Über Alle anzeigen finden Sie den gesamten Vergleichszeitraum."}</p>
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {weeklyUpdate.providers.slice(0,weeklyProviderLimit).map(entry=><Link key={entry.name} href={pPath(entry.name)} className="group flex min-h-32 flex-col justify-between bg-background p-5 transition hover:bg-white">
                <div className="flex items-start justify-between gap-4"><Badge variant="outline" className="rounded-none border-primary/20 bg-primary/5 text-primary">{isEn?"New":"Neu"}</Badge><ChevronRight className="size-4 text-muted-foreground group-hover:text-primary"/></div>
                <div className="mt-5"><h4 className="font-semibold leading-6">{providerAccountLabel(entry.name)}</h4><p className="mt-1 text-sm text-muted-foreground">{entry.assetCount?`${entry.assetCount} ${isEn?entry.assetCount===1?"new knowledge item":"new knowledge items":entry.assetCount===1?"neues Wissensobjekt":"neue Wissensobjekte"}`:(isEn?"Editorial project reference":"Redaktioneller Projektbezug")} · {portalCount(entry.portals.length,locale)}</p></div>
              </Link>)}
            </div>
            {weeklyProviderLimit<weeklyUpdate.providers.length&&<div className="border-t p-5 text-center"><Button variant="outline" onClick={()=>setWeeklyProviderLimit(weeklyUpdate.providers.length)} className="rounded-none">{isEn?`Show all ${weeklyUpdate.providers.length} new company profiles`:`Alle ${weeklyUpdate.providers.length} neuen Unternehmensprofile anzeigen`}</Button></div>}
          </section>
          <section aria-labelledby="new-knowledge-title" className="border">
            <h3 id="new-knowledge-title" className="border-b bg-white px-5 py-4 text-lg font-semibold">{weeklyUpdate.assets.length} {isEn?"new knowledge items":"neue Wissensobjekte"}</h3>
            <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
              {weeklyUpdate.assets.length===0&&<p className="bg-background p-5 text-sm text-muted-foreground md:col-span-2 xl:col-span-3">{isEn?"No new knowledge items have been added since the comparison date.":"Seit dem Vergleichsstand wurden noch keine neuen Wissensobjekte aufgenommen."}</p>}{weeklyUpdate.assets.slice(0,weeklyAssetLimit).map(item=><article key={item.id} className="group flex min-h-48 flex-col bg-background p-5">
                <div className="flex flex-wrap items-center justify-between gap-2"><Badge variant="outline" className="rounded-none border-primary/20 bg-primary/5 text-primary">{isEn?"New":"Neu"}</Badge><span className="text-xs text-muted-foreground">{isEn?"Captured ":"Erfasst "}{formatDate(item.date,locale)}</span></div>
                <div className="mt-4"><Link href={pPath(item.provider)} className="text-xs font-semibold uppercase tracking-[.08em] text-primary hover:underline">{providerAccountLabel(item.provider)}</Link><h4 className="mt-1 text-base font-medium leading-6"><Link href={kPath(item)} className="hover:text-primary hover:underline">{tx(item.title)}</Link></h4>{isEn&&machineTranslated(item)&&<span className="mt-1 block text-xs text-muted-foreground">Machine translated</span>}</div>
                <div className="mt-auto flex items-end justify-between gap-3 pt-4"><p className="text-xs leading-5 text-muted-foreground">{tx(item.format)}<br/>{item.portals.join(" · ")}</p><a href={item.sourceUrl} target="_blank" rel="noreferrer" aria-label={isEn?`Open original source: ${item.title}`:`Originalquelle öffnen: ${item.title}`} className="grid size-10 shrink-0 place-items-center border transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="size-4"/></a></div>
              </article>)}
            </div>
            {weeklyAssetLimit<weeklyUpdate.assets.length&&<div className="border-t p-5 text-center"><Button variant="outline" onClick={()=>setWeeklyAssetLimit(weeklyUpdate.assets.length)} className="rounded-none">{isEn?`Show all ${weeklyUpdate.assets.length} new knowledge items`:`Alle ${weeklyUpdate.assets.length} neuen Wissensobjekte anzeigen`}</Button></div>}
          </section>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-10 lg:px-10">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-none border bg-transparent p-0 md:grid-cols-4">
          <TabsTrigger value="herausforderungen" className="h-12 rounded-none border-r text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{isEn?"Challenges":"Herausforderungen"}</TabsTrigger>
          <TabsTrigger value="loesungen" className="h-12 rounded-none border-r text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{isEn?"Solutions":"Lösungen"}</TabsTrigger>
          <TabsTrigger value="wirkungsraeume" className="h-12 rounded-none border-r text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{isEn?"Impact areas":"Wirkungsräume"}</TabsTrigger>
          <TabsTrigger value="anbieter" className="h-12 rounded-none text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{isEn?"Providers":"Anbieter"}</TabsTrigger>
        </TabsList>

        <TabsContent value="wirkungsraeume" className="mt-8">
          <SectionIntro kicker={isEn?`${impactSpaces.length} impact areas`:`${impactSpaces.length} Wirkungsräume`} title={isEn?"Where should a solution have an impact?":"Wo soll eine Lösung wirken?"} text={isEn?"Impact areas describe real systems. They are more stable than trends and broader than individual industries.":"Wirkungsräume beschreiben reale Systeme. Sie sind stabiler als Modetrends und breiter als einzelne Branchen."}/>
          <div className="mt-7 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {impactSpaces.map((space,index)=>{const count=knowledgeItems.filter(item=>belongsToSpace(item,space.name)).length;return <button key={space.name} onClick={()=>chooseSpace(space.name)} disabled={!count} className="group min-h-36 bg-background p-5 text-left transition enabled:hover:bg-white disabled:cursor-default">
              <div className="flex items-start justify-between"><span className="font-mono text-xs text-primary">{String(index+1).padStart(2,"0")}</span><Compass className="size-4 text-muted-foreground transition group-hover:text-primary"/></div>
              <h3 className="mt-5 text-base font-semibold">{tx(space.name)}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{isEn?space.descriptionEn:space.description}</p>
              <p className="mt-3 text-xs font-medium text-primary">{count?(isEn?`${count} classified`:`${count} eingeordnet`):(isEn?"coming soon":"folgt")}</p>
            </button>})}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{isEn?`${knowledgeItems.length.toLocaleString("en-GB")} knowledge items are classified. ${reviewedKnowledgeCount.toLocaleString("en-GB")} have been editorially reviewed; ${pendingKnowledgeQaCount.toLocaleString("en-GB")} still require staged quality assurance or a status decision.`:`${knowledgeItems.length.toLocaleString("de-DE")} Wissensobjekte sind eingeordnet. ${reviewedKnowledgeCount.toLocaleString("de-DE")} sind redaktionell geprüft; ${pendingKnowledgeQaCount.toLocaleString("de-DE")} benötigen noch eine abgestufte Qualitätssicherung oder Statusentscheidung.`}</p>
        </TabsContent>

        <TabsContent value="herausforderungen" className="mt-8">
          <SectionIntro kicker={isEn?"7 objectives":"7 Ziele"} title={isEn?"Why is a solution needed?":"Warum wird eine Lösung gesucht?"} text={isEn?"The buyer’s situation comes before product names and technologies.":"Die Ausgangslage eines Käufers steht vor Produktnamen und Technologien."}/>
          <div className="mt-7 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal,index)=><button key={goal.name} onClick={()=>chooseChallenge(goal.name)} className="group min-h-32 bg-background p-5 text-left hover:bg-white"><span className="font-mono text-xs text-primary">{String(index+1).padStart(2,"0")}</span><h3 className="mt-4 font-semibold">{tx(goal.name)}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{isEn?goal.descriptionEn:goal.description}</p><p className="mt-3 text-xs font-medium text-primary">{knowledgeItems.filter(item=>item.challenge===goal.name).length} {isEn?"classified":"zugeordnet"}</p></button>)}
          </div>
        </TabsContent>

        <TabsContent value="loesungen" className="mt-8">
          <SectionIntro kicker={isEn?"Purchasable solutions":"Kaufbare Lösungen"} title={isEn?"What can be deployed?":"Was kann konkret eingesetzt werden?"} text={isEn?"A solution must be purchasable, licensable, integrable or self-hostable. Cloud is a delivery method, not a solution category.":"Eine Lösung muss kaufbar, lizenzierbar, integrierbar oder selbst betreibbar sein. Cloud ist dabei ein Lieferweg, keine Lösungskategorie."}/>
          <div className="mt-7 border">
            <div className="border-b bg-muted/60 px-5 py-3 text-sm font-medium">{isEn?"Editorial entry points into the current inventory":"Redaktionelle Einstiege in den aktuellen Bestand"}</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {solutionTopics.map((topic,index)=><button key={topic.id} onClick={()=>chooseSolutionTopic(topic.id)} className="group flex min-h-20 items-center justify-between gap-3 border-b border-r px-5 text-left text-sm font-medium hover:bg-primary hover:text-primary-foreground"><span>{String(index+1).padStart(2,"0")} · {isEn?topic.en:topic.de}<span className="mt-1 block text-xs font-normal text-muted-foreground group-hover:text-primary-foreground">{knowledgeItems.filter(item=>matchesSolutionTopic(item,topic)).length.toLocaleString(isEn?"en-GB":"de-DE")} {isEn?"knowledge items":"Wissensobjekte"}</span></span><ChevronRight className="size-4 shrink-0"/></button>)}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{isEn?"Counts reflect title and offering matches in the current inventory. Entries may overlap; each item retains its original classification.":"Die Zahlen zeigen Treffer aus Titel und Angebot im aktuellen Bestand. Einstiege können sich überschneiden; die ursprüngliche Einordnung jedes Objekts bleibt erhalten."}</p>
        </TabsContent>

        <TabsContent value="anbieter" className="mt-8">
          <SectionIntro kicker={isEn?"Provider families":"Anbieterfamilien"} title={isEn?"Who publishes about which offerings?":"Wer veröffentlicht zu welchen Angeboten?"} text={isEn?"Legal name variants and unambiguous country entities are consolidated. The ranking reflects publication activity, not market size, quality or endorsement.":"Rechtliche Schreibvarianten und eindeutige Landesgesellschaften sind zusammengeführt. Die Rangfolge zeigt Publikationsaktivität, nicht Marktgröße, Qualität oder Empfehlung."}/>
          <div className="mt-7 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {rankedCompanies.slice(0,11).map((entry,index)=><Link key={entry.name} href={pPath(entry.name)} className="group flex min-h-24 items-center gap-4 bg-background p-5 text-left hover:bg-white"><span className="font-mono text-xs text-primary">{String(index+1).padStart(2,"0")}</span><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{providerAccountLabel(entry.name)}</strong><span className="mt-1 block text-sm text-muted-foreground">{entry.items.length} {isEn?"publications":"Publikationen"} · {portalCount(entry.portals.length,locale)}{entry.knowledge.length?(isEn?` · ${entry.knowledge.length} classified`:` · ${entry.knowledge.length} eingeordnet`):""}</span></span><ChevronRight className="size-4 text-muted-foreground group-hover:text-primary"/></Link>)}
          </div>
        </TabsContent>
      </Tabs>
    </section>

    <section id="pilot" className="scroll-mt-20 border-t bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10">
        <div className="grid gap-6 md:grid-cols-[.75fr_1.25fr] md:items-end">
          <div><p className="section-kicker">{isEn?"Taxonomy":"Taxonomie"} · {knowledgeItems.filter(item=>belongsToSpace(item,selectedSpace)).length} {isEn?"knowledge items":"Wissensobjekte"}</p><h2 className="mt-2 text-2xl font-semibold">{tx(selectedSpace)}</h2></div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{isEn?<>All {data.length.toLocaleString("en-GB")} observed content pieces are now classified within the SmartTech structure. {knowledgeItems.filter(item=>item.stage==="Redaktionell geprüft").length.toLocaleString("en-GB")} offerings have been editorially reviewed; all other classifications remain transparently marked as automatic pending quality assurance. The 77 reference items and additional curated sources are retained.</>:<>Alle {data.length.toLocaleString("de-DE")} beobachteten Content Pieces sind jetzt in die SmartTech-Struktur eingeordnet. {knowledgeItems.filter(item=>item.stage==="Redaktionell geprüft").length.toLocaleString("de-DE")} Angebote sind redaktionell geprüft; alle übrigen Zuordnungen sind bis zur späteren Qualitätssicherung transparent als automatisch markiert. Die 77 Referenzobjekte und zusätzliche kuratierte Quellen bleiben erhalten.</>}</p>
        </div>
        <div className="mt-7 flex flex-col justify-between gap-3 md:flex-row md:items-center"><div className="flex flex-wrap gap-2">{impactSpaces.map(entry=>entry.name).map(space=><Button key={space} variant={selectedSpace===space?"default":"outline"} onClick={()=>chooseSpace(space)} className="rounded-none">{tx(space)}<Badge variant="secondary" className="ml-1 rounded-none">{knowledgeItems.filter(item=>belongsToSpace(item,space)).length}</Badge></Button>)}</div><Select value={selectedChallenge} onValueChange={value=>{setSelectedChallenge(value);setKnowledgeLimit(23)}}><SelectTrigger className="h-10 w-full rounded-none bg-white md:w-64"><SelectValue>{selectedChallenge==="alle"?(isEn?"All challenges":"Alle Herausforderungen"):tx(selectedChallenge)}</SelectValue></SelectTrigger><SelectContent><SelectItem value="alle">{isEn?"All challenges":"Alle Herausforderungen"}</SelectItem>{goals.map(goal=><SelectItem key={goal.name} value={goal.name}>{tx(goal.name)}</SelectItem>)}</SelectContent></Select></div>
        {selectedSpace===mediaSpace&&<div className="mt-7" aria-label={isEn?"Media areas and filters":"Medienbereiche und Filter"}>
          <p className="text-sm leading-6 text-muted-foreground">{isEn?mediaDescription.en:mediaDescription.de}. {isEn?"Classification follows the subject and use case of the content.":"Die Zuordnung folgt dem Thema und Einsatzfall des Inhalts."}</p>
          <div className="mt-5 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {mediaAreas.map(area=>{const count=knowledgeItems.filter(item=>belongsToSpace(item,mediaSpace)&&belongsToMediaArea(item,area.name)).length;return <button key={area.name} type="button" aria-pressed={selectedMediaArea===area.name} onClick={()=>{setSelectedMediaArea(value=>value===area.name?"alle":area.name);setKnowledgeLimit(23)}} className={`p-4 text-left transition hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary ${selectedMediaArea===area.name?"bg-primary/10":"bg-background"}`}>
              <h3 className="text-sm font-semibold">{isEn?area.nameEn:area.name}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{isEn?area.descriptionEn:area.description}</p><p className="mt-3 text-xs font-medium text-primary">{count?`${count} ${isEn?"classified":"eingeordnet"}`:isEn?"No items classified yet":"Noch keine Inhalte zugeordnet"}</p>
            </button>})}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Select value={selectedMediaArea} onValueChange={value=>{setSelectedMediaArea(value);setKnowledgeLimit(23)}}><SelectTrigger aria-label={isEn?"Media area":"Medienbereich"} className="w-full rounded-none bg-white"><SelectValue>{selectedMediaArea==="alle"?(isEn?"All media areas":"Alle Medienbereiche"):tx(selectedMediaArea)}</SelectValue></SelectTrigger><SelectContent><SelectItem value="alle">{isEn?"All media areas":"Alle Medienbereiche"}</SelectItem>{mediaAreas.map(area=><SelectItem key={area.name} value={area.name}>{isEn?area.nameEn:area.name}</SelectItem>)}</SelectContent></Select>
            <Select value={selectedChannel} onValueChange={value=>{setSelectedChannel(value);setKnowledgeLimit(23)}}><SelectTrigger aria-label={isEn?"Channel":"Kanal"} className="w-full rounded-none bg-white"><SelectValue>{selectedChannel==="alle"?(isEn?"All channels":"Alle Kanäle"):tx(selectedChannel)}</SelectValue></SelectTrigger><SelectContent><SelectItem value="alle">{isEn?"All channels":"Alle Kanäle"}</SelectItem>{mediaChannels.map(channel=><SelectItem key={channel} value={channel}>{tx(channel)}</SelectItem>)}</SelectContent></Select>
            <Select value={selectedMediaTopic} onValueChange={value=>{setSelectedMediaTopic(value);setKnowledgeLimit(23)}}><SelectTrigger aria-label={isEn?"Cross-cutting topic":"Querschnittsthema"} className="w-full rounded-none bg-white"><SelectValue>{selectedMediaTopic==="alle"?(isEn?"All cross-cutting topics":"Alle Querschnittsthemen"):tx(selectedMediaTopic)}</SelectValue></SelectTrigger><SelectContent><SelectItem value="alle">{isEn?"All cross-cutting topics":"Alle Querschnittsthemen"}</SelectItem>{mediaTopics.map(topic=><SelectItem key={topic} value={topic}>{tx(topic)}</SelectItem>)}</SelectContent></Select>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">{isEn?"Channel filters describe the use case, not the website where a source was published. Knowledge items may appear in several media areas. Areas without classified content remain visible.":"Kanalfilter beschreiben den Einsatzfall, nicht den Veröffentlichungsort einer Quelle. Wissensobjekte können mehreren Medienbereichen zugeordnet sein. Bereiche ohne zugeordnete Inhalte bleiben sichtbar."}</p>
        </div>}
        {(selectedSolution!=="alle"||selectedDelivery!=="alle"||selectedLifecycle!=="alle"||selectedMediaArea!=="alle"||selectedChannel!=="alle"||selectedMediaTopic!=="alle")&&<div className="mt-6 flex flex-wrap items-center gap-2 text-sm" aria-label={isEn?"Active taxonomy filters":"Aktive Taxonomiefilter"}>
          <span className="mr-1 text-muted-foreground">{filteredKnowledge.length} {isEn?"matching knowledge items":"passende Wissensobjekte"}</span>
          {selectedSolution!=="alle"&&<Button variant="outline" size="sm" className="h-auto whitespace-normal rounded-none py-1 text-left" onClick={()=>{setSelectedSolution("alle");setKnowledgeLimit(23)}} aria-label={isEn?"Remove solution filter":"Filter Kaufbare Lösung entfernen"}>{isEn?"Solution":"Kaufbare Lösung"}: {tx(selectedSolution)} ×</Button>}
          {selectedDelivery!=="alle"&&<Button variant="outline" size="sm" className="h-auto whitespace-normal rounded-none py-1 text-left" onClick={()=>{setSelectedDelivery("alle");setKnowledgeLimit(23)}} aria-label={isEn?"Remove delivery filter":"Filter Bereitstellung entfernen"}>{isEn?"Delivery":"Bereitstellung"}: {tx(selectedDelivery)} ×</Button>}
          {selectedLifecycle!=="alle"&&<Button variant="outline" size="sm" className="h-auto whitespace-normal rounded-none py-1 text-left" onClick={()=>{setSelectedLifecycle("alle");setKnowledgeLimit(23)}} aria-label={isEn?"Remove lifecycle filter":"Filter Lebenszyklus entfernen"}>{isEn?"Lifecycle":"Lebenszyklus"}: {tx(selectedLifecycle)} ×</Button>}
          {selectedMediaArea!=="alle"&&<Button variant="outline" size="sm" className="rounded-none" onClick={()=>{setSelectedMediaArea("alle");setKnowledgeLimit(23)}}>{isEn?"Media area":"Medienbereich"}: {tx(selectedMediaArea)} ×</Button>}
          {selectedChannel!=="alle"&&<Button variant="outline" size="sm" className="rounded-none" onClick={()=>{setSelectedChannel("alle");setKnowledgeLimit(23)}}>{isEn?"Channel":"Kanal"}: {tx(selectedChannel)} ×</Button>}
          {selectedMediaTopic!=="alle"&&<Button variant="outline" size="sm" className="rounded-none" onClick={()=>{setSelectedMediaTopic("alle");setKnowledgeLimit(23)}}>{isEn?"Topic":"Thema"}: {tx(selectedMediaTopic)} ×</Button>}

        </div>}
        <div className="mt-7 grid gap-px bg-border lg:grid-cols-2">
          {filteredKnowledge.slice(0,knowledgeLimit).map(item=><Link key={item.id} href={kPath(item)} className="group bg-background p-6 text-left transition hover:bg-white">
            <div className="flex items-center justify-between"><div className="flex gap-2"><Badge variant={item.origin==="Kuratiert"?"default":"outline"} className="rounded-none">{tx(item.origin)}</Badge>{item.stage&&<Badge variant="secondary" className="rounded-none">{tx(item.stage)}{item.score?` · ${item.score}`:""}</Badge>}</div><span className="text-xs text-muted-foreground">{tx(item.format)}</span></div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[.08em] text-primary">{providerAccountLabel(item.provider)}</p><h3 className="mt-2 text-lg font-semibold leading-7">{tx(item.title)}</h3>{isEn&&machineTranslated(item)&&<span className="mt-1 block text-xs text-muted-foreground">Machine translated</span>}
            <div className="mt-5 grid gap-2 border-t pt-4 text-sm sm:grid-cols-2"><p><span className="text-muted-foreground">{isEn?"Challenge":"Herausforderung"}:</span><br/>{tx(item.challenge)}</p><p><span className="text-muted-foreground">{isEn?"Solution":"Lösung"}:</span><br/>{tx(item.solution)}</p></div>
            <p className="mt-5 flex items-center justify-end gap-1 text-sm font-medium text-primary">{isEn?"View classification":"Einordnung ansehen"} <ChevronRight className="size-4"/></p>
          </Link>)}
        </div>
        {knowledgeLimit<filteredKnowledge.length&&<div className="border-t pt-6 text-center"><Button variant="outline" onClick={()=>setKnowledgeLimit(value=>value+23)} className="rounded-none">{isEn?"Show 23 more knowledge items":"Weitere 23 Wissensobjekte anzeigen"}</Button></div>}
        {!filteredKnowledge.length&&<div className="mt-7 border bg-muted/50 p-8 text-center"><p className="font-medium">{isEn?"No knowledge item is classified for this combination yet.":"Für diese Kombination ist noch kein Wissensobjekt eingeordnet."}</p><Button variant="link" onClick={clearTaxonomyFilters}>{isEn?"Show all knowledge items":"Alle Wissensobjekte anzeigen"}</Button></div>}
      </div>
    </section>

    <section className="border-y bg-slate-950 text-white">
      <div className="mx-auto grid max-w-[1440px] gap-px bg-white/10 md:grid-cols-3 lg:px-10">
        <SourceType icon={<FileSearch2/>} status={isEn?"Active":"Aktiv"} title={isEn?"Observed":"Beobachtet"} text={isEn?"Publications systematically captured from defined portals.":"Systematisch aus definierten Portalen erfasste Veröffentlichungen."}/>
        <SourceType icon={<Layers3/>} status={isEn?"Prepared":"Vorbereitet"} title={isEn?"Curated":"Kuratiert"} text={isEn?"Original sources added selectively when they close an identifiable knowledge gap.":"Gezielt ergänzte Originalquellen, wenn sie eine erkennbare Wissenslücke schließen."}/>
        <SourceType icon={<Building2/>} status={isEn?"Later":"Später"} title="Community" text={isEn?"Traceable contributions with a disclosed role and verifiable provenance.":"Nachvollziehbare Beiträge mit offengelegter Rolle und belegbarer Herkunft."}/>
      </div>
    </section>

    <section id={isEn?"catalogue":"katalog"} className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-10 lg:px-10">
      {activeSolutionTopic&&<div className="mb-6 flex items-center justify-between gap-3 border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm"><span>{isEn?"Solution entry point":"Lösungseinstieg"}: <strong>{isEn?activeSolutionTopic.en:activeSolutionTopic.de}</strong></span><Button variant="ghost" onClick={reset} className="rounded-none"><X className="size-4"/>{isEn?"Clear":"Entfernen"}</Button></div>}
      {(query.trim()||activeSolutionTopic)&&<div className="mb-10 border-b pb-8">
        <div className="flex items-baseline justify-between gap-3"><h2 className="text-xl font-semibold">{isEn?"Company profiles":"Unternehmensprofile"}</h2><span className="text-sm text-muted-foreground">{matchingProviders.length.toLocaleString(isEn?"en-GB":"de-DE")} {isEn?"matches":"Treffer"}</span></div>
        {matchingProviders.length?<div className="mt-4 grid gap-3 md:grid-cols-2">{matchingProviders.slice(0,providerLimit).map(entry=>{const profile=profileIndex?.get(entry.name);return <Link key={entry.name} href={pPath(entry.name)} className="border bg-white p-5 hover:border-primary hover:shadow-sm"><span className="text-xs font-semibold uppercase tracking-wide text-primary">{isEn?"Company profile":"Unternehmensprofil"}</span><h3 className="mt-1 font-semibold">{providerAccountLabel(entry.name)}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{profile?.summary[locale]||euaigfSourcesFor(entry.name)[0]?.context[locale]||(isEn?`${entry.items.length} observed publications and ${entry.knowledge.length} classified knowledge items.`:`${entry.items.length} beobachtete Veröffentlichungen und ${entry.knowledge.length} eingeordnete Wissensobjekte.`)}</p></Link>})}</div>:<p className="mt-4 text-sm text-muted-foreground">{profileIndex?isEn?"No matching company profiles.":"Keine passenden Unternehmensprofile.":isEn?"Loading company profiles …":"Unternehmensprofile werden geladen …"}</p>}
        {providerLimit<matchingProviders.length&&<Button variant="outline" className="mt-5 rounded-none" onClick={()=>setProviderLimit(value=>value+12)}>{isEn?"Show 12 more profiles":"Weitere 12 Profile anzeigen"}</Button>}
      </div>}
      {(query.trim()||activeSolutionTopic)&&matchingKnowledge.length>0&&<div className="mb-10 border-b pb-8">
        <div className="flex items-baseline justify-between gap-3"><h2 className="text-xl font-semibold">{isEn?"Knowledge items":"Wissensobjekte"}</h2><span className="text-sm text-muted-foreground">{matchingKnowledge.length.toLocaleString(isEn?"en-GB":"de-DE")} {isEn?"matches":"Treffer"}</span></div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">{matchingKnowledge.slice(0,knowledgeSearchLimit).map(item=><Link key={item.id} href={kPath(item)} className="border bg-white p-5 hover:border-primary hover:shadow-sm"><span className="text-xs font-semibold uppercase tracking-wide text-primary">{tx(item.origin)} · {tx(item.stage||"Vorstrukturiert")}</span><h3 className="mt-1 font-semibold">{tx(item.title)}</h3><p className="mt-2 text-sm text-muted-foreground">{providerAccountLabel(providerFamily(item.provider))}</p></Link>)}</div>
        {knowledgeSearchLimit<matchingKnowledge.length&&<Button variant="outline" className="mt-5 rounded-none" onClick={()=>setKnowledgeSearchLimit(value=>value+12)}>{isEn?"Show 12 more items":"Weitere 12 Wissensobjekte anzeigen"}</Button>}
      </div>}
      <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row md:items-end">
        <div><p className="section-kicker">{isEn?"Market monitoring 2026":"Marktbeobachtung 2026"}</p><h2 className="mt-2 text-2xl font-semibold">{isEn?"Original publications":"Originalpublikationen"}</h2></div>
        <div className="flex items-center gap-3">
          <Select value={portal} onValueChange={value=>{setPortal(value);setLimit(23)}}><SelectTrigger className="h-10 w-full min-w-56 rounded-none bg-white"><SelectValue>{portal==="alle"?(isEn?"All portals":"Alle Portale"):portal}</SelectValue></SelectTrigger><SelectContent><SelectItem value="alle">{isEn?"All portals":"Alle Portale"}</SelectItem>{portals.map(value=><SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>
          {(query||portal!=="alle"||activeSolutionTopic)&&<Button variant="ghost" onClick={reset} className="rounded-none"><X className="size-4"/>{isEn?"Reset":"Zurücksetzen"}</Button>}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm"><p><strong>{filtered.length.toLocaleString(isEn?"en-GB":"de-DE")}</strong> {isEn?"results":"Treffer"}</p><p className="text-muted-foreground">{isEn?"fully taxonomically classified":"vollständig taxonomisch zugeordnet"}</p></div>
      <div className="mt-2 divide-y">
        {filtered.slice(0,limit).map(item=>{const attribution=publicationAttribution(item);return <article key={item.id} className="group grid gap-3 py-5 md:grid-cols-[130px_1fr_220px_42px] md:items-center">
          <div><Badge variant="outline" className="rounded-none border-primary/20 bg-primary/5 text-primary">{isEn?"Observed":"Beobachtet"}</Badge><p className="mt-2 text-xs text-muted-foreground">{formatDate(item.d,locale)}</p></div>
          <div><Link href={pPath(attribution.provider)} className="mb-1 text-left text-xs font-semibold uppercase tracking-[.08em] text-primary hover:underline">{providerAccountLabel(attribution.provider)}</Link>{attribution.via?<span className="mb-1 ml-2 text-xs text-muted-foreground">via {attribution.via}</span>:attribution.provider!==item.c&&<span className="mb-1 ml-2 text-xs text-muted-foreground">{isEn?"Source":"Quelle"}: {item.c}</span>}<h3 className="max-w-3xl text-base font-medium leading-6">{knowledgeByUrl.get(item.u)?<Link href={kPath(knowledgeByUrl.get(item.u)!)} className="hover:text-primary hover:underline">{tx(item.t)}</Link>:tx(item.t)}</h3>{isEn&&machineTranslated({title:item.t})&&<span className="mt-1 block text-xs text-muted-foreground">Machine translated</span>}</div>
          <div className="text-xs leading-5 text-muted-foreground"><p>{item.p.join(" · ")}</p><p className="mt-1 flex items-center gap-1"><ShieldCheck className="size-3.5"/>{isEn?tx(item.r||"Anbieterzuordnung"):(item.r||"Anbieterzuordnung")} · {item.s}</p></div>
          <a href={item.u} target="_blank" rel="noreferrer" aria-label={isEn?`Open original source: ${item.t}`:`Originalquelle öffnen: ${item.t}`} className="grid size-10 place-items-center border transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="size-4"/></a>
        </article>})}
        {!data.length&&<div className="py-16 text-center text-sm text-muted-foreground">{isEn?"Loading catalogue …":"Datenbestand wird geladen …"}</div>}
        {!!data.length&&!filtered.length&&<div className="py-16 text-center"><p>{matchingProviders.length?(isEn?"No matching original publications; company profiles are shown above.":"Keine passenden Originalpublikationen; Unternehmensprofile stehen oben."):(isEn?"No matching publications found.":"Keine passenden Publikationen gefunden.")}</p><Button variant="link" onClick={reset}>{isEn?"Reset search":"Suche zurücksetzen"}</Button></div>}
      </div>
      {limit<filtered.length&&<div className="border-t pt-6 text-center"><Button variant="outline" onClick={()=>setLimit(value=>value+23)} className="rounded-none">{isEn?"Show 23 more":"Weitere 23 anzeigen"}</Button></div>}
    </section>

    <div className="border-t bg-muted/30"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-10"><p>{isEn?"SmartTech · Open orientation in the B2B technology market":"SmartTech · Offene Orientierung im B2B-Technologiemarkt"}</p><p>{isEn?"Direct original references · no lead marketing · Scoring 0.2":"Direkte Originalverweise · keine Lead-Vermarktung · Scoring 0.2"}</p></div></div>

  </main>
}

function SectionIntro({kicker,title,text}:{kicker:string;title:string;text:string}){return <div className="grid gap-3 md:grid-cols-[.7fr_1.3fr] md:items-end"><div><p className="section-kicker">{kicker}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2></div><p className="max-w-2xl text-sm leading-6 text-muted-foreground">{text}</p></div>}
function SourceType({icon,status,title,text}:{icon:React.ReactNode;status:string;title:string;text:string}){return <div className="bg-slate-950 p-6"><div className="flex items-center justify-between"><span className="text-cyan-300 [&>svg]:size-5">{icon}</span><span className="text-xs uppercase tracking-wider text-slate-400">{status}</span></div><h3 className="mt-6 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{text}</p></div>}
function portalCount(value:number,locale:"de"|"en"="de"){return `${value.toLocaleString(locale==="en"?"en-GB":"de-DE")} ${locale==="en"?(value===1?"portal":"portals"):(value===1?"Portal":"Portale")}`}

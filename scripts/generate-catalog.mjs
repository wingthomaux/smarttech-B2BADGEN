import {activeAuditedPublications} from "./audited-publications.mjs";
import {readFile,writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";
import {createServer} from "vite";

const root=fileURLToPath(new URL("..",import.meta.url));
const [basePublications,weeklyPublications]=await Promise.all([
  readFile(path.join(root,"public/data/publications.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"public/data/publications-update-2026-09-07.json"),"utf8").then(JSON.parse),
]);
const remainingAudit=JSON.parse(await readFile(path.join(root,"app/provider-audit-remaining-20261013.json"),"utf8"));
const excludedRecords=remainingAudit.filter(row=>row.decision==="excluded");
const excludedAssetIds=new Set(excludedRecords.flatMap(row=>row.knowledgeIds));
const publications=activeAuditedPublications([...basePublications,...weeklyPublications],remainingAudit);
const baseline=JSON.parse(await readFile(path.join(root,"app/weekly-baseline.json"),"utf8"));
const [official,thiemeBechtle,schwarzDehner,nvidiaGtc,telegaertner,serviceware,mnet,akamai,telecomHandel,servicenow,telecomWave1,telecomWave2,lewTelnet,knowbe4,gdata,freshWhitepapers,solutionExpansion,dailyWhitepapers]=await Promise.all([
  readFile(path.join(root,"app/official-expansion.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-thieme-bechtle.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-schwarz-dehner.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-nvidia-gtc.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-telegaertner.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-serviceware.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-mnet.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-akamai.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/observed-expansion-telecom-handel.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-servicenow.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-telecom-wave1.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-telecom-wave2.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-lew-telnet.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-knowbe4.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-gdata.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/observed-expansion-whitepapers-20260929.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/official-expansion-solutions-20260929.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"app/observed-expansion-whitepapers-20260930.json"),"utf8").then(JSON.parse),
]);
const vite=await createServer({appType:"custom",configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true}});
try{
  const [{pilots},{classifyOffers,classifyHighPriorityOffers,classifyAllRemainingOffers},{providerFamily},{publicationAttribution},{euaigfCompanies},{editorialEntriesForProvider},{applyMediaTaxonomy}]=await Promise.all([
    vite.ssrLoadModule("/app/pilot-data.ts"),
    vite.ssrLoadModule("/app/offer-classification.ts"),
    vite.ssrLoadModule("/app/provider-normalization.ts"),
    vite.ssrLoadModule("/app/publication-attribution.ts"),
    vite.ssrLoadModule("/app/euaigf-source.ts"),
    vite.ssrLoadModule("/app/editorial-portals.ts"),
    vite.ssrLoadModule("/app/media-taxonomy.ts"),
  ]);
  const scaled=classifyOffers(publications,new Set(pilots.map(item=>item.url)),100);
  const priority=classifyHighPriorityOffers(publications,new Set([...pilots.map(item=>item.url),...scaled.map(item=>item.url)]),208);
  const remaining=classifyAllRemainingOffers(publications,new Set([...pilots.map(item=>item.url),...scaled.map(item=>item.url),...priority.map(item=>item.url)]));
  const sourceDates=new Map(publications.map(item=>[item.u,item.d]));
  const sourceAddedDates=new Map(publications.filter(item=>item.addedAt).map(item=>[item.u,item.addedAt]));
  const igelEditorial=JSON.parse(await readFile(path.join(root,"app/observed-expansion-igel-editorial-20261006.json"),"utf8"));
  const igelResources=JSON.parse(await readFile(path.join(root,"app/observed-expansion-igel-20261006.json"),"utf8"));
  const profileReviewResources=JSON.parse(await readFile(path.join(root,"app/observed-expansion-profile-reviews-20261006.json"),"utf8"));
  const portalUpdate=JSON.parse(await readFile(path.join(root,"app/observed-expansion-portals-20261006.json"),"utf8"));
  const althallerEditorial=JSON.parse(await readFile(path.join(root,"app/observed-expansion-althaller-editorial-20261009.json"),"utf8"));
  const althallerStudy=JSON.parse(await readFile(path.join(root,"app/official-expansion-althaller-study-20261009.json"),"utf8"));
  const itRefresh=JSON.parse(await readFile(path.join(root,"app/expansion-it-refresh-20261019.json"),"utf8"));
  const mediaPerformance=JSON.parse(await readFile(path.join(root,"app/expansion-media-performance-20261019.json"),"utf8"));
  const fiveOctober=JSON.parse(await readFile(path.join(root,"app/expansion-five-providers-20261019.json"),"utf8"));
  const alsoTrenkwalder=JSON.parse(await readFile(path.join(root,"app/expansion-also-trenkwalder-20261013.json"),"utf8"));
  const allianzTrade=JSON.parse(await readFile(path.join(root,"app/official-expansion-allianz-trade-20261013.json"),"utf8"));
  const skydance=JSON.parse(await readFile(path.join(root,"app/expansion-skydance-20261008.json"),"utf8"));
  const spaceX=JSON.parse(await readFile(path.join(root,"app/expansion-spacex-20261008.json"),"utf8"));
  const marconomy=JSON.parse(await readFile(path.join(root,"app/expansion-marconomy-20261008.json"),"utf8"));
  const althallerAssist=JSON.parse(await readFile(path.join(root,"app/official-expansion-althallerassist-20261008.json"),"utf8"));
  const sourceKnowledge=[...pilots,...scaled,...priority,...remaining,...official,...thiemeBechtle,...schwarzDehner,...nvidiaGtc,...telegaertner,...serviceware,...mnet,...akamai,...telecomHandel,...servicenow,...telecomWave1,...telecomWave2,...lewTelnet,...knowbe4,...gdata,...freshWhitepapers,...solutionExpansion,...dailyWhitepapers,...portalUpdate,...profileReviewResources,...igelResources,...igelEditorial,...althallerAssist,...marconomy,...spaceX,...skydance,...althallerStudy,...althallerEditorial,...allianzTrade,...alsoTrenkwalder,...fiveOctober,...mediaPerformance,...itRefresh].map(item=>({...item,datePublished:item.datePublished||sourceDates.get(item.url),...(item.addedAt||sourceAddedDates.has(item.url)?{addedAt:item.addedAt||sourceAddedDates.get(item.url)}:{})}));
  const knowledge=sourceKnowledge.filter(item=>!excludedAssetIds.has(item.id));
  // Reviewed Anthropic relationships enrich existing IDs; primary providers and source URLs remain unchanged.
  const anthropicPatches=new Map(JSON.parse(await readFile(path.join(root,"app/knowledge-enrichment-anthropic-20261012.json"),"utf8")).map(item=>[item.id,item]));
  for(let index=0;index<knowledge.length;index++){const patch=anthropicPatches.get(knowledge[index].id);if(patch)knowledge[index]={...knowledge[index],...patch};}
  const platformPatches=new Map(JSON.parse(await readFile(path.join(root,"app/knowledge-enrichment-platform-network-20261012.json"),"utf8")).map(item=>[item.id,item]));
  for(let index=0;index<knowledge.length;index++){const patch=platformPatches.get(knowledge[index].id);if(patch)knowledge[index]={...knowledge[index],...patch,additionalProviders:[...new Set([...(knowledge[index].additionalProviders||[]),...(patch.additionalProviders||[])])]};}
  const nextFivePatches=new Map(JSON.parse(await readFile(path.join(root,"app/knowledge-enrichment-next-five-network-20261012.json"),"utf8")).map(item=>[item.id,item]));
  for(let index=0;index<knowledge.length;index++){
    const original=knowledge[index],patch=nextFivePatches.get(original.id);if(!patch)continue;
    const replacements=new Set((patch.providerRelations||[]).map(relation=>relation.name));
    knowledge[index]={...original,...patch,additionalProviders:[...new Set([...(original.additionalProviders||[]),...(patch.additionalProviders||[])])],providerRelations:[...(original.providerRelations||[]).filter(relation=>!replacements.has(relation.name)),...(patch.providerRelations||[])]};
  }
  const itRefreshPatches=new Map(JSON.parse(await readFile(path.join(root,"app/knowledge-refresh-it-20261019.json"),"utf8")).map(item=>[item.id,item]));
  for(let index=0;index<knowledge.length;index++){const patch=itRefreshPatches.get(knowledge[index].id);if(patch)knowledge[index]={...knowledge[index],...patch};}
  for(let index=0;index<knowledge.length;index++)knowledge[index]=applyMediaTaxonomy(knowledge[index]);
  const companyMap=new Map();
  const ensure=name=>{if(!companyMap.has(name))companyMap.set(name,{name,variants:new Set(),items:[],knowledge:[],portals:new Set()});return companyMap.get(name)};
  for(const item of publications){const attribution=publicationAttribution(item);const entry=ensure(attribution.provider);entry.items.push(attribution.via?{...item,c:attribution.provider,r:`Anbieterzuordnung via ${attribution.via}`,via:attribution.via}:item);entry.variants.add(attribution.via?attribution.provider:item.c);item.p.forEach(portal=>entry.portals.add(portal))}
  for(const item of knowledge)for(const name of new Set([item.provider,...item.additionalProviders||[]].map(providerFamily)))ensure(name).knowledge.push(item.id);
  for(const item of [...profileReviewResources,...igelResources,...igelEditorial,...marconomy,...spaceX,...skydance,...althallerStudy,...althallerEditorial,...allianzTrade,...alsoTrenkwalder,...fiveOctober,...mediaPerformance,...itRefresh])for(const name of new Set([item.provider,...item.additionalProviders||[]].map(providerFamily))){const entry=ensure(name);if(!entry.variants.size)entry.variants.add(name);for(const portal of item.sourcePortals||[])entry.portals.add(portal)}
  for(const name of euaigfCompanies){const entry=ensure(name);entry.variants.add(name)}
  const {providerProfileFor}=await vite.ssrLoadModule("/app/provider-profiles.ts");
  for(const entry of companyMap.values())for(const alias of providerProfileFor(entry.name)?.aliases||[])entry.variants.add(alias);
  const companies=[...companyMap.values()].map(entry=>({...entry,variants:[...entry.variants].sort(),portals:[...entry.portals].sort()})).sort((a,b)=>b.items.length-a.items.length||b.knowledge.length-a.knowledge.length||a.name.localeCompare(b.name,"de"));
  const generatedAt=`${[...publications.map(item=>item.d),...knowledge.map(item=>item.addedAt).filter(Boolean)].sort().at(-1)}T00:00:00.000Z`;
  const previousProviders=new Set(baseline.providerNames.map(name=>companyMap.has(name)?name:providerFamily(name)));
  const previousAssets=new Set(baseline.knowledgeIds);
  const newAssets=knowledge.filter(item=>!previousAssets.has(item.id));
  const newAssetCounts=new Map();
  const newAssetPortals=new Map();
  for(const item of newAssets)for(const name of new Set([item.provider,...item.additionalProviders||[]].map(providerFamily))){newAssetCounts.set(name,(newAssetCounts.get(name)||0)+1);const portals=newAssetPortals.get(name)||new Set();for(const portal of item.sourcePortals||[])portals.add(portal);newAssetPortals.set(name,portals)}
  const weeklyUpdate={
    currentThrough:baseline.currentThrough,
    previousThrough:baseline.previousThrough,
    providers:companies.filter(entry=>!previousProviders.has(entry.name)).map(entry=>{
      const capturedAssets=newAssets.filter(item=>[item.provider,...item.additionalProviders||[]].map(providerFamily).includes(entry.name));
      // First documented catalogue capture, not the date of an old source publication.
      const date=capturedAssets.map(item=>item.addedAt||"").filter(Boolean).sort()[0]||"";
      const latestAssetId=Math.max(0,...capturedAssets.filter(item=>item.addedAt===date).map(item=>item.id));
      return {name:entry.name,date,latestAssetId,assetCount:newAssetCounts.get(entry.name)||0,portals:[...new Set([...entry.portals,...newAssetPortals.get(entry.name)||[],...editorialEntriesForProvider(entry.name).map(ref=>ref.portal)])].sort()};
    }).sort((a,b)=>b.date.localeCompare(a.date)||b.latestAssetId-a.latestAssetId||a.name.localeCompare(b.name,"de")),
    assets:newAssets.map(item=>({id:item.id,title:item.title,provider:providerFamily(item.provider),date:item.addedAt||baseline.currentThrough,format:item.format,space:item.space,portals:item.sourcePortals||[],sourceUrl:item.url})).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id),
  };
  await writeFile(path.join(root,"app/catalog.generated.json"),JSON.stringify({generatedAt,knowledge,companies}));
  await writeFile(path.join(root,"app/weekly-update.generated.json"),JSON.stringify(weeklyUpdate));
  console.log(`Generated ${knowledge.length} knowledge pages and ${companies.length} provider pages.`);
  console.log(`Generated weekly comparison with ${weeklyUpdate.providers.length} new providers and ${weeklyUpdate.assets.length} new assets.`);
}finally{await vite.close()}

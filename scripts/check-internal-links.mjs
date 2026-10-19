import {activeAuditedPublications} from "./audited-publications.mjs";
import {readFile} from "node:fs/promises";
import {createServer} from "vite";
import {fileURLToPath} from "node:url";

const root=fileURLToPath(new URL("..",import.meta.url));
const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
const weekly=JSON.parse(await readFile(new URL("../app/weekly-update.generated.json",import.meta.url),"utf8"));
const weeklyBaseline=JSON.parse(await readFile(new URL("../app/weekly-baseline.json",import.meta.url),"utf8"));
const validation=JSON.parse(await readFile(new URL("../app/validation-ledger.json",import.meta.url),"utf8"));
const rawPublications=(await Promise.all([
  readFile(new URL("../public/data/publications.json",import.meta.url),"utf8").then(JSON.parse),
  readFile(new URL("../public/data/publications-update-2026-09-07.json",import.meta.url),"utf8").then(JSON.parse),
])).flat();
const remainingAudit=JSON.parse(await readFile(new URL("../app/provider-audit-remaining-20261013.json",import.meta.url),"utf8"));
const publications=activeAuditedPublications(rawPublications,remainingAudit);
const vite=await createServer({appType:"custom",configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true}});
try{
  const [{englishKnowledgePath,englishProviderPath,knowledgePath,providerPath},{isRankedProvider},{ownerCodeForProvider,ownerMatchTypeForProvider},{englishText,hasEnglishTranslation}]=await Promise.all([
    vite.ssrLoadModule("/app/catalog-paths.ts"),
    vite.ssrLoadModule("/app/smarttech-portal.tsx"),
    vite.ssrLoadModule("/app/account-owners.ts"),
    vite.ssrLoadModule("/app/english.ts"),
  ]);
  const {portalProfiles,portalArticles,portalPath,getPortal,editorialEntriesForPortal,editorialEntriesForProvider}=await vite.ssrLoadModule("/app/portal-directory.ts");
  const {euaigfCompanies,euaigfSourcesFor,euaigfUrl}=await vite.ssrLoadModule("/app/euaigf-source.ts");
  const {providerProfileFor}=await vite.ssrLoadModule("/app/provider-profiles.ts");
  const {providerFamily}=await vite.ssrLoadModule("/app/provider-normalization.ts");
  const {getProvider}=await vite.ssrLoadModule("/app/catalog.ts");
  const {providerProfilesEighth}=await vite.ssrLoadModule("/app/provider-profiles-eighth.ts");
  const {providerProfilesNinth}=await vite.ssrLoadModule("/app/provider-profiles-ninth.ts");
  const {providerProfilesTenth}=await vite.ssrLoadModule("/app/provider-profiles-tenth.ts");
  const {providerProfilesEleventh}=await vite.ssrLoadModule("/app/provider-profiles-eleventh.ts");
  const {providerProfilesAudit}=await vite.ssrLoadModule("/app/provider-profiles-audit.ts");
  const {providerProfilesWhitepapers}=await vite.ssrLoadModule("/app/provider-profiles-whitepapers.ts");
  const {providerProfilesITRefresh}=await vite.ssrLoadModule("/app/provider-profiles-it-refresh-20261019.ts");
  const eighthNames=Object.keys(providerProfilesEighth);
  if(eighthNames.length!==100||eighthNames.some(name=>!catalog.companies.some(provider=>provider.name===name)))throw new Error("Eighth profile wave must cover exactly 100 existing catalogue entities");
  for(const name of eighthNames){
    const profile=providerProfileFor(name);
    if(profile!==(providerProfilesITRefresh[name]||providerProfilesEighth[name])||!profile.officialUrl.startsWith("https://")||profile.summary.de.trim().split(/\s+/).length<38||profile.summary.en.trim().split(/\s+/).length<38||profile.focus.de.length<6||profile.focus.en.length<6||profile.buyerGroups.de.length<6||profile.buyerGroups.en.length<6)throw new Error(`Incomplete eighth-wave profile: ${name}`);
  }
  const ninthNames=Object.keys(providerProfilesNinth);
  if(ninthNames.length!==100||ninthNames.some(name=>!catalog.companies.some(provider=>provider.name===name))||ninthNames.some(name=>eighthNames.includes(name)))throw new Error("Ninth profile wave must cover 100 previously generic catalogue entities");
  for(const name of ninthNames){
    const profile=providerProfileFor(name);
    if(profile!==(providerProfilesITRefresh[name]||providerProfilesNinth[name])||!profile.officialUrl.startsWith("https://")||profile.summary.de.trim().split(/\s+/).length<38||profile.summary.en.trim().split(/\s+/).length<38||profile.focus.de.length<6||profile.focus.en.length<6||profile.buyerGroups.de.length<6||profile.buyerGroups.en.length<6)throw new Error(`Incomplete ninth-wave profile: ${name}`);
  }
  const tenthNames=Object.keys(providerProfilesTenth);
  if(tenthNames.length!==100||tenthNames.some(name=>!catalog.companies.some(provider=>provider.name===name))||tenthNames.some(name=>eighthNames.includes(name)||ninthNames.includes(name)))throw new Error("Tenth profile wave must cover 100 previously generic catalogue entities");
  for(const name of tenthNames){
    const profile=providerProfileFor(name);
    if(profile!==(providerProfilesITRefresh[name]||providerProfilesTenth[name])||!profile.officialUrl.startsWith("https://")||profile.summary.de.trim().split(/\s+/).length<38||profile.summary.en.trim().split(/\s+/).length<38||profile.focus.de.length<6||profile.focus.en.length<6||profile.buyerGroups.de.length<6||profile.buyerGroups.en.length<6)throw new Error(`Incomplete tenth-wave profile: ${name}`);
  }
  const eleventhNames=Object.keys(providerProfilesEleventh);
  if(eleventhNames.length!==100||eleventhNames.some(name=>!catalog.companies.some(provider=>provider.name===name))||eleventhNames.some(name=>providerProfilesTenth[name]||providerProfilesNinth[name]||providerProfilesEighth[name]))throw new Error("Eleventh profile wave must cover 100 previously generic catalogue entities");
  for(const name of eleventhNames){
    const profile=providerProfileFor(name);
    if(profile!==(providerProfilesITRefresh[name]||providerProfilesEleventh[name])||!profile.officialUrl.startsWith("https://")||profile.summary.de.trim().split(/\s+/).length<38||profile.summary.en.trim().split(/\s+/).length<38||profile.focus.de.length<6||profile.focus.en.length<6||profile.buyerGroups.de.length<6||profile.buyerGroups.en.length<6)throw new Error(`Incomplete eleventh-wave profile: ${name}`);
  }
  const auditNames=Object.keys(providerProfilesAudit);
  if(auditNames.length!==17||auditNames.some(name=>!catalog.companies.some(provider=>provider.name===name)))throw new Error("Audit profiles must cover 17 active provider pages");
  for(const name of auditNames){
    const profile=providerProfileFor(name);
    if(profile!==(providerProfilesITRefresh[name]||providerProfilesAudit[name])||!profile.officialUrl.startsWith("https://")||profile.summary.de.trim().split(/\s+/).length<38||profile.summary.en.trim().split(/\s+/).length<38||profile.focus.de.length<6||profile.focus.en.length<6||profile.buyerGroups.de.length<6||profile.buyerGroups.en.length<6)throw new Error(`Incomplete audit profile: ${name}`);
  }
  const freshNames=Object.keys(providerProfilesWhitepapers);
  if(freshNames.length!==5||freshNames.some(name=>!catalog.companies.some(provider=>provider.name===name)))throw new Error("Fresh whitepaper providers lack canonical catalogue pages");
  for(const name of freshNames){
    const profile=providerProfileFor(name);
    if(profile!==(providerProfilesITRefresh[name]||providerProfilesWhitepapers[name])||!profile.officialUrl.startsWith("https://")||profile.summary.de.trim().split(/\s+/).length<38||profile.summary.en.trim().split(/\s+/).length<38||profile.focus.de.length<6||profile.focus.en.length<6||profile.buyerGroups.de.length<6||profile.buyerGroups.en.length<6)throw new Error(`Incomplete whitepaper provider profile: ${name}`);
  }
  const freshAssets=catalog.knowledge.filter(item=>item.id>=710000&&item.id<=710005);
  if(freshAssets.length!==6||freshAssets.some(item=>item.origin!=="Beobachtet"||item.stage!=="Vorstrukturiert"||item.addedAt!=="2026-09-29"||item.datePublished||!item.url.startsWith("https://")||!item.sourcePortals?.length))throw new Error("Whitepaper source review must preserve access and publication-date limits");
  if(euaigfCompanies.length!==41||euaigfCompanies.some(name=>!catalog.companies.some(provider=>provider.name===name)))throw new Error("EUAIGF company coverage is incomplete");
  if(euaigfCompanies.some(name=>euaigfSourcesFor(name).some(ref=>ref.url!==euaigfUrl)))throw new Error("Incorrect EUAIGF editorial source URL");
  for(const name of euaigfCompanies){
    const profile=providerProfileFor(name);
    if(!profile?.officialUrl||!profile.summary?.de||!profile.summary?.en||profile.focus?.de?.length<4||profile.focus?.en?.length<4||profile.buyerGroups?.de?.length<4||profile.buyerGroups?.en?.length<4)throw new Error(`Incomplete DE/EN company profile: ${name}`);
  }
  if(euaigfSourcesFor("Multiverse Computing").length!==2)throw new Error("Missing second Multiverse Computing project relationship");
  const expectedPortals=new Set([...publications.flatMap(item=>item.p),...catalog.knowledge.filter(item=>item.origin==="Beobachtet").flatMap(item=>item.sourcePortals||[]),"EU AI Gigafactories","Interaktivierungs-Atlas"]);
  if(portalProfiles.length!==expectedPortals.size||portalProfiles.some(portal=>!expectedPortals.has(portal.name)))throw new Error("Portal directory does not match publication sources");
  const portalPaths=new Set();
  for(const portal of portalProfiles){
    const path=portalPath(portal.name);if(portalPaths.has(path)||getPortal(path.split("/").at(-1))?.name!==portal.name)throw new Error("Invalid portal path");portalPaths.add(path);
    const articles=portalArticles(portal.name);
    if(!articles.length&&!editorialEntriesForPortal(portal.name).length)throw new Error(`Empty portal: ${portal.name}`);
    for(let i=1;i<articles.length;i++)if((articles[i-1].datePublished||"")<(articles[i].datePublished||""))throw new Error("Portal articles are not newest first");
    const urls=new Set(articles.map(item=>item.url));
    for(const publication of publications.filter(item=>item.p.includes(portal.name)))if(!urls.has(publication.u))throw new Error(`Missing portal article: ${publication.u}`);
  }
  for(const name of euaigfCompanies)if(!editorialEntriesForProvider(name).some(entry=>entry.portal==="EU AI Gigafactories"))throw new Error(`Missing EUAIGF portal backlink: ${name}`);
  for(const entry of editorialEntriesForPortal("Interaktivierungs-Atlas")){
    if(!entry.url.startsWith("https://atlas.b2badgen.com/artikel/"))throw new Error(`Invalid Atlas article: ${entry.url}`);
    for(const name of entry.providers)if(!catalog.companies.some(provider=>provider.name===name))throw new Error(`Unknown Atlas provider: ${name}`);
  }
  console.log(`Validated ${portalPaths.size} portal pages, article coverage and chronological order.`);
  const {providerProfilesPortalReviews}=await vite.ssrLoadModule("/app/provider-profiles-portals-20261006.ts");
  for(const [name,profile] of Object.entries(providerProfilesPortalReviews)){
    if(!catalog.companies.some(provider=>provider.name===name))throw new Error(`Reviewed provider profile lacks canonical catalogue identity: ${name}`);
    for(const locale of ["de","en"])if(profile.summary[locale].split(/\s+/).length<90||!profile.focus[locale].length||!profile.buyerGroups[locale].length)throw new Error(`Incomplete bilingual reviewed profile: ${name}/${locale}`);
    if(!profile.officialUrl.startsWith("https://")||!profile.officialSources?.length)throw new Error(`Reviewed profile lacks official sources: ${name}`);
  }
  console.log(`Validated ${Object.keys(providerProfilesPortalReviews).length} bilingual reviewed profiles against canonical catalogue identities.`);
  const knowledgeIds=new Set(catalog.knowledge.map(item=>item.id));
  const knowledgePaths=catalog.knowledge.map(knowledgePath);
  const providerPaths=catalog.companies.map(item=>providerPath(item.name));
  const englishKnowledgePaths=catalog.knowledge.map(item=>englishKnowledgePath(item,englishText(item.title)));
  const englishProviderPaths=catalog.companies.map(item=>englishProviderPath(item.name));
  if(new Set(knowledgePaths).size!==knowledgePaths.length)throw new Error("Duplicate knowledge path");
  if(new Set(providerPaths).size!==providerPaths.length)throw new Error("Duplicate provider path");
  if(new Set(englishKnowledgePaths).size!==englishKnowledgePaths.length)throw new Error("Duplicate English knowledge path");
  if(new Set(englishProviderPaths).size!==englishProviderPaths.length)throw new Error("Duplicate English provider path");
  for(const item of catalog.knowledge)for(const value of [item.title,item.space,item.challenge,item.solution,item.delivery,item.lifecycle,item.format,item.note,item.stage,item.mediaArea,...(item.related||[]),...(item.relatedMediaAreas||[]),...(item.channels||[]),...(item.topics||[])])if(!hasEnglishTranslation(value))throw new Error(`Missing English translation for knowledge ${item.id}: ${value}`);
  for(const provider of catalog.companies)for(const item of provider.items)if(!hasEnglishTranslation(item.t))throw new Error(`Missing English publication title for ${provider.name}: ${item.t}`);
  for(const provider of catalog.companies)for(const id of provider.knowledge)if(!knowledgeIds.has(id))throw new Error(`Missing knowledge ${id} for ${provider.name}`);
  const byUrl=new Set(catalog.knowledge.map(item=>item.url));
  const unlinked=publications.filter(item=>!byUrl.has(item.u));
  if(unlinked.length)throw new Error(`${unlinked.length} publication URLs have no internal knowledge page`);
  const canonicalKnowledgePaths=new Set(knowledgePaths);
  const canonicalProviderPaths=new Set(providerPaths);
  for(const item of weekly.assets)if(!canonicalKnowledgePaths.has(knowledgePath(item)))throw new Error(`Weekly asset has no canonical page: ${item.title}`);
  for(const item of weekly.providers)if(!canonicalProviderPaths.has(providerPath(item.name)))throw new Error(`Weekly provider has no canonical page: ${item.name}`);
  const canonicalEnglishKnowledgePaths=new Set(englishKnowledgePaths);
  const canonicalEnglishProviderPaths=new Set(englishProviderPaths);
  for(const item of weekly.assets)if(!canonicalEnglishKnowledgePaths.has(englishKnowledgePath(item,englishText(item.title))))throw new Error(`Weekly asset has no English canonical page: ${item.title}`);
  for(const item of weekly.providers)if(!canonicalEnglishProviderPaths.has(englishProviderPath(item.name)))throw new Error(`Weekly provider has no English canonical page: ${item.name}`);
  const baselineIds=new Set(weeklyBaseline.knowledgeIds),activeNames=new Set(catalog.companies.map(item=>item.name)),baselineNames=new Set(weeklyBaseline.providerNames.map(name=>activeNames.has(name)?name:providerFamily(name)));
  if(weekly.previousThrough!==weeklyBaseline.previousThrough||weekly.currentThrough!==weeklyBaseline.currentThrough)throw new Error("Weekly comparison dates differ from its frozen baseline");
  if(weekly.assets.length!==catalog.knowledge.filter(item=>!baselineIds.has(item.id)).length||weekly.assets.some(item=>baselineIds.has(item.id)))throw new Error("Weekly assets do not match the published baseline");
  if(weekly.providers.length!==catalog.companies.filter(item=>!baselineNames.has(item.name)).length||weekly.providers.some(item=>baselineNames.has(item.name)))throw new Error("Weekly profiles do not match the published baseline");
  const removedProviderNames=["Zu prüfen","Buchautor","Firma","Jetzt herunterladen","Dieses nachträgliche Auswerten von Ereignissen","Stadtrat","Aura Escort Frankfurt","Emanuell Charis","Chogan-Vertriebspartner","iG casino.de","Taiwan Flagship showcase","Washington, DC"];
  if(removedProviderNames.some(name=>catalog.companies.some(item=>item.name===name)))throw new Error("Excluded low-quality provider returned to the active catalogue");
  for(const [oldName,canonical] of [["MongoDB Logo","MongoDB"],["Infor Logo","Infor"],["DigiKey/Machine Design","DigiKey"],["BANI Hausverwaltung und Immobilien","BANI Hausverwaltung & Immobilien"],["Trooper.AI c/o Media Trooper","Trooper.AI – Ein Produkt von: Media Trooper"]]){
    const oldSlug=providerPath(oldName).split("/").at(-1);
    if(getProvider(oldSlug)?.name!==canonical)throw new Error(`Missing provider redirect: ${oldName}`);
  }
  for(const name of ["Roland Franz & Partner, Steuerberater","FRTG Steuerberatungsgesellschaft"])if(isRankedProvider(name))throw new Error(`Excluded provider still appears in rankings: ${name}`);
  if(catalog.companies.some(item=>/^H zwo B Kommunikations$/i.test(item.name)))throw new Error("H Zwo B is still modeled as a provider");
  for(const [provider,code] of [["SAP","T"],["Red Hat","S"],["Aagon","T"],["AGRAVIS Raiffeisen","L"],["Druva","C"]])if(ownerCodeForProvider(provider)!==code)throw new Error(`Incorrect account-owner code for ${provider}`);
  for(const [provider,code] of [["Box","T"],["Siemens Digital Industries Software","S"],["SAP Concur","S"],["Protolabs","A"]])if(ownerCodeForProvider(provider)!==code||ownerMatchTypeForProvider(provider)!=="direct")throw new Error(`Incorrect direct account-owner match for ${provider}`);
  for(const [provider,code] of [["Splunk","S"],["Hyland","T"],["Keeper Security","T"],["VAST Data","S"],["Palo Alto Networks","S"],["Snowflake","T"],["Object First","S"],["Zebra Technologies","T"]])if(ownerCodeForProvider(provider)!==code||ownerMatchTypeForProvider(provider)!=="inferred")throw new Error(`Incorrect inferred account-owner match for ${provider}`);
  for(const obsoleteName of ["Censys, Inc.TM","Concur Tech(UK)Ltd(Maidenhead)","VAST Data Germany GmbH c/o Mazars GmbH & Co. KG","Vertex, Inc. Pressekontakt","Object First (Kontakt: PR-Agentur)","Zebra Technologies International LLC"])if(catalog.companies.some(item=>item.name===obsoleteName))throw new Error(`Unnormalized provider remains in catalog: ${obsoleteName}`);
  const expectedIntermediatedProviders=new Map([[1046,"enclaive"],[1130,"STARFACE"],[1196,"Gamma Communications"],[1282,"Gamma Communications"],[1375,"enclaive"],[1754,"Gamma Communications"],[1998,"estos"],[4568,"enclaive"]]);
  for(const [id,provider] of expectedIntermediatedProviders){const item=catalog.knowledge.find(entry=>entry.id===id);if(item?.provider!==provider||!item.note.includes("via H Zwo B"))throw new Error(`Incorrect H Zwo B attribution for asset ${id}`)}
  const nvidiaGtcIds=new Set([500000,500001,500002,500003,500004,500005,500006]);
  for(const id of nvidiaGtcIds){
    const item=catalog.knowledge.find(entry=>entry.id===id);
    if(!item||item.provider!=="NVIDIA"||item.origin!=="Kuratiert"||item.stage!=="Redaktionell geprüft")throw new Error(`Incorrect NVIDIA GTC item ${id}`);
    if(!item.url.startsWith("https://www.nvidia.com/")||item.url.includes("nvidianews"))throw new Error(`NVIDIA GTC item ${id} does not use a clean official URL`);
  }
  const validatedIds=validation.batches.flatMap(batch=>batch.assetIds);
  if(new Set(validatedIds).size!==validatedIds.length)throw new Error("An asset occurs in more than one validation batch");
  for(const id of validatedIds){
    const item=catalog.knowledge.find(entry=>entry.id===id);
    if(!item)throw new Error(`Validated asset ${id} is missing from the catalog`);
    if(item.stage!=="Redaktionell geprüft")throw new Error(`Validated asset ${id} is not marked as editorially reviewed`);
  }
  const openIds=new Set(validation.open.map(item=>item.assetId));
  for(const id of validatedIds)if(openIds.has(id))throw new Error(`Validated asset ${id} is still marked open`);
  const latestBatch=validation.batches.at(-1);
  if(latestBatch.assetIds.length<latestBatch.requiredPackageSize)throw new Error(`Validation batch ${latestBatch.id} is too small`);
  console.log(`Validated ${knowledgePaths.length+providerPaths.length+englishKnowledgePaths.length+englishProviderPaths.length} unique canonical detail links across German and English; every publication has an internal detail page.`);
  console.log(`Validated weekly comparison with ${weekly.providers.length} new providers and ${weekly.assets.length} new assets.`);
  console.log(`Validated persistent editorial ledger with ${validatedIds.length} unique assets across ${validation.batches.length} batch(es).`);
}finally{await vite.close()}

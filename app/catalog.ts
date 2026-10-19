import catalogData from "./catalog.generated.json";
import {knowledgePath,providerPath} from "./catalog-paths";

export type KnowledgeItem={id:number;title:string;provider:string;space:string;related?:string[];challenge:string;solution:string;delivery:string;lifecycle:string;origin:"Beobachtet"|"Kuratiert"|"Community";format:string;url:string;note:string;score?:number;stage?:string;sourcePortals?:string[];providerUrl?:string;additionalProviders?:string[];providerRelations?:Array<{name:string;type:{de:string;en:string};context:{de:string;en:string};reviewedAt:string;sourceUrl:string;scope:string}>;sourceReviewWarning?:{de:string;en:string};languageVariantOf?:string;datePublished?:string;addedAt?:string;eventPeriod?:string;mediaPrimary?:boolean;mediaArea?:string;relatedMediaAreas?:string[];channels?:string[];topics?:string[]};
export type Publication={id:number;c:string;d:string;t:string;u:string;p:string[];r:string;s:string;via?:string};
export type Provider={name:string;variants:string[];items:Publication[];portals:string[];knowledge:number[]};

export const catalog=catalogData as {generatedAt:string;knowledge:KnowledgeItem[];companies:Provider[]};
const knowledgeById=new Map(catalog.knowledge.map(item=>[item.id,item]));
const providerByPath=new Map(catalog.companies.map(item=>[providerPath(item.name).split("/").at(-1)!,item]));
const legacyProviderAliases:Record<string,string>={
  "Adacta (PR-Agentur)":"Adacta",
  "CharterHouse London":"Charterhouse",
  "xAI":"SpaceXAI",
  KnowBe4:"KnowBe4 Germany",
  "Snowflake Computing":"Snowflake",
  "Druva Europe":"Druva",
  "Getac Technology":"Getac",
  "Splunk Services Germany":"Splunk",
  "Everpure Germany":"Pure Storage",
  "BANI Hausverwaltung und Immobilien":"BANI Hausverwaltung & Immobilien",
  Blancdenoir:"Blancdenoir Communication Agency",
  "COWORKING Piding / c/o Salanje":"COWORKING Piding",
  "DIQP Deutsches Institut für Qualitätsstandards und prüfung e.V":"DIQP Deutsches Institut für Qualitätsstandards und -prüfung e.V",
  "Florschütz Consulting":"Florschuetz Consulting",
  "Hydrofast / VICKY":"Hydrofast",
  "KINGNETZ CYBERSECURITY Andrea Semm":"KINGNETZ CYBERSECURITY | Andrea Semm",
  "Trooper.AI c/o Media Trooper":"Trooper.AI – Ein Produkt von: Media Trooper",
  "Unternehmen der Comarch-Gruppe":"Comarch",
  "MongoDB Logo":"MongoDB",
  "Infor Logo":"Infor",
  "Logo Abnormal AI":"Abnormal AI",
  "Baumer/Machine Design":"Baumer",
  "DigiKey/Machine Design":"DigiKey",
  "Electronic Design/Infineon":"Infineon",
  "Oil & Gas Journal/Siemens Industry Software":"Siemens",
  "Oil & Gas Journal/TimescaleDB":"Tiger Data",
  "Wastewater Digest / ABB":"ABB",
  "Wastewater Digest/ABB":"ABB",
  "Wastewater Digest Krohne":"KROHNE",
  "Water Technology / Cytiva":"Cytiva",
  "Water Technology/Cytiva":"Cytiva",
  "NorthC Press Desk":"NorthC",
  "Lee Kum Kee c/o Industrie-Contact":"Lee Kum Kee",
  "Trendos c/o Industrie-Contact":"Trendos",
};
for(const [legacyName,canonicalName] of Object.entries(legacyProviderAliases)){
  const provider=catalog.companies.find(item=>item.name===canonicalName);
  if(provider)providerByPath.set(providerPath(legacyName).split("/").at(-1)!,provider);
}

export function getKnowledge(slug:string){
  const id=Number.parseInt(slug.split("-",1)[0]||"",10);
  return Number.isFinite(id)?knowledgeById.get(id):undefined;
}

export function getProvider(slug:string){return providerByPath.get(slug)}
export function getKnowledgeById(id:number){return knowledgeById.get(id)}
export function isCanonicalKnowledgeSlug(slug:string,item:KnowledgeItem){return knowledgePath(item).endsWith(`/${slug}`)}

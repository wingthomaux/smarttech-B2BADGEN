import {catalog,getKnowledge,getProvider} from "./catalog";
import {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath,slugify} from "./catalog-paths";
import {englishKnowledge} from "./english";
import {portalProfiles} from "./portal-profiles";
import contract from "../.openai/project-contract.json";
export type RecoveryLocale="de"|"en";
const fold=(text:string)=>text.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("de-DE").replace(/ß/g,"ss");
const words=(text:string)=>fold(text).match(/[\p{L}\p{N}]+/gu)||[];
const stops=new Set(["und","and","the","fur","fuer","for","von","with","mit","der","die","das","ein","eine","de","en","html","htm","php","artikel","article","detail","details","anbieter","providers","provider","unternehmen","company","wissen","knowledge","blog","news"]);
export const recoverySearchPath=(locale:RecoveryLocale)=>locale==="en"?"/en/search":"/suche";
export const publicRecoveryUrl=(path:string)=>contract.public_origin+contract.public_prefix+path;
const providerUrl=(name:string,en:boolean)=>en?englishProviderPath(name):providerPath(name);
function buildRecoveryData(){
const knowledgeRows=catalog.knowledge.map(item=>({item,en:englishKnowledge(item)}));
const providerIndex=catalog.companies.map(provider=>({provider,tokens:words([provider.name,...provider.variants].join(" "))}));
const knowledgeIndex=knowledgeRows.map(row=>({...row,tokens:words([row.item.title,row.en.title,row.item.provider,row.item.solution,row.en.solution].join(" "))}));
const identities=new Map<string,Set<string>>();
function addIdentity(key:string,target:string){const values=identities.get(key)||new Set<string>();values.add(target);identities.set(key,values);}
for(const provider of catalog.companies)for(const name of [provider.name,...provider.variants])addIdentity("p:"+slugify(name),provider.name);
for(const row of knowledgeRows)for(const title of [row.item.title,row.en.title])addIdentity("k:"+slugify(title),String(row.item.id));
 return {providerIndex,knowledgeIndex,identities};
}
let recoveryData:ReturnType<typeof buildRecoveryData>|undefined;
function getRecoveryData(){return recoveryData??=buildRecoveryData();}
function matches(tokens:string[],needles:string[]){return needles.every(term=>term.length<=4?tokens.includes(term):tokens.some(word=>word.includes(term)));}
export function searchRecoveryCatalog(query:string,locale:RecoveryLocale){
 const q=query.trim().slice(0,160),needles=words(q).filter(term=>!stops.has(term)).slice(0,8),en=locale==="en";
 if(!needles.length)return {query:q,providers:[],knowledge:[],total:0};
 const {providerIndex,knowledgeIndex}=getRecoveryData();
 const providers=providerIndex.filter(row=>matches(row.tokens,needles)).map(({provider})=>({name:provider.name,url:providerUrl(provider.name,en)}));
 const knowledge=knowledgeIndex.filter(row=>matches(row.tokens,needles)).map(row=>({name:en?row.en.title:row.item.title,provider:row.item.provider,url:en?englishKnowledgePath(row.item,row.en.title):knowledgePath(row.item)}));
 return {query:q,providers,knowledge,total:providers.length+knowledge.length};
}
const staticAliases:Record<string,string>={"impressum.html":"/impressum","datenschutz.html":"/datenschutz","privacy":"/datenschutz","imprint":"/impressum","eworld":"/region/eworld","e-world":"/region/eworld","region/e-world":"/region/eworld"};
export function resolveMissingRoute(pathname:string):{path:string;kind:"canonical"|"search"}|undefined{
 let decoded:string;try{decoded=decodeURIComponent(pathname);}catch{return;}
 if(decoded.length>500||/[\x00-\x1f\\]/.test(decoded)||/(?:^|\/)(?:api|assets|_next|_vinext|wp-admin|wp-content|wp-includes|__proto__|\.well-known)(?:\/|$)/i.test(decoded)||/\.(?!html?$)[a-z0-9]{1,8}$/i.test(decoded)||decoded.includes(".."))return;
 decoded=decoded.replace(/^\/smarttech(?=\/|$)/,"");
 if(decoded===""||decoded==="/")return {path:"/",kind:"canonical"};
 const clean=decoded.replace(/^\/+|\/+$/g,""),en=/^en(?:\/|$)/i.test(clean),locale=en?"en":"de",local=clean.replace(/^en\//i,"");
 if(Object.hasOwn(staticAliases,local)){const path=staticAliases[local];return {path:en?(path==="/impressum"?"/en/imprint":path==="/datenschutz"?"/en/privacy":"/en"+path):path,kind:"canonical"};}
 const pieces=local.split("/");if(pieces.length>3||!pieces.at(-1))return;
 const leaf=pieces.at(-1)!.replace(/\.html?$/i,"");
 const family=pieces.length===1?"":pieces[0].toLowerCase();
 const providerFamily=["","anbieter","provider","providers","unternehmen","company","companies"].includes(family);
 const articleFamily=["wissen","knowledge","artikel","article","articles"].includes(family);
 if(articleFamily){const item=getKnowledge(leaf);if(item&&/^\d+(?:-|$)/.test(leaf)){const translated=englishKnowledge(item);return {path:en?englishKnowledgePath(item,translated.title):knowledgePath(item),kind:"canonical"};}}
 const {identities}=getRecoveryData();
 if(["portal","portals","portale"].includes(family)){const portal=portalProfiles.find(portal=>slugify(portal.name)===slugify(leaf));if(portal)return {path:(en?"/en/portals/":"/portale/")+slugify(portal.name),kind:"canonical"};}
 if(providerFamily){
   const direct=getProvider(leaf);if(direct)return {path:providerUrl(direct.name,en),kind:"canonical"};
   for(const key of [leaf,leaf.replace(/-[a-z0-9]{5}$/i,"")]){
     const names=identities.get("p:"+slugify(key));if(names?.size===1)return {path:providerUrl([...names][0],en),kind:"canonical"};
   }
 }
 if(articleFamily||pieces.length===1){const ids=identities.get("k:"+slugify(leaf));if(ids?.size===1){const item=catalog.knowledge.find(item=>item.id===Number([...ids][0]))!;return {path:en?englishKnowledgePath(item,englishKnowledge(item).title):knowledgePath(item),kind:"canonical"};}}
 const query=words(leaf.replace(/^[0-9]+-/ ,"")).filter(term=>!stops.has(term)).join(" ").slice(0,160);
 const result=searchRecoveryCatalog(query,locale);
 if(result.total)return {path:recoverySearchPath(locale)+"?"+new URLSearchParams({q:query}),kind:"search"};
}

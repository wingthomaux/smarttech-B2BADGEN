import data from "./provider-locations.json";
import {catalog} from "./catalog";

export type Locale="de"|"en";
export type Region=typeof data.regions[number];
export type ProviderLocation=typeof data.locations[number];
export const regions=data.regions;
export const providerLocations=data.locations;
export const locationKinds={
  headquarters:{de:"Hauptsitz",en:"Headquarters"},
  "registered-office":{de:"Firmensitz / Impressumsadresse",en:"Registered office / legal address"},
  office:{de:"Standort / Niederlassung",en:"Office / local entity"},
  development:{de:"Entwicklungszentrum",en:"Development centre"},
} as const;
export type LocationKind=keyof typeof locationKinds;
export function regionPath(id?:string,locale:Locale="de"){return (locale==="en"?"/en/regions":"/regionen")+(id?`/${id}`:"")}
export function getRegion(id:string){return regions.find(region=>region.id===id)}
export function regionAncestors(id:string):Region[]{const region=getRegion(id);return region?[region,...(region.parent?regionAncestors(region.parent):[])]:[]}
export function locationsForProvider(name:string){return providerLocations.filter(location=>location.provider===name)}
export function locationsInRegion(id:string){return providerLocations.filter(location=>regionAncestors(location.region).some(region=>region.id===id))}
export function regionalProviders(id:string,query="",kind="",locale:Locale="de"){
  const needle=query.trim().toLocaleLowerCase(locale);
  const regionalLocations=locationsInRegion(id).filter(location=>!kind||location.kind===kind);
  return catalog.companies.flatMap(provider=>{
    const locations=regionalLocations.filter(location=>location.provider===provider.name);
    if(!locations.length)return [];
    const text=[provider.name,...provider.variants,...locations.flatMap(location=>[location.city,location.entity])].join(" ").toLocaleLowerCase(locale);
    return !needle||text.includes(needle)?[{provider,locations}]:[];
  }).sort((a,b)=>a.provider.name.localeCompare(b.provider.name,locale,{sensitivity:"base"}));
}
export const mappedProviderCount=new Set(providerLocations.map(location=>location.provider)).size;

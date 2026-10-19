export const siteOrigin="https://smarttech.b2badgen.com";

export function slugify(value:string){
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/ß/g,"ss")
    .replace(/&/g," und ")
    .toLocaleLowerCase("de-DE")
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-+|-+$/g,"")
    .slice(0,96)
    .replace(/-+$/g,"")||"eintrag";
}

export function knowledgePath(item:{id:number;title:string}){
  return `/wissen/${item.id}-${slugify(item.title)}`;
}

export function englishKnowledgePath(item:{id:number;title:string},englishTitle:string){
  return `/en/knowledge/${item.id}-${slugify(englishTitle)}`;
}

function shortHash(value:string){
  let hash=2166136261;
  for(const character of value){hash^=character.codePointAt(0)??0;hash=Math.imul(hash,16777619)}
  return (hash>>>0).toString(36).slice(0,5);
}

export function providerPath(name:string){
  return `/anbieter/${slugify(name)}-${shortHash(name)}`;
}

export function englishProviderPath(name:string){
  return `/en/providers/${slugify(name)}-${shortHash(name)}`;
}

export function taxonomyPath(space:string,challenge?:string,locale:"de"|"en"="de"){
  const params=new URLSearchParams({space});
  if(challenge)params.set("challenge",challenge);
  return `${locale==="en"?"/en":"/"}?${params.toString()}#pilot`;
}

export function taxonomyFacetPath(space:string,facet:"solution"|"delivery"|"lifecycle"|"area"|"channel"|"topic",value:string,locale:"de"|"en"="de"){
  const params=new URLSearchParams({space,[facet]:value});
  return `${locale==="en"?"/en":"/"}?${params.toString()}#pilot`;
}

export function absoluteUrl(path:string){return `${siteOrigin}${path}`}

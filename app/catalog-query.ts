export const catalogQueryKeys=["q","portal","solutionTopic","space","challenge","solution","delivery","lifecycle","area","channel","topic","tab"] as const;
export function catalogQueryString(values:Record<string,string|null|undefined>){
  const params=new URLSearchParams();
  for(const key of catalogQueryKeys){const value=values[key];if(!value||value==="alle"||(key==="space"&&value==="Produktion und Produkte")||(key==="tab"&&value==="wirkungsraeume"))continue;params.set(key,value);}
  return params.toString();
}
export function catalogLanguageHref(locale:"de"|"en",query:string,prefix=""){
  return `${prefix}${locale==="en"?"/en":"/"}${query?`?${query}`:""}`;
}

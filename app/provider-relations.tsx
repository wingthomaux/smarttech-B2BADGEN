import Link from "@/app/public-link";
import {providerPath,englishProviderPath} from "./catalog-paths";
import type {ProviderProfile} from "./provider-profiles";

export function RelatedProviderProfiles({relations,locale="de"}:{relations:NonNullable<ProviderProfile["relatedProviders"]>;locale?:"de"|"en"}){
  return <section className="mt-6 border-l-2 border-primary bg-primary/5 px-5 py-4"><h2 className="text-sm font-semibold">{locale==="en"?"Related providers and business units":"Verbundene Anbieter und Geschäftsbereiche"}</h2>{relations.map(relation=><div key={relation.name} className="mt-3 text-sm leading-6"><Link href={locale==="en"?englishProviderPath(relation.name):providerPath(relation.name)} className="font-semibold text-primary underline underline-offset-4">{relation.name}</Link><p className="mt-1 text-muted-foreground">{relation.context[locale]}</p>{relation.sourceUrl&&<a href={relation.sourceUrl} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">{locale==="en"?"Source for this relationship":"Quelle für diesen Bezug"}</a>}</div>)}</section>;
}

import type {KnowledgeItem} from "./catalog";

export function KnowledgeProviderRelations({item,locale="de"}:{item:KnowledgeItem;locale?:"de"|"en"}){
  const names=item.additionalProviders||[];
  const warning=item.sourceReviewWarning;
  if(!names.length&&!warning)return null;
  return <>
    {warning&&<section className="mt-8 border-l-2 border-amber-500 bg-amber-50 px-5 py-4"><h2 className="text-sm font-semibold">{locale==="en"?"Source review note":"Hinweis zur Quellenprüfung"}</h2><p className="mt-2 text-sm leading-6">{warning[locale]}</p></section>}
    {names.length>0&&<section className="mt-8 border-l-2 border-primary bg-primary/5 px-5 py-4"><h2 className="text-sm font-semibold">{locale==="en"?"Company relationships in this article":"Unternehmensbezüge in diesem Artikel"}</h2>{names.map(name=>{
      const relation=item.providerRelations?.find(entry=>entry.name===name);
      return <div key={name} className="mt-4 text-sm leading-6"><Link href={locale==="en"?englishProviderPath(name):providerPath(name)} className="font-semibold text-primary underline underline-offset-4">{name}</Link>{relation&&<><p className="mt-1 font-medium">{relation.type[locale]}</p><p className="mt-1 text-muted-foreground">{relation.context[locale]}</p><a href={relation.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-primary underline underline-offset-4">{locale==="en"?"Source for this relationship":"Quelle für diesen Bezug"}</a></>}</div>;
    })}<p className="mt-4 text-xs leading-5 text-muted-foreground">{locale==="en"?"The article retains its original provider and source. The relationship does not establish unrestricted availability or approval of every partner service.":"Der Artikel behält seinen ursprünglichen Anbieter und seine Quelle. Der Bezug bedeutet keine uneingeschränkte Verfügbarkeit oder Freigabe sämtlicher Partnerleistungen."}</p></section>}
  </>;
}

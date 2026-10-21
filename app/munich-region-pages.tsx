import type {Metadata} from "next";
import type {ReactNode} from "react";
import Link from "./public-link";
import {LanguageToggle} from "./language-toggle";
import {safeJsonLd} from "./detail-components";
import {providerPath,englishProviderPath} from "./catalog-paths";
import {munichRegions,munichRegionPath,type MunichRegion,type RegionLocale,type RegionSource} from "./munich-region-data";

export function munichRegionMetadata(kind:MunichRegion,locale:RegionLocale):Metadata{
  const data=munichRegions[kind],title=data.title[locale]+" | SmartTech",description=data.description[locale];
  return {title,description,alternates:{canonical:munichRegionPath(kind,locale),languages:{"de-DE":munichRegionPath(kind,"de"),en:munichRegionPath(kind,"en")}},openGraph:{title,description,url:munichRegionPath(kind,locale),locale:locale==="en"?"en_GB":"de_DE",type:"article"}};
}
function Section({id,title,children}:{id:string;title:string;children:ReactNode}){
  return <section id={id} className="mt-9 space-y-4 border-t pt-7"><h2 className="text-xl font-semibold tracking-tight">{title}</h2>{children}</section>;
}
function Sources({items,locale}:{items:RegionSource[];locale:RegionLocale}){
  return <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">{items.map(item=><li key={item.url}><a href={item.url} className="text-primary underline underline-offset-4">{item.label[locale]}</a></li>)}</ul>;
}
export function MunichRegionPage({kind,locale}:{kind:MunichRegion;locale:RegionLocale}){
  const data=munichRegions[kind],en=locale==="en",text=(de:string,english:string)=>en?english:de;
  const jsonLd={"@context":"https://schema.org","@type":"Article",headline:data.title[locale],inLanguage:locale,url:"https://smarttech.b2badgen.com"+munichRegionPath(kind,locale),dateModified:"2026-10-21",publisher:{"@type":"Organization",name:"B2B AdGen Research"},citation:[data.grok,...data.official,...data.companies.flatMap(company=>company.sources)].map(item=>item.url)};
  return <main className="mx-auto max-w-4xl px-5 py-10 text-sm leading-7 sm:text-base lg:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(jsonLd)}}/>
    <nav aria-label={text("Seitennavigation","Page navigation")} className="mb-8 flex items-center justify-between gap-4"><Link href={en?"/en":"/"} className="font-semibold text-primary">← SmartTech {text("Katalog","catalogue")}</Link><LanguageToggle locale={locale} href={munichRegionPath(kind,en?"de":"en")}/></nav>
    <article>
      <header><p className="text-xs font-semibold uppercase tracking-widest text-primary">{text("Regionen · Bayern · ","Regions · Bavaria · ")}{data.name[locale]}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{data.title[locale]}</h1><p className="mt-4 text-muted-foreground">{text("Redaktioneller Stand: 21. Oktober 2026","Editorial review: 21 October 2026")}</p></header>
      <Section id="report" title={text("1. Bericht · unabhängig und werbefrei","1. Report · independent and advertising-free")}>
        <p>{text("Dieser Regionsbericht ist redaktionell, werbefrei, ohne bezahlte Platzierung und kein Whitepaper eines Anbieters. Im Mittelpunkt stehen Energie, Telekommunikation und Internet. Finanzdienstleistungen und weitere smarte Technik folgen später.","This regional report is editorial, advertising-free, carries no paid placement and is not a provider whitepaper. It focuses on energy, telecommunications and internet services. Financial services and other smart technologies will follow later.")}</p>
        <section aria-labelledby="regional-frame" className="space-y-4 border-l-2 border-primary/30 pl-5">
          <h3 id="regional-frame" className="font-semibold">{text("Regionaler Rahmen · gekürzte Übersetzung aus Grokipedia","Regional context · abridged adaptation from Grokipedia")}</h3>
          <p>{data.frame[locale]}</p><Sources items={[data.grok]} locale={locale}/>
          <p className="text-sm text-muted-foreground">{text("Der regionale Rahmen wurde gekürzt übersetzt und redaktionell angepasst. Zahlen und weitergehende Wertungen wurden ausgelassen. Die am 21.10.2026 geprüfte Live-Fußzeile zeigt keine CC-BY-SA-4.0-Kennzeichnung; deshalb gilt hier die Zuordnung zur SpaceXSI Community License. Unternehmensberichte und Erwerbsblöcke gehören nicht zu diesem Enzyklopädieauszug.","The regional context was abridged and editorially adapted. Numerical claims and broader assessments were omitted. The live footer checked on 21 October 2026 shows no CC BY-SA 4.0 notice; the SpaceXSI Community License attribution therefore applies here. Company reports and purchase-offer sections are outside this encyclopedia excerpt.")}</p>
          <p className="text-sm" lang="en">This product includes materials licensed under the xAI Community License. All rights reserved. Copyright © xAI 2026.</p><p className="text-sm" lang="en">Powered by xAI</p>
        </section>
        <p>{data.context[locale]}</p><Sources items={data.official} locale={locale}/>
        <p>{text("Die folgenden Unternehmensabschnitte sind eigenständige Redaktion aus offiziellen Anbieterquellen. Sie sind keine Übersetzungen von Grokipedia-Unternehmensartikeln und keine Empfehlung oder vollständige Marktübersicht.","The company sections below are independent editorial writing based on official provider sources. They are not translations of Grokipedia company articles, endorsements or a complete market survey.")}</p>
      </Section>
      {data.companies.map(company=><Section key={company.id} id={company.id} title={company.name}>
        {company.paragraphs.map((paragraph,index)=><p key={index}>{paragraph[locale]}</p>)}<Sources items={company.sources} locale={locale}/>
        {company.catalogProvider?<p><Link className="text-primary underline underline-offset-4" href={en?englishProviderPath(company.catalogProvider):providerPath(company.catalogProvider)}>{text("Bestehendes Anbieterprofil im Katalog","Existing provider profile in the catalogue")}: {company.catalogProvider}</Link></p>:null}
      </Section>)}
      <Section id="offers" title={text("2. Angebot · außerhalb des Enzyklopädietexts","2. Offers · outside the encyclopedia text")}>
        <p>{text("Umsatz entsteht nur, wenn eine konkrete Leistung vorgestellt wird und sich jemand zum Erwerb entschließt. Die Berichterstattung ersetzt keine Prüfung von Konditionen und örtlicher Verfügbarkeit. Hier liegt kein geprüftes konkretes Erwerbsangebot vor.","Revenue arises only when a specific service is presented and someone decides to purchase it. Reporting does not replace checking commercial terms and local availability. No verified specific purchase offer is available here.")}</p>
        {data.companies.map(company=><div className="border p-5" key={company.id}><h3 className="font-semibold">{company.name}</h3><p>{text("Kein konkretes Erwerbsangebot","No specific purchase offer")}</p></div>)}
      </Section>
      <Section id="users" title={text("3. Nutzer · Information und Datenschutz","3. Users · information and privacy")}>
        <p>{text("Angaben von Nutzern dienen nur der besseren Information auf der Seite. Sie werden nicht an Werbekunden gegeben. Keine klassische Werbung, keine Paid Listings, kein Tracking dafür. Dieser Bericht erhebt keine zusätzlichen Nutzerangaben.","User information serves only to improve information on this page. It is not given to advertising clients. No conventional advertising, no paid listings and no tracking for those purposes. This report collects no additional user information.")} <Link className="text-primary underline" href={en?"/en/privacy":"/datenschutz"}>{text("Datenschutzerklärung","Privacy policy")}</Link>.</p>
      </Section>
      <Section id="source-notes" title={text("Quellenhinweise und Grenzen","Source notes and limits")}>
        {data.notes.map((note,index)=><p key={index}>{note[locale]}</p>)}
        <p>{text("Die im Bericht genannten Registerangaben sind durch offizielle Impressen belegt, nicht durch einen separat abgerufenen amtlichen Registerabdruck. Bilanz- und Umsatzzahlen aus Drittprofilen werden nicht übernommen. Es entstehen keine neuen kuratierten Wissensobjekte; vorhandene Anbieterprofile und Prüfstände bleiben erhalten.","Registration details in this report are supported by official legal notices, not by separately retrieved official register extracts. Balance-sheet and revenue figures from third-party profiles are excluded. No new curated knowledge items are created; existing provider profiles and review states are preserved.")}</p>
      </Section>
    </article>
    <nav aria-label={text("Weitere Regionsberichte","More regional reports")} className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t pt-6 text-sm font-medium text-primary">
      <Link className="underline underline-offset-4" href={munichRegionPath(kind==="city"?"district":"city",locale)}>{munichRegions[kind==="city"?"district":"city"].name[locale]}</Link><Link className="underline underline-offset-4" href={en?"/en/region/wittlich":"/region/wittlich"}>Wittlich</Link>
    </nav>
  </main>;
}

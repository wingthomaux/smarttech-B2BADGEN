import type {Metadata} from "next";
import Link from "./public-link";
import {SiteHeader} from "./site-header";
import {absoluteUrl,englishProviderPath,providerPath,taxonomyFacetPath,taxonomyPath} from "./catalog-paths";

const atlasDe="https://atlas.b2badgen.com/artikel/engineering-software-agenten-marktanalyse/";
const atlasEn="https://atlas.b2badgen.com/en/articles/engineering-software-agenten-marktanalyse/";
const source="https://de.linkedin.com/pulse/eiszeit-f%C3%BCr-mittelst%C3%A4ndische-anbieter-von-dr-thomas-tosse-ctqyf";
const providers:string[]=["Siemens Digital Industries Software","Schneider Electric GmbH","Dassault Systèmes","Anthropic"];
const topics=[
  ["Digital Twin und Simulation","Digital twin and simulation"],
  ["Manufacturing Execution System (MES)","Manufacturing execution system (MES)"],
  ["Engineering-Datenmanagement","Engineering data management"],
  ["Industrie- und Engineering-Lösung","Industrial and engineering solutions"],
] as const;

export const engineeringContextPaths={de:"/kontext/engineering-software-ki-agenten",en:"/en/context/engineering-software-ai-agents"} as const;

export function engineeringContextMetadata(locale:"de"|"en"):Metadata{
  const en=locale==="en",path=engineeringContextPaths[locale];
  const title=en?"Engineering software and AI agents | SmartTech":"Engineering-Software und KI-Agenten | SmartTech";
  const description=en?"SmartTech links existing provider profiles and catalogue topics to an external market-analysis thesis without treating it as product or impact evidence.":"SmartTech verknüpft bestehende Anbieterprofile und Katalogthemen mit einer externen Marktthese, ohne daraus Produkt- oder Wirkungsnachweise abzuleiten.";
  return {title,description,alternates:{canonical:path,languages:{"de-DE":engineeringContextPaths.de,en:engineeringContextPaths.en}},openGraph:{title,description,url:absoluteUrl(path)}};
}

export function EngineeringAgentContext({locale}:{locale:"de"|"en"}){
  const en=locale==="en",t=(de:string,enText:string)=>en?enText:de;
  const path=(name:string)=>en?englishProviderPath(name):providerPath(name);
  return <><SiteHeader locale={locale} alternateHref={engineeringContextPaths[en?"de":"en"]}/><main className="mx-auto max-w-5xl px-5 py-10 leading-7">
    <p className="section-kicker">{t("Redaktioneller Markt- und Auswahlkontext","Editorial market and selection context")}</p>
    <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t("Engineering-Software und KI-Agenten","Engineering software and AI agents")}</h1>
    <p className="mt-5 text-lg">{t("Ein externer Meinungsbeitrag beschreibt möglichen Konsolidierungs- und Veränderungsdruck auf mittelständische Engineering-Software-Anbieter. Diese Seite verbindet die dort genannten Marktfragen mit bereits geprüften SmartTech-Profilen und Katalogthemen.","An external opinion article describes possible consolidation and change pressure on mid-sized engineering-software providers. This page connects those market questions to existing reviewed SmartTech profiles and catalogue topics.")}</p>
    <section className="mt-10 border-t pt-7"><h2 className="text-xl font-semibold">{t("Bereits vorhandene Anbieterprofile","Existing provider profiles")}</h2><p className="mt-3 text-muted-foreground">{t("Die Verknüpfung bedeutet nur, dass das Unternehmen im Beitrag genannt wird und im SmartTech-Katalog ein eigenes Profil besitzt. Sie belegt weder eine Partnerschaft noch eine bestimmte Produktfunktion oder Marktwirkung.","A link means only that the company is named in the article and has a separate SmartTech profile. It does not establish a partnership, a particular product capability or market impact.")}</p><ul className="mt-4 grid gap-3 sm:grid-cols-2">{providers.map(name=><li key={name}><Link className="text-primary underline" href={path(name)}>{name} →</Link></li>)}</ul></section>
    <section className="mt-10 border-t pt-7"><h2 className="text-xl font-semibold">{t("Passende Katalogthemen","Relevant catalogue topics")}</h2><p className="mt-3 text-muted-foreground">{t("Die Links öffnen vorhandene Filterbestände. Themen können sich überschneiden; die Zuordnung ist keine neue Produktprüfung.","The links open existing filtered catalogue sets. Topics may overlap; the association is not a new product review.")}</p><ul className="mt-4 grid gap-3 sm:grid-cols-2">{topics.map(([value,label])=><li key={value}><Link className="text-primary underline" href={taxonomyFacetPath("Produktion und Produkte","solution",value,locale)}>{en?label:value} →</Link></li>)}</ul><Link className="mt-5 inline-block text-primary underline" href={taxonomyPath("Produktion und Produkte",undefined,locale)}>{t("Gesamten Bestand Produktion und Produkte durchsuchen","Search all production and product entries")} →</Link></section>
    <section className="mt-10 border-t pt-7"><h2 className="text-xl font-semibold">{t("Quellen- und Aussagegrenze","Source and claim boundary")}</h2><p className="mt-3">{t("Die These unterscheidet KI-Integration, Schnittstellen für externe Agenten und den bewussten Einsatz konventioneller Algorithmen. Sie ist keine unabhängige Marktstudie und belegt keine allgemeine Verdrängung, Nutzung oder wirtschaftliche Wirkung.","The thesis distinguishes AI integration, interfaces for external agents and the deliberate use of conventional algorithms. It is not an independent market study and does not establish general displacement, adoption or economic impact.")}</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3"><a className="text-primary underline" href={en?atlasEn:atlasDe} target="_blank" rel="noreferrer">{t("Einordnung im Interaktivierungs-Atlas","Interactivation Atlas assessment")} ↗</a><a className="text-primary underline" href={source} target="_blank" rel="noreferrer">{t("Originalbeitrag von Dr. Thomas Tosse · 17.11.2026","Original article by Dr Thomas Tosse · 17 November 2026")} ↗</a></div><p className="mt-4 text-sm text-muted-foreground">{t("Synopsys, Ansys, PTC und Autodesk werden im Beitrag ebenfalls genannt, besitzen im aktuellen SmartTech-Bestand aber noch kein separat kuratiertes Anbieterprofil.","Synopsys, Ansys, PTC and Autodesk are also named in the article but do not yet have separately curated provider profiles in the current SmartTech catalogue.")}</p></section>
  </main></>;
}

export function EngineeringAtlasProviderReference({name,locale}:{name:string;locale:"de"|"en"}){
  if(!providers.includes(name))return null;
  const en=locale==="en";
  return <section className="mt-8 border-l-2 border-primary bg-primary/5 px-5 py-4"><h2 className="font-semibold">{en?"Market context: engineering software and AI agents":"Marktkontext: Engineering-Software und KI-Agenten"}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{en?"The external opinion article names this company in a wider market thesis. The link is contextual only and does not establish product capabilities, partnership, displacement or impact.":"Der externe Meinungsbeitrag nennt dieses Unternehmen innerhalb einer übergreifenden Marktthese. Die Verknüpfung ist nur Kontext und belegt weder Produktfunktionen, Partnerschaft, Verdrängung noch Wirkung."}</p><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link className="text-primary underline" href={engineeringContextPaths[locale]}>{en?"SmartTech topic context":"SmartTech-Themenkontext"} →</Link><a className="text-primary underline" href={en?atlasEn:atlasDe} target="_blank" rel="noreferrer">{en?"Atlas assessment":"Atlas-Einordnung"} ↗</a></div></section>;
}

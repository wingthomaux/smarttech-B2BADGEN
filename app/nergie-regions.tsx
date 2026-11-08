import {NergieRegionalResearch,nergieRegionalResearchSourceUrls} from "./nergie-regional-research";
import {NergieRegionalCharacter,nergieRegionalSourceUrls} from "./nergie-regional-character";
import {NergieExternalSources,nergieExternalSourceUrls} from "./nergie-external-sources";
import type {Metadata} from "next";
import Link from "./public-link";
import {LanguageToggle} from "./language-toggle";
import {absoluteUrl,providerPath,englishProviderPath} from "./catalog-paths";
import {safeJsonLd} from "./detail-components";
import {EworldExhibitor} from "./eworld-2027";

type Locale="de"|"en";
type Region="nuernberg"|"mittelfranken";
const provider="N-ERGIE Aktiengesellschaft";
const sources={
  company:"https://www.n-ergie.de/n-ergie/unternehmen/wer-wir-sind/ueberblick/",
  business:"https://www.n-ergie.de/geschaeftskunden/",
  iot:"https://www.n-ergie.de/n-ergie/unternehmen/innovationundtechnik/lorawan/",
  network:"https://www.n-ergie-netz.de/n-ergie-netz/unternehmen/aktuelles/",
  battery:"https://magazin.n-ergie.de/presse/weiterer-speicher-macht-heizkraftwerk-der-n-ergie-noch-flexibler/",
};
const regionPath=(region:Region,locale:Locale)=>(locale==="en"?"/en":"")+"/region/"+region;
const label=(region:Region,locale:Locale)=>region==="nuernberg"?(locale==="en"?"Nuremberg":"Nürnberg"):(locale==="en"?"Middle Franconia":"Mittelfranken");

export function nergieRegionMetadata(region:Region,locale:Locale):Metadata{
  const en=locale==="en",place=label(region,locale);
  const title=en?`${place}: N-ERGIE, energy and smart infrastructure | SmartTech`:`${place}: N-ERGIE, Energie und smarte Infrastruktur | SmartTech`;
  const description=region==="nuernberg"?(en?"Nuremberg and N-ERGIE: heat networks, Sandreuth battery, Diehl metering, TRICERA and documented company connections with trade and official sources.":"Nürnberg und N-ERGIE: Fernwärme, Speicher Sandreuth, Diehl-Zählertechnik, TRICERA und belegte Unternehmensbezüge mit Fach- und Behördenquellen."):(en?"Middle Franconia and N-ERGIE: solar feed-in, grid constraints, asset operations and CLS ON, with documented IT connections and geographical limits.":"Mittelfranken und N-ERGIE: Solareinspeisung, Netzengpässe, Betriebsführung und CLS ON mit belegten IT-Bezügen und räumlicher Abgrenzung.");
  return {title,description,alternates:{canonical:regionPath(region,locale),languages:{"de-DE":regionPath(region,"de"),en:regionPath(region,"en")}},openGraph:{title,description,type:"article",url:absoluteUrl(regionPath(region,locale))}};
}

export function NergieRegionLinks({name,locale}:{name:string;locale:Locale}){
  if(name!==provider)return null;
  const en=locale==="en";
  return <nav aria-label={en?"N-ERGIE regional context":"N-ERGIE im regionalen Kontext"} className="mt-6 flex flex-wrap gap-4 border-y py-4 text-sm text-primary">{(["nuernberg","mittelfranken"] as const).map(region=><Link className="underline" key={region} href={regionPath(region,locale)}>{label(region,locale)}</Link>)}<Link className="underline" href={(en?"/en":"")+"/region/eworld?q=N-ERGIE"}>E-world 2027</Link></nav>;
}

export function NergieRegionPage({region,locale}:{region:Region;locale:Locale}){
  const en=locale==="en",city=region==="nuernberg",text=(de:string,english:string)=>en?english:de;
  const title=text(`${label(region,locale)}: N-ERGIE, Energie und smarte Infrastruktur`,`${label(region,locale)}: N-ERGIE, energy and smart infrastructure`);
  const source=(href:string,de:string,english:string)=><a href={href} target="_blank" rel="noreferrer" className="text-primary underline">{text(de,english)} ↗</a>;
  const jsonLd={"@context":"https://schema.org","@type":"Article",headline:title,inLanguage:locale,url:absoluteUrl(regionPath(region,locale)),dateModified:"2026-11-08",publisher:{"@type":"Organization",name:"B2B AdGen Research"},citation:[...new Set([...Object.values(sources),...nergieExternalSourceUrls,...nergieRegionalSourceUrls(region),...nergieRegionalResearchSourceUrls])]};
  return <main className="mx-auto max-w-4xl px-5 py-10 text-sm leading-7 sm:text-base lg:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(jsonLd)}}/>
    <nav className="mb-8 flex items-center justify-between gap-4" aria-label={text("Seitennavigation","Page navigation")}><Link href={en?"/en":"/"} className="font-semibold text-primary">← SmartTech {text("Katalog","catalogue")}</Link><LanguageToggle locale={locale} href={regionPath(region,en?"de":"en")}/></nav>
    <article>
      <header><p className="text-xs font-semibold uppercase tracking-widest text-primary">{text("Regionen · Bayern · Energie und digitale Infrastruktur","Regions · Bavaria · Energy and digital infrastructure")}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1><p className="mt-4 text-muted-foreground">{text("Regional ergänzt: 8. November 2026. Dieser Bericht beginnt mit N-ERGIE und ist keine vollständige Marktübersicht der Region.","Regionally expanded: 8 November 2026. This report starts with N-ERGIE and is not a complete regional market directory.")}</p></header>
      <NergieRegionalCharacter region={region} locale={locale}/>
      <NergieRegionalResearch region={region} locale={locale}/>
      <section id="regional-context" className="mt-8 space-y-4 border-t pt-6"><h2 className="text-xl font-semibold">{text("Standort, Versorgung und Netzgebiet","Headquarters, supply and network territory")}</h2>
        <p>{city?text("N-ERGIE Aktiengesellschaft hat ihren Sitz in Nürnberg. Neben Strom und Erdgas nennt das Unternehmen für Nürnberg auch Trinkwasser und Fernwärme. Diese örtlichen Leistungen dürfen nicht pauschal auf ganz Mittelfranken übertragen werden.","N-ERGIE Aktiengesellschaft is based in Nuremberg. In addition to electricity and natural gas, the company lists drinking water and district heating for Nuremberg. These local services cannot be assumed to cover all of Middle Franconia."):text("N-ERGIE beschreibt große Teile Mittelfrankens und angrenzende Gebiete als Versorgungsregion für Strom und Erdgas. Trinkwasser und Fernwärme werden dagegen ausdrücklich für Nürnberg genannt. Netzgebiet, Liefergebiet und Unternehmenssitz sind unterschiedliche Zuordnungen.","N-ERGIE describes large parts of Middle Franconia and neighbouring areas as its electricity and gas supply region. Drinking water and district heating are specifically identified for Nuremberg. Network territory, supply area and headquarters are distinct geographic relationships.")}</p>
        <p>{text("Die rechtlich eigenständige N-ERGIE Netz GmbH betreibt die Strom- und Gasnetze. Das beschriebene Stromnetz reicht vom Würzburger Umland bis Eichstätt und von Weikersheim bis Sulzbach-Rosenberg. Daraus folgt weder eine flächendeckende Versorgung aller Orte in diesen Grenzen noch die Verfügbarkeit jedes Tarifs oder jeder IoT-Leistung.","The legally separate N-ERGIE Netz GmbH operates electricity and gas networks. Its stated electricity network extends from the Würzburg area to Eichstätt and from Weikersheim to Sulzbach-Rosenberg. This does not establish coverage of every place within these boundaries or availability of every tariff or IoT service.")}</p>
        <p className="text-sm">{source(sources.company,"N-ERGIE: Unternehmensübersicht","N-ERGIE: company overview")} · {source(sources.network,"N-ERGIE Netz: regionale Netzangaben","N-ERGIE Netz: network geography")}</p>
      </section>
      <section id="applications" className="mt-8 space-y-4 border-t pt-6"><h2 className="text-xl font-semibold">{text("Leistungen und belegte Anwendungen","Services and documented applications")}</h2>
        <p>{text("Für Gewerbe, Industrie und Immobilienwirtschaft sind Energiebezug, Direktvermarktung, Ladeangebote und technische Energiedienstleistungen mögliche Anknüpfungspunkte. Die konkrete Lieferstelle und der Leistungsumfang müssen im jeweiligen Angebot geprüft werden.","Energy supply, renewable power marketing, charging and technical energy services provide potential starting points for businesses, industry and property organisations. Availability at the specific site and the scope of service require assessment for each offer.")}</p>
        <p>{text("Für den Raum Nürnberg beschreibt N-ERGIE ein Smart-City-Kommunikationsnetz mit LoRaWAN und mioty. Im Stadtgebiet werden damit nach Anbieterangaben bereits Fernwärme- und Wasserzähler ausgelesen und Sensordaten empfangen. Eine entsprechende Funkabdeckung in ganz Mittelfranken ist damit nicht belegt.","N-ERGIE describes a smart-city communications network using LoRaWAN and mioty in the Nuremberg area. According to the provider, it already supports district-heating and water meter readings and reception of sensor data in the city. This does not establish radio coverage throughout Middle Franconia.")}</p>
        <p className="text-sm">{source(sources.business,"Geschäftskundenangebote","Business services")} · {source(sources.iot,"Smart-City-Netz und Einsatzfälle","Smart-city network and applications")}</p>
      </section>
      <section id="developments" className="mt-8 space-y-4 border-t pt-6"><h2 className="text-xl font-semibold">{text("Aktueller Projekt- und Planungsstand","Current project and planning status")}</h2>
        {city?<p>{text("Baustart gemeldet am 04.09.2026: Für den Kraftwerksspeicher in Nürnberg-Sandreuth nennt N-ERGIE 15 MW Leistung und 30 MWh Kapazität. Die Inbetriebnahme ist für Mitte 2027 geplant. Auftragnehmer ist laut Meldung TRICERA energy. Das Projekt wird hier als im Bau und nicht als bereits in Betrieb eingeordnet.","Construction announced on 4 September 2026: N-ERGIE specifies 15 MW of power and 30 MWh of capacity for the power-station battery in Nuremberg-Sandreuth. Commissioning is planned for mid-2027. The announcement identifies TRICERA energy as contractor. The project is classified here as under construction, rather than already operational.")}</p>:<p>{text("Am 27.10.2026 meldete N-ERGIE Netz die Verstärkung des Umspannwerks Feuchtwangen. Zwei Transformatoren mit jeweils 63 MVA wurden im September und Oktober angeliefert und angeschlossen; ein dritter soll folgen. Einzelne abgeschlossene Arbeitsschritte sind von der Fertigstellung des Gesamtvorhabens zu unterscheiden.","On 27 October 2026, N-ERGIE Netz reported reinforcement of the Feuchtwangen substation. Two transformers rated at 63 MVA each were delivered and connected in September and October; a third is to follow. Completed individual steps must be distinguished from completion of the overall project.")}</p>}
        <p>{text("Netzausbauplan veröffentlicht am 31.10.2026, Mitteilung vom 02.11.2026: N-ERGIE Netz plant die Verstärkung bestehender Netze und zusätzliche Umspannwerke. Die Quelle weist weiterhin auf mögliche regionale Engpässe hin. Der Plan ist deshalb keine Anschluss- oder Kapazitätszusage.","Grid development plan published on 31 October 2026, announcement dated 2 November: N-ERGIE Netz plans reinforcement of existing networks and additional substations. The source continues to identify potential regional constraints. The plan is therefore not a guarantee of connection or capacity.")}</p>
        <p className="text-sm">{source(city?sources.battery:sources.network,city?"Speicher Sandreuth: Baustart und Zeitplan":"Feuchtwangen: Mitteilung vom 27.10.2026",city?"Sandreuth battery: construction and schedule":"Feuchtwangen: announcement of 27 October 2026")} · {source(sources.network,"Netzausbauplan: Mitteilung vom 02.11.2026","Grid development plan: announcement of 2 November 2026")}</p>
      </section>
      <section id="selection" className="mt-8 space-y-4 border-t pt-6"><h2 className="text-xl font-semibold">{text("Auswahlfragen und Quellenstatus","Selection questions and source status")}</h2><p>{text("Welche Leistung ist an der konkreten Adresse verfügbar? Wer ist Vertragspartner für Energie, Anschluss, Messung und IoT-Betrieb? Welche Last- und Einspeiseprofile, Schnittstellen und Datenrechte sind relevant? Die Unternehmensdarstellung und die unten getrennt ausgewiesenen behördlichen und kommunalen Belege haben unterschiedliche Aussagekraft; sie sind keine unabhängige Wirksamkeitsmessung und keine Anbieterempfehlung. Es gibt in diesem Bericht keine bezahlte Platzierung.","Which service is available at the specific address? Who is responsible for energy supply, connection, metering and IoT operation? Which demand and generation profiles, interfaces and data rights matter? The company account and the separately identified government and municipal evidence below have different evidentiary scope; they are not an independent measurement of effectiveness or an endorsement. This report contains no paid placement.")}</p><Link className="text-primary underline" href={en?englishProviderPath(provider):providerPath(provider)}>{text("Zum vollständigen N-ERGIE-Anbieterprofil","Full N-ERGIE provider profile")}</Link></section>
      <NergieExternalSources name={provider} locale={locale} pagePath={regionPath(region,locale)}/>
      <EworldExhibitor name={provider} locale={locale}/>
      <nav aria-label={text("Weitere Einstiege","Related entries")} className="mt-8 flex flex-wrap gap-5 border-t pt-6 text-primary"><Link className="underline" href={regionPath(city?"mittelfranken":"nuernberg",locale)}>{label(city?"mittelfranken":"nuernberg",locale)}</Link><Link className="underline" href={(en?"/en":"")+"/region/eworld?q=N-ERGIE"}>E-world 2027</Link></nav>
    </article>
  </main>;
}

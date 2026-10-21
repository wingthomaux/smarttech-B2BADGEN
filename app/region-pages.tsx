import type {Metadata} from "next";
import type {ReactNode} from "react";
import Link from "./public-link";
import {LanguageToggle} from "./language-toggle";
import {safeJsonLd} from "./detail-components";

type Locale = "de" | "en";
const paths = {de:"/region/wittlich", en:"/en/region/wittlich"};
const sources = {
  region:"https://grokipedia.com/page/Wittlich",
  district:"https://www.bernkastel-wittlich.de/landkreis/staedte-und-gemeinden/",
  imprint:"https://aeins.de/impressum/",
  register:"https://openregister.de/company/DE-HRB-T2408-12294",
  officialRegister:"https://www.handelsregister.de/",
  hub:"https://aeins.de/",
  city:"https://aeins.de/smart-city-super-app/",
  portazon:"https://www.portazon.de/",
  portazonImprint:"https://www.portazon.de/impressum/",
};

export function regionMetadata(locale:Locale):Metadata {
  const title=locale==="en"?"Wittlich region: digital platforms and city services | SmartTech":"Region Wittlich: digitale Plattformen und Stadtdienste | SmartTech";
  const description=locale==="en"?"Independent regional reporting on Wittlich, A EINS and Portazon: sources, company identities and separate purchase-offer sections.":"Unabhängiger Regionsbericht zu Wittlich, A EINS und Portazon: Quellen, Unternehmensidentität und getrennte Erwerbsangebote.";
  return {title,description,alternates:{canonical:paths[locale],languages:{"de-DE":paths.de,en:paths.en}},openGraph:{title,description,url:paths[locale],locale:locale==="en"?"en_GB":"de_DE",type:"article"}};
}

function Source({href,children}:{href:string;children:ReactNode}) {
  return <a href={href} className="text-primary underline underline-offset-4">{children}</a>;
}
function Section({id,title,children}:{id:string;title:string;children:ReactNode}) {
  return <section id={id} className="mt-9 space-y-4 border-t pt-7"><h2 className="text-xl font-semibold tracking-tight">{title}</h2>{children}</section>;
}

export function RegionPage({locale}:{locale:Locale}) {
  const en=locale==="en";
  const text=(de:string,english:string)=>en?english:de;
  const jsonLd={"@context":"https://schema.org","@type":"Article",headline:text("Region Wittlich: digitale Plattformen und Stadtdienste","Wittlich region: digital platforms and city services"),inLanguage:locale,url:"https://smarttech.b2badgen.com"+paths[locale],dateModified:"2026-10-21",publisher:{"@type":"Organization",name:"B2B AdGen Research"},citation:Object.values(sources)};
  return <main className="mx-auto max-w-4xl px-5 py-10 text-sm leading-7 sm:text-base lg:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(jsonLd)}}/>
    <nav aria-label={text("Seitennavigation","Page navigation")} className="mb-8 flex items-center justify-between gap-4">
      <Link href={en?"/en":"/"} className="font-semibold text-primary">← SmartTech {text("Katalog","catalogue")}</Link>
      <LanguageToggle locale={locale} href={paths[en?"de":"en"]}/>
    </nav>
    <article>
      <header><p className="text-xs font-semibold uppercase tracking-widest text-primary">{text("Regionen · Rheinland-Pfalz · Bernkastel-Wittlich","Regions · Rhineland-Palatinate · Bernkastel-Wittlich")}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{text("Region Wittlich: digitale Plattformen und Stadtdienste","Wittlich region: digital platforms and city services")}</h1>
        <p className="mt-4 text-muted-foreground">{text("Redaktioneller Stand: 21. Oktober 2026","Editorial review: 21 October 2026")}</p>
      </header>
      <Section id="report" title={text("1. Bericht · unabhängig und werbefrei","1. Report · independent and advertising-free")}>
        <p>{text("Dieser Regionsbericht ist redaktionell, ohne bezahlte Platzierung und kein Whitepaper eines Anbieters. SmartTech beginnt seine regionale Berichterstattung mit Energie, Telekommunikation und Internet. Finanzdienstleistungen und weitere smarte Technik folgen später.","This regional report is editorial, carries no paid placement and is not a provider whitepaper. SmartTech starts its regional coverage with energy, telecommunications and internet services. Financial services and other smart technologies will follow later.")}</p>
        <section aria-labelledby="regional-frame" className="space-y-4 border-l-2 border-primary/30 pl-5">
          <h3 id="regional-frame" className="font-semibold">{text("Regionaler Rahmen · gekürzte Übersetzung aus Grokipedia","Regional context · abridged excerpt from Grokipedia")}</h3>
          <p>{text("Wittlich ist eine Stadt in Rheinland-Pfalz im Westen Deutschlands und Verwaltungssitz des Landkreises Bernkastel-Wittlich. Sie liegt in der Wittlicher Senke und wird von der Lieser, einem Nebenfluss der Mosel, durchflossen.","Wittlich is a town in Rhineland-Palatinate in western Germany and the administrative seat of the Bernkastel-Wittlich district. It lies in the Wittlich Basin and is crossed by the Lieser, a tributary of the Moselle.")}</p>
          <p className="text-sm text-muted-foreground">{text("Quelle: ","Source: ")}<Source href={sources.region}>Grokipedia: Wittlich</Source>. {text("Nur der regionale Rahmen wurde gekürzt übersetzt; Zahlen und weitergehende Wertungen wurden weggelassen. Die Kreisverwaltung bestätigt Wittlich als Kreisstadt: ","Only the regional context was abridged; numerical claims and broader assessments were omitted. The district administration confirms Wittlich as the district town: ")}<Source href={sources.district}>{text("Städte und Gemeinden","Towns and municipalities")}</Source>.</p>
          <p className="text-sm text-muted-foreground">{text("Lizenzprüfung am 21.10.2026: Die Live-Fußzeile zeigt keine CC-BY-SA-4.0-Kennzeichnung. Dieser Auszug wird nach der SpaceXSI Community License gekennzeichnet. Die Unternehmensberichte und Erwerbsblöcke stehen außerhalb dieses Enzyklopädieauszugs.","License checked on 21 October 2026: the live footer shows no CC BY-SA 4.0 notice. This excerpt carries the SpaceXSI Community License attribution. The company reports and purchase-offer sections are outside this encyclopedia excerpt.")}</p>
          <p className="text-sm" lang="en">This product includes materials licensed under the xAI Community License. All rights reserved. Copyright © xAI 2026.</p>
          <p className="text-sm" lang="en">Powered by xAI</p>
        </section>
        <p>{text("Redaktionelle Einordnung: A EINS verbindet den Standort Wittlich mit digitalen Vertriebsplattformen. Portazon zeigt eine Anwendung im benachbarten Trierer Raum. Die Zusammenarbeit ist kein Beleg dafür, dass es sich um dieselbe Gesellschaft handelt oder dass alle Trierer Dienste auch in Wittlich verfügbar sind.","Editorial context: A EINS connects the Wittlich location with digital sales platforms. Portazon illustrates an application in the neighbouring Trier area. Collaboration does not establish that the two are one company or that every Trier service is available in Wittlich.")}</p>
      </Section>
      <Section id="aeins" title="A EINS Business Intelligence GmbH">
        <p>{text("Das offizielle Impressum nennt Am kleinen Rotenberg 21, 54516 Wittlich, und Amtsgericht Wittlich HRB 12294. Die öffentliche Registerwiedergabe von OpenRegister führt unter derselben Nummer auch die früheren Namen A EINS IT GmbH und A EINS Digital Innovation GmbH. Ein aktueller amtlicher Registerabdruck konnte in diesem Durchgang nicht abgerufen werden; die Namenshistorie ist damit über die Registerwiedergabe, nicht durch einen eigenen amtlichen Abdruck belegt.","The official legal notice lists Am kleinen Rotenberg 21, 54516 Wittlich, and Wittlich local court HRB 12294. OpenRegister's public register reproduction also records the former names A EINS IT GmbH and A EINS Digital Innovation GmbH under that number. A current official register extract could not be retrieved during this review; the name history is supported by the reproduction rather than an independently retrieved official extract.")}</p>
        <p>{text("Der Open Business Hub wird als modulare Vertriebsplattform mit Commerce Hub, Sales Hub und Content Hub beschrieben. Er verbindet Vertriebsabläufe, digitale Verträge und die Bereitstellung von Inhalten. Die Anbieterwebsite nennt unter anderem Energie und Telekommunikation als Einsatzbranchen. Damit richtet sich die Plattform insbesondere an Vertriebs-, Digitalisierungs- und IT-Verantwortliche; eine konkrete Eignung hängt von den anzubindenden Prozessen ab.","The Open Business Hub is described as a modular sales platform comprising Commerce Hub, Sales Hub and Content Hub. It connects sales processes, digital contracts and content delivery. The provider identifies energy and telecommunications among its target industries. This makes sales, digital transformation and IT teams relevant readers; suitability depends on the processes to be connected.")}</p>
        <p>{text("Auswahlfragen der Redaktion: Welche bestehenden Systeme müssen angebunden werden? Wer betreibt die Plattform und verantwortet Kundendaten, Rollen und Vertragsabläufe? Welche Module sind im konkreten Projekt enthalten? Die Produktbeschreibung allein belegt noch keine Konditionen oder regionale Lieferbarkeit.","Editorial selection questions: which existing systems need integration? Who operates the platform and takes responsibility for customer data, roles and contract workflows? Which modules are included in the specific project? The product description alone establishes neither commercial terms nor local availability.")}</p>
        <p className="text-sm"><Source href={sources.imprint}>{text("Offizielles Impressum","Official legal notice")}</Source> · <Source href={sources.hub}>Open Business Hub</Source> · <Source href={sources.register}>{text("Registerwiedergabe (Drittquelle)","Register reproduction (third party)")}</Source> · <Source href={sources.officialRegister}>{text("Amtliches Registerportal","Official register portal")}</Source></p>
      </Section>
      <Section id="portazon" title="Portazon · Portazon GmbH">
        <p>{text("Portazon ist eine Smart-City-App für Trier und die Region. Das eigene Impressum nennt als Betreiber die Portazon GmbH, Ostallee 7–13, 54290 Trier, Amtsgericht Wittlich HRB 45102. Sie bleibt hier von A EINS Business Intelligence GmbH mit HRB 12294 getrennt.","Portazon is a smart-city app for Trier and its surrounding region. Its legal notice identifies the operator as Portazon GmbH, Ostallee 7–13, 54290 Trier, registered at Wittlich local court under HRB 45102. It remains separate here from A EINS Business Intelligence GmbH, HRB 12294.")}</p>
        <p>{text("A EINS beschreibt die mit den Stadtwerken Trier entwickelte Plattform auf Basis des Open Business Hub. Die Portazon-Website bündelt regionale Produkte und Dienste und nennt bargeldloses Parken, E-Auto-Laden sowie ein digitales Kundencenter für SWT-Verträge. Diese Verbindung von Versorgungsleistungen und digitalem Zugang ist der regionale SmartTech-Bezug; eine Übertragung auf Wittlich wird nicht behauptet.","A EINS describes the platform developed with Stadtwerke Trier using the Open Business Hub. The Portazon website brings together regional products and services, listing cashless parking, electric vehicle charging and a digital customer centre for SWT contracts. Connecting utility services with digital access is its regional SmartTech relevance; deployment in Wittlich is not asserted.")}</p>
        <p>{text("Für kommunale Digitalisierungsstellen und Stadtwerke sind Dienstintegration und Betreiberverantwortung relevant, für Nutzer die örtliche Verfügbarkeit und die Bedingungen des einzelnen Dienstes. Auswahlfragen der Redaktion: Wer ist jeweils Vertragspartner? Welche Daten verlangt ein Dienst? Welche Park- oder Ladeorte sind tatsächlich angebunden? Die Startseite enthält widersprüchliche Deutschlandticket-Preise und einen Nichtverfügbarkeitshinweis; daraus werden keine aktuellen Preise oder buchbaren Angebote übernommen.","Municipal digital teams and utilities need to assess service integration and operational responsibility; users need local availability and each service's conditions. Editorial selection questions: who is the contracting party? What data does a service require? Which parking or charging locations are connected? The homepage contains conflicting Deutschlandticket prices and an unavailability notice; no current fare or bookable offer is derived from these.")}</p>
        <p className="text-sm"><Source href={sources.portazon}>Portazon</Source> · <Source href={sources.portazonImprint}>{text("Offizielles Impressum","Official legal notice")}</Source> · <Source href={sources.city}>A EINS: Smart City Super App</Source></p>
      </Section>
      <Section id="offers" title={text("2. Angebot · außerhalb des Enzyklopädietexts","2. Offers · outside the encyclopedia text")}>
        <p>{text("Umsatz entsteht nur, wenn eine konkrete Leistung vorgestellt wird und sich jemand zum Erwerb entschließt. Hier liegt kein geprüftes konkretes Erwerbsangebot vor.","Revenue arises only when a specific service is presented and someone decides to purchase it. No verified specific purchase offer is available here.")}</p>
        <div className="border p-5"><h3 className="font-semibold">A EINS Business Intelligence GmbH</h3><p>{text("Kein konkretes Erwerbsangebot","No specific purchase offer")}</p></div>
        <div className="border p-5"><h3 className="font-semibold">Portazon</h3><p>{text("Kein konkretes Erwerbsangebot","No specific purchase offer")}</p></div>
      </Section>
      <Section id="users" title={text("3. Nutzer · Information und Datenschutz","3. Users · information and privacy")}>
        <p>{text("Angaben von Nutzern dienen nur der besseren Information auf der Seite. Sie werden nicht an Werbekunden gegeben. Es gibt keine klassische Werbung, keine Paid Listings und kein Tracking dafür. Dieser Bericht erhebt keine zusätzlichen Nutzerangaben.","User information serves only to improve information on this page. It is not given to advertising clients. There is no conventional advertising, no paid listings and no tracking for those purposes. This report collects no additional user information.")} <Link className="text-primary underline" href={en?"/en/privacy":"/datenschutz"}>{text("Datenschutzerklärung","Privacy policy")}</Link>.</p>
      </Section>
      <Section id="source-notes" title={text("Quellenhinweise und offene Prüfungen","Source notes and unresolved checks")}>
        <p>{text("Grokipedia nennt für Wittlich 19.049 Einwohner im Vorspann mit Stand 2024 und im Demografieabschnitt zum 31.12.2023. Das ist bereits ein interner Stichtagskonflikt. Der zum Abgleich gesuchte Landkreisartikel war unter den geprüften Pfaden nicht erreichbar (HTTP 404); der gemeldete abweichende Stand dort konnte daher nicht bestätigt werden. Stadt und Landkreis sowie unterschiedliche Stichtage dürfen nicht gleichgesetzt werden. Bis zum belastbaren amtlichen Abgleich steht hier keine Einwohnerzahl.","Grokipedia gives Wittlich a population of 19,049, dated 2024 in its introduction and 31 December 2023 in its demographics section. This is already an internal reference-date conflict. The district article sought for comparison was unavailable at the checked paths (HTTP 404), so its reported differing figure could not be confirmed. Town and district, and different reference dates, must not be conflated. No population figure is adopted here pending a reliable official comparison.")}</p>
        <p>{text("Die Grokipedia-Seiten A_EINS_Business_Intelligence und Portazon liefern HTTP 404. Ein Vorschlag unter ","The Grokipedia pages A_EINS_Business_Intelligence and Portazon return HTTP 404. A suggestion at ")}<Source href="https://grokipedia.com/suggest">grokipedia.com/suggest</Source>{text(" steht für beide noch aus. Die Firmenabschnitte sind eigenständige Redaktion aus den verlinkten Unternehmensquellen, keine Übersetzung des Personenartikels Andy_Altmeyer. Bilanz- und Umsatzzahlen aus Drittprofilen wurden nicht übernommen. Dieser Bericht fügt keine kuratierten Wissensobjekte hinzu."," is still pending for both. The company sections are independent editorial writing based on the linked company sources, not translations of the Andy_Altmeyer biography. Balance-sheet and revenue figures from third-party profiles were excluded. This report adds no curated knowledge items.")}</p>
      </Section>
    </article>
  </main>;
}

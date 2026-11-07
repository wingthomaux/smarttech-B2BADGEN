import {safeJsonLd} from "./detail-components";
import {absoluteUrl} from "./catalog-paths";

type Locale="de"|"en";
type Localized={de:string;en:string};
type EvidenceSource={url:string;publisher:Localized;title:Localized;date?:string;dateLabel?:Localized;locator?:Localized};
type Evidence={id:string;title:Localized;status:Localized;fact:Localized;limit:Localized;sources:EvidenceSource[]};

export const nergieExternalEvidence:Evidence[]=[
  {
    id:"seismic-permit",
    title:{de:"Erdwärmesuche: 2D-Seismik zugelassen",en:"Geothermal exploration: 2D seismic survey approved"},
    status:{de:"Behördlich bestätigte Zulassung · 30.10.2026",en:"Approval confirmed by authority · 30 October 2026"},
    fact:{de:"Das Bergamt Nordbayern hat den Hauptbetriebsplan der N-ERGIE AG für 2D-Seismik in den Erlaubnisfeldern NÜRNBERG und SIGENA am 30.10.2026 zugelassen. Die Verfahrensbeschreibung nennt Nürnberg, benachbarte Gemeinden und Teile der Landkreise Erlangen-Höchstadt, Fürth, Nürnberger Land und Roth als räumlichen Bezug.",en:"On 30 October 2026, Bergamt Nordbayern approved N-ERGIE AG's operating plan for a 2D seismic survey in the NÜRNBERG and SIGENA exploration areas. The procedural description identifies Nuremberg, neighbouring municipalities and parts of the Erlangen-Höchstadt, Fürth, Nürnberger Land and Roth districts as the geographic context."},
    limit:{de:"Die Zulassung betrifft die Erkundung des Untergrunds. Sie belegt weder einen erfolgreichen Fund noch eine genehmigte oder betriebene geothermische Wärmeversorgung. Der auf der älteren Verfahrensseite genannte Messzeitraum ist ein Planungsstand, kein Nachweis ausgeführter Messungen.",en:"Approval concerns subsurface exploration. It establishes neither a successful discovery nor an approved or operating geothermal heat supply. The survey period stated on the older procedure page is a planning schedule, not evidence that measurements have been completed."},
    sources:[
      {url:"https://regierung.oberfranken.bayern.de/presse/pressemitteilungen/2026/pm081/index.html",publisher:{de:"Regierung von Oberfranken / Bergamt Nordbayern",en:"Government of Upper Franconia / Bergamt Nordbayern"},title:{de:"PM 081/26: Zulassung der 2D-Seismik",en:"PM 081/26: approval of the 2D seismic survey"},date:"2026-10-30",dateLabel:{de:"Veröffentlichung und Bescheid",en:"Announcement and decision"}},
      {url:"https://www.regierung.oberfranken.bayern.de/service/planfeststellungen/wirtschaft_landesentwicklung_verkehr/bergbau/hbp_seismik_nuernberg/index.php",publisher:{de:"Regierung von Oberfranken",en:"Government of Upper Franconia"},title:{de:"Verfahrensbeschreibung: Erlaubnisfelder und Gemeindegebiete",en:"Procedural description: exploration areas and municipalities"},date:"2026-04-28",dateLabel:{de:"Textstand der Verfahrensbeschreibung",en:"Date of the procedural description"}},
    ],
  },
  {
    id:"waste-wood-permit",
    title:{de:"Altholz-Heizkraftwerk: Genehmigung für N-ERGIE Kraftwerke GmbH",en:"Waste-wood CHP plant: permit for N-ERGIE Kraftwerke GmbH"},
    status:{de:"Genehmigungsbescheid · 14.07.2026",en:"Permit decision · 14 July 2026"},
    fact:{de:"Die Regierung von Mittelfranken erteilte N-ERGIE Kraftwerke GmbH am 14.07.2026 die immissionsschutzrechtliche Genehmigung mit integrierter Umweltverträglichkeitsprüfung zur Errichtung und zum Betrieb des Altholz-Heizkraftwerks in Nürnberg-Sandreuth. Der Bescheid enthält Inhalts- und Nebenbestimmungen, darunter Emissionsbegrenzungen sowie Mess- und Überwachungspflichten. Das UVP-Portal bestätigt das Entscheidungsdatum.",en:"On 14 July 2026, the Government of Middle Franconia granted N-ERGIE Kraftwerke GmbH an environmental permit with an integrated environmental impact assessment for construction and operation of the waste-wood CHP plant in Nuremberg-Sandreuth. The decision includes conditions, emission limits and measurement and monitoring requirements. The environmental impact assessment portal confirms the decision date."},
    limit:{de:"Genehmigungsadressatin ist die Kraftwerksgesellschaft; sie wird nicht mit der N-ERGIE AG oder N-ERGIE Netz GmbH gleichgesetzt. Die Genehmigung ist kein Nachweis bereits erfolgter Inbetriebnahme, gemessener Emissionswerte oder pauschaler Klimaneutralität. Eine Bestandskraft wird hier nicht behauptet.",en:"The permit holder is the power-generation company, which is distinguished from N-ERGIE AG and N-ERGIE Netz GmbH. The permit does not establish commissioning, measured emissions or blanket climate neutrality. This account makes no claim that the decision is no longer open to challenge."},
    sources:[
      {url:"https://www.regierung.mittelfranken.bayern.de/mam/aufgaben/sg50-altholz-hkw/20260714_bimschg-genehmigung_altholz-hkw_n-ergie_n-sandreuth_-_%C3%96ffentliche_auslegung.pdf",publisher:{de:"Regierung von Mittelfranken",en:"Government of Middle Franconia"},title:{de:"Genehmigungsbescheid Altholz-Heizkraftwerk (PDF)",en:"Waste-wood CHP plant permit decision (PDF)"},date:"2026-07-14",dateLabel:{de:"Bescheiddatum",en:"Decision date"},locator:{de:"Deckblatt; S. 11, Nr. 1; Inhaltsverzeichnis S. 2–3: Emissionsbegrenzung und Überwachung",en:"Cover; p. 11, section 1; contents pp. 2–3: emission limits and monitoring"}},
      {url:"https://www.nuernberg.de/internet/stadtportal/altholzkraftwerk_sandreuth.html",publisher:{de:"Stadt Nürnberg",en:"City of Nuremberg"},title:{de:"Projektbeschreibung: Genehmigung und geplante Inbetriebnahme",en:"Project account: permit and planned commissioning"},date:"2026-09-30",dateLabel:{de:"Ausgewiesene Aktualisierung der Seite",en:"Stated page update"}},
      {url:"https://www.uvp-verbund.de/trefferanzeige?docuuid=cef4bb7a-1e45-41cc-ae92-b489f8bd09c0",publisher:{de:"UVP-Portal der Länder / Regierung von Mittelfranken",en:"German states' EIA portal / Government of Middle Franconia"},title:{de:"Verfahrensschritt: Entscheidung über die Zulassung",en:"Procedural step: approval decision"},date:"2026-07-14",dateLabel:{de:"Im Portal genanntes Entscheidungsdatum",en:"Decision date recorded in the portal"}},
    ],
  },
  {
    id:"heat-planning",
    title:{de:"Nürnberg: Wärmeplanung unterscheidet Ausbaugebiete",en:"Nuremberg: heat planning distinguishes development areas"},
    status:{de:"Kommunale Planung · geprüft am 07.11.2026",en:"Municipal planning · reviewed 7 November 2026"},
    fact:{de:"Die Stadt Nürnberg unterscheidet drei Prioritätsstufen für den Fernwärmeausbau und Gebiete lokaler Wärmeversorgung. Als Grundlagen nennt sie Bestands- und Potenzialanalyse sowie den N-ERGIE-Transformationsplan. Für nachgeordnete Gebiete beschreibt sie mögliche Ausbauschritte ab 2030 beziehungsweise eine spätere Prüfung frühestens ab 2035.",en:"The City of Nuremberg distinguishes three priority levels for district-heating expansion and areas of local heat supply. It identifies stock and potential analyses and N-ERGIE's transformation plan as inputs. For lower-priority areas, it describes possible expansion from 2030 or later assessment no earlier than 2035."},
    limit:{de:"Die Stadt verlangt eine Prüfung der technischen Anschlussfähigkeit am einzelnen Gebäude. Die Gebietseinteilung ist daher keine konkrete Anschlusszusage. Die kommunale Darstellung verarbeitet auch Unternehmensplanungen und ist keine unabhängige Messung der Anbieterleistung.",en:"The city requires technical connection feasibility to be assessed for each building. Area classification is therefore not a specific connection commitment. The municipal account also incorporates company plans and is not an independent measurement of supplier performance."},
    sources:[
      {url:"https://www.nuernberg.de/internet/referat6/eignungsgebiete.html",publisher:{de:"Stadt Nürnberg, Geschäftsbereich 3. Bürgermeister",en:"City of Nuremberg, Third Mayor's department"},title:{de:"Eignungsgebiete: voraussichtliche Wärmeversorgungsgebiete",en:"Suitability areas: prospective heat supply areas"}},
    ],
  },
];

export const nergieExternalSourceUrls=[...new Set(nergieExternalEvidence.flatMap(fact=>fact.sources.map(source=>source.url)))];

export function NergieExternalSources({name,locale,pagePath}:{name:string;locale:Locale;pagePath:string}){
  if(name!=="N-ERGIE Aktiengesellschaft")return null;
  const en=locale==="en",text=(de:string,english:string)=>en?english:de;
  const title=text("Externe Quellen · redaktionell geprüfte Fakten","External sources · editorially checked facts");
  const jsonLd={"@context":"https://schema.org","@type":"CreativeWork","@id":absoluteUrl(pagePath)+"#external-evidence",name:title,inLanguage:locale,dateModified:"2026-11-07",isPartOf:{"@id":absoluteUrl(pagePath)},citation:nergieExternalEvidence.flatMap(fact=>fact.sources.map(source=>({"@type":"CreativeWork",name:source.title[locale],url:source.url,...(source.date?{temporalCoverage:source.date}:{}),publisher:{"@type":"Organization",name:source.publisher[locale]}})))};
  return <section id="external-evidence" className="mt-9 space-y-5 border-t pt-7" aria-labelledby="external-evidence-title">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(jsonLd)}}/>
    <h2 id="external-evidence-title" className="text-xl font-semibold">{title}</h2>
    <p className="text-sm leading-6 text-muted-foreground">{text("Abgleich vom 07.11.2026: ausgewählte behördliche und kommunale Quellen außerhalb des Unternehmens. Geprüft wurden die nachfolgend benannten Aussagen und Dokumentabschnitte; daraus folgt keine Gesamtprüfung des Anbieters oder sämtlicher Anlagenwirkungen.","Review dated 7 November 2026: selected government and municipal sources outside the company. The statements and document sections identified below were checked; this does not constitute a complete assessment of the provider or all plant impacts.")}</p>
    {nergieExternalEvidence.map(fact=><article key={fact.id} id={fact.id} className="space-y-3 border-l-2 border-primary/30 pl-5 text-sm leading-6">
      <p className="font-medium text-muted-foreground">{fact.status[locale]}</p><h3 className="text-base font-semibold">{fact.title[locale]}</h3><p>{fact.fact[locale]}</p>
      <p className="text-muted-foreground"><strong>{text("Beleggrenze: ","Evidence limit: ")}</strong>{fact.limit[locale]}</p>
      <ul className="space-y-3">{fact.sources.map(source=><li key={source.url}><a className="text-primary underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.title[locale]} ↗</a><p className="text-xs text-muted-foreground">{source.publisher[locale]} · {source.date?<>{source.dateLabel?.[locale]}: <time dateTime={source.date}>{source.date}</time></>:text("Veröffentlichungsdatum auf der geprüften Seite nicht ausgewiesen","Publication date not stated on the reviewed page")}{source.locator?" · "+source.locator[locale]:""}</p></li>)}</ul>
    </article>)}
    <p className="border-t pt-4 text-sm leading-6 text-muted-foreground">{text("Quellenkritik: Die Zulassung vom 30.10.2026 aktualisiert den älteren Antragsstand zur Seismik. Die Stadtseite zum Altholzprojekt (aktualisiert am 30.09.2026) nennt Ende 2029 als geplante Inbetriebnahme; daraus wird kein Betriebsnachweis abgeleitet. Allgemeine Aussagen zur Klimaneutralität werden nicht übernommen. Die Fachmedien- und Partnerbelege zu Speicher, Funknetz und Messsystemen stehen im N-ERGIE-Anbieterprofil. Sie dokumentieren Projektrollen und technische Angaben; eine unabhängige Leistungsbestätigung ist hier nicht dokumentiert.","Source assessment: the approval of 30 October 2026 updates the older seismic application status. The city page about the waste-wood project, updated 30 September 2026, identifies late 2029 as planned commissioning; this is not treated as evidence of operation. General climate-neutrality claims are not adopted. Trade and partner sources about storage, radio networks and metering systems appear in the N-ERGIE company profile. They document project roles and specifications; no independent performance confirmation is documented here.")} <a className="text-primary underline" href="https://www.nuernberg.de/internet/stadtportal/altholzkraftwerk_sandreuth.html" target="_blank" rel="noreferrer">{text("Stadt Nürnberg: Projekt- und Zeitplan","City of Nuremberg: project and schedule")} ↗</a></p>
  </section>;
}

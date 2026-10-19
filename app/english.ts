import itRefreshTranslations from "./english-it-refresh-20261019.json";
import mediaPerformanceTranslations from "./english-media-performance-20261019.json";
import fiveOctoberTranslations from "./english-five-providers-20261019.json";
import alsoTrenkwalderTranslations from "./english-also-trenkwalder-20261013.json";
import allianzTradeTranslations from "./english-allianz-trade-20261013.json";
import althallerEditorialTranslations from "./english-althaller-editorial-20261009.json";
import althallerStudyTranslations from "./english-althaller-study-20261009.json";
import skydanceTranslations from "./english-skydance-20261008.json";
import spaceXTranslations from "./english-spacex-20261008.json";
import marconomyTranslations from "./english-marconomy-20261008.json";
import althallerTranslations from "./english-althallerassist-20261008.json";
import igelTranslations from "./english-igel-20261006.json";
import dailyTranslations from "./english-update-20260930.json";
import profileReviewTranslations from "./english-profile-reviews-20261006.json";
import portalTranslations from "./english-portals-20261006.json";
import translationData from "./translations.en.generated.json";
import gdataTranslations from "./english-gdata.json";
import whitepaperTranslations from "./english-whitepapers.json";
import solutionTranslations from "./english-solutions.json";
import {mediaAreas,mediaSpace,mediaSolutions} from "./media-taxonomy";
import type {KnowledgeItem} from "./catalog";

const translations=(translationData as {translations:Record<string,string>}).translations;
const editorialTranslations:Record<string,string>={
  ...itRefreshTranslations,
  [mediaSpace]:"Media and the public sphere",
  ...Object.fromEntries(Object.values(mediaSolutions).map(solution=>[solution.de,solution.en])),
  ...Object.fromEntries(mediaAreas.map(area=>[area.name,area.nameEn])),
  "Web und Fachportale":"Web and specialist portals",
  "Social Media":"Social media",
  "Newsletter":"Newsletter",
  "Audio und Podcasts":"Audio and podcasts",
  "Video und Streaming":"Video and streaming",
  "Rundfunk":"Broadcasting",
  "KI":"AI",
  "Datenschutz":"Data protection",
  "Sicherheit":"Security",
  ...mediaPerformanceTranslations,
  ...fiveOctoberTranslations,
  ...alsoTrenkwalderTranslations,
  ...allianzTradeTranslations,
  ...althallerStudyTranslations,
  ...althallerEditorialTranslations,
  ...skydanceTranslations,
  ...spaceXTranslations,
  ...marconomyTranslations,
  ...althallerTranslations,
  ...igelTranslations,
  ...profileReviewTranslations,
  ...portalTranslations,
  ...dailyTranslations,
  ...gdataTranslations,
  ...whitepaperTranslations,
  ...solutionTranslations,
  "Bildungs-, Lern- oder Forschungslösung":"Education, learning or research solution",
  "Plattform, Software oder Service":"Platform, software or service",
  "Aufbau und laufende Nutzung":"Setup and ongoing use",
  "KnowBe4 Security Awareness Training: personalisierte Schulungen und Phishing-Simulationen":"KnowBe4 Security Awareness Training: personalised learning and phishing simulations",
  "KnowBe4 PhishER Plus: gemeldete Phishing-E-Mails bearbeiten":"KnowBe4 PhishER Plus: responding to reported phishing emails",
  "KnowBe4 SecurityCoach: Sicherheitscoaching bei riskantem Verhalten":"KnowBe4 SecurityCoach: coaching for risky behaviour",
  "KnowBe4 Compliance Plus: Schulungen zu Richtlinien und Vorschriften":"KnowBe4 Compliance Plus: policy and regulatory training",
  "KnowBe4 Cloud Email Security: Schutz für Microsoft 365":"KnowBe4 Cloud Email Security: protection for Microsoft 365",
  "Security-Awareness-Training und Phishing-Simulation":"Security awareness training and phishing simulation",
  "Phishing-Triage und Incident Response":"Phishing triage and incident response",
  "Echtzeit-Coaching für Sicherheitsverhalten":"Real-time coaching for secure behaviour",
  "Compliance-Training und Richtlinienschulung":"Compliance and policy training",
  "SaaS-Plattform mit Trainingsbibliothek und KI-gestützter Anpassung":"SaaS platform with a training library and AI-assisted personalisation",
  "SaaS-Workflow für E-Mail-Meldungen und Reaktion":"SaaS workflow for email reports and response",
  "SaaS-Coaching mit API-Anbindung an Sicherheitssysteme":"SaaS coaching with API connections to security tools",
  "Lernbibliothek, anpassbare Module und automatisierte Kampagnen":"Training library, customisable modules and automated campaigns",
  "Integration in Microsoft 365 für ein- und ausgehende E-Mails":"Microsoft 365 integration for inbound and outbound email",
  "Meldung, Analyse, Reaktion und laufender Betrieb":"Reporting, analysis, response and ongoing operation",
  "Integration, Verhaltensfeedback und laufende Anpassung":"Integration, behavioural feedback and ongoing adaptation",
  "Programmplanung, Schulung und Nachweis":"Programme planning, training and evidence",
  "Einführung, Prävention und laufender Betrieb":"Implementation, prevention and ongoing operation",
  "Produktübersicht":"Product overview",
  "Die offizielle Produktseite beschreibt Training nach Nutzerrolle und Risiko, Phishing-Simulationen, SmartRisk-Auswertung und eine mehrsprachige Lernbibliothek. Die KI-gestützten AIDA-Funktionen sind laut Anbieter im Advanced-Abonnement enthalten.":"The official product page describes training tailored to user role and risk, phishing simulations, SmartRisk reporting and a multilingual learning library. According to KnowBe4, the AI-assisted AIDA features are included in the Advanced subscription.",
  "PhishER Plus klassifiziert von Beschäftigten gemeldete E-Mails, gibt Rückmeldung und unterstützt das Entfernen ähnlicher schädlicher Nachrichten aus Posteingängen. Die Produktseite beschreibt konfigurierbare Abläufe und die Übernahme realer Angriffe als Phishing-Vorlagen.":"PhishER Plus classifies emails reported by employees, provides feedback and helps remove similar malicious messages from inboxes. The product page describes configurable workflows and the conversion of real attacks into phishing templates.",
  "SecurityCoach verarbeitet Ereignisse aus angebundenen Sicherheitssystemen und liefert situationsbezogenes Feedback bei riskantem Nutzerverhalten. Die Produktseite nennt API-Integrationen und integrierte Regeln als Grundlage für das Coaching.":"SecurityCoach uses events from connected security tools to deliver contextual feedback when users behave riskily. The product page lists API integrations and built-in rules as the basis for coaching.",
  "Compliance Plus bietet Schulungsinhalte zu Datenschutz und weiteren Vorgaben wie DORA, PCI und DSGVO. Eigene Richtlinien lassen sich in Module einbinden; die Plattform unterstützt Kampagnen und Reporting. Die Produktseite nennt auch SCORM-kompatible Inhalte.":"Compliance Plus provides training on data protection and other requirements such as DORA, PCI and the GDPR. Organisations can incorporate their own policies into modules; the platform supports campaigns and reporting. The product page also mentions SCORM-compatible content.",
  "Die KnowBe4-Produktseite bündelt Defend für eingehende Bedrohungen, Prevent für ausgehende Nachrichten und Datenverlust sowie Protect für richtlinienbasierte Verschlüsselung. Beschrieben ist die Integration in Microsoft 365 und Outlook.":"KnowBe4's product page brings together Defend for inbound threats, Prevent for outbound email and data loss, and Protect for policy-based encryption. It describes integration with Microsoft 365 and Outlook.",
  Robotik:"Robotics",
  "medizinische Bildanalyse":"medical image analysis",
  "ASAP erzeugt aus Organisationsanforderungen einen angepassten Aufgaben- und Zeitplan für Security Awareness und Sicherheitskultur.":"ASAP generates a tailored task list and schedule for security awareness and security culture from an organisation's requirements.",
  "Anforderungsanalyse, Sensibilisierung, Training und Nachweis":"Requirements analysis, awareness, training and evidence",
  "Bedarfsanalyse, Programmplanung, Umsetzung und Fortschrittskontrolle":"Needs analysis, programme planning, implementation and progress monitoring",
  "Behandelt Schutzlücken klassischer E-Mail-Sicherheit bei KI-gestütztem Phishing und ordnet zusätzliche Erkennung, Prävention und Reaktion ein.":"Examines gaps in traditional email security against AI-powered phishing and classifies additional detection, prevention and response measures.",
  "Beschreibt Human Risk Management als messbaren, verhaltensbezogenen Ansatz mit personalisierten Interventionen, Automatisierung und Nachweis der Wirkung.":"Describes human risk management as a measurable, behaviour-based approach with personalised interventions, automation and evidence of impact.",
  "Bewertet Integrated Cloud Email Security gegenüber klassischen Secure Email Gateways und grenzt belastbare Schutzfunktionen von Marketingaussagen ab.":"Assesses integrated cloud email security against traditional secure email gateways and distinguishes substantiated protection capabilities from marketing claims.",
  "Bewertung, Einführung, Schutz und Reaktion":"Assessment, implementation, protection and response",
  "Bewertung, Einführung, Schutz und laufender Betrieb":"Assessment, implementation, protection and ongoing operation",
  "Bewertung, Prävention, Training und laufende Steuerung":"Assessment, prevention, training and ongoing management",
  "Bewertung, Training, Simulation und laufende Optimierung":"Assessment, training, simulation and ongoing optimisation",
  "Cloudbasierte E-Mail-Sicherheitsplattform":"Cloud-based email security platform",
  "Cloudbasierte E-Mail-Sicherheitsplattform mit KI-gestützter Erkennung":"Cloud-based email security platform with AI-powered detection",
  "Der Quellenbestand schreibt NSI2; fachlich gemeint ist NIS2. Der Inhalt stellt Mitarbeitersensibilisierung und fortlaufendes Training als Bestandteil des NIS2-Risikomanagements dar.":"The source inventory spells the term NSI2; the intended technical term is NIS2. The content presents employee awareness and continuous training as part of NIS2 risk management.",
  "Drei Schutzansätze gegen fehladressierte E-Mails und unbeabsichtigten Datenabfluss in Kanzleien.":"Three approaches to preventing misdirected emails and accidental data loss in law firms.",
  "E-Mail-Sicherheits- und Präventionssoftware":"Email security and prevention software",
  "Geführtes Security-Awareness-Programm mit Aufgabenplan und Trainingsressourcen":"Guided security-awareness programme with a task plan and training resources",
  "KnowBe4 Automated Security Awareness Program (ASAP)":"KnowBe4 Automated Security Awareness Program (ASAP)",
  "KnowBe4 E-Mail- und Collaboration-Security":"KnowBe4 email and collaboration security",
  "KnowBe4 Human Risk Management":"KnowBe4 human risk management",
  "KnowBe4 Human und Agent Risk Management":"KnowBe4 human and agent risk management",
  "KnowBe4 KI-gestütztes Human Risk Management":"KnowBe4 AI-powered human risk management",
  "KnowBe4 Schutz vor KI-gestütztem Social Engineering":"KnowBe4 protection against AI-powered social engineering",
  "KnowBe4 Schutz vor fehlgeleiteten E-Mails":"KnowBe4 protection against misdirected emails",
  "KnowBe4 Security Awareness für NIS2":"KnowBe4 security awareness for NIS2",
  "Messen, Priorisieren, Trainieren und laufend Verbessern":"Measure, prioritise, train and continuously improve",
  "NIS2 und Mitarbeitersensibilisierungen":"NIS2 and employee awareness",
  "Ordnet KI-Agenten als Verstärker personalisierter Social-Engineering-Angriffe ein und leitet Anforderungen an Awareness, Simulation und Verhaltensschutz ab.":"Classifies AI agents as amplifiers of personalised social-engineering attacks and derives requirements for awareness, simulation and behavioural protection.",
  "Ordnet Risiken autonomer KI-Systeme ein und verbindet sie mit menschlichem Verhalten, Security Awareness und kontrollierter Nutzung.":"Classifies risks from autonomous AI systems and connects them with human behaviour, security awareness and controlled use.",
  "Prävention, Kontrolle und laufender Betrieb":"Prevention, control and ongoing operation",
  "Risikoanalyse, Training, Simulation und laufende Anpassung":"Risk analysis, training, simulation and continuous adaptation",
  "SaaS-Plattform für Awareness-Training, Angriffssimulationen und Risikosteuerung":"SaaS platform for awareness training, attack simulations and risk management",
  "SaaS-Plattform für Risikoanalyse, Training, Coaching und Sicherheitssteuerung":"SaaS platform for risk analysis, training, coaching and security management",
  "SaaS-Plattform, Risikoanalyse und Security-Awareness-Programm":"SaaS platform, risk analysis and security-awareness programme",
  "Security-Awareness- und Compliance-Training":"Security-awareness and compliance training",
  "Security-Awareness-, Simulations- und Human-Risk-Management-Plattform":"Security-awareness, simulation and human-risk-management platform",
  "Zeigt, wie KI Angriffe verstärkt und zugleich für personalisierte Trainings, Phishing-Simulationen und messbare Verhaltensänderung eingesetzt werden kann.":"Shows how AI amplifies attacks while also supporting personalised training, phishing simulations and measurable behaviour change.",
  "Auswahl, Installation und Betrieb":"Selection, installation and operation",
  "Auswahl, Konstruktion, Installation und Betrieb":"Selection, design, installation and operation",
  "Bestandsanalyse, Planung, Nachrüstung und Betrieb":"Existing-infrastructure analysis, planning, retrofitting and operation",
  "Beschreibt Anforderungen an robuste, zukunftsfähige und wirtschaftliche Schulnetze, einschließlich Nachrüstung, Raumtypen und Netzstruktur. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Describes requirements for robust, future-ready and cost-effective school networks, including retrofitting, room types and network structure. The white paper is requested via the official Telegärtner form and delivered by email.",
  "Das Datennetz in der Decke":"The Data Network in the Ceiling",
  "Einpaarige Datenleitungen, Steckverbinder und Stromversorgung":"Single-pair data cables, connectors and power supply",
  "Erläutert Anwendungen und normkonforme Infrastrukturvarianten für IP-fähige Geräte in oder an Decken von Büro- und Industriegebäuden, Einkaufszentren und Hotels. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Explains applications and standards-compliant infrastructure options for IP-enabled devices in or on ceilings in office and industrial buildings, shopping centres and hotels. The white paper is requested via the official Telegärtner form and delivered by email.",
  "Fernspeisung über die Datenleitung":"Remote Powering over the Data Line",
  "FTTH-/FITB-Glasfaserverkabelung in Gebäuden":"FTTH/FITB fibre-optic cabling in buildings",
  "Geschützte IT-Steckverbinder für raue Umgebungen":"Protected IT connectors for harsh environments",
  "Glasfaser- und Kupferverkabelung, Komponenten und Planung":"Fibre-optic and copper cabling, components and planning",
  "Glasfaseranschluss: FTTH, FITB und danach":"Fibre-Optic Access: FTTH, FITB and Beyond",
  "Industrielle Steckverbinder und Verkabelungskomponenten":"Industrial connectors and cabling components",
  "IT-Steckverbinder für raue Umgebungen":"IT Connectors for Harsh Environments",
  "Leistungsfähige IT-Verkabelung in Schulen":"High-Performance IT Cabling in Schools",
  "M8-/M12-Steckverbinder für Industrial Ethernet":"M8/M12 connectors for Industrial Ethernet",
  "MPTL, Direct Attach Cabling und E2E Link":"MPTL, Direct Attach Cabling and E2E Link",
  "MPTL-, Direct-Attach- und End-to-End-Verbindungen":"MPTL, direct-attach and end-to-end connections",
  "Netzwerkplanung, strukturierte Verkabelung und Komponenten":"Network planning, structured cabling and components",
  "Normkonforme Kupferverkabelung für 25 Gigabit Ethernet":"Standards-compliant copper cabling for 25 Gigabit Ethernet",
  "Normkonforme Netzwerkinfrastruktur für Digital Ceilings":"Standards-compliant network infrastructure for digital ceilings",
  "Normkonforme Verkabelungen für 25 Gigabit Ethernet":"Standards-Compliant Cabling for 25 Gigabit Ethernet",
  "Ordnet Arten der Fernspeisung, ihre Auswirkungen auf die Verkabelungsinfrastruktur und Anforderungen an einen sicheren Betrieb ein. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Classifies remote-powering methods, their impact on the cabling infrastructure and requirements for safe operation. The white paper is requested via the official Telegärtner form and delivered by email.",
  "Ordnet Schutzmaßnahmen für RJ45-, LC-Duplex- und MPO-Verbindungen in Industrie, Fahrzeugen, Bergbau und Außenbereichen ein. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Classifies protection measures for RJ45, LC Duplex and MPO connections in industry, vehicles, mining and outdoor environments. The white paper is requested via the official Telegärtner form and delivered by email.",
  "Ordnet Single Pair Ethernet und Power over Data Lines für durchgängiges Ethernet in Industrie- und Gebäudeautomation ein und erläutert Varianten und Komponenten. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Classifies Single Pair Ethernet and Power over Data Lines for end-to-end Ethernet in industrial and building automation and explains variants and components. The white paper is requested via the official Telegärtner form and delivered by email.",
  "Planung, Installation und Übergabe":"Planning, installation and handover",
  "Planung, Installation und Betrieb":"Planning, installation and operation",
  "Planung, Installation, Messung und Abnahme":"Planning, installation, measurement and acceptance",
  "Planung, Integration und Betrieb":"Planning, integration and operation",
  "Power over Ethernet und Fernspeisung für Gebäudenetze":"Power over Ethernet and remote powering for building networks",
  "RJ45-, LC-Duplex- und MPO-Verbindungstechnik mit Schutzsystemen":"RJ45, LC Duplex and MPO connectivity with protective systems",
  "Robuste IT-Verkabelung für Schulen":"Robust IT cabling for schools",
  "Rundsteckverbindertechnik für IE und Automatisierung":"Circular Connector Technology for Industrial Ethernet and Automation",
  "Single Pair Ethernet und Power over Data Lines":"Single Pair Ethernet and Power over Data Lines",
  "SPE und PoDL":"SPE and PoDL",
  "Steckverbinder, Direktanschluss und Messkonzept":"Connectors, direct attachment and measurement concept",
  "Strukturierte Gebäudeverkabelung und Anschlusskomponenten":"Structured building cabling and connection components",
  "Vergleicht M8-/M12-Rundsteckverbinder mit RJ45 und beschreibt ihren Einsatz für Datenraten bis 10 Gbit/s in Automatisierung, Robotik, Verkehr, Energie und Sicherheitstechnik. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Compares M8/M12 circular connectors with RJ45 and describes their use for data rates up to 10 Gbit/s in automation, robotics, transport, energy and security technology. The white paper is requested via the official Telegärtner form and delivered by email.",
  "Vergleicht normativ definierte Direktanschlussvarianten für Endgeräte, wenn Anschlussdosen und Patchkabel unpraktisch sind, und bezieht die Messung der Links ein. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Compares standards-defined direct-attachment options for end devices where outlets and patch cables are impractical, and covers link measurement. The white paper is requested via the official Telegärtner form and delivered by email.",
  "Verkabelungskomponenten, Planungshinweise und Infrastrukturkonzept":"Cabling components, planning guidance and infrastructure concept",
  "Verkabelungssystem, Normenwissen und Messkonzept":"Cabling system, standards guidance and measurement concept",
  "Zeigt Szenarien für die Verteilung eines Glasfaseranschlusses ab dem Übergabepunkt in Wohn- und Geschäftsgebäuden und bezieht die weitere Kupferverkabelung bis zur Anschlussdose ein. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Shows scenarios for distributing a fibre-optic connection from the handover point in residential and commercial buildings, including the subsequent copper cabling to the outlet. The white paper is requested via the official Telegärtner form and delivered by email.",
  "Fasst technische und normative Anforderungen an 25-Gigabit-Ethernet-Verkabelungen zusammen, darunter Frequenzen, Linklängen, Patchkabel und Messung. Das Whitepaper wird über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt.":"Summarises technical and standards requirements for 25 Gigabit Ethernet cabling, including frequencies, link lengths, patch cables and measurement. The white paper is requested via the official Telegärtner form and delivered by email.",
};
const germanWords=new Set(["der","die","das","den","dem","des","ein","eine","einer","eines","und","oder","für","mit","von","vom","zur","zum","im","im","auf","aus","bei","durch","über","gegen","ohne","mehr","wie","neue","neuen"]);
const englishWords=new Set(["the","a","an","and","or","for","with","from","to","in","on","by","through","over","against","without","more","how","new","your","of"]);

const translationKey=(value:string)=>value.trim();
function dynamicEnglish(value:string){
  const solutionSource=value.match(/^Öffentliche Originalseite von (.+); der beschriebene Lösungsbezug wurde auf der Landingpage geprüft\. Ein möglicher Download hinter einem Formular wurde nicht als gelesen bewertet\.$/);
  if(solutionSource)return `Public original source from ${solutionSource[1]}; the solution context was checked on the landing page. A possible download behind a form was not treated as read.`;
  const editorialReview=value.match(/^Originalquelle, Metadaten, Anbieterfamilie und SmartTech-Einordnung wurden am (\d{4}-\d{2}-\d{2}) redaktionell geprüft\.$/);
  if(editorialReview)return `The original source, metadata, provider family and SmartTech classification were editorially reviewed on ${editorialReview[1]}.`;
  const providerProfile=value.match(/^Automatisch aus Titel, Quelle und Anbieterprofil der SmartTech-Struktur zugeordnet\. Offizielle Anbieterquelle: (.+)\. Die redaktionelle Qualitätssicherung steht noch aus\.$/);
  if(providerProfile)return `Automatically classified from the title, source and SmartTech provider profile. Official provider source: ${providerProfile[1]}. Editorial quality assurance is still pending.`;
  const providerFamily=value.match(/^Automatisch aus Titel, Quelle, Anbieterfamilie und SmartTech-Taxonomie zugeordnet; offizielle Anbieterquelle: (.+)\. Die redaktionelle Qualitätssicherung steht noch aus\.$/);
  if(providerFamily)return `Automatically classified from the title, source, provider family and SmartTech taxonomy; official provider source: ${providerFamily[1]}. Editorial quality assurance is still pending.`;
}
export function englishText(value:string|undefined){return value?editorialTranslations[value]||translations[value]||translations[translationKey(value)]||dynamicEnglish(value)||value.trim():""}
export function hasEnglishTranslation(value:string|undefined){return !value||Object.hasOwn(editorialTranslations,value)||Object.hasOwn(translations,value)||Object.hasOwn(translations,translationKey(value))||Boolean(dynamicEnglish(value))}
export function originalIsEnglish(title:string){
  const words=title.toLocaleLowerCase("en").match(/[a-zäöüß]+/g)||[];
  const german=words.reduce((sum,word)=>sum+(germanWords.has(word)?1:0),/[äöüß]/i.test(title)?2:0);
  const english=words.reduce((sum,word)=>sum+(englishWords.has(word)?1:0),0);
  if(english>german)return true;if(german>english)return false;
  const normalize=(value:string)=>value.toLocaleLowerCase("en").replace(/[^a-z0-9]+/g," ").trim();
  return normalize(title)===normalize(englishText(title));
}
export function machineTranslated(item:{title:string}){return !originalIsEnglish(item.title)}
export type EnglishKnowledgeItem=Omit<KnowledgeItem,"origin">&{origin:string};
export function englishKnowledge(item:KnowledgeItem):EnglishKnowledgeItem{return {...item,title:englishText(item.title),space:englishText(item.space),related:item.related?.map(englishText),mediaArea:item.mediaArea?englishText(item.mediaArea):undefined,relatedMediaAreas:item.relatedMediaAreas?.map(englishText),channels:item.channels?.map(englishText),topics:item.topics?.map(englishText),challenge:englishText(item.challenge),solution:englishText(item.solution),delivery:englishText(item.delivery),lifecycle:englishText(item.lifecycle),origin:englishText(item.origin),format:englishText(item.format),note:englishText(item.note),stage:item.stage?englishText(item.stage):undefined}}

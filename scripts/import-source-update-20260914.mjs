import {readFile,writeFile} from "node:fs/promises";

const root=new URL("../",import.meta.url);
const baseUrl=new URL("public/data/publications.json",root);
const weeklyUrl=new URL("public/data/publications-update-2026-09-07.json",root);
const additions=[
  {
    "c": "HPP GmbH",
    "d": "2026-09-14",
    "t": "Beratung im Wandel – Beratung, die Wirkung entfaltet: HPP Consulting feiert 30-jähriges Bestehen",
    "u": "https://www.marketingleiter.today/beratung-im-wandel-beratung-die-wirkung-entfaltet-hpp-consulting-feiert-30-jaehriges-bestehen/",
    "p": [
      "IT-Management.today",
      "Marketingleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Cisco International Limited",
    "d": "2026-09-13",
    "t": "Doppelrisiko Quantum und KI: Die Schlösser brechen bereits",
    "u": "https://www.computerweekly.com/de/meinung/Doppelrisiko-Quantum-und-KI-Die-Schloesser-brechen-bereits",
    "p": [
      "ComputerWeekly"
    ],
    "r": "Gastautor/Unternehmensbeitrag",
    "s": "Hoch"
  },
  {
    "c": "ADN Advanced Digital Network Distribution GmbH",
    "d": "2026-09-11",
    "t": "KI, Cloud und Security: ADN wird auf der it-sa 2026 zum Hotspot für führende Technologien",
    "u": "https://www.it-management.today/it-sa-2026_adn-verbindet-ki-cloud-und-security/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Apptio",
    "d": "2026-09-11",
    "t": "KI-Kosten im Griff: Was lernen Unternehmen aus dem Cloud-Boom?",
    "u": "https://www.computerweekly.com/de/meinung/KI-Kosten-im-Griff-Was-lernen-Unternehmen-aus-dem-Cloud-Boom",
    "p": [
      "ComputerWeekly"
    ],
    "r": "Gastautor/Unternehmensbeitrag",
    "s": "Hoch"
  },
  {
    "c": "ARAG SE",
    "d": "2026-09-11",
    "t": "Neue Spielregeln für Streaming-Dienste",
    "u": "https://www.it-management.today/neue-spielregeln-fuer-streaming-dienste/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "CoreView",
    "d": "2026-09-11",
    "t": "CoreView auf der it-sa 2026: Microsoft-365-Sicherheit als Fundament für den KI-Einsatz",
    "u": "https://www.it-management.today/coreview-auf-der-it-sa-2026-microsoft-365-sicherheit-als-fundament-fuer-den-ki-einsatz/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "CWE Holding Europe GmbH",
    "d": "2026-09-11",
    "t": "Petition für Cannabisblüten auf Rezept",
    "u": "https://www.produktionsleiter.today/petition-fuer-cannabisblueten-auf-rezept/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "idgard",
    "d": "2026-09-11",
    "t": "Digitale Souveränität in der Cloud – Ihre Daten in US-Händen?",
    "u": "https://www.b2b-expertise.com/it/security/digitale-souveranitat-in-der-cloud-ihre-daten-in-us-haenden/",
    "p": [
      "B2B Expertise"
    ],
    "r": "Herausgeber/Anbieter laut Landingpage",
    "s": "Hoch"
  },
  {
    "c": "Ines Rauscher – Expertin für Human Quality Capital und Leadership im KI-Zeitalter",
    "d": "2026-09-11",
    "t": "25 Jahre nach 9/11 zurück in New York: Was Menschen unter Druck handlungsfähig hält",
    "u": "https://www.produktionsleiter.today/25-jahre-nach-9-11-zurueck-in-new-york-was-menschen-unter-druck-handlungsfaehig-haelt/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Kanzlei Consilium",
    "d": "2026-09-11",
    "t": "Ein Jahr statt drei: Privatinsolvenz in Irland endet nach zwölf Monaten und wird in Deutschland automatisch anerkannt",
    "u": "https://www.produktionsleiter.today/ein-jahr-statt-drei-privatinsolvenz-in-irland-endet-nach-zwoelf-monaten-und-wird-in-deutschland-automatisch-anerkannt/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today",
      "Businessleader.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "KYOCERA Europe GmbH",
    "d": "2026-09-11",
    "t": "Die Serienproduktion von BIOCERAM AZUL® in Waiblingen",
    "u": "https://www.produktionsleiter.today/die-serienproduktion-von-bioceram-azul-in-waiblingen/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Link11",
    "d": "2026-09-11",
    "t": "Vom Skript zum Prompt: Wie KI die Hürden für Botnetze senkt",
    "u": "https://www.computerweekly.com/de/meinung/Vom-Skript-zum-Prompt-Wie-KI-die-Huerden-fuer-Botnetze-senkt",
    "p": [
      "ComputerWeekly"
    ],
    "r": "Gastautor/Unternehmensbeitrag",
    "s": "Hoch"
  },
  {
    "c": "MMD Monitors and Displays B.V.",
    "d": "2026-09-11",
    "t": "Gaming mit 200 Hz, KI-gestütztem Ambiglow und USB-C: der Philips Evnia 34M2C5601QA",
    "u": "https://www.it-management.today/gaming-mit-200-hz-ki-gestuetztem-ambiglow-und-usb-c-der-philips-evnia-34m2c5601qa/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "MS WEBDESIGN",
    "d": "2026-09-11",
    "t": "25 Jahre MS WEBDESIGN. Die Lustenauer Webagentur feiert ihr Jubiläum mit einem neuen Auftritt",
    "u": "https://www.it-management.today/25-jahre-ms-webdesign-die-lustenauer-webagentur-feiert-ihr-jubilaeum-mit-einem-neuen-auftritt/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "QAD Redzone",
    "d": "2026-09-11",
    "t": "Connected-Workforce-Lösung Redzone baut DACH-Präsenz aus und bringt „Champions of Manufacturing“ nach München",
    "u": "https://www.produktionsleiter.today/connected-workforce-loesung-redzone-baut-dach-praesenz-aus-und-bringt-champions-of-manufacturing-nach-muenchen/",
    "p": [
      "IT-Management.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "ServiceNow",
    "d": "2026-09-11",
    "t": "3 ways to simplify selling to accelerate growth",
    "u": "https://whitepaper.cio.de/resources/3-ways-to-simplify-selling-to-accelerate-growth-7",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "ServiceNow",
    "d": "2026-09-11",
    "t": "Escape the Trap of Legacy",
    "u": "https://whitepaper.cio.de/resources/escape-the-trap-of-legacy-5",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "Studio Reges Auge e.K.",
    "d": "2026-09-11",
    "t": "KI in der Kunst: Werkzeug statt Ersatz",
    "u": "https://www.it-management.today/ki-in-der-kunst-werkzeug-statt-ersatz/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Syngenio AG",
    "d": "2026-09-11",
    "t": "Wero jetzt auch am POS",
    "u": "https://www.produktionsleiter.today/wero-jetzt-auch-am-pos/",
    "p": [
      "IT-Management.today",
      "Personalleiter.today",
      "Produktionsleiter.today",
      "Businessleader.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "bioresonanz-zukunft, M+V Medien- und Verlagsservice Germany UG (haftungsbeschränkt)",
    "d": "2026-09-10",
    "t": "Die Brennnessel – Vom Unkraut zur gefragten Heilpflanze der modernen Phytotherapie",
    "u": "https://www.produktionsleiter.today/die-brennnessel-vom-unkraut-zur-gefragten-heilpflanze-der-modernen-phytotherapie/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "BusinessCode",
    "d": "2026-09-10",
    "t": "Martin Schulze in den Bundeswirtschaftssenat des BVMW berufen",
    "u": "https://www.produktionsleiter.today/martin-schulze-in-den-bundeswirtschaftssenat-des-bvmw-berufen/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "CBXNET combox internet GmbH",
    "d": "2026-09-10",
    "t": "Richtfunk von CBXNET: Performance auf Glasfaserniveau",
    "u": "https://www.produktionsleiter.today/richtfunk-von-cbxnet-performance-auf-glasfaserniveau/",
    "p": [
      "IT-Management.today",
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "CrowdStrike",
    "d": "2026-09-10",
    "t": "KURZFASSUNG: 2026 Threat Hunting Report",
    "u": "https://whitepaper.cio.de/resources/kurzfassung-2026-threat-hunting-report",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "Dienstleistungen24, Inhaber Jim Eichholz",
    "d": "2026-09-10",
    "t": "Handwerker 2026: Aufträge gewinnen ohne Provision",
    "u": "https://www.produktionsleiter.today/handwerker-2026-auftraege-gewinnen-ohne-provision/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "DMSFACTORY GmbH",
    "d": "2026-09-10",
    "t": "Neue Erweiterung für M-Files ECM der DMSFACTORY",
    "u": "https://www.it-management.today/neue-erweiterung-fuer-m-files-ecm-der-dmsfactory/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Genetec Deutschland GmbH",
    "d": "2026-09-10",
    "t": "EU Cyber Resilience Act legt die Messlatte für Anbieter von physischen Sicherheitslösungen höher",
    "u": "https://www.produktionsleiter.today/eu-cyber-resilience-act-legt-die-messlatte-fuer-anbieter-von-physischen-sicherheitsloesungen-hoeher/",
    "p": [
      "IT-Management.today",
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Graubner Industrie-Beratung GmbH",
    "d": "2026-09-10",
    "t": "Digitale Arbeitsmittelprüfung: Zehn Praxispartner gesucht",
    "u": "https://www.produktionsleiter.today/digitale-arbeitsmittelpruefung-zehn-praxispartner-gesucht/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Hyland",
    "d": "2026-09-10",
    "t": "Digital reif, aber nicht vernetzt: Neue Hürden bremsen die Transformation in DACH",
    "u": "https://www.it-management.today/digital-reif-aber-nicht-vernetzt-neue-huerden-bremsen-die-transformation-in-dach/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "IBM",
    "d": "2026-09-10",
    "t": "Bericht zu den Kosten einer Datenschutzverletzung 2026",
    "u": "https://whitepaper.cio.de/resources/bericht-zu-den-kosten-einer-datenschutzverletzung-2026",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "IBM",
    "d": "2026-09-10",
    "t": "Souveränität in die Praxis umsetzen: Ein Leitfaden für Führungskräfte zur Skalierung von KI bei gleichzeitiger Wahrung von Kontrolle, Compliance und Unabhängigkeit",
    "u": "https://whitepaper.cio.de/resources/souveranitat-in-die-praxis-umsetzen-ein-leitfaden-fur-fuhrungskrafte-zur-skalierung-von-ki-bei-gleichzeitiger-wahrung-von-kontrolle-compliance-und-unabhangigkeit",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "IONOS SE",
    "d": "2026-09-10",
    "t": "What Does Moving to the Cloud Actually Cost You — and What Do You Get Back?",
    "u": "https://b2b-knowhow.com/assets/20286-what-does-moving-to-the-cloud-actually-cost-you-and-what-do-you-get-back",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Neuwerk Frankfurt GmbH",
    "d": "2026-09-10",
    "t": "Neuer Name, neues Kapitel, gleiche Expertise",
    "u": "https://www.produktionsleiter.today/neuer-name-neues-kapitel-gleiche-expertise/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "NICE Cognigy",
    "d": "2026-09-10",
    "t": "AOK PLUS bearbeitet jährlich fünf Millionen Versichertenkontakte mit KI-Agenten von NiCE Cognigy",
    "u": "https://www.it-management.today/aok-plus-bearbeitet-jaehrlich-fuenf-millionen-versichertenkontakte-mit-ki-agenten-von-nice-cognigy/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Serviceware",
    "d": "2026-09-10",
    "t": "Agentic AI im ITSM – Eingebaut, statt drangeschraubt!",
    "u": "https://whitepaper.cio.de/resources/agentic-ai-im-itsm-eingebaut-statt-drangeschraubt-2",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "Serviceware",
    "d": "2026-09-10",
    "t": "KI im ITSM: Der Survival-Guide für transformatives Service-Management",
    "u": "https://whitepaper.cio.de/resources/ki-im-itsm-der-survival-guide-fur-transformatives-service-management-2",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "simus systems GmbH",
    "d": "2026-09-10",
    "t": "Fit for AI: Technische Daten bestimmen den KI-Erfolg",
    "u": "https://www.it-management.today/fit-for-ai-technische-daten-bestimmen-den-ki-erfolg/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Sophos GmbH",
    "d": "2026-09-10",
    "t": "KI-gestützte Cyberangriffe: So rüsten Sie Ihre Abwehr richtig auf",
    "u": "https://business-services.heise.de/security/security-management/beitrag/ki-gestuetzte-cyberangriffe-so-ruesten-sie-ihre-abwehr-richtig-auf-5106",
    "p": [
      "heise Business Services"
    ],
    "r": "Herausgeber/Anbieter laut Seitenfeld",
    "s": "Mittel"
  },
  {
    "c": "SVA System Vertrieb Alexander GmbH",
    "d": "2026-09-10",
    "t": "Internationale Standards vs. lokale Flexibilität: So gelingt der globale System-Rollout – am Beispiel des Immobilien-Managements",
    "u": "https://business-services.heise.de/software/enterprise-software/beitrag/internationale-standards-vs-lokale-flexibilitaet-so-gelingt-der-globale-system-rollout-am-beispiel-des-immobilienmanagements-5104",
    "p": [
      "heise Business Services"
    ],
    "r": "Herausgeber/Anbieter laut Seitenfeld",
    "s": "Mittel"
  },
  {
    "c": "TANAKA PRECIOUS METAL GROUP Co., Ltd.",
    "d": "2026-09-10",
    "t": "TANAKA präsentiert Edelmetalltechnologien auf der Hydrogen Technology World Expo 2026 in Hamburg",
    "u": "https://www.produktionsleiter.today/tanaka-praesentiert-edelmetalltechnologien-auf-der-hydrogen-technology-world-expo-2026-in-hamburg/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "The Ascott Limited",
    "d": "2026-09-10",
    "t": "Ascott beschleunigt Vietnam-Expansion",
    "u": "https://www.produktionsleiter.today/ascott-beschleunigt-vietnam-expansion/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "TRENDS Research & Advisory",
    "d": "2026-09-10",
    "t": "Der Besuch von Mohamed bin Zayed in Deutschland: Ein neues Kapitel der deutsch-emiratischen strategischen Partnerschaft",
    "u": "https://www.produktionsleiter.today/der-besuch-von-mohamed-bin-zayed-in-deutschland-ein-neues-kapitel-der-deutsch-emiratischen-strategischen-partnerschaft/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Versa Networks",
    "d": "2026-09-10",
    "t": "Post-Quanten-Kryptografie: Die Bedrohung beginnt heute",
    "u": "https://www.computerweekly.com/de/meinung/Post-Quanten-Kryptografie-Die-Bedrohung-beginnt-heute",
    "p": [
      "ComputerWeekly"
    ],
    "r": "Gastautor/Unternehmensbeitrag",
    "s": "Hoch"
  },
  {
    "c": "Zulassungsautomat",
    "d": "2026-09-10",
    "t": "Zulassungsstellen: Median-Vorlauf liegt bei fünf Tagen",
    "u": "https://www.produktionsleiter.today/zulassungsstellen-median-vorlauf-liegt-bei-fuenf-tagen/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "agilimo Consulting GmbH",
    "d": "2026-09-09",
    "t": "agilimo und Ollon bauen souveräne Kommunikationsplattformen für Kanada",
    "u": "https://www.produktionsleiter.today/agilimo-und-ollon-bauen-souveraene-kommunikationsplattformen-fuer-kanada/",
    "p": [
      "IT-Management.today",
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Asahi Kasei Europe GmbH",
    "d": "2026-09-09",
    "t": "Asahi Kasei präsentiert auf der Fakuma 2026 innovative Kunststofflösungen für Mobilität, Elektrifizierung und industrielle Anwendungen",
    "u": "https://www.produktionsleiter.today/asahi-kasei-praesentiert-auf-der-fakuma-2026-innovative-kunststoffloesungen-fuer-mobilitaet-elektrifizierung-und-industrielle-anwendungen/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Coaching Executives – Executive Events",
    "d": "2026-09-09",
    "t": "Ich, Ich, Ich: Die Diktatur der Selbstinszenierung in den Vorstandsetagen",
    "u": "https://www.produktionsleiter.today/ich-ich-ich-die-diktatur-der-selbstinszenierung-in-den-vorstandsetagen/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Controlware GmbH",
    "d": "2026-09-09",
    "t": "Controlware erweitert Managed Service-Portfolio um neue Infrastructure-Operations-Pakete für mehr Transparenz, Sicherheit und Skalierbarkeit",
    "u": "https://www.it-management.today/controlware-erweitert-managed-service-portfolio-um-neue-infrastructure-operations-pakete-fuer-mehr-transparenz-sicherheit-und-skalierbarkeit/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "DBS Drahtbiege Solutions GmbH & CO KG",
    "d": "2026-09-09",
    "t": "Präzise Drahtbiegeteile mit CNC-Technik",
    "u": "https://www.produktionsleiter.today/praezise-drahtbiegeteile-mit-cnc-technik/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "ESS Solutions GmbH",
    "d": "2026-09-09",
    "t": "ESS Solutions GmbH eröffnet neues Büro in Rostock",
    "u": "https://www.produktionsleiter.today/ess-solutions-gmbh-eroeffnet-neues-buero-in-rostock/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Extreme Networks",
    "d": "2026-09-09",
    "t": "Extreme stellt branchenweit ersten proaktiven, kontextsensitiven KI-Agenten für Netzwerke vor",
    "u": "https://www.it-management.today/extreme-stellt-branchenweit-ersten-proaktiven-kontextsensitiven-ki-agenten-fuer-netzwerke-vor/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "F5",
    "d": "2026-09-09",
    "t": "F5 beschleunigt Schutz durch virtuelles Patching und KI-gestützte WAF",
    "u": "https://www.it-management.today/f5-beschleunigt-schutz-durch-virtuelles-patching-und-ki-gestuetzte-waf/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Gelbe Seiten",
    "d": "2026-09-09",
    "t": "Von der KI ignoriert? Studie von Gelbe Seiten zeigt: 77 Prozent der Betriebe sind für ChatGPT & Co. unsichtbar",
    "u": "https://www.produktionsleiter.today/von-der-ki-ignoriert-studie-von-gelbe-seiten-zeigt-77-prozent-der-betriebe-sind-fuer-chatgpt-co-unsichtbar/",
    "p": [
      "Personalleiter.today",
      "Marketingleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "German Edge Cloud GmbH & Co. KG",
    "d": "2026-09-09",
    "t": "Von der Digital Factory zur Agentic Factory: German Edge Cloud und Phoeniqs stellen AI Agents vor",
    "u": "https://www.it-management.today/von-der-digital-factory-zur-agentic-factory-german-edge-cloud-und-phoeniqs-stellen-ai-agents-vor/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "IBM",
    "d": "2026-09-09",
    "t": "Modernisierung im Zeitalter der agentischen KI schneller, intelligenter und wirtschaftlicher gestalten",
    "u": "https://whitepaper.cio.de/resources/modernisierung-im-zeitalter-der-agentischen-ki-schneller-intelligenter-und-wirtschaftlicher-gestalten-2",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "IBM",
    "d": "2026-09-09",
    "t": "ROI realisieren: Ein praktischer Leitfaden zur agentischen KI für Unternehmensleitungen",
    "u": "https://whitepaper.cio.de/resources/roi-realisieren-ein-praktischer-leitfaden-zur-agentischen-ki-fur-unternehmensleitungen",
    "p": [
      "Whitepaper CIO.de"
    ],
    "r": "Herausgeber laut RSS-Publisherfeld",
    "s": "Hoch"
  },
  {
    "c": "IONOS SE",
    "d": "2026-09-09",
    "t": "A CIO’s guide to migrating AI to a sovereign cloud",
    "u": "https://b2b-knowhow.com/assets/20281-a-cio-s-guide-to-migrating-ai-to-a-sovereign-cloud",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "IONOS SE",
    "d": "2026-09-09",
    "t": "Künstliche Intelligenz souverän betreiben",
    "u": "https://b2b-knowhow.com/assets/20280-kunstliche-intelligenz-souveran-betreiben",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Ivalua",
    "d": "2026-09-09",
    "t": "Ivalua wird zum zweiten Mal in Folge mit der EcoVadis-Goldmedaille ausgezeichnet",
    "u": "https://www.produktionsleiter.today/ivalua-wird-zum-zweiten-mal-in-folge-mit-der-ecovadis-goldmedaille-ausgezeichnet/",
    "p": [
      "IT-Management.today",
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Kompass Sicherheitstechnik GmbH",
    "d": "2026-09-09",
    "t": "KI-gestützter Perimeterschutz für Agrarindustrie, kommunale Betriebe und Gewerbeobjekte",
    "u": "https://www.produktionsleiter.today/ki-gestuetzter-perimeterschutz-fuer-agrarindustrie-kommunale-betriebe-und-gewerbeobjekte/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "leopard.ki",
    "d": "2026-09-09",
    "t": "leopard.ki bringt KI-Berater für Messtechnik zur AMB 2026",
    "u": "https://www.produktionsleiter.today/leopard-ki-bringt-ki-berater-fuer-messtechnik-zur-amb-2026/",
    "p": [
      "IT-Management.today",
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Nayax GmbH",
    "d": "2026-09-09",
    "t": "VENDTRA 2026: Nayax integriert Altersverifikation in den Bezahlvorgang",
    "u": "https://www.it-management.today/vendtra-2026-nayax-integriert-altersverifikation-in-den-bezahlvorgang/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "NETILITY GmbH & Co.KG",
    "d": "2026-09-09",
    "t": "Loesdau setzt auf Cyberresilienz als Service von NETILITY",
    "u": "https://www.it-management.today/loesdau-setzt-auf-cyberresilienz-als-service-von-netility/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Paessler GmbH",
    "d": "2026-09-09",
    "t": "OT-Monitoring: Warum Transparenz in industriellen Netzwerken so wichtig ist",
    "u": "https://www.it-management.today/ot-monitoring-warum-transparenz-in-industriellen-netzwerken-so-wichtig-ist/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Plasma Cloud Pte. Ltd.",
    "d": "2026-09-09",
    "t": "Starker Auftritt statt Austauschbarkeit: Wie IT-Dienstleister eine eigene Wi-Fi-Marke aufbauen",
    "u": "https://business-services.heise.de/hardware/netzwerk-hardware/beitrag/starker-auftritt-statt-austauschbarkeit-wie-it-dienstleister-eine-eigene-wi-fi-marke-aufbauen-5105",
    "p": [
      "heise Business Services"
    ],
    "r": "Herausgeber/Anbieter laut Seitenfeld",
    "s": "Mittel"
  },
  {
    "c": "Roland Franz & Partner, Steuerberater",
    "d": "2026-09-09",
    "t": "Höhere Steuerfreibeträge für das kommunale Ehrenamt",
    "u": "https://www.produktionsleiter.today/hoehere-steuerfreibetraege-fuer-das-kommunale-ehrenamt/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Scality",
    "d": "2026-09-09",
    "t": "Scality stellt Maestro vor, um der steigenden Nachfrage nach Backup-as-a-Service gerecht zu werden",
    "u": "https://www.produktionsleiter.today/scality-stellt-maestro-vor-um-der-steigenden-nachfrage-nach-backup-as-a-service-gerecht-zu-werden/",
    "p": [
      "IT-Management.today",
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Scheer IMC",
    "d": "2026-09-09",
    "t": "Intelligente Phishing-Angriffe: So schützen Sie Ihre Belegschaft vor KI-basierten Cyberattacken",
    "u": "https://business-services.heise.de/security/security-management/beitrag/intelligente-phishing-angriffe-so-schuetzen-sie-ihre-belegschaft-vor-ki-basierten-cyberattacken-5102",
    "p": [
      "heise Business Services"
    ],
    "r": "Herausgeber/Anbieter laut Seitenfeld",
    "s": "Mittel"
  },
  {
    "c": "SEPPmail Deutschland GmbH",
    "d": "2026-09-09",
    "t": "E-Mail-Sicherheit in Behörden erfordert Schutz ohne zusätzliche Hürden",
    "u": "https://www.it-management.today/e-mail-sicherheit-in-behoerden-erfordert-schutz-ohne-zusaetzliche-huerden/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Siemens Industry Software",
    "d": "2026-09-09",
    "t": "Enabling Data-Driven Decisions to Improve Operational Excellence",
    "u": "https://b2b-knowhow.com/assets/20284-enabling-data-driven-decisions-to-improve-operational-excellence",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Siemens Industry Software",
    "d": "2026-09-09",
    "t": "Unlock New Possibilities with the Executable Digital Twin",
    "u": "https://b2b-knowhow.com/assets/20283-unlock-new-possibilities-with-the-executable-digital-twin",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Siemens Industry Software",
    "d": "2026-09-09",
    "t": "Accelerating Process Design Optimization for Sustainable Chemical Manufacturing",
    "u": "https://b2b-knowhow.com/assets/20282-accelerating-process-design-optimization-for-sustainable-chemical-manufacturing",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Taiwan Flagship showcase",
    "d": "2026-09-09",
    "t": "Taiwan eröffnet Flagship Showcase auf der Automechanika Frankfurt 2026",
    "u": "https://www.produktionsleiter.today/taiwan-eroeffnet-flagship-showcase-auf-der-automechanika-frankfurt-2026/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Tyler Technologies",
    "d": "2026-09-09",
    "t": "When “IT WORKS” isn’t working – A practical ROI assessment of modern school ERP",
    "u": "https://www.b2b-expertise.com/en/it-en/when-it-works-isnt-working/",
    "p": [
      "B2B Expertise"
    ],
    "r": "Herausgeber/Anbieter laut Landingpage",
    "s": "Hoch"
  },
  {
    "c": "Wonderful",
    "d": "2026-09-09",
    "t": "Bis 2029: FC Bayern und Wonderful vereinbaren Partnerschaft",
    "u": "https://www.it-management.today/bis-2029-fc-bayern-und-wonderful-vereinbaren-partnerschaft/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "A. Engelhardt Markenkonzepte GmbH",
    "d": "2026-09-08",
    "t": "Neue Ballermann-Kampagne startet",
    "u": "https://www.produktionsleiter.today/neue-ballermann-kampagne-startet/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "ABB",
    "d": "2026-09-08",
    "t": "The Right Analyzer Solutions for Hazardous Areas",
    "u": "https://b2b-knowhow.com/assets/20273-the-right-analyzer-solutions-for-hazardous-areas",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Akeneo",
    "d": "2026-09-08",
    "t": "DMEXCO 2026: Akeneo zeigt, wie bessere Produktdaten Conversion-Verluste verhindern",
    "u": "https://www.produktionsleiter.today/dmexco-2026-akeneo-zeigt-wie-bessere-produktdaten-conversion-verluste-verhindern/",
    "p": [
      "IT-Management.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "aktivweb System- und Datentechnik GmbH",
    "d": "2026-09-08",
    "t": "Mehr als ERP und CRM: eclift erweitert seine Branchenlösung um DOCBOX®-Integration",
    "u": "https://www.it-management.today/mehr-als-erp-und-crm-eclift-erweitert-seine-branchenloesung-um-docbox-integration/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Althea Deutschland GmbH",
    "d": "2026-09-08",
    "t": "Exklusiver Stand von Althea Deutschland auf der „Viszeralmedizin 2026“ in Hamburg",
    "u": "https://www.produktionsleiter.today/exklusiver-stand-von-althea-deutschland-auf-der-viszeralmedizin-2026-in-hamburg/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Asahi Kasei Europe GmbH",
    "d": "2026-09-08",
    "t": "Stromsensoren der Serien CZ39 und CZ3K von Asahi Kasei Microdevices",
    "u": "https://www.it-management.today/stromsensoren-der-serien-cz39-und-cz3k-von-asahi-kasei-microdevices/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "audius SE",
    "d": "2026-09-08",
    "t": "audius sorgt für Sicherheit beim Wildtierportal Baden-Württemberg",
    "u": "https://www.it-management.today/audius-sorgt-fuer-sicherheit-beim-wildtierportal-baden-wuerttemberg/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Bitdefender GmbH",
    "d": "2026-09-08",
    "t": "Digitale Abhängigkeit: So gefährlich ist Sie für Ihr Unternehmen",
    "u": "https://business-services.heise.de/it-management/digitale-souveraenitaet/beitrag/digitale-abhaengigkeit-so-gefaehrlich-ist-sie-fuer-ihr-unternehmen-5100",
    "p": [
      "heise Business Services"
    ],
    "r": "Herausgeber/Anbieter laut Seitenfeld",
    "s": "Mittel"
  },
  {
    "c": "BlackLine",
    "d": "2026-09-08",
    "t": "BlackLine erweitert Leistungsangebot für komplexe Finanz-Workflows mit PCI DSS-Compliance-Validierung",
    "u": "https://www.produktionsleiter.today/blackline-erweitert-leistungsangebot-fuer-komplexe-finanz-workflows-mit-pci-dss-compliance-validierung/",
    "p": [
      "IT-Management.today",
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Brick Towers AG",
    "d": "2026-09-08",
    "t": "Brick Towers und urble: Langfristiges Sparen mit Bitcoin und Schweizer Franken neu gedacht",
    "u": "https://www.produktionsleiter.today/brick-towers-und-urble-langfristiges-sparen-mit-bitcoin-und-schweizer-franken-neu-gedacht/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Cloudyrion",
    "d": "2026-09-08",
    "t": "Was der Cyber Resilience Act im digitalen Zeitalter bedeutet",
    "u": "https://www.computerweekly.com/de/meinung/Was-der-Cyber-Resilience-Act-im-digitalen-Zeitalter-bedeutet",
    "p": [
      "ComputerWeekly"
    ],
    "r": "Gastautor/Unternehmensbeitrag",
    "s": "Hoch"
  },
  {
    "c": "DENIOS SE",
    "d": "2026-09-08",
    "t": "DENIOS engagiert sich für Kinder in der Region – Partnerschaft mit dem Kinderschutzbund Minden-Bad Oeynhausen",
    "u": "https://www.produktionsleiter.today/denios-engagiert-sich-fuer-kinder-in-der-region-partnerschaft-mit-dem-kinderschutzbund-minden-bad-oeynhausen/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "DM Solutions GmbH",
    "d": "2026-09-08",
    "t": "Mehr als nur Technik: Warum der Datenstandort bei Hosting-Entscheidungen eine zentrale Rolle spielt",
    "u": "https://www.produktionsleiter.today/mehr-als-nur-technik-warum-der-datenstandort-bei-hosting-entscheidungen-eine-zentrale-rolle-spielt/",
    "p": [
      "IT-Management.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "fotoCharly Fotobuch & Fotogeschenke",
    "d": "2026-09-08",
    "t": "Kalender 2027 erstellen und zum Vorteilspreis bestellen: Jahreskalender, Tischkalender oder Adventkalender",
    "u": "https://www.produktionsleiter.today/kalender-2027-erstellen-und-zum-vorteilspreis-bestellen-jahreskalender-tischkalender-oder-adventkalender/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Fraunhofer IGD",
    "d": "2026-09-08",
    "t": "Forensische Bilddaten automatisiert zusammenführen und Befundung nachvollziehbarer machen",
    "u": "https://www.produktionsleiter.today/forensische-bilddaten-automatisiert-zusammenfuehren-und-befundung-nachvollziehbarer-machen/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "heinekingmedia GmbH",
    "d": "2026-09-08",
    "t": "heinekingmedia stellt sich neu auf",
    "u": "https://www.it-management.today/heinekingmedia-stellt-sich-neu-auf/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "HUK-COBURG",
    "d": "2026-09-08",
    "t": "Beruf oder Studium: Eine neue Lebensphase beginnt",
    "u": "https://www.produktionsleiter.today/beruf-oder-studium-eine-neue-lebensphase-beginnt/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "KI-Lotse – ein gemeinsames Angebot der Mindset AG und der One Direction AG",
    "d": "2026-09-08",
    "t": "KI-Sichtbarkeit: Wie Unternehmen mit GEO und AEO in die Antworten von Claude, ChatGPT, Gemini und Perplexity kommen",
    "u": "https://www.it-management.today/ki-sichtbarkeit-wie-unternehmen-mit-geo-und-aeo-in-die-antworten-von-claude-chatgpt-gemini-und-perplexity-kommen/",
    "p": [
      "IT-Management.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Lohnsteuerhilfe Bayern e. V.",
    "d": "2026-09-08",
    "t": "Parteispenden: Politisches Engagement lohnt sich doppelt",
    "u": "https://www.produktionsleiter.today/parteispenden-politisches-engagement-lohnt-sich-doppelt/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Mahnbescheid.de",
    "d": "2026-09-08",
    "t": "mahnbescheid.de: Gerichtlichen Mahnbescheid online beantragen",
    "u": "https://www.produktionsleiter.today/mahnbescheid-de-gerichtlichen-mahnbescheid-online-beantragen/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Personal Training & Medical Performance",
    "d": "2026-09-08",
    "t": "Longevity beginnt im Muskel",
    "u": "https://www.produktionsleiter.today/longevity-beginnt-im-muskel/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Plastic is Fantastic Association",
    "d": "2026-09-08",
    "t": "Marktstrategie",
    "u": "https://www.produktionsleiter.today/marktstrategie/",
    "p": [
      "Personalleiter.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "PRaiSense / JETZT [PR] – Media & News Specialists",
    "d": "2026-09-08",
    "t": "Kann KI journalistisch entscheiden, wann ein Pressetext Nachrichtenwert hat?",
    "u": "https://www.marketingleiter.today/kann-ki-journalistisch-entscheiden-wann-ein-pressetext-nachrichtenwert-hat/",
    "p": [
      "Marketingleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "schnell.digital GmbH",
    "d": "2026-09-08",
    "t": "schnell.digital startet Begleitungspakete für den KI-Einstieg im Mittelstand",
    "u": "https://www.produktionsleiter.today/schnell-digital-startet-begleitungspakete-fuer-den-ki-einstieg-im-mittelstand/",
    "p": [
      "IT-Management.today",
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  },
  {
    "c": "Siemens Industry Software",
    "d": "2026-09-08",
    "t": "Battery Machine Building: Unify Teams, Unify Data",
    "u": "https://b2b-knowhow.com/assets/20279-battery-machine-building-unify-teams-unify-data",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Siemens Industry Software",
    "d": "2026-09-08",
    "t": "Lead the Battery Race with Intelligent Engineering",
    "u": "https://b2b-knowhow.com/assets/20277-lead-the-battery-race-with-intelligent-engineering",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Siemens Industry Software",
    "d": "2026-09-08",
    "t": "Accelerate Battery Innovation with Cloud-Based PLM",
    "u": "https://b2b-knowhow.com/assets/20276-accelerate-battery-innovation-with-cloud-based-plm",
    "p": [
      "B2B KnowHow"
    ],
    "r": "Partner/Whitepaper-Anbieter",
    "s": "Hoch"
  },
  {
    "c": "Vebego Facility Services B.V. & Co. KG",
    "d": "2026-09-08",
    "t": "Vebego stellt budgetorientierte Reinigung vor",
    "u": "https://www.produktionsleiter.today/vebego-stellt-budgetorientierte-reinigung-vor/",
    "p": [
      "Produktionsleiter.today"
    ],
    "r": "Herausgeber/Firmenkontakt",
    "s": "Hoch"
  }
];
const [base,weekly]=await Promise.all([
  readFile(baseUrl,"utf8").then(JSON.parse),
  readFile(weeklyUrl,"utf8").then(JSON.parse),
]);
let changed=0;
for(const item of [...base,...weekly]){
  if(item.c==="A3 Communications"&&/\bScality\b/i.test(item.t)){item.c="Scality";changed+=1;}
  else if(item.c==="HUK-COBURG Unternehmenskommunikation"){item.c="HUK-COBURG";changed+=1;}
  else if(item.c==="Aktuell Fraunhofer-Institut für Graphische Datenverarbeitung IGD"){item.c="Fraunhofer IGD";changed+=1;}
}
const known=new Set([...base,...weekly].map(item=>item.u));
let nextId=Math.max(...base.map(item=>item.id),...weekly.map(item=>item.id))+1;
const inserted=[];
for(const item of additions){
  if(known.has(item.u))continue;
  inserted.push({id:nextId++,...item});
  known.add(item.u);
}
await Promise.all([
  writeFile(baseUrl,JSON.stringify(base)),
  writeFile(weeklyUrl,JSON.stringify([...weekly,...inserted],null,2)+"\n"),
]);
console.log(`Updated ${changed} existing attributions and appended ${inserted.length} publications.`);

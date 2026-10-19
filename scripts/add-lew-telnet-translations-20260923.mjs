import {readFile,writeFile} from "node:fs/promises";
const target=new URL("../app/translations.en.generated.json",import.meta.url);
const data=JSON.parse(await readFile(target,"utf8"));
const additions={
  "LEW TelNet: IT-Infrastruktur und IT-Sicherheit für Unternehmen": "LEW TelNet: IT infrastructure and IT security for businesses",
  "IT-Infrastruktur und IT-Sicherheitsservices": "IT infrastructure and IT security services",
  "Rechenzentrum, Vernetzung, Security und Carrier-Services": "Data centres, networking, security and carrier services",
  "Bündelt das IT-Portfolio für Unternehmen. LEW nennt die LEW TelNet GmbH als Vertragspartner für Bereitstellung, Betrieb und Support der angebotenen Leistungen.": "Brings together the business IT portfolio. LEW identifies LEW TelNet GmbH as the contractual partner for delivery, operations and support.",
  "Colocation im LEW Green Data Center Augsburg": "Colocation at the LEW Green Data Center in Augsburg",
  "Colocation und Server-Housing": "Colocation and server housing",
  "Shared Rack, eigenes Rack und abgegrenzte Rechenzentrumsfläche": "Shared racks, dedicated racks and segregated data-centre space",
  "Beschreibt die Unterbringung eigener IT-Systeme im 2025 in Betrieb genommenen Green Data Center Augsburg. Das Angebot reicht von einzelnen Höheneinheiten bis zu Racks und Cages; Infrastrukturüberwachung und Störungsannahme sind rund um die Uhr vorgesehen.": "Describes housing customer-owned IT systems at the Green Data Center in Augsburg, commissioned in 2025. Options range from individual rack units to racks and cages, with round-the-clock infrastructure monitoring and incident reception.",
  "LEW Business Server: Managed Hardware im Rechenzentrum": "LEW Business Server: managed hardware in the data centre",
  "Dedizierte Server und Hardwarebetrieb": "Dedicated servers and hardware operations",
  "Servermiete, Installation, Monitoring und Hardware-Service": "Server rental, installation, monitoring and hardware services",
  "Ordnet die Bereitstellung und Betreuung dedizierter Server ein. LEW übernimmt vereinbarte Aufgaben auf Hardwareebene; Architektur, Betriebssysteme, Anwendungen und Daten bleiben in der Verantwortung des Kunden. Der konkrete Umfang richtet sich nach dem Servicelevel.": "Explains provision and support of dedicated servers. LEW performs agreed hardware-level tasks; architecture, operating systems, applications and data remain the customer’s responsibility. The exact scope depends on the service level.",
  "LEW Business VEEAM Cloud Backup: externe Datensicherung": "LEW Business VEEAM Cloud Backup: offsite data protection",
  "Offsite-Backup für VEEAM-Umgebungen": "Offsite backup for VEEAM environments",
  "Regionaler Cloud-Backup-Speicher und Betriebsunterstützung": "Regional cloud backup storage and operational support",
  "Ergänzt bestehende VEEAM-Prozesse um einen externen Sicherungsstandort in Augsburg. Die Quelle beschreibt verschlüsselte Übertragung, Monitoring und optionale Glasfaseranbindung. Die beim Kunden erforderliche VEEAM Backup & Replication Suite ist nicht Bestandteil des Vertrags.": "Adds an offsite backup location in Augsburg to existing VEEAM processes. The source describes encrypted transfer, monitoring and optional fibre connectivity. The customer’s required VEEAM Backup & Replication Suite is not included in the contract.",
  "LEW Standortvernetzung: Managed WAN und Datenfestverbindungen": "LEW site networking: managed WAN and dedicated data links",
  "Standortvernetzung für verteilte Unternehmen": "Site networking for distributed businesses",
  "Managed WAN auf MPLS-VPN-Basis und dedizierte Datenverbindungen": "Managed WAN based on MPLS VPN and dedicated data connections",
  "Verbindet Zentrale, Niederlassungen und weitere Arbeitsorte. Die Quelle unterscheidet betreute Managed-WAN-Lösungen von dedizierten Datenfestverbindungen mit garantierter Bandbreite. Die Auswahl richtet sich nach Standorten, Anwendungen und Betriebsanforderungen.": "Connects headquarters, branches and other workplaces. The source distinguishes managed WAN solutions from dedicated data links with guaranteed bandwidth. Selection depends on locations, applications and operational requirements.",
  "LEW Cloud Connect: dedizierte Anbindung an Cloud-Plattformen": "LEW Cloud Connect: dedicated connectivity to cloud platforms",
  "Dedizierte Multi-Cloud-Anbindung": "Dedicated multi-cloud connectivity",
  "Cloud-Kopplung über Frankfurt oder München": "Cloud interconnection via Frankfurt or Munich",
  "Beschreibt dedizierte Verbindungen zu Cloud-Kopplungspunkten in Frankfurt oder München. Von dort sind laut Anbieter mehr als 50 Cloud-Service-Provider erreichbar, darunter AWS, Microsoft Azure, Google Cloud und IBM Cloud. Bandbreite und Servicelevel werden passend zur Anforderung festgelegt.": "Describes dedicated links to cloud interconnection points in Frankfurt or Munich. According to the provider, more than 50 cloud service providers are reachable from there, including AWS, Microsoft Azure, Google Cloud and IBM Cloud. Bandwidth and service levels are specified to meet requirements.",
  "LEW IT-Sicherheit: Managed Firewall und DDoS Protection": "LEW IT security: managed firewall and DDoS protection",
  "Perimeter-Sicherheit und Schutz vor Überlastungsangriffen": "Perimeter security and protection against denial-of-service attacks",
  "Managed Firewall, VPN, Monitoring und DDoS-Abwehr": "Managed firewall, VPN, monitoring and DDoS mitigation",
  "Ordnet Firewall-Betrieb, VPN-Zugänge und DDoS-Abwehr als kombinierbare Sicherheitsleistungen ein. Die Quelle nennt einen LEW-Glasfaseranschluss als Voraussetzung für DDoS Protection. Technische Sicherheitsmaßnahmen ersetzen keine individuelle Prüfung regulatorischer Pflichten.": "Classifies firewall operations, VPN access and DDoS mitigation as complementary security services. The source states that DDoS Protection requires a LEW fibre connection. Technical security measures do not replace an individual assessment of regulatory obligations.",
  "Planung, Einführung und Betrieb": "Planning, implementation and operations"
};
Object.assign(data.translations,additions);
data.sourceCount=Object.keys(data.translations).length;
data.translations=Object.fromEntries(Object.entries(data.translations).sort(([a],[b])=>a.localeCompare(b,"de")));
await writeFile(target,`${JSON.stringify(data)}\n`);

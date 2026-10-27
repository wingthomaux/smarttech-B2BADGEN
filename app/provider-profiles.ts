import {providerProfilesITRefresh} from "./provider-profiles-it-refresh-20261019";
import {providerProfilesEworld} from "./provider-profiles-eworld-20261027";
export type ProviderProfile={
  officialUrl:string;
  officialLabel:{de:string;en:string};
  metaDescription:{de:string;en:string};
  summary:{de:string;en:string};
  focus:{de:string[];en:string[]};
  buyerGroups:{de:string[];en:string[]};
  aliases?:string[];
  relatedProviders?:Array<{name:string;context:{de:string;en:string};sourceUrl?:string}>;
  languageNote?:{de:string;en:string};
  officialSources?:Array<{url:string;label:{de:string;en:string}}>;
};

const providerProfiles:Record<string,ProviderProfile>={
  "LEW TelNet":{
  "officialUrl": "https://www.lew.de/fuer-unternehmen/it-dienstleistungen",
  "officialLabel": {
    "de": "LEW TelNet: IT-Dienstleistungen",
    "en": "LEW TelNet: IT services"
  },
  "metaDescription": {
    "de": "LEW TelNet: Colocation in Augsburg, Managed Hardware, VEEAM Cloud Backup, Standortvernetzung, Cloud Connect und IT-Sicherheit.",
    "en": "LEW TelNet: colocation in Augsburg, managed hardware, VEEAM cloud backup, site networking, Cloud Connect and IT security."
  },
  "summary": {
    "de": "LEW TelNet GmbH ist der Vertragspartner für die unter LEW angebotenen IT-Dienstleistungen für Unternehmen. Das Portfolio verbindet Colocation im Green Data Center Augsburg mit gemieteter Server-Hardware, externem VEEAM-Backup, Standortvernetzung, Cloud Connect sowie Managed Firewall und DDoS-Schutz. Unternehmen können eigene Systeme in das Rechenzentrum verlagern, mehrere Standorte anbinden oder einzelne Betriebsaufgaben auslagern. Bei Colocation bleibt die eigene Hardware beim Kunden; bei Managed Hardware stellt LEW die Hardware bereit, während der Kunde Anwendungen und Systeme verantwortet. Für die Auswahl zählen Verfügbarkeit, Netzanbindung, Backup- und Wiederherstellungsbedarf sowie die genaue Aufteilung von Betrieb und Support. Weitergehende Plattform- oder Applikationsdienste können über Partner erfolgen und sind getrennt zu prüfen.",
    "en": "LEW TelNet GmbH is the contractual partner for business IT services offered under the LEW brand. Its portfolio combines colocation at the Green Data Center in Augsburg with rented server hardware, offsite VEEAM backup, site networking, Cloud Connect, managed firewalls and DDoS protection. Businesses can move their own systems into the data centre, connect several sites or outsource specific operational tasks. With colocation, the customer retains its own hardware; with managed hardware, LEW provides hardware while the customer remains responsible for systems and applications. Availability, network connectivity, backup and recovery needs, and the precise split of operations and support matter in selection. Additional platform or application services may involve partners and require separate assessment."
  },
  "focus": {
    "de": [
      "Colocation im Green Data Center Augsburg",
      "Managed Hardware und dedizierte Server",
      "VEEAM Cloud Backup",
      "Standortvernetzung und Managed WAN",
      "Cloud Connect",
      "Managed Firewall und DDoS-Schutz",
      "Rechenzentrumsbetrieb und physische Sicherheit"
    ],
    "en": [
      "Colocation at the Green Data Center in Augsburg",
      "Managed hardware and dedicated servers",
      "VEEAM cloud backup",
      "Site networking and managed WAN",
      "Cloud Connect",
      "Managed firewall and DDoS protection",
      "Data-centre operations and physical security"
    ]
  },
  "buyerGroups": {
    "de": [
      "IT-Leitung und Infrastrukturverantwortliche",
      "Rechenzentrums- und IT-Betrieb",
      "Netzwerk- und Cloud-Architektur",
      "IT-Sicherheit und Business Continuity",
      "IT-Einkauf und Geschäftsführung",
      "Business Continuity und Wiederherstellung",
      "Standort- und Gebäudeverantwortliche"
    ],
    "en": [
      "IT leadership and infrastructure managers",
      "Data-centre and IT operations",
      "Network and cloud architecture",
      "IT security and business continuity",
      "IT procurement and executive management",
      "Business continuity and recovery",
      "Site and facilities management"
    ]
  }
},
  "Anthropic":{
  "officialUrl": "https://www.anthropic.com/company",
  "officialLabel": {
    "de": "Anthropic: Unternehmensquelle",
    "en": "Anthropic: company source"
  },
  "aliases": [
    "Anthropic PBC"
  ],
  "metaDescription": {
    "de": "Anthropic: Claude für Unternehmen, Claude Code, API-Integration und KI-Governance; verknüpfte Beiträge zu Akamai, Tenable, ML6, BeyondTrust und Dropbox.",
    "en": "Anthropic: Claude for enterprises, Claude Code, API integration and AI governance; related coverage of Akamai, Tenable, ML6, BeyondTrust and Dropbox."
  },
  "summary": {
    "de": "Anthropic ist ein Unternehmen für KI-Forschung und KI-Sicherheit und entwickelt die Claude-Modellfamilie. Als Public Benefit Corporation verbindet es Produktentwicklung mit Forschung zu zuverlässigen und steuerbaren KI-Systemen. Für Unternehmen umfasst das Angebot Claude für Wissensarbeit und Dokumentenanalyse, Claude Code für Softwareentwicklung sowie die Claude Platform mit APIs zur Einbindung von Modellen in eigene Anwendungen und agentische Workflows. Claude Enterprise ergänzt zentrale Verwaltung, SSO, SCIM, Rollen, Audit-Logs und Compliance-Schnittstellen. Konnektoren und MCP verbinden Claude mit freigegebenen Daten und Werkzeugen; ihre Berechtigungen und Datenflüsse sind gesondert zu prüfen. Anthropic stellt Modelle und Plattformfunktionen bereit, während Partner wie ML6 Integration und Umsetzung übernehmen. Sicherheitsintegrationen von Tenable, Konnektoren von Dropbox und die Infrastrukturvereinbarung mit Akamai bleiben Leistungen beziehungsweise Meldungen der jeweiligen Unternehmen. Für die Auswahl zählen Datenhaltung, Aufbewahrung, Modell- und Funktionsverfügbarkeit, Nutzungskosten, Systemintegration, Evaluierung der Ergebnisse und menschliche Freigaben für folgenreiche Aktionen. Sicherheitsforschung und Programme wie Project Glasswing sind vom allgemein verfügbaren Produktangebot zu unterscheiden.",
    "en": "Anthropic is an AI research and safety company developing the Claude model family. As a Public Benefit Corporation, it combines product development with research into reliable and steerable AI systems. Its business offering includes Claude for knowledge work and document analysis, Claude Code for software development, and the Claude Platform with APIs for integrating models into applications and agentic workflows. Claude Enterprise adds centralized administration, SSO, SCIM, roles, audit logs and compliance interfaces. Connectors and MCP link Claude to approved data and tools; their permissions and data flows require separate assessment. Anthropic provides models and platform capabilities, while partners such as ML6 deliver integration and implementation. Tenable security integrations, Dropbox connectors and the Akamai infrastructure agreement remain the respective companies’ services or announcements. Selection depends on data location, retention, model and feature availability, usage costs, integration, output evaluation and human approvals for consequential actions. Safety research and programs such as Project Glasswing must be distinguished from generally available products."
  },
  "focus": {
    "de": [
      "Claude: Wissensarbeit und Dokumentenanalyse",
      "Claude Code: agentische Softwareentwicklung",
      "Claude Platform und Modell-APIs",
      "Agentische Workflows und Tool-Integration",
      "Konnektoren und Model Context Protocol",
      "Claude Enterprise: Verwaltung und Zugriffssteuerung",
      "Audit-Logs, Compliance API und KI-Governance",
      "KI-Sicherheitsforschung und kontrollierte Cybersecurity-Programme"
    ],
    "en": [
      "Claude: knowledge work and document analysis",
      "Claude Code: agentic software development",
      "Claude Platform and model APIs",
      "Agentic workflows and tool integration",
      "Connectors and Model Context Protocol",
      "Claude Enterprise: administration and access control",
      "Audit logs, Compliance API and AI governance",
      "AI safety research and controlled cybersecurity programs"
    ]
  },
  "buyerGroups": {
    "de": [
      "CIO, CTO und IT-Leitung",
      "KI- und Data-Science-Verantwortliche",
      "Entwicklung, DevOps und Plattformteams",
      "CISO und Security Operations",
      "Compliance, Datenschutz und Risikomanagement",
      "Digitalisierung und Prozessverantwortliche",
      "Wissensmanagement und Fachbereichsleitung",
      "IT-Einkauf und Enterprise-Architektur"
    ],
    "en": [
      "CIO, CTO and IT leadership",
      "AI and data science leaders",
      "Engineering, DevOps and platform teams",
      "CISO and security operations",
      "Compliance, privacy and risk management",
      "Digital transformation and process owners",
      "Knowledge management and business leaders",
      "IT procurement and enterprise architecture"
    ]
  },
  "languageNote": {
    "de": "Die verknüpften Beiträge behandeln Anthropic als Modellanbieter, Technologiepartner oder Infrastrukturkunden. Ihre ursprünglichen Anbieter, Herausgeber und Prüfstatus bleiben sichtbar; eine gemeinsame Verlinkung bedeutet keine Übernahme der Partnerleistungen durch Anthropic.",
    "en": "Linked articles cover Anthropic as a model provider, technology partner or infrastructure customer. Original providers, publishers and review status remain visible; shared linking does not attribute partner services to Anthropic."
  },
  "officialSources": [
    {
      "url": "https://www.anthropic.com/company",
      "label": {
        "de": "Anthropic: Unternehmen und Rechtsform",
        "en": "Anthropic: company and corporate form"
      }
    },
    {
      "url": "https://claude.com/solutions/enterprise",
      "label": {
        "de": "Claude Enterprise: Produkte und Verwaltung",
        "en": "Claude Enterprise: products and administration"
      }
    },
    {
      "url": "https://claude.com/platform/api",
      "label": {
        "de": "Claude Platform: APIs und Integrationen",
        "en": "Claude Platform: APIs and integrations"
      }
    },
    {
      "url": "https://claude.com/product/claude-code",
      "label": {
        "de": "Claude Code: Softwareentwicklung",
        "en": "Claude Code: software development"
      }
    },
    {
      "url": "https://www.anthropic.com/project/glasswing",
      "label": {
        "de": "Project Glasswing: Sicherheitsprogramm",
        "en": "Project Glasswing: security program"
      }
    }
  ],
  "relatedProviders": [
    {
      "name": "Akamai",
      "context": {
        "de": "Infrastrukturvereinbarung für CPU-Workloads; Anthropic ist Kunde.",
        "en": "CPU workload infrastructure agreement; Anthropic is the customer."
      }
    },
    {
      "name": "Tenable",
      "context": {
        "de": "Claude-basierte Security-Workflows und Integration der Compliance API; Tenable bleibt der Anbieter der Sicherheitsplattform.",
        "en": "Claude-based security workflows and Compliance API integration; Tenable remains the security platform provider."
      }
    },
    {
      "name": "ML6",
      "context": {
        "de": "Umsetzungspartner für Enterprise-KI auf Basis von Claude.",
        "en": "Implementation partner for enterprise AI based on Claude."
      }
    },
    {
      "name": "BeyondTrust",
      "context": {
        "de": "Teilnahme an Project Glasswing zur Prüfung eigener Software.",
        "en": "Participation in Project Glasswing to assess its own software."
      }
    },
    {
      "name": "Dropbox",
      "context": {
        "de": "Konnektoren und Plugins zur Nutzung von Dropbox-Inhalten mit Claude.",
        "en": "Connectors and plugins for using Dropbox content with Claude."
      }
    }
  ]
},
  "Akamai":{
  "officialUrl": "https://www.akamai.com/de/products",
  "officialLabel": {
    "de": "Akamai: offizielle Produktübersicht",
    "en": "Akamai: official product overview"
  },
  "metaDescription": {
    "de": "Akamai: API-Sicherheit, Mikrosegmentierung, DDoS/DNS-Schutz, CDN, Bot-Kontrolle, Workforce Protector und verteilte KI-Inferenz.",
    "en": "Akamai: API security, microsegmentation, DDoS/DNS protection, CDN, bot control, Workforce Protector and distributed AI inference."
  },
  "summary": {
    "de": "Akamai Technologies verbindet Cloud Computing, Cybersicherheit und Content Delivery. API Security inventarisiert und überwacht Schnittstellen; App & API Protector schützt Webanwendungen am Edge. Guardicore Segmentation begrenzt laterale Bewegungen in hybriden IT-Umgebungen. Prolexic adressiert DDoS-Angriffe auf Infrastruktur, Edge DNS und Shield NS53 die Verfügbarkeit und Absicherung von DNS. Ion beschleunigt digitale Anwendungen und entlastet deren Ursprungssysteme. Bot Manager steuert automatisierte Zugriffe; ergänzende Kontrollen für Konten und Inhalte sind gesonderte Produktbausteine. Workforce Protector, ehemals LayerX, schützt KI- und SaaS-Interaktionen im Browser. Akamai Cloud und Inference Cloud stellen CPU-/GPU-Compute, Kubernetes, Speicher und Routing für verteilte Anwendungen und KI-Inferenz bereit; GPU-Regionen, Kapazität und Zusatzdienste müssen workloadbezogen geprüft werden. Für die Auswahl zählen Datenwege, Latenz, bestehende Cloud- und Sicherheitsarchitektur, Integrationen, Betriebszuständigkeiten und vertragliche SLAs. Die MuleSoft-Integration verbindet API-Sicherheitsinformationen mit API- und Agenten-Governance; angekündigte Erweiterungen sind von verfügbaren Funktionen zu unterscheiden. Die Anthropic-Vereinbarung vom September 2026 betrifft CPU-Workloads und ist kein Nachweis einer allgemein verfügbaren GPU-Kapazität.",
    "en": "Akamai Technologies combines cloud computing, cybersecurity and content delivery. API Security inventories and monitors interfaces; App & API Protector protects web applications at the edge. Guardicore Segmentation limits lateral movement in hybrid IT environments. Prolexic addresses infrastructure DDoS attacks, while Edge DNS and Shield NS53 support DNS availability and protection. Ion accelerates digital applications and offloads their origins. Bot Manager governs automated access; complementary account and content controls are separate product components. Workforce Protector, formerly LayerX, protects AI and SaaS interactions in the browser. Akamai Cloud and Inference Cloud provide CPU/GPU compute, Kubernetes, storage and routing for distributed applications and AI inference; GPU regions, capacity and additional services require workload-specific assessment. Selection depends on data flows, latency, existing cloud and security architecture, integrations, operational responsibilities and contractual SLAs. The MuleSoft integration connects API security intelligence with API and agent governance; announced extensions must be distinguished from available features. The September 2026 Anthropic agreement concerns CPU workloads and does not establish generally available GPU capacity."
  },
  "focus": {
    "de": [
      "API Security und App & API Protector",
      "Guardicore: Zero Trust und Mikrosegmentierung",
      "Prolexic: DDoS-Abwehr für Infrastruktur",
      "Edge DNS und Shield NS53",
      "Ion: CDN und Web-Performance",
      "Bot Manager und Kontrolle automatisierter Zugriffe",
      "Workforce Protector: Browser-, KI- und SaaS-Sicherheit",
      "Akamai Cloud: Compute, Kubernetes und Storage",
      "Inference Cloud: verteilte GPU-Inferenz",
      "Firewall for AI: Schutz von KI-Anwendungen"
    ],
    "en": [
      "API Security and App & API Protector",
      "Guardicore: Zero Trust and microsegmentation",
      "Prolexic: infrastructure DDoS protection",
      "Edge DNS and Shield NS53",
      "Ion: CDN and web performance",
      "Bot Manager and automated access control",
      "Workforce Protector: browser, AI and SaaS security",
      "Akamai Cloud: compute, Kubernetes and storage",
      "Inference Cloud: distributed GPU inference",
      "Firewall for AI: AI application protection"
    ]
  },
  "buyerGroups": {
    "de": [
      "CIO und IT-Leitung",
      "CISO und Informationssicherheit",
      "AppSec, DevSecOps und API-Verantwortliche",
      "SOC und Incident Response",
      "Netzwerk-, DNS- und Infrastrukturteams",
      "Cloud- und Plattformarchitektur",
      "KI-, MLOps- und Inferenzteams",
      "Digital Commerce und Betrugsprävention",
      "Medienplattformen und Content Delivery",
      "Web-Performance und Site Reliability",
      "Workplace-Security und KI-Governance"
    ],
    "en": [
      "CIO and IT leadership",
      "CISO and information security",
      "AppSec, DevSecOps and API owners",
      "SOC and incident response",
      "Network, DNS and infrastructure teams",
      "Cloud and platform architecture",
      "AI, MLOps and inference teams",
      "Digital commerce and fraud prevention",
      "Media platforms and content delivery",
      "Web performance and site reliability",
      "Workplace security and AI governance"
    ]
  },
  "officialSources": [
    {
      "url": "https://www.akamai.com/products/api-security",
      "label": {
        "de": "API Security: Schnittstellen und MCP",
        "en": "API Security: interfaces and MCP"
      }
    },
    {
      "url": "https://www.akamai.com/newsroom/press-release/akamai-and-mulesoft-unify-real-time-api-defense-and-ai-policy-control",
      "label": {
        "de": "MuleSoft-Integration: Stand 10.09.2026",
        "en": "MuleSoft integration: 10 September 2026"
      }
    },
    {
      "url": "https://www.akamai.com/products/akamai-workforce-protector",
      "label": {
        "de": "Workforce Protector, ehemals LayerX",
        "en": "Workforce Protector, formerly LayerX"
      }
    },
    {
      "url": "https://www.akamai.com/products/akamai-inference-cloud-platform",
      "label": {
        "de": "Inference Cloud: Plattform und Auswahlfragen",
        "en": "Inference Cloud: platform and selection"
      }
    },
    {
      "url": "https://www.akamai.com/newsroom/press-release/akamai-announces-11-6-billion-multi-year-agreement-with-anthropic-to-support-growing-demand",
      "label": {
        "de": "Anthropic: CPU-Vereinbarung vom 24.09.2026",
        "en": "Anthropic: CPU agreement of 24 September 2026"
      }
    }
  ]
},
  "Cisco":{
    officialUrl:"https://www.cisco.com/site/de/de/products/index.html",
    officialLabel:{de:"Cisco Produktübersicht",en:"Cisco product overview"},
    metaDescription:{
      de:"Cisco: Unternehmensnetzwerke, IT-Sicherheit, Rechenzentrum, Zusammenarbeit und Observability.",
      en:"Cisco: enterprise networking, IT security, data centres, collaboration and observability.",
    },
    summary:{
      de:"Cisco verbindet Unternehmensnetzwerke, Sicherheit, Rechenzentrumsinfrastruktur und Collaboration in einem breiten Produktportfolio. Dazu gehören Switching und Wireless, WAN und SD-WAN, Netzwerksicherheit, Duo für Identität und MFA, Computing, Webex sowie Observability für Anwendungen und Infrastruktur. Für die Auswahl zählen vorhandene Netzarchitektur, Betriebsmodell, Integrationen und die Aufteilung der Verantwortung zwischen Netzwerk-, Sicherheits- und Anwendungsteams. Die im Katalog beobachteten Duo-Leitfäden decken nur einen Teil dieses Portfolios ab. Ihre Aussagen, Sprachvarianten und redaktionellen Prüfstatus müssen je Veröffentlichung anhand der jeweiligen Originalquelle beurteilt werden.",
      en:"Cisco combines enterprise networking, security, data-centre infrastructure and collaboration in a broad product portfolio. It includes switching and wireless, WAN and SD-WAN, network security, Duo for identity and MFA, computing, Webex and observability for applications and infrastructure. Selection depends on the existing network architecture, operating model, integrations and the division of responsibility between network, security and application teams. The Duo guides observed in the catalogue cover only one part of this portfolio. Their claims, language variants and editorial review status must be assessed against each publication's original source.",
    },
    focus:{
      de:["Switching und Wireless","WAN und SD-WAN","Netzwerksicherheit","Duo, Identität und MFA","Rechenzentrum und Computing","Collaboration und Webex","Observability","Management und Automatisierung"],
      en:["Switching and wireless","WAN and SD-WAN","Network security","Duo, identity and MFA","Data centres and computing","Collaboration and Webex","Observability","Management and automation"],
    },
    buyerGroups:{
      de:["CIO und IT-Leitung","Netzwerkarchitektur","Informationssicherheit","Identity- und Access-Management","Rechenzentrumsbetrieb","Collaboration-Verantwortliche","Anwendungsbetrieb","IT-Einkauf"],
      en:["CIO and IT leadership","Network architecture","Information security","Identity and access management","Data-centre operations","Collaboration owners","Application operations","IT procurement"],
    },
  },
  "Optro":{
    officialUrl:"https://optro.ai/",
    officialLabel:{de:"Optro Originalquelle",en:"Optro official source"},
    metaDescription:{de:"Optro: GRC, interne Revision, Risikomanagement, Compliance und KI-Governance.",en:"Optro: GRC, internal audit, risk management, compliance and AI governance."},
    summary:{
      de:"Optro verbindet interne Revision, Risiko- und Kontrollmanagement, Informationssicherheit und Compliance in einer GRC-Plattform. Zum Portfolio gehören Audit-Workflows, Kontrollprüfungen, Cyber- und Drittparteirisiken sowie KI-Governance für Modelle, Agenten und Anwendungsfälle. Für die Auswahl sind die vorhandene Kontrolllandschaft, Verantwortlichkeiten, wiederverwendbare Nachweise und die Verbindung von Risiken mit Maßnahmen relevant. Das frühere AuditBoard-Branding kann in älteren Materialien erscheinen; es ist keine zusätzliche Anbieterentität. Die im Katalog beobachteten Whitepaper behandeln einzelne Aspekte dieser Plattform und behalten jeweils ihren eigenen Quellen- und Prüfstatus.",
      en:"Optro connects internal audit, risk and controls management, information security and compliance in a GRC platform. Its portfolio includes audit workflows, control testing, cyber and third-party risk, and AI governance for models, agents and use cases. Selection depends on the existing control landscape, ownership, reusable evidence and the connection between risks and action. The former AuditBoard branding may appear in older material; it is not a separate provider entity. Observed white papers cover individual aspects of the platform and retain their own source and review status.",
    },
    focus:{de:["Interne Revision","Kontrollmanagement","Automatisierte Kontrollenprüfung","Enterprise Risk Management","Cyberrisiken","Drittparteirisiken","Compliance und Nachweise","KI-Governance"],en:["Internal audit","Controls management","Automated control testing","Enterprise risk management","Cyber risk","Third-party risk","Compliance and evidence","AI governance"]},
    buyerGroups:{de:["Leitung Interne Revision","Risikomanagement","Compliance","CISO und Informationssicherheit","Kontrollverantwortliche","Drittparteimanagement","KI-Governance","Geschäftsführung und Aufsicht"],en:["Internal audit leadership","Risk management","Compliance","CISO and information security","Control owners","Third-party management","AI governance","Executive management and oversight"]},
  },
  "Drata":{
    officialUrl:"https://drata.com/",
    officialLabel:{de:"Drata Originalquelle",en:"Drata official source"},
    metaDescription:{de:"Drata: Compliance-Automatisierung, GRC, kontinuierliche Kontrollüberwachung, Trust Center und Drittparteirisiken.",en:"Drata: compliance automation, GRC, continuous control monitoring, trust centres and third-party risk."},
    summary:{
      de:"Drata verbindet Compliance-Automatisierung, Kontrollen, Risiken, Richtlinien und Nachweise in einer Plattform. Integrationen und laufende Überwachung unterstützen die Vorbereitung auf Audits; ein Trust Center und Fragebogen-Workflows dienen der Sicherheitsauskunft gegenüber Kunden. Daneben adressiert Drata Drittparteirisiken und die Governance von KI-Agenten. Für die Auswahl sind Framework-Abdeckung, Anbindung vorhandener Systeme, Zuständigkeiten für Nachweise und die Trennung interner Kontrollen von externer Vertrauenskommunikation wichtig. Die im Katalog beobachteten Leitfäden etwa zum EU AI Act oder zu kontinuierlicher Compliance sind eigenständige Inhalte und werden nur nach Prüfung ihrer Originalseiten freigegeben.",
      en:"Drata connects compliance automation, controls, risks, policies and evidence in one platform. Integrations and continuous monitoring support audit preparation; a trust centre and questionnaire workflows help communicate security information to customers. Drata also addresses third-party risk and AI-agent governance. Selection depends on framework coverage, integration with existing systems, ownership of evidence and the distinction between internal controls and external trust communication. Guides observed in the catalogue, including those on the EU AI Act or continuous compliance, are separate publications and require their own original-source review before approval.",
    },
    focus:{de:["Compliance-Automatisierung","Kontrollen und Nachweise","Kontinuierliche Überwachung","GRC und Risikomanagement","Drittparteirisiken","Trust Center","Sicherheitsfragebögen","KI-Agenten-Governance"],en:["Compliance automation","Controls and evidence","Continuous monitoring","GRC and risk management","Third-party risk","Trust centre","Security questionnaires","AI-agent governance"]},
    buyerGroups:{de:["Compliance","CISO und Informationssicherheit","Interne Revision","Risikomanagement","Datenschutz","Drittparteimanagement","Vertrieb und Customer Trust","IT- und Plattformbetrieb"],en:["Compliance","CISO and information security","Internal audit","Risk management","Data privacy","Third-party management","Sales and customer trust","IT and platform operations"]},
  },
  "Outpost24":{
    officialUrl:"https://outpost24.com/products/exposure-management-platform/",
    officialLabel:{de:"Outpost24 Exposure Management",en:"Outpost24 exposure management"},
    metaDescription:{de:"Outpost24: Exposure Management, externe Angriffsfläche, Schwachstellenpriorisierung und Penetrationstests.",en:"Outpost24: exposure management, external attack surfaces, vulnerability prioritisation and penetration testing."},
    summary:{
      de:"Outpost24 unterstützt Sicherheitsteams dabei, externe Angriffsflächen und Schwachstellen fortlaufend zu erfassen und nach Risiko zu priorisieren. Die Exposure-Management-Plattform verbindet Asset-Sicht, Kontext zu Bedrohungen, Bewertung und Workflows zur Behebung; Penetrationstests und Managed EASM ergänzen den Betrieb. Für die Auswahl sind der Umfang der tatsächlich erfassten Assets, die Qualität der Priorisierung, die Einbindung in bestehende Security-Prozesse und die Zuständigkeit für Maßnahmen entscheidend. Die im Katalog verlinkten Fachartikel stammen aus externen Portalen. Sie dokumentieren Themen und Marktaktivität, sind aber weder Produktdokumentation noch ohne Einzelprüfung redaktionell freigegeben.",
      en:"Outpost24 helps security teams continuously identify external attack surfaces and vulnerabilities and prioritise them by risk. Its exposure-management platform combines asset visibility, threat context, assessment and remediation workflows; penetration testing and managed EASM extend operations. Selection depends on the scope of assets actually discovered, the quality of prioritisation, integration with existing security processes and ownership of remediation. Trade articles linked in the catalogue come from external portals. They document topics and market activity but are neither product documentation nor editorially approved without individual review.",
    },
    focus:{de:["External Attack Surface Management","Asset Discovery","Schwachstellenmanagement","Bedrohungskontext","Risikopriorisierung","Penetrationstests","Managed EASM","Remediation-Workflows"],en:["External attack surface management","Asset discovery","Vulnerability management","Threat context","Risk prioritisation","Penetration testing","Managed EASM","Remediation workflows"]},
    buyerGroups:{de:["CISO und Informationssicherheit","Security Operations","IT-Infrastruktur","Schwachstellenmanagement","Penetrationstest-Teams","Cloud- und Netzwerkbetrieb","Compliance","Risikomanagement"],en:["CISO and information security","Security operations","IT infrastructure","Vulnerability management","Penetration-testing teams","Cloud and network operations","Compliance","Risk management"]},
  },
  "Salesforce":{
    officialUrl:"https://www.salesforce.com/products/",
    officialLabel:{de:"Salesforce Produktübersicht",en:"Salesforce product overview"},
    metaDescription:{de:"Salesforce: CRM für Vertrieb, Service, Marketing und Commerce mit Datenplattform, Agentforce und Slack.",en:"Salesforce: CRM for sales, service, marketing and commerce with a data platform, Agentforce and Slack."},
    summary:{
      de:"Salesforce verbindet CRM-Prozesse für Vertrieb, Kundenservice, Marketing und Commerce mit einer Daten- und Plattformschicht. Sales Cloud und Service Cloud adressieren Kundenbeziehungen und Serviceabläufe; Data 360 liefert Datenkontext, während Agentforce KI-Agenten in Geschäftsprozesse einbindet. Zur Produktfamilie gehören außerdem Tableau, MuleSoft und Slack. Für die Auswahl zählen Datenqualität, Integration bestehender Systeme, die Abgrenzung der Clouds und die Steuerung von Agenten in realen Workflows. Die im Katalog beobachteten Salesforce-, Agentforce- und Slack-Leitfäden decken jeweils Teilbereiche ab und werden nach Originalquelle, Produktbezug und eigenem Prüfstatus getrennt geführt.",
      en:"Salesforce connects CRM processes for sales, customer service, marketing and commerce with a data and platform layer. Sales Cloud and Service Cloud address customer relationships and service workflows; Data 360 provides data context, while Agentforce brings AI agents into business processes. The product family also includes Tableau, MuleSoft and Slack. Selection depends on data quality, integration with existing systems, the boundaries between clouds and governance of agents in real workflows. Salesforce, Agentforce and Slack guides observed in the catalogue each cover parts of the portfolio and retain separate original sources, product attribution and review status.",
    },
    focus:{de:["Sales Cloud","Revenue Cloud","Service Cloud","Marketing Cloud","Commerce Cloud","Data 360","Agentforce","MuleSoft und Tableau","Slack"],en:["Sales Cloud","Revenue Cloud","Service Cloud","Marketing Cloud","Commerce Cloud","Data 360","Agentforce","MuleSoft and Tableau","Slack"]},
    buyerGroups:{de:["Vertriebsleitung und Sales Operations","Kundenservice und Contact Center","Marketing","Digital Commerce","Daten- und IT-Leitung","Integrationsarchitektur","KI- und Automatisierungsteams","Revenue Operations"],en:["Sales leadership and operations","Customer service and contact centres","Marketing","Digital commerce","Data and IT leadership","Integration architecture","AI and automation teams","Revenue operations"]},
  },
  "Siemens Digital Industries Software":{
    officialUrl:"https://www.siemens.com/en-us/solutions/product-lifecycle-management-plm/",
    officialLabel:{de:"Siemens PLM und Digital Industries Software",en:"Siemens PLM and Digital Industries Software"},
    metaDescription:{de:"Siemens Digital Industries Software: CAD/CAM, PLM, Simulation und digitale Fertigung.",en:"Siemens Digital Industries Software: CAD/CAM, PLM, simulation and digital manufacturing."},
    summary:{
      de:"Siemens Digital Industries Software verbindet Produktentwicklung, Simulation und Fertigung über einen digitalen Produktlebenszyklus. NX unterstützt Konstruktion und CAM, Teamcenter organisiert Produktdaten und Zusammenarbeit, Simcenter deckt Simulation und Test ab und Opcenter adressiert die Fertigungssteuerung. Für die Auswahl ist entscheidend, welche Prozesse bereits digitalisiert sind, wie CAD-, PLM- und Fertigungsdaten zusammengeführt werden und welche Teams gemeinsame Datenstände benötigen. Die zahlreichen Ressourcen im Katalog zeigen Anwendungsfälle, sind aber einzeln nach Quelle, Inhalt und Anbieterrolle zu prüfen; ein Portfolioüberblick ersetzt diese Freigabe nicht.",
      en:"Siemens Digital Industries Software connects product development, simulation and manufacturing across the digital product lifecycle. NX supports design and CAM, Teamcenter organises product data and collaboration, Simcenter covers simulation and testing, and Opcenter addresses manufacturing operations. Selection depends on existing digital processes, how CAD, PLM and manufacturing data are connected, and which teams need a shared information base. The catalogue's many resources show use cases but require individual review of source, content and provider role; a portfolio overview does not approve them.",
    },
    focus:{de:["Produktentwicklung und CAD mit NX","CAM und Fertigungsplanung","PLM und Produktdaten mit Teamcenter","Simulation und Test mit Simcenter","Manufacturing Operations mit Opcenter","Digitaler Zwilling","Durchgängige Daten und Zusammenarbeit","Cloud- und On-Premises-Optionen"],en:["Product development and CAD with NX","CAM and manufacturing planning","PLM and product data with Teamcenter","Simulation and testing with Simcenter","Manufacturing operations with Opcenter","Digital twin","Connected data and collaboration","Cloud and on-premises options"]},
    buyerGroups:{de:["Entwicklungsleitung","Konstruktion und CAD","PLM- und Produktdatenverantwortliche","Simulation und CAE","Fertigungsplanung","Produktions-IT und OT","Qualitätsmanagement","IT und digitale Transformation"],en:["Engineering leadership","Design and CAD","PLM and product-data owners","Simulation and CAE","Manufacturing planning","Production IT and OT","Quality management","IT and digital transformation"]},
  },
  "SAP":{
    officialUrl:"https://www.sap.com/products/erp.html",
    officialLabel:{de:"SAP Cloud ERP",en:"SAP Cloud ERP"},
    metaDescription:{de:"SAP: Cloud ERP für Finanzen, Beschaffung und Lieferkette sowie Integration, Daten und KI.",en:"SAP: cloud ERP for finance, procurement and supply chains, plus integration, data and AI."},
    summary:{
      de:"SAP verbindet Unternehmensprozesse über ERP-Anwendungen und ergänzende Plattformdienste. Cloud ERP deckt Kernprozesse in Finanzen, Beschaffung und Lieferkette ab; die Business Technology Platform unterstützt Integration, Daten, Analysen und KI über SAP- und Drittsysteme hinweg. Für Unternehmen sind bestehende ERP-Landschaften, Branchenprozesse, Datenqualität und der Weg in die Cloud zentrale Auswahlfragen. SAP GROW, RISE with SAP und Business One sprechen unterschiedliche Ausgangslagen an und sollten nicht als dasselbe Produkt behandelt werden. Die im Katalog beobachteten Inhalte betreffen verschiedene SAP-Angebote; Zuordnung und Prüfstatus gelten jeweils für die einzelne Veröffentlichung.",
      en:"SAP connects enterprise processes through ERP applications and complementary platform services. Cloud ERP covers core finance, procurement and supply-chain processes; the Business Technology Platform supports integration, data, analytics and AI across SAP and third-party systems. Existing ERP landscapes, industry processes, data quality and the path to cloud are central selection questions. SAP GROW, RISE with SAP and Business One serve different starting points and should not be treated as one product. Observed catalogue items cover different SAP offerings; attribution and review status apply to each publication individually.",
    },
    focus:{de:["Cloud ERP und Kernprozesse","Finanzen und Controlling","Beschaffung","Lieferkette und Logistik","SAP GROW und RISE with SAP","SAP Business One","Business Technology Platform","Integration, Daten und Analysen","Eingebettete KI"],en:["Cloud ERP and core processes","Finance and controlling","Procurement","Supply chain and logistics","SAP GROW and RISE with SAP","SAP Business One","Business Technology Platform","Integration, data and analytics","Embedded AI"]},
    buyerGroups:{de:["CIO und IT-Leitung","ERP- und SAP-Verantwortliche","Finanzleitung und Controlling","Einkauf","Supply Chain und Operations","Daten- und Integrationsarchitektur","Fachbereichsleitung","Geschäftsführung und Transformation"],en:["CIO and IT leadership","ERP and SAP owners","Finance leadership and controlling","Procurement","Supply chain and operations","Data and integration architecture","Business-unit leadership","Executive management and transformation"]},
  },
  "Red Hat":{
    officialUrl:"https://www.redhat.com/en/products",
    officialLabel:{de:"Red Hat Produktübersicht",en:"Red Hat product overview"},
    metaDescription:{de:"Red Hat: Enterprise Linux, OpenShift, Ansible und KI für hybride IT-Infrastrukturen.",en:"Red Hat: Enterprise Linux, OpenShift, Ansible and AI for hybrid IT infrastructure."},
    summary:{
      de:"Red Hat bietet Enterprise-Open-Source-Produkte für den Betrieb von Anwendungen über Rechenzentrum, Cloud und Edge hinweg. Red Hat Enterprise Linux bildet eine Betriebssystembasis, OpenShift unterstützt Containerplattformen und Anwendungsmodernisierung, Ansible Automation Platform automatisiert IT-Abläufe und Red Hat AI adressiert KI-Workloads. Für die Auswahl zählen vorhandene Plattformen, Betriebsverantwortung, Automatisierungsgrad sowie Anforderungen an Portabilität und Sicherheit. Die im Katalog beobachteten Leitfäden behandeln teils einzelne Produkte oder konkrete Einsatzszenarien; sie bleiben von der offiziellen Produktübersicht und voneinander redaktionell getrennt.",
      en:"Red Hat provides enterprise open-source products for operating applications across data centres, cloud and edge. Red Hat Enterprise Linux supplies an operating-system foundation, OpenShift supports container platforms and application modernisation, Ansible Automation Platform automates IT operations, and Red Hat AI addresses AI workloads. Selection depends on existing platforms, operational responsibility, automation maturity, portability and security requirements. The observed guides in the catalogue may cover individual products or specific use cases; they remain editorially separate from the official product overview and from each other.",
    },
    focus:{de:["Red Hat Enterprise Linux","OpenShift und Kubernetes","Ansible Automation Platform","Anwendungsmodernisierung","Hybrid-Cloud-Betrieb","Edge-Workloads","Red Hat AI","Sicherheit und Plattformverwaltung"],en:["Red Hat Enterprise Linux","OpenShift and Kubernetes","Ansible Automation Platform","Application modernisation","Hybrid-cloud operations","Edge workloads","Red Hat AI","Security and platform management"]},
    buyerGroups:{de:["CIO und IT-Leitung","Linux- und Infrastrukturteams","Plattform- und Cloud-Architektur","DevOps und Entwicklung","IT-Betrieb und Automatisierung","Informationssicherheit","KI- und MLOps-Teams","Einkauf und Lizenzmanagement"],en:["CIO and IT leadership","Linux and infrastructure teams","Platform and cloud architecture","DevOps and development","IT operations and automation","Information security","AI and MLOps teams","Procurement and subscription management"]},
  },
  "Bechtle":{
    officialUrl:"https://www.bechtle.com/it-services",
    officialLabel:{de:"Bechtle IT-Services",en:"Bechtle IT services"},
    metaDescription:{de:"Bechtle: IT-Beschaffung, Cloud, Rechenzentrum, moderner Arbeitsplatz, Cybersecurity und Managed Services.",en:"Bechtle: IT procurement, cloud, data centres, modern workplace, cybersecurity and managed services."},
    summary:{
      de:"Bechtle verbindet IT-Beschaffung mit Beratung, Integration und laufendem Betrieb für Unternehmen und öffentliche Auftraggeber. Das Angebot reicht von Endgeräten und Modern Workplace über Rechenzentrum und Cloud bis zu Netzwerk, Cybersecurity, Daten und Managed Services. Für die Auswahl sind die Rollen von Hersteller, Systemhaus und Betreiber, die vorhandene IT-Landschaft sowie Übergabe und Servicelevel maßgeblich. Bechtle kann Produkte Dritter bereitstellen und zugleich eigene Integrations- oder Betriebsleistungen erbringen. Deshalb werden Herstellerinhalte im Katalog nicht allein wegen ihres Vertriebswegs als Bechtle-Eigenleistung ausgewiesen; jede Veröffentlichung braucht eine belegte Anbieterrolle.",
      en:"Bechtle combines IT procurement with consulting, integration and ongoing operations for businesses and public organisations. Its offering ranges from devices and modern workplace to data centres, cloud, networking, cybersecurity, data and managed services. Selection depends on the roles of manufacturer, integrator and operator, the existing IT landscape, handover and service levels. Bechtle can supply third-party products while providing its own integration or operating services. Manufacturer content is therefore not labelled as a Bechtle-owned product solely because of its sales channel; each publication needs an evidenced provider role.",
    },
    focus:{de:["IT-Beschaffung und Lifecycle","Beratung und Integration","Modern Workplace","Rechenzentrum und hybride Infrastruktur","Cloud Services","Netzwerk","Cybersecurity","Managed Services","Daten und Analysen"],en:["IT procurement and lifecycle","Consulting and integration","Modern workplace","Data centres and hybrid infrastructure","Cloud services","Networking","Cybersecurity","Managed services","Data and analytics"]},
    buyerGroups:{de:["CIO und IT-Leitung","IT-Einkauf und Vendor Management","Workplace und Endgeräte","Cloud- und Infrastrukturteams","Netzwerkverantwortliche","Informationssicherheit","Daten- und Anwendungsarchitektur","Öffentliche IT und Verwaltung","Geschäftsführung"],en:["CIO and IT leadership","IT procurement and vendor management","Workplace and endpoints","Cloud and infrastructure teams","Network owners","Information security","Data and application architecture","Public-sector IT","Executive management"]},
  },
  "Dell Technologies":{
    officialUrl:"https://www.dell.com/de-de",
    officialLabel:{de:"Dell Technologies Deutschland",en:"Dell Technologies Germany"},
    metaDescription:{de:"Dell Technologies: Business-PCs, Server, Storage, Netzwerke, Cyberresilienz und IT-Services.",en:"Dell Technologies: business PCs, servers, storage, networking, cyber resilience and IT services."},
    summary:{
      de:"Dell Technologies deckt den digitalen Arbeitsplatz und die IT-Infrastruktur von Unternehmen ab. Das Portfolio umfasst Business-PCs und Workstations, Server, Storage, Netzwerke sowie Produkte und Services für Cyberresilienz. Für Kaufentscheidungen sind Arbeitslast, Leistung, Skalierung, Betriebskosten, Support und Wiederherstellungsanforderungen getrennt zu betrachten; ein Client-Rollout hat andere Kriterien als ein Rechenzentrums- oder KI-Projekt. Die im Katalog beobachteten Dell-Whitepaper können sich auf einzelne Produktlinien oder Lösungsarchitekturen beziehen. Diese Anbieterübersicht ordnet das Portfolio ein, ersetzt jedoch keine Prüfung von Originalquelle, Datum und Aussage jedes einzelnen Inhalts.",
      en:"Dell Technologies covers both the digital workplace and enterprise IT infrastructure. Its portfolio includes business PCs and workstations, servers, storage, networking, and products and services for cyber resilience. Workloads, performance, scale, operating costs, support and recovery requirements need separate consideration; a client rollout differs from a data-centre or AI project. The Dell white papers observed in the catalogue may cover individual product lines or solution architectures. This provider overview places the portfolio in context but does not replace checking each item's original source, date and claims.",
    },
    focus:{de:["Business-PCs und Notebooks","Workstations und Monitore","Server und Computing","Storage","Netzwerke","Cyberresilienz und Datenwiederherstellung","Infrastruktur für KI-Workloads","Deployment und IT-Services"],en:["Business PCs and laptops","Workstations and monitors","Servers and computing","Storage","Networking","Cyber resilience and data recovery","Infrastructure for AI workloads","Deployment and IT services"]},
    buyerGroups:{de:["CIO und IT-Leitung","Workplace und Endgeräte","Rechenzentrumsbetrieb","Storage- und Backup-Teams","Netzwerkarchitektur","KI-Infrastruktur","Informationssicherheit","IT-Einkauf und Lifecycle"],en:["CIO and IT leadership","Workplace and endpoint teams","Data-centre operations","Storage and backup teams","Network architecture","AI infrastructure","Information security","IT procurement and lifecycle"]},
  },
  "Veeam":{
    officialUrl:"https://www.veeam.com/products/veeam-data-platform/backup-recovery.html",
    officialLabel:{de:"Veeam Backup und Recovery",en:"Veeam backup and recovery"},
    metaDescription:{de:"Veeam: Backup, Wiederherstellung und Datenresilienz für lokale, Cloud- und SaaS-Workloads.",en:"Veeam: backup, recovery and data resilience for on-premises, cloud and SaaS workloads."},
    summary:{
      de:"Veeam bietet Produkte für Datensicherung, Wiederherstellung und Resilienz über lokale IT, Cloud und SaaS hinweg. Veeam Data Platform adressiert Backup und Recovery im eigenen Betrieb, während Veeam Data Cloud SaaS-Workloads abdeckt; das Portfolio nennt unter anderem Microsoft 365, Cloud-Plattformen und Kubernetes. Für die Auswahl sind geschützte Workloads, Wiederanlaufziele, Speicherorte, Verantwortlichkeiten und das Vorgehen nach einem Sicherheitsvorfall wichtig. Backup ist dabei nur ein Teil der Resilienz: Wiederherstellung und regelmäßige Prüfung der Prozesse gehören dazu. Die im Katalog beobachteten Beiträge zu Ransomware, Cloud und Datenmanagement behalten ihre eigene Quellen- und Statusprüfung.",
      en:"Veeam provides data backup, recovery and resilience products across on-premises IT, cloud and SaaS. Veeam Data Platform addresses backup and recovery in customer-operated environments, while Veeam Data Cloud covers SaaS workloads; the portfolio includes Microsoft 365, cloud platforms and Kubernetes. Selection depends on protected workloads, recovery objectives, storage locations, responsibilities and response after a security incident. Backup is only one part of resilience: recovery and regular process testing also matter. Catalogue items about ransomware, cloud and data management retain their individual source and status review.",
    },
    focus:{de:["Backup und Recovery","Veeam Data Platform","Veeam Data Cloud","Microsoft 365 und SaaS","Cloud-Workloads","Kubernetes","Ransomware-Recovery","Hybrid-Cloud-Datenresilienz"],en:["Backup and recovery","Veeam Data Platform","Veeam Data Cloud","Microsoft 365 and SaaS","Cloud workloads","Kubernetes","Ransomware recovery","Hybrid-cloud data resilience"]},
    buyerGroups:{de:["CIO und IT-Leitung","Backup und Storage","Cloud- und Plattformbetrieb","Informationssicherheit","Business Continuity","Microsoft-365-Verantwortliche","Kubernetes-Teams","IT-Einkauf"],en:["CIO and IT leadership","Backup and storage","Cloud and platform operations","Information security","Business continuity","Microsoft 365 owners","Kubernetes teams","IT procurement"]},
  },
  "M-net":{
    officialUrl:"https://www.m-net.de/geschaeftskunden",
    officialLabel:{de:"M-net Geschäftskunden",en:"M-net business customers"},
    metaDescription:{
      de:"M-net: Glasfaser-Internet, Telefonie, Standortvernetzung, Rechenzentrum und IT-Sicherheit für Geschäftskunden.",
      en:"M-net: fibre internet, telephony, site networking, data centres and IT security for business customers.",
    },
    summary:{
      de:"M-net verbindet regionale Glasfaserinfrastruktur mit Geschäftskundenlösungen für Internet, Telefonie, Standortvernetzung, Rechenzentrum und IT-Sicherheit. Für mehrere Standorte bietet das Unternehmen drei unterschiedliche Vernetzungswege: Connect-LAN als dedizierte Punkt-zu-Punkt-Verbindung mit optionaler Verschlüsselung, MPLS IP-VPN als privates Standortnetz getrennt vom öffentlichen Internet und SD-WAN für zentral gesteuerte Verbindungen über unterschiedliche Anschlusstechniken. Direkte Cloud-Anbindung, Leitungsredundanz, Colocation und DDoS-Schutz können je nach Anforderung hinzukommen. Für die Auswahl zählen Anwendung und Datenverkehr, tatsächliche Verfügbarkeit je Standort, Bandbreite, Latenz, getrennte Leitungswege, Sicherheitsoptionen, zugesagte Servicelevels und die Zuständigkeit für Endgeräte und Betrieb. Das M-net-Whitepaper zur Vernetzung begründet diese Architekturfragen; seine allgemeinen Beispiele zu UC, BI, IoT oder KI belegen keine entsprechenden M-net-Produkte. Das Profil trennt M-net-Originalinhalte von unabhängigen Fachbeiträgen; ein berichtetes Kundenprojekt ist kein allgemeiner Leistungsnachweis für jeden Standort.",
      en:"M-net combines regional fibre infrastructure with business internet, telephony, site networking, data-centre and security services. It offers three distinct ways to connect multiple sites: Connect-LAN as a dedicated point-to-point link with optional encryption, MPLS IP-VPN as a private network separate from the public internet, and SD-WAN for centrally managed connections across different access technologies. Direct cloud connectivity, line redundancy, colocation and DDoS protection may be added according to requirements. Buyers should compare application traffic, actual availability at each site, bandwidth, latency, separate routes, security options, contractual service levels, and responsibility for devices and operations. M-net's networking whitepaper explains these architecture choices; its general examples of UC, BI, IoT and AI do not establish corresponding M-net products. This profile separates M-net's own sources from independent trade coverage; a reported customer project is not proof of service availability at every site.",
    },
    focus:{
      de:["Business-Internet und Glasfaser","Cloud-Telefonie und SIP-Trunk","Connect-LAN: dedizierte Standort- und Rechenzentrumskopplung","MPLS IP-VPN: privates Standortnetz","SD-WAN: zentral gesteuerte Standortvernetzung","Direkte Cloud-Anbindung","Rechenzentrum und Colocation","DDoS-Schutz und Business Security","Leitungsbackup und Redundanz","NIS-2 und Sicherheitsnachweise"],
      en:["Business internet and fibre","Cloud telephony and SIP trunking","Connect-LAN: dedicated site and data-centre links","MPLS IP-VPN: private site network","SD-WAN: centrally managed site networking","Direct cloud connectivity","Data centres and colocation","DDoS protection and business security","Line backup and redundancy","NIS 2 and security evidence"],
    },
    buyerGroups:{
      de:["Geschäftsführung","CIO und IT-Leitung","WAN- und Netzwerkarchitektur","Cloud- und Rechenzentrumsbetrieb","Informationssicherheit und Compliance","Standort- und Filialmanagement","Einkauf und Providermanagement","Selbstständige und Kleingewerbe"],
      en:["Executive management","CIO and IT leadership","WAN and network architecture","Cloud and data-centre operations","Information security and compliance","Site and branch management","Procurement and provider management","Self-employed professionals and small businesses"],
    },
  },
  "Telefónica Deutschland":{
    officialUrl:"https://www.o2business.de/",
    officialLabel:{de:"O2 Business Originalquelle",en:"O2 Business official source"},
    metaDescription:{
      de:"Telefónica Deutschland und O2 Business: Mobilfunk, Glasfaser, Standortvernetzung, Cloud, Security, IoT und 5G-Campusnetze.",
      en:"Telefónica Deutschland and O2 Business: mobile services, fibre, site networking, cloud, security, IoT and private 5G networks.",
    },
    summary:{
      de:"Telefónica Deutschland verbindet unter der Marke O2 Business Mobilfunk und Festnetz mit Standortvernetzung, Cloud, Cybersecurity, Data-Center-Housing, IoT und privaten 5G-Netzen. Das Profil trennt offizielle Leistungsquellen von unabhängigen Telecom-Handel-Beiträgen zu Kundenprojekten, Betriebsinnovation und Partnervertrieb.",
      en:"Under the O2 Business brand, Telefónica Deutschland combines mobile and fixed networks with site networking, cloud, cybersecurity, data-centre housing, IoT and private 5G networks. This profile separates official service sources from independent Telecom Handel coverage of customer projects, operational innovation and partner sales.",
    },
    focus:{
      de:["Business-Mobilfunk und Festnetz","Glasfaser und Standortvernetzung","Cloud und Cybersecurity","Data-Center-Housing","IoT und resiliente Konnektivität","Private 5G-Campusnetze","Partnervertrieb"],
      en:["Business mobile and fixed networks","Fibre and site networking","Cloud and cybersecurity","Data-centre housing","IoT and resilient connectivity","Private 5G networks","Partner sales"],
    },
    buyerGroups:{
      de:["CIO und IT-Leitung","Netzwerk und Infrastruktur","Informationssicherheit","Standort- und Filialmanagement","IoT und Produktion","Handel und Logistik","Einkauf und Providermanagement"],
      en:["CIO and IT leadership","Networks and infrastructure","Information security","Site and branch management","IoT and manufacturing","Retail and logistics","Procurement and provider management"],
    },
  },
  "Enreach":{
    officialUrl:"https://enreach.de/de",
    officialLabel:{de:"Enreach Originalquelle",en:"Enreach official source"},
    metaDescription:{
      de:"Enreach: Unified Communications, Cloud-Telefonie, Contact Center, Mobilfunk und Partnerlösungen für Geschäftskunden.",
      en:"Enreach: unified communications, cloud telephony, contact centres, mobile services and partner solutions for business customers.",
    },
    summary:{
      de:"Enreach bündelt Festnetz, Mobilfunk, Cloud-Telefonie, Unified Communications und Contact-Center-Lösungen für Unternehmen sowie White-Label- und Partnerangebote für den indirekten Vertrieb. Die beobachteten Beiträge zeigen insbesondere, wie das Unternehmen wiederkehrende Umsätze und die Vermarktung KI-gestützter Kommunikation im Channel organisiert.",
      en:"Enreach combines fixed and mobile communications, cloud telephony, unified communications and contact-centre solutions for businesses, alongside white-label and partner offerings for indirect sales. The observed coverage focuses on how the company organises recurring revenue and the channel go-to-market for AI-assisted communications.",
    },
    focus:{
      de:["Unified Communications as a Service","Cloud-Telefonie und SIP","Contact Center","Festnetz und Mobilfunk","KI-gestützte Kommunikation","White Label und Partnergeschäft","Wiederkehrende Channel-Umsätze"],
      en:["Unified communications as a service","Cloud telephony and SIP","Contact centres","Fixed and mobile communications","AI-assisted communications","White label and partner business","Recurring channel revenue"],
    },
    buyerGroups:{
      de:["CIO und IT-Leitung","Kommunikations- und Collaboration-Verantwortliche","Kundenservice und Contact Center","Systemhäuser und Reseller","Managed Service Provider","Vertrieb und Channel Management","Einkauf"],
      en:["CIO and IT leadership","Communications and collaboration owners","Customer service and contact centres","System integrators and resellers","Managed service providers","Sales and channel management","Procurement"],
    },
  },
  "Peoplefone":{
    officialUrl:"https://www.peoplefone.com/de-de/geschaeftskunden",
    officialLabel:{de:"Peoplefone Originalquelle",en:"Peoplefone official source"},
    metaDescription:{
      de:"Peoplefone: SIP-Trunks, virtuelle Telefonanlage, Microsoft-Teams-Anbindung und Voice-AI-Konnektivität für Geschäftskunden.",
      en:"Peoplefone: SIP trunks, virtual PBX, Microsoft Teams integration and voice-AI connectivity for business customers.",
    },
    summary:{
      de:"Peoplefone fokussiert IP-basierte Geschäftskommunikation mit SIP-Trunks, virtueller Telefonanlage, Microsoft-Teams-Anbindung und internationaler Rufnummernversorgung. Die 2026er Beiträge machen zusätzlich sichtbar, wie Elastic und Domain-Based SIP Trunks KI-Voicebots, Contact Center und Cloud-PBX-Plattformen anbinden.",
      en:"Peoplefone focuses on IP-based business communications through SIP trunks, a virtual PBX, Microsoft Teams integration and international number provision. The 2026 coverage also shows how elastic and domain-based SIP trunks connect AI voicebots, contact centres and cloud-PBX platforms.",
    },
    focus:{
      de:["SIP-Trunks","Virtuelle Telefonanlage und Cloud-PBX","Microsoft-Teams-Telefonie","Voice-AI und Sprachbots","Contact-Center-Konnektivität","Internationale Rufnummern","Systemhaus- und Partnervertrieb"],
      en:["SIP trunks","Virtual PBX and cloud PBX","Microsoft Teams telephony","Voice AI and voicebots","Contact-centre connectivity","International numbers","System-integrator and partner sales"],
    },
    buyerGroups:{
      de:["IT-Leitung","Telefonie und Unified Communications","Contact Center und Kundenservice","KI- und Automatisierungsteams","Systemhäuser und Reseller","Managed Service Provider","Einkauf"],
      en:["IT leadership","Telephony and unified communications","Contact centres and customer service","AI and automation teams","System integrators and resellers","Managed service providers","Procurement"],
    },
  },
  "TD SYNNEX":{
    officialUrl:"https://de.tdsynnex.com/",
    officialLabel:{de:"TD SYNNEX Originalquelle",en:"TD SYNNEX official source"},
    metaDescription:{
      de:"TD SYNNEX: Distribution, Cloud, Security, KI-Infrastruktur, Workplace, A/V und Services für IT-Partner.",
      en:"TD SYNNEX: distribution, cloud, security, AI infrastructure, workplace, A/V and services for IT partners.",
    },
    summary:{
      de:"TD SYNNEX verbindet Technologie-Distribution mit Cloud-, Infrastruktur-, Security-, Workplace- und A/V-Lösungen sowie Services für Konfiguration, Finanzierung und Bereitstellung. Die beobachteten Beiträge zeigen konkrete Wege, wie Partner ohne eigene Spezialinfrastruktur KI-Testumgebungen, Managed SOC und Herstellerlösungen in ihr Portfolio aufnehmen können.",
      en:"TD SYNNEX combines technology distribution with cloud, infrastructure, security, workplace and A/V solutions, plus configuration, financing and deployment services. The observed coverage shows practical ways for partners without their own specialist infrastructure to add AI test environments, managed SOC services and vendor solutions to their portfolios.",
    },
    focus:{
      de:["Technologie-Distribution","KI-Infrastruktur und Testumgebungen","Cloud und Rechenzentrum","Cybersecurity und Managed SOC","Workplace und Endgeräte","Collaboration und A/V","Partner-Services und Finanzierung"],
      en:["Technology distribution","AI infrastructure and test environments","Cloud and data centres","Cybersecurity and managed SOC","Workplace and endpoints","Collaboration and A/V","Partner services and financing"],
    },
    buyerGroups:{
      de:["Systemhäuser und Reseller","Managed Service Provider","Cloud Service Provider","Security-Anbieter","Workplace- und Collaboration-Integratoren","Einkauf und Category Management","Vertrieb und Business Development"],
      en:["System integrators and resellers","Managed service providers","Cloud service providers","Security providers","Workplace and collaboration integrators","Procurement and category management","Sales and business development"],
    },
  },
  "1&1 Versatel":{
    officialUrl:"https://www.1und1.net/",
    officialLabel:{de:"1&1 Versatel Originalquelle",en:"1&1 Versatel official source"},
    metaDescription:{
      de:"1&1 Versatel: Business-Glasfaser, SD-WAN, VPN, Security, IP-Telefonie, Cloud und Housing für Unternehmen.",
      en:"1&1 Versatel: business fibre, SD-WAN, VPN, security, IP telephony, cloud and housing for companies.",
    },
    summary:{
      de:"1&1 Versatel verbindet ein eigenes deutsches Glasfasernetz mit Geschäftskundenlösungen für Internet, Standortvernetzung, Cybersecurity, IP-Telefonie, Cloud und Housing. Das Profil ergänzt die offizielle Leistungsübersicht um eine unabhängige Einordnung der wirtschaftlichen Bedeutung leistungsfähiger Konnektivität für Unternehmensstandorte.",
      en:"1&1 Versatel combines its own German fibre network with business solutions for internet access, site networking, cybersecurity, IP telephony, cloud and housing. The profile adds an independent assessment of the economic importance of high-performance connectivity for business locations to the official service overview.",
    },
    focus:{
      de:["Business-Glasfaser","SD-WAN, VPN und Ethernet","Managed Firewall und DDoS-Schutz","IP-Telefonie und Cloud-PBX","Cloud und Microsoft 365","Housing und Rechenzentrum","Digitale Souveränität"],
      en:["Business fibre","SD-WAN, VPN and Ethernet","Managed firewall and DDoS protection","IP telephony and cloud PBX","Cloud and Microsoft 365","Housing and data centres","Digital sovereignty"],
    },
    buyerGroups:{
      de:["Geschäftsführung","CIO und IT-Leitung","Netzwerk und Infrastruktur","Informationssicherheit","Standort- und Gebäudeverantwortliche","Einkauf und Providermanagement","Mittelstand und Filialunternehmen"],
      en:["Executive management","CIO and IT leadership","Networks and infrastructure","Information security","Site and facilities management","Procurement and provider management","SMEs and multi-site businesses"],
    },
  },
  "Easybell":{
    officialUrl:"https://www.easybell.de/cloud-telefonanlage/",
    officialLabel:{de:"Easybell Originalquelle",en:"Easybell official source"},
    metaDescription:{de:"Easybell: Cloud-Telefonanlage, SIP-Trunks, Voice-AI und digitale Verwaltung für Geschäftskunden.",en:"Easybell: cloud PBX, SIP trunks, voice AI and digital administration for business customers."},
    summary:{de:"Easybell verbindet Cloud-Telefonie und SIP-Trunks mit digitaler Administration und offenen Schnittstellen für externe KI-Sprachdienste. Das Profil trennt die offizielle Produktübersicht von den beobachteten Telecom-Handel-Beiträgen zu Kundenportal, Voice-AI und FQDN-Integration.",en:"Easybell combines cloud telephony and SIP trunks with digital administration and open interfaces for external AI voice services. This profile separates the official product overview from observed Telecom Handel coverage of the customer portal, voice AI and FQDN integration."},
    focus:{de:["Cloud-Telefonanlage","SIP-Trunks","Voice-AI und KI-Telefonassistenten","FQDN-Schnittstellen","Callflows und Self-Service","Geschäftskundenportal","Systemhaus- und Partnergeschäft"],en:["Cloud PBX","SIP trunks","Voice AI and AI telephone assistants","FQDN interfaces","Call flows and self-service","Business customer portal","System integrator and partner business"]},
    buyerGroups:{de:["IT-Leitung","Telefonie und Unified Communications","Kundenservice und Contact Center","KI- und Automatisierungsteams","Systemhäuser und Reseller","Einkauf"],en:["IT leadership","Telephony and unified communications","Customer service and contact centres","AI and automation teams","System integrators and resellers","Procurement"]},
  },
  "Snom":{
    officialUrl:"https://www.snom.com/de/produkte/",
    officialLabel:{de:"Snom Originalquelle",en:"Snom official source"},
    metaDescription:{de:"Snom: professionelle IP-Telefone, DECT-Systeme, Headsets, Geräteverwaltung und Channel-Training.",en:"Snom: professional IP phones, DECT systems, headsets, device management and channel training."},
    summary:{de:"Snom entwickelt professionelle IP-Telefone, DECT-Systeme und Kommunikationszubehör für Unternehmen und vertikale Einsatzfelder. Die beobachteten Beiträge ergänzen die Produktübersicht um neue Endgeräte, skalierbare DECT-Infrastruktur sowie das Partner- und Trainingsmodell.",en:"Snom develops professional IP phones, DECT systems and communications accessories for businesses and vertical markets. The observed coverage adds new devices, scalable DECT infrastructure and the partner and training model to the product overview."},
    focus:{de:["Professionelle IP-Telefone","DECT-Systeme","Konferenz- und Audiotechnik","Geräteverwaltung und Monitoring","Hospitality und Healthcare","Partnerprogramm","Training und Competence Center"],en:["Professional IP phones","DECT systems","Conferencing and audio technology","Device management and monitoring","Hospitality and healthcare","Partner programme","Training and competence centre"]},
    buyerGroups:{de:["IT-Leitung","Telefonie und Unified Communications","Netzwerk und Infrastruktur","Gesundheit und Pflege","Hotellerie","Systemhäuser und Reseller","Managed Service Provider"],en:["IT leadership","Telephony and unified communications","Networks and infrastructure","Healthcare and care services","Hospitality","System integrators and resellers","Managed service providers"]},
  },
  "NFON":{
    officialUrl:"https://www.nfon.com/de/",
    officialLabel:{de:"NFON Originalquelle",en:"NFON official source"},
    metaDescription:{de:"NFON: Cloud-Telefonie, Contact Center, KI-Agenten, Integrationen und Partnerlösungen für Unternehmen.",en:"NFON: cloud telephony, contact centres, AI agents, integrations and partner solutions for businesses."},
    summary:{de:"NFON verbindet europäische Cloud-Telefonie mit Contact Center, KI-gestützten Assistenten, Bots sowie Integrationen und APIs. Das Profil trennt die Anbieterpositionierung zu Leistung und Datensouveränität von Telecom-Handel-Beiträgen über praktische KI-Befähigung und die Neuausrichtung des Partnerprogramms.",en:"NFON combines European cloud telephony with contact centres, AI-powered assistants, bots, integrations and APIs. This profile separates the provider's positioning on capabilities and data sovereignty from Telecom Handel coverage of practical AI enablement and the redesign of its partner programme."},
    focus:{de:["Cloud-Telefonie","Unified Communications","Contact Center","KI-Agenten und Voicebots","Integrationen und APIs","Europäische Datensouveränität","Partnerprogramm"],en:["Cloud telephony","Unified communications","Contact centres","AI agents and voicebots","Integrations and APIs","European data sovereignty","Partner programme"]},
    buyerGroups:{de:["CIO und IT-Leitung","Telefonie und Collaboration","Kundenservice und Contact Center","KI- und Automatisierungsteams","Systemhäuser und Reseller","Datenschutz und Compliance","Einkauf"],en:["CIO and IT leadership","Telephony and collaboration","Customer service and contact centres","AI and automation teams","System integrators and resellers","Data protection and compliance","Procurement"]},
  },
  "Auerswald":{
    officialUrl:"https://www.auerswald.de/de/start",
    officialLabel:{de:"Auerswald Originalquelle",en:"Auerswald official source"},
    metaDescription:{de:"Auerswald: COMuniq ONE, COMtrexx, Softphone, DECT und sichere Business-Kommunikation.",en:"Auerswald: COMuniq ONE, COMtrexx, softphone, DECT and secure business communications."},
    summary:{de:"Auerswald bündelt Business-Kommunikation mit Cloud- und PBX-Plattformen, Softphone, DECT und professionellen Endgeräten. Die beobachteten Beiträge machen neue mobile DECT-Nutzung und Proxmox-Unterstützung als Optionen für sichere, virtualisierte Betriebsmodelle sichtbar.",en:"Auerswald combines business communications through cloud and PBX platforms, softphone, DECT and professional devices. The observed coverage highlights new mobile DECT use and Proxmox support as options for secure, virtualised operating models."},
    focus:{de:["COMuniq ONE","COMtrexx","Softphone und Desktop-Kommunikation","DECT und Mobilteile","Virtualisierung mit Proxmox","Sichere Business-Kommunikation","Fachhandels- und Systemhausgeschäft"],en:["COMuniq ONE","COMtrexx","Softphone and desktop communications","DECT and handsets","Virtualisation with Proxmox","Secure business communications","Specialist dealer and system integrator business"]},
    buyerGroups:{de:["IT-Leitung","Telefonie und Unified Communications","Netzwerk und Infrastruktur","Gesundheit und Pflege","Mittelstand","Systemhäuser und Fachhandel","Einkauf"],en:["IT leadership","Telephony and unified communications","Networks and infrastructure","Healthcare and care services","SMEs","System integrators and specialist dealers","Procurement"]},
  },
  "Jabra":{
    officialUrl:"https://www.jabra.com/de-de/business/office-headsets",
    officialLabel:{de:"Jabra Originalquelle",en:"Jabra official source"},
    metaDescription:{de:"Jabra: professionelle Headsets für hybride Arbeit, Unified Communications und Contact Center.",en:"Jabra: professional headsets for hybrid work, unified communications and contact centres."},
    summary:{de:"Jabra adressiert professionelle Audio- und Gesprächsqualität mit Headsets für hybride Arbeit, Unified Communications und Contact Center. Das Profil konzentriert sich bewusst auf B2B-Einsatzfelder und verbindet die offizielle Evolve-Übersicht mit den beobachteten Produkteinführungen der Evolve3-Serie.",en:"Jabra addresses professional audio and call quality with headsets for hybrid work, unified communications and contact centres. This profile deliberately focuses on B2B use cases and combines the official Evolve overview with observed Evolve3 product launches."},
    focus:{de:["Professionelle Headsets","Hybride Arbeit","Unified Communications","Contact Center","Sprach- und Mikrofonqualität","Geräuschunterdrückung","Gerätebereitstellung"],en:["Professional headsets","Hybrid work","Unified communications","Contact centres","Voice and microphone quality","Noise cancellation","Device deployment"]},
    buyerGroups:{de:["IT und Workplace","Unified Communications","Contact Center und Kundenservice","HR und Employee Experience","Einkauf und Flottenmanagement","Systemhäuser und Reseller"],en:["IT and workplace","Unified communications","Contact centres and customer service","HR and employee experience","Procurement and fleet management","System integrators and resellers"]},
  },
  "R&S Networks and Cybersecurity (ehemals LANCOM Systems)":{
    officialUrl:"https://rs-nc.rohde-schwarz.com/de/",
    officialLabel:{de:"R&S Networks and Cybersecurity Originalquelle",en:"R&S Networks and Cybersecurity official source"},
    metaDescription:{de:"R&S Networks and Cybersecurity, ehemals LANCOM Systems: Router, SD-WAN, LAN, WLAN, Firewalls und souveräne Netzwerke.",en:"R&S Networks and Cybersecurity, formerly LANCOM Systems: routers, SD-WAN, LAN, Wi-Fi, firewalls and sovereign networks."},
    summary:{de:"Rohde & Schwarz Networks and Cybersecurity ist seit dem 1. Juli 2026 der offizielle Name von LANCOM Systems. Das Profil verbindet Netzwerk- und Cybersecurity-Lösungen für Unternehmen und Verwaltung mit dem historischen LANCOM-Channelbeitrag; Titel und Datierung der damaligen Quelle bleiben unverändert nachvollziehbar.",en:"Rohde & Schwarz Networks and Cybersecurity has been the official name of LANCOM Systems since 1 July 2026. This profile connects networking and cybersecurity solutions for businesses and public administration with the historical LANCOM channel article while preserving its original title and date."},
    focus:{de:["Router und SD-WAN","LAN und WLAN","Firewalls und Cybersecurity","Zentrales Netzwerkmanagement","Digitale Souveränität","Unternehmen und Verwaltung","Partner- und Channelgeschäft"],en:["Routers and SD-WAN","LAN and Wi-Fi","Firewalls and cybersecurity","Central network management","Digital sovereignty","Business and public administration","Partner and channel business"]},
    buyerGroups:{de:["CIO und IT-Leitung","Netzwerk und Infrastruktur","CISO und Informationssicherheit","Öffentliche Verwaltung","Mittelstand und Filialunternehmen","Systemhäuser und Reseller","Einkauf"],en:["CIO and IT leadership","Networks and infrastructure","CISO and information security","Public administration","SMEs and multi-site businesses","System integrators and resellers","Procurement"]},
    languageNote:{de:"Historische Veröffentlichungen vor der Umbenennung am 1. Juli 2026 werden weiterhin unter LANCOM Systems zitiert und der heutigen Anbieteridentität transparent zugeordnet.",en:"Historical publications from before the renaming on 1 July 2026 continue to be cited under LANCOM Systems and are transparently assigned to the current provider identity."},
  },
  "Serviceware":{
    officialUrl:"https://serviceware-se.com/de/",
    officialLabel:{de:"Serviceware Originalquelle",en:"Serviceware official source"},
    metaDescription:{
      de:"Serviceware: KI-native Plattform für ESM und ITSM, IT Financial Management, Corporate Performance Management, Wissensmanagement und Field Service.",
      en:"Serviceware: AI-native platform for ESM and ITSM, IT financial management, corporate performance management, knowledge management and field service.",
    },
    summary:{
      de:"Serviceware verbindet Software, Beratung und Managed Services für digitale Unternehmensservices. Die KI-native Plattform reicht vom Enterprise und IT Service Management über HR- und Kundenservices bis zu IT Financial Management, Corporate Performance Management, Wissensmanagement und Field Service. Für Investitionsentscheidungen relevant sind der modulare Einstieg, offene Schnittstellen, No-Code-Workflows sowie die laut Anbieter mögliche Bereitstellung als SaaS oder On-Premises. Partnerlösungen auf der Serviceware-Website werden weiterhin nicht automatisch Serviceware zugerechnet.",
      en:"Serviceware combines software, consulting and managed services for digital enterprise services. Its AI-native platform spans enterprise and IT service management, HR and customer services, IT financial management, corporate performance management, knowledge management and field service. Relevant investment considerations include modular adoption, open interfaces, no-code workflows and, according to the provider, deployment as SaaS or on premises. Partner solutions on the Serviceware website continue not to be attributed automatically to Serviceware.",
    },
    focus:{
      de:["KI-native Plattformarchitektur","Agentic AI und Automatisierung","No-Code und Workflow-Orchestrierung","Enterprise und IT Service Management","HR und Customer Service Management","Servicekatalog und Self-Service","IT Financial Management, FinOps und TBM","Corporate Performance Management","KI-Wissensmanagement","Field Service Management","APIs, Governance und EU-Hosting"],
      en:["AI-native platform architecture","Agentic AI and automation","No-code and workflow orchestration","Enterprise and IT service management","HR and customer service management","Service catalogue and self-service","IT financial management, FinOps and TBM","Corporate performance management","AI knowledge management","Field service management","APIs, governance and EU hosting"],
    },
    buyerGroups:{
      de:["Geschäftsführung und Transformation","CIO und IT-Leitung","IT- und Enterprise-Service-Management","CFO, IT-Controlling und FinOps","Finance und Unternehmenssteuerung","Kundenservice","HR Shared Services","Wissens- und Prozessmanagement","Technischer Außendienst","Informationssicherheit und Datenschutz","Enterprise Architecture und Plattformteams"],
      en:["Executive management and transformation","CIO and IT leadership","IT and enterprise service management","CFO, IT controlling and FinOps","Finance and corporate performance management","Customer service","HR shared services","Knowledge and process management","Technical field service","Information security and data protection","Enterprise architecture and platform teams"],
    },
  },
  "ServiceNow":{
    officialUrl:"https://www.servicenow.com/",
    officialLabel:{de:"ServiceNow Originalquelle",en:"ServiceNow official source"},
    metaDescription:{
      de:"ServiceNow: KI-Plattform für IT-Service, IT-Betrieb, Kunden- und Mitarbeiterservice, Security, Risiko, Portfolios und Workflow-Anwendungen.",
      en:"ServiceNow: AI platform for IT service and operations, customer and employee service, security, risk, portfolios and workflow applications.",
    },
    summary:{
      de:"ServiceNow verbindet KI, Daten und Workflows auf einer gemeinsamen Plattform. Das Portfolio reicht von IT Service Management und AIOps über Kunden- und Mitarbeiterservices bis zu Security Operations, Governance und Risiko, strategischer Portfoliosteuerung und eigenen Workflow-Anwendungen mit App Engine. Ein Vorhaben kann bei einem einzelnen Serviceprozess beginnen und mehrere Fachbereiche verbinden; dafür müssen Datenquellen, Rollen, Freigaben und bestehende Systeme aufeinander abgestimmt werden. Bei der Auswahl sind Prozessumfang, Integrationen, Governance von KI-Agenten und Zuständigkeiten für Betrieb und Weiterentwicklung wichtig. Offizielle Produktquellen beschreiben die Plattform; die im Katalog beobachteten CIO-Whitepaper sind eigenständige Publikationen mit jeweils separat zu prüfendem Quellen- und Freigabestatus.",
      en:"ServiceNow brings AI, data and workflows together on one platform. Its portfolio spans IT service management and AIOps, customer and employee services, security operations, governance and risk, strategic portfolio management and custom workflow applications built with App Engine. A project may start with one service process and connect several business functions; doing so requires alignment of data sources, roles, approvals and existing systems. Scope, integrations, AI-agent governance and ownership of operations and development matter in selection. Official product sources describe the platform; the CIO white papers observed in the catalogue are separate publications whose sources and approval status require individual review.",
    },
    focus:{
      de:["ServiceNow AI Platform","KI-Agenten und AI Governance","IT Service Management","IT Operations Management und AIOps","Customer Service Management","HR Service Delivery","Security Operations","Governance, Risk und Compliance","Strategic Portfolio Management","App Engine und Low-Code"],
      en:["ServiceNow AI Platform","AI agents and AI governance","IT service management","IT operations management and AIOps","Customer service management","HR service delivery","Security operations","Governance, risk and compliance","Strategic portfolio management","App Engine and low code"],
    },
    buyerGroups:{
      de:["CIO und IT-Leitung","IT-Service- und Betriebsverantwortliche","CISO, Risiko und Compliance","Kundenservice und CRM","HR und Employee Experience","Portfolio- und Transformationsmanagement","Enterprise Architecture und Plattformteams","Fachbereiche mit Automatisierungsbedarf"],
      en:["CIO and IT leadership","IT service and operations leaders","CISO, risk and compliance","Customer service and CRM","HR and employee experience","Portfolio and transformation management","Enterprise architecture and platform teams","Business teams with automation needs"],
    },
  },
  "G DATA CyberDefense":{
    officialUrl:"https://www.gdata.de/",
    officialLabel:{de:"G DATA Unternehmenslösungen",en:"G DATA business solutions"},
    metaDescription:{
      de:"G DATA CyberDefense: Endpoint Security, XDR und Managed XDR, Mail Protection, Awareness, Phishing-Simulation und Incident Response aus Bochum.",
      en:"G DATA CyberDefense: endpoint security, XDR and managed XDR, mail protection, awareness, phishing simulation and incident response from Bochum.",
    },
    summary:{
      de:"Die G DATA CyberDefense AG aus Bochum entwickelt IT-Sicherheitssoftware für Unternehmen und verbindet sie mit Trainings und Sicherheitsdiensten. Endpoint Security schützt und verwaltet PCs, Server und Mobilgeräte; die klassischen Business-Produkte nutzen einen eigenen Management-Server. XDR führt Signale mehrerer Endpunkte in einer cloudbasierten Web-Konsole zusammen und richtet sich an IT-Teams, die Analyse und Reaktion selbst übernehmen. Managed XDR ergänzt diese Technik um die Überwachung und Reaktion durch das G DATA Security Operations Center in Bochum rund um die Uhr. Für Microsoft Exchange Online bietet G DATA 365 Mail Protection einen separaten Schutz vor schädlichen E-Mails, auch auf Geräten ohne Endpoint-Agent. Security Awareness Trainings vermitteln Mitarbeitenden Sicherheitswissen; Phishing-Simulationen ergänzen sie um anpassbare Testkampagnen, Rückmeldung und Auswertungen. Bei einem konkreten Angriff unterstützt der Incident Response Service mit Forensik, Eindämmung und Wiederanlauf; ein Retainer vereinbart zusätzlich Vorbereitung und Reaktionszeiten. Penetrationstests und IT Security Consulting adressieren technische Schwachstellen, Härtung und Notfallpläne. Für die Auswahl sind der Unterschied zwischen selbst betriebenem Endpoint-Schutz, eigenem XDR-Betrieb und Managed SOC, unterstützte Systeme, Exchange-Online-Abhängigkeit, Reaktionsbefugnisse und Ausnahmen auf kritischen Geräten sowie der Umfang vertraglich zugesagter Hilfe maßgeblich. Consulting und Incident Response werden auf offiziellen G DATA Seiten angeboten; die Rolle der dort genannten G DATA Advanced Analytics GmbH ist bei der Beauftragung separat zu klären. Der beobachtete Heise-Beitrag bleibt als Drittquelle getrennt.",
      en:"G DATA CyberDefense AG, based in Bochum, develops business security software and combines it with training and security services. Endpoint Security protects and manages PCs, servers and mobile devices; the established business products use a local management server. XDR correlates signals from multiple endpoints in a cloud-based web console and is intended for IT teams that handle analysis and response themselves. Managed XDR adds round-the-clock monitoring and response by the G DATA Security Operations Center in Bochum. G DATA 365 Mail Protection separately protects Microsoft Exchange Online mailboxes, including access from devices without an endpoint agent. Security Awareness training teaches staff about security, while phishing simulations add configurable test campaigns, feedback and reporting. During an attack, the Incident Response Service provides forensic analysis, containment and support for recovery; a retainer also covers preparation and agreed response times. Penetration tests and IT Security Consulting address technical weaknesses, hardening and emergency plans. Buyers should distinguish locally managed endpoint protection, self-operated XDR and the managed SOC, and assess supported systems, the Exchange Online dependency, response authority and exclusions for critical devices, and the contractually agreed scope of help. G DATA's official pages offer consulting and incident response; the role of the G DATA Advanced Analytics GmbH named there needs separate clarification when contracting. The observed Heise article remains a separate third-party source.",
    },
    focus:{
      de:["Endpoint Security für PCs, Server und Mobilgeräte","XDR mit endpunktübergreifender Analyse","Managed XDR mit 24/7-SOC in Bochum","365 Mail Protection für Exchange Online","Security Awareness Trainings und Lernplattform","Phishing-Simulationen und Kampagnenreporting","Incident Response Service bei akuten Angriffen","Incident Response Retainer und Vorbereitung","Penetrationstests für IT, Web, API und KI-Anwendungen","IT Security Consulting, Härtung und Notfallpläne"],
      en:["Endpoint security for PCs, servers and mobile devices","XDR with cross-endpoint analysis","Managed XDR with a 24/7 SOC in Bochum","365 Mail Protection for Exchange Online","Security awareness training and learning platform","Phishing simulations and campaign reporting","Incident Response Service for active attacks","Incident Response Retainer and preparedness","Penetration tests for IT, web, APIs and AI applications","IT security consulting, hardening and emergency plans"],
    },
    buyerGroups:{
      de:["CISO und Informationssicherheit","IT-Leitung und Sicherheitsarchitektur","Endpoint- und Systemadministration","SOC und Security Operations","Microsoft-365- und Exchange-Administration","Security-Awareness- und Personalentwicklung","Incident Response und Business Continuity","Datenschutz und Compliance","Einkauf und Dienstleistersteuerung","Managed Service Provider und Channel"],
      en:["CISO and information security","IT leadership and security architecture","Endpoint and systems administration","SOC and security operations","Microsoft 365 and Exchange administration","Security awareness and learning teams","Incident response and business continuity","Data protection and compliance","Procurement and supplier management","Managed service providers and channel partners"],
    },
    officialSources:[
      {url:"https://www.gdata.de/wer-wir-sind",label:{de:"Unternehmen und Identität",en:"Company and identity"}},
      {url:"https://www.gdata.de/unternehmen/endpoint-security-software",label:{de:"Endpoint Security",en:"Endpoint Security"}},
      {url:"https://www.gdata.de/unternehmen/xdr",label:{de:"XDR und Betriebsmodell",en:"XDR and operating model"}},
      {url:"https://www.gdata.de/unternehmen/mxdr",label:{de:"Managed XDR und SOC",en:"Managed XDR and SOC"}},
      {url:"https://www.gdata.de/unternehmen/mail-protection",label:{de:"365 Mail Protection",en:"365 Mail Protection"}},
      {url:"https://www.gdata.de/unternehmen/security-awareness-trainings",label:{de:"Security Awareness Trainings",en:"Security awareness training"}},
      {url:"https://www.gdata.de/unternehmen/phishing-simulation",label:{de:"Phishing-Simulation",en:"Phishing simulation"}},
      {url:"https://www.gdata.de/unternehmen/incident-response-service",label:{de:"Incident Response Service",en:"Incident Response Service"}},
      {url:"https://www.gdata.de/unternehmen/incident-response-retainer",label:{de:"Incident Response Retainer",en:"Incident Response Retainer"}},
      {url:"https://www.gdata.de/unternehmen/penetration-tests",label:{de:"Penetrationstests",en:"Penetration tests"}},
      {url:"https://www.gdata.de/unternehmen/it-security-consulting",label:{de:"IT Security Consulting",en:"IT security consulting"}},
    ],
  },
  "KnowBe4 Germany":{
    officialUrl:"https://www.knowbe4.com/de/",
    officialLabel:{de:"KnowBe4 Deutschland",en:"KnowBe4 Germany"},
    metaDescription:{
      de:"KnowBe4 Germany: Security Awareness Training, PhishER Plus, Echtzeit-Coaching, Compliance Plus, E-Mail-Sicherheit und KI-Agenten-Schutz.",
      en:"KnowBe4 Germany: security awareness training, PhishER Plus, real-time coaching, Compliance Plus, email security and AI agent protection.",
    },
    summary:{
      de:"KnowBe4 adressiert Sicherheitsrisiken, die aus Entscheidungen und Verhalten von Menschen sowie aus dem Einsatz von KI-Agenten entstehen. Security Awareness Training (SAT) kombiniert rollen- und risikobasiertes Lernen mit Phishing-Simulationen; AIDA automatisiert die Auswahl und Anpassung von Übungen und Trainings. Der Phish Alert Button erleichtert Mitarbeitenden die Meldung verdächtiger E-Mails und Teams-Nachrichten. PhishER Plus klassifiziert solche Meldungen, unterstützt die Bearbeitung im Security-Team und kann schädliche E-Mails aus weiteren Posteingängen entfernen. Echtzeit-Coaching reagiert über angebundene Sicherheitstools auf riskantes Verhalten. Compliance Plus stellt anpassbare Schulungsinhalte für Richtlinien und Vorschriften bereit. Daneben adressieren Defend eingehende E-Mail-Angriffe und Prevent Risiken ausgehender E-Mails in Microsoft 365; der Agent Risk Manager betrifft die Kontrolle von KI-Agenten und ist vom Awareness-Programm zu unterscheiden. Für die Auswahl zählen vorhandene Mail- und Identitätssysteme, Datenzugriffe und Berechtigungen, der Ablauf vom Meldebutton bis zum SOC, Zielgruppen und Sprachen, messbare Verhaltensänderungen sowie die Lizenzierung einzelner Module und Add-ons. Die offiziellen Produktseiten belegen das Portfolio; beobachtete Publikationen behalten ihren eigenen Quellen- und Prüfstatus.",
      en:"KnowBe4 addresses security risks arising from human decisions and behaviour and from the use of AI agents. Security Awareness Training (SAT) combines role- and risk-based learning with phishing simulations; AIDA automates the selection and adaptation of exercises and training. The Phish Alert Button helps staff report suspicious emails and Teams messages. PhishER Plus classifies these reports, supports the security team's response and can remove malicious messages from other inboxes. Real-time coaching responds to risky behaviour through connected security tools. Compliance Plus provides adaptable training on policies and regulations. Defend addresses inbound email attacks and Prevent covers outbound email risks in Microsoft 365; Agent Risk Manager concerns the control of AI agents and has a different role from the awareness programme. Buyers should assess existing email and identity systems, data access and permissions, the workflow from reporting button to SOC, audiences and languages, measurable behaviour change, and the licensing of individual modules and add-ons. Official product pages support the portfolio description; observed publications retain their separate source and review status.",
    },
    focus:{
      de:["Human Risk Management und SmartRisk","Security Awareness Training und Lernbibliothek","AIDA und personalisierte Phishing-Simulationen","Phish Alert Button für E-Mail und Teams","PhishER Plus: Triage, PhishRIP und PhishFlip","Echtzeit-Coaching mit Security-Stack-Integrationen","Compliance Plus und Richtlinientraining","Defend für eingehende E-Mail-Bedrohungen","Prevent für ausgehende E-Mails und Datenverlust","Agent Risk Manager für KI-Agenten"],
      en:["Human risk management and SmartRisk","Security Awareness Training and content library","AIDA and personalised phishing simulations","Phish Alert Button for email and Teams","PhishER Plus: triage, PhishRIP and PhishFlip","Real-time coaching with security-stack integrations","Compliance Plus and policy training","Defend for inbound email threats","Prevent for outbound email and data loss","Agent Risk Manager for AI agents"],
    },
    buyerGroups:{
      de:["CISO und Informationssicherheit","Security-Awareness- und Human-Risk-Teams","SOC und Incident Response","Microsoft-365- und E-Mail-Administration","Identitäts- und Integrationsverantwortliche","Datenschutz und Compliance","Personalwesen und Weiterbildung","KI-Governance und Plattformteams","IT-Einkauf und Lizenzmanagement"],
      en:["CISO and information security","Security awareness and human-risk teams","SOC and incident response","Microsoft 365 and email administration","Identity and integration owners","Data protection and compliance","Human resources and learning","AI governance and platform teams","IT procurement and licence management"],
    },
    officialSources:[
      {url:"https://www.knowbe4.com/de/products/security-awareness-training",label:{de:"Security Awareness Training und AIDA",en:"Security Awareness Training and AIDA"}},
      {url:"https://www.knowbe4.com/de/products/phisher-plus",label:{de:"PhishER Plus und Incident Response",en:"PhishER Plus and incident response"}},
      {url:"https://www.knowbe4.com/de/products/securitycoach",label:{de:"Echtzeit-Coaching",en:"Real-time coaching"}},
      {url:"https://www.knowbe4.com/de/products/compliance-plus",label:{de:"Compliance Plus",en:"Compliance Plus"}},
      {url:"https://www.knowbe4.com/de/products/cloud-email-security",label:{de:"Defend und Prevent: E-Mail-Sicherheit",en:"Defend and Prevent: email security"}},
      {url:"https://www.knowbe4.com/de/products/ai-agent-risk-manager",label:{de:"Agent Risk Manager",en:"Agent Risk Manager"}},
      {url:"https://www.knowbe4.com/de/products/security-awareness-training/pricing",label:{de:"SAT-Abonnements und Add-ons",en:"SAT subscriptions and add-ons"}},
    ],
    languageNote:{
      de:"KnowBe4 Germany veröffentlicht für den deutschen Markt sowohl deutsch- als auch englischsprachige Inhalte. Die Sprache allein verändert deshalb die Anbieterzuordnung nicht.",
      en:"KnowBe4 Germany publishes both German- and English-language content for the German market. Language alone therefore does not change provider attribution.",
    },
  },
};

import {providerProfilesWave} from "./provider-profiles-wave";
import {providerProfilesNext} from "./provider-profiles-next";
import {providerProfilesThird} from "./provider-profiles-third";
import {providerProfilesFourth} from "./provider-profiles-fourth";
import {providerProfilesFifth} from "./provider-profiles-fifth";
import {providerProfilesSixth} from "./provider-profiles-sixth";
import {providerProfilesSeventh} from "./provider-profiles-seventh";
import {providerProfilesEuaigf} from "./provider-profiles-euaigf";
import {providerProfilesEighth} from "./provider-profiles-eighth";
import {providerProfilesNinth} from "./provider-profiles-ninth";
import {providerProfilesTenth} from "./provider-profiles-tenth";
import {providerProfilesEleventh} from "./provider-profiles-eleventh";
import {providerProfilesAudit} from "./provider-profiles-audit";
import {providerProfilesIgel} from "./provider-profiles-igel-20261006";
import {providerProfilesPortalReviews} from "./provider-profiles-portals-20261006";
import {providerProfilesDaily} from "./provider-profiles-update-20260930";
import {providerProfilesWhitepapers} from "./provider-profiles-whitepapers";
import {providerProfileEnhancements} from "./provider-profile-enhancements";
import {providerProfilesAlthaller} from "./provider-profiles-althallerassist-20261008";
import {providerProfilesMarconomy} from "./provider-profiles-marconomy-20261008";
import {providerProfilesSpaceX} from "./provider-profiles-spacex-20261008";
import {providerProfilesSkydance} from "./provider-profiles-skydance-20261008";
import {providerProfilesPlatformNetwork} from "./provider-profiles-platform-network-20261012";
import {providerProfilesNextFiveNetwork} from "./provider-profiles-next-five-network-20261012";
import {providerProfilesAllianzTrade} from "./provider-profiles-allianz-trade-20261013";
import {providerProfilesRemaining} from "./provider-profiles-remaining-20261013";
import {providerProfilesAlsoTrenkwalder} from "./provider-profiles-also-trenkwalder-20261013";
import {providerProfilesFiveOctober} from "./provider-profiles-five-20261019";
import {providerProfilesMediaPerformance} from "./provider-profiles-media-performance-20261019";
export const providerProfileNames=[...new Set([...Object.keys(providerProfiles),...Object.keys(providerProfilesWave),...Object.keys(providerProfilesNext),...Object.keys(providerProfilesThird),...Object.keys(providerProfilesFourth),...Object.keys(providerProfilesFifth),...Object.keys(providerProfilesSixth),...Object.keys(providerProfilesSeventh),...Object.keys(providerProfilesEuaigf),...Object.keys(providerProfilesEighth),...Object.keys(providerProfilesNinth),...Object.keys(providerProfilesTenth),...Object.keys(providerProfilesEleventh),...Object.keys(providerProfilesAudit),...Object.keys(providerProfilesWhitepapers),...Object.keys(providerProfilesDaily),...Object.keys(providerProfilesPortalReviews),...Object.keys(providerProfilesIgel),...Object.keys(providerProfilesAlthaller),...Object.keys(providerProfilesMarconomy),...Object.keys(providerProfilesSpaceX),...Object.keys(providerProfilesSkydance),...Object.keys(providerProfilesPlatformNetwork),...Object.keys(providerProfilesNextFiveNetwork),...Object.keys(providerProfilesAllianzTrade),...Object.keys(providerProfilesRemaining),...Object.keys(providerProfilesAlsoTrenkwalder),...Object.keys(providerProfilesFiveOctober),...Object.keys(providerProfilesMediaPerformance),...Object.keys(providerProfilesITRefresh),...Object.keys(providerProfilesEworld)])];
export function providerProfileFor(name:string){
  if(providerProfilesEworld[name])return providerProfilesEworld[name];
  if(providerProfilesITRefresh[name])return providerProfilesITRefresh[name];
  if(providerProfilesMediaPerformance[name])return providerProfilesMediaPerformance[name];
  if(providerProfilesFiveOctober[name])return providerProfilesFiveOctober[name];
  if(providerProfilesAlsoTrenkwalder[name])return providerProfilesAlsoTrenkwalder[name];
  if(providerProfilesRemaining[name])return providerProfilesRemaining[name];
  if(providerProfilesAllianzTrade[name])return providerProfilesAllianzTrade[name];
  if(providerProfilesNextFiveNetwork[name])return providerProfilesNextFiveNetwork[name];
  if(providerProfilesPlatformNetwork[name])return providerProfilesPlatformNetwork[name];
  if(providerProfilesSkydance[name])return providerProfilesSkydance[name];
  if(providerProfilesSpaceX[name])return providerProfilesSpaceX[name];
  if(providerProfilesMarconomy[name])return providerProfilesMarconomy[name];
  if(providerProfilesAlthaller[name])return providerProfilesAlthaller[name];
  if(providerProfilesIgel[name])return providerProfilesIgel[name];
  const portalReviewProfile=providerProfilesPortalReviews[name];if(portalReviewProfile)return portalReviewProfile;
  const dailyProfile=providerProfilesDaily[name];if(dailyProfile)return dailyProfile;
  const whitepaperProfile=providerProfilesWhitepapers[name];if(whitepaperProfile)return whitepaperProfile;
  const auditProfile=providerProfilesAudit[name];if(auditProfile)return auditProfile;
  const eleventhProfile=providerProfilesEleventh[name];if(eleventhProfile)return eleventhProfile;
  const tenthProfile=providerProfilesTenth[name];if(tenthProfile)return tenthProfile;
  const ninthProfile=providerProfilesNinth[name];if(ninthProfile)return ninthProfile;
  const eighthProfile=providerProfilesEighth[name];if(eighthProfile)return eighthProfile;
  const euaigfProfile=providerProfilesEuaigf[name];if(euaigfProfile)return euaigfProfile;
  const seventhProfile=providerProfilesSeventh[name];if(seventhProfile)return seventhProfile;
  const sixthProfile=providerProfilesSixth[name];if(sixthProfile)return sixthProfile;
  const fifthProfile=providerProfilesFifth[name];if(fifthProfile)return fifthProfile;
  const fourthProfile=providerProfilesFourth[name];if(fourthProfile)return fourthProfile;
  const thirdProfile=providerProfilesThird[name];if(thirdProfile)return thirdProfile;
  const nextProfile=providerProfilesNext[name];if(nextProfile)return nextProfile;
  const newProfile=providerProfilesWave[name];if(newProfile)return newProfile;
  const base=providerProfiles[name];if(!base)return undefined;
  const addition=providerProfileEnhancements[name];if(!addition)return base;
  return {...base,summary:{de:`${base.summary.de} ${addition.de}`,en:`${base.summary.en} ${addition.en}`}};
}

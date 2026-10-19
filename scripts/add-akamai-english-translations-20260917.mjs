import {readFile,writeFile} from "node:fs/promises";

const target=new URL("../app/translations.en.generated.json",import.meta.url);
const data=JSON.parse(await readFile(target,"utf8"));
const additions={
  "Akamai API Security: APIs von Legacy bis GenAI schützen":"Akamai API Security: protecting APIs from legacy to GenAI",
  "Kontinuierliche API-Erkennung, Tests und Laufzeitschutz":"Continuous API discovery, testing and runtime protection",
  "Plattformunabhängige Security-Software und Managed Services":"Platform-independent security software and managed services",
  "Entdecken, testen, erkennen und reagieren":"Discover, test, detect and respond",
  "Beschreibt eine durchgängige API-Sicherheitsplattform für Legacy-, Cloud- und GenAI-Schnittstellen: Inventarisierung von Shadow- und Zombie-APIs, mehr als 200 dynamische Tests, Laufzeitanalyse und orchestrierte Reaktion über WAF, SIEM, SOAR und ITSM.":"Describes an end-to-end API security platform for legacy, cloud and GenAI interfaces: inventorying shadow and zombie APIs, more than 200 dynamic tests, runtime analytics and orchestrated response through WAF, SIEM, SOAR and ITSM.",
  "Akamai Guardicore Segmentation: Laterale Bewegungen eindämmen":"Akamai Guardicore Segmentation: containing lateral movement",
  "Zero-Trust-Mikrosegmentierung und Eindämmung von Sicherheitsverletzungen":"Zero Trust microsegmentation and breach containment",
  "Softwarebasierte Segmentierung für Rechenzentrum, Cloud, IoT und OT":"Software-based segmentation for data centres, cloud, IoT and OT",
  "Abbilden, Richtlinien erstellen, visualisieren und durchsetzen":"Map, create policies, visualise and enforce",
  "Ordnet Mikrosegmentierung als softwarebasierte Zero-Trust-Kontrolle ein, die Ost-West-Verkehr sichtbar macht, laterale Bewegungen begrenzt und Richtlinien ohne grundlegenden Netzwerkumbau über Legacy-, Cloud-, Kubernetes-, IoT- und OT-Umgebungen durchsetzt.":"Classifies microsegmentation as a software-based Zero Trust control that makes east-west traffic visible, limits lateral movement and enforces policies across legacy, cloud, Kubernetes, IoT and OT environments without a fundamental network redesign.",
  "Akamai Inference Cloud: KI-Inferenz näher an den Nutzern":"Akamai Inference Cloud: bringing AI inference closer to users",
  "Verteilte Plattform für produktive KI-Inferenz":"Distributed platform for production AI inference",
  "GPU-Compute, Kubernetes, Edge-Routing, Datenservices und KI-Sicherheit":"GPU compute, Kubernetes, edge routing, data services and AI security",
  "Bereitstellung, Absicherung, Skalierung und Betrieb":"Deployment, protection, scaling and operations",
  "Plattformübersicht":"Platform overview",
  "Verbindet NVIDIA-Blackwell-GPUs, Kubernetes, Edge-Routing, Daten- und Speicherbausteine sowie modellbewusste Sicherheitskontrollen zu einer verteilten Plattform für latenzkritische KI-Inferenz und agentische Anwendungen.":"Combines NVIDIA Blackwell GPUs, Kubernetes, edge routing, data and storage components, and model-aware security controls in a distributed platform for latency-sensitive AI inference and agentic applications.",
  "Firewall for AI: GenAI- und LLM-Anwendungen absichern":"Firewall for AI: securing GenAI and LLM applications",
  "Echtzeit-Schutz für Prompts, Antworten und agentische Abläufe":"Real-time protection for prompts, responses and agentic workflows",
  "Modellunabhängige Schutzschicht am Edge oder per API":"Model-independent protection layer at the edge or through an API",
  "Prüfen, blockieren, überwachen und nachsteuern":"Inspect, block, monitor and adjust",
  "Schützt KI-Anwendungen vor Prompt Injection, Jailbreaks, schädlichen Ausgaben, Datenabfluss, Modellmissbrauch und unkontrollierten Rechenkosten. Die Kontrollen prüfen Ein- und Ausgaben in Echtzeit und lassen sich modellunabhängig am Edge oder per REST-API einsetzen.":"Protects AI applications from prompt injection, jailbreaks, harmful output, data exfiltration, model abuse and uncontrolled compute costs. The controls inspect inputs and outputs in real time and can be deployed independently of the model at the edge or through a REST API.",
  "Der Zustand von KI-Inferenz 2026":"The state of AI inference 2026",
  "Entscheidungsgrundlage für produktive KI-Inferenz":"Decision basis for production AI inference",
  "Studie zu Workloads, Latenz, Wirtschaftlichkeit und Betriebsmodellen":"Study of workloads, latency, economics and operating models",
  "Strategie, Architektur und Skalierung":"Strategy, architecture and scaling",
  "Untersucht, welche KI-Anwendungsfälle bereits produktiv laufen, wo Antwortgeschwindigkeit geschäftskritisch wird und wie Inferenzleistung Kundenzufriedenheit, Servicekosten und Umsatz beeinflusst. Ein exaktes Veröffentlichungsdatum wird im Dokument nicht ausgewiesen und deshalb nicht ergänzt.":"Examines which AI use cases are already in production, where response speed becomes business-critical and how inference performance affects customer satisfaction, service costs and revenue. The document does not state an exact publication date, so none has been added.",
  "Akamai Cloud für KI-Inferenz und verteilte Anwendungen":"Akamai Cloud for AI inference and distributed applications",
  "Verteilte Cloud-Plattform für KI- und Produktions-Workloads":"Distributed cloud platform for AI and production workloads",
  "GPU- und CPU-Compute, Kubernetes, Functions, Storage und Zugriffskontrollen":"GPU and CPU compute, Kubernetes, functions, storage and access controls",
  "Architektur, Bereitstellung und Betrieb":"Architecture, deployment and operations",
  "Beschreibt die Weiterentwicklung der Akamai Cloud für produktive KI-Inferenz und verteilte Anwendungen: NVIDIA RTX PRO 6000 Blackwell GPUs, dedizierte CPUs, Functions, Kubernetes, Object Storage, Zugriffskontrollen und Observability werden als gemeinsame Plattform betrachtet.":"Describes the evolution of Akamai Cloud for production AI inference and distributed applications: NVIDIA RTX PRO 6000 Blackwell GPUs, dedicated CPUs, functions, Kubernetes, object storage, access controls and observability are treated as one platform.",
  "API-Sicherheitsvorfälle kosten deutsche Firmen rund 470.000 Euro":"API security incidents cost German companies around €470,000",
  "Risikobewertung und Investitionsbegründung für API-Sicherheit":"Risk assessment and investment case for API security",
  "Fachbeitrag auf Basis der Akamai API Security Impact Study 2026":"Trade article based on the Akamai API Security Impact Study 2026",
  "Risikoanalyse, Priorisierung und Sicherheitsstrategie":"Risk analysis, prioritisation and security strategy",
  "Security-Insider ordnet die Deutschland-Ergebnisse der Akamai API Security Impact Study 2026 ein: 83 Prozent der befragten Unternehmen berichten von API-Sicherheitsvorfällen; genannt werden insbesondere Autorisierungslücken, Fehlkonfigurationen und Risiken durch generative KI, LLMs und Agenten.":"Security-Insider analyses the German findings of the Akamai API Security Impact Study 2026: 83% of surveyed companies report API security incidents, particularly authorisation gaps, misconfigurations and risks from generative AI, LLMs and agents.",
  "Akamai Originalquelle":"Akamai official source"
};

Object.assign(data.translations,additions);
data.sourceCount=Object.keys(data.translations).length;
data.translations=Object.fromEntries(Object.entries(data.translations).sort(([a],[b])=>a.localeCompare(b,"de")));
await writeFile(target,`${JSON.stringify(data)}\n`);
console.log(`Added ${Object.keys(additions).length} Akamai translations.`);

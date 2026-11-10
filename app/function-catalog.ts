export type FunctionLocale="de"|"en";
type Text={de:string;en:string};
export type FunctionProfile={slug:string;title:Text;aliases:string[];summary:Text;topics:{de:string[];en:string[]};question:Text;contexts:{industry:string;solutions:string[]}[]};
export const functionProfiles:FunctionProfile[]=[
  {
    "slug": "kommunaler-vertrieb",
    "title": {
      "de": "Kommunaler Vertrieb",
      "en": "Municipal sales"
    },
    "aliases": [
      "Vertrieb Kommunal",
      "Kommunalvertrieb",
      "Municipal sales"
    ],
    "summary": {
      "de": "Stadtwerke, Kommunen und Wohnungswirtschaft als fachlichen Anwendungskontext erschließen.",
      "en": "Explore utilities, municipalities and housing organisations as an application context."
    },
    "topics": {
      "de": [
        "Wärmeangebote",
        "kommunale Versorgung",
        "Kunden- und Vertragsprozesse"
      ],
      "en": [
        "Heating services",
        "municipal supply",
        "customer and contract processes"
      ]
    },
    "question": {
      "de": "Welche Versorgung ist am Standort verfügbar, und welche Verantwortung liegt bei Anbieter, Netzbetreiber und Kommune?",
      "en": "Which service is available at the site, and how are responsibilities divided between supplier, grid operator and municipality?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": [
          "Energie- und Versorgungslösung",
          "Energie- oder Versorgungslösung"
        ]
      }
    ]
  },
  {
    "slug": "energiewirtschaftliche-it",
    "title": {
      "de": "Energiewirtschaftliche IT",
      "en": "Utility IT"
    },
    "aliases": [
      "IT SAP IS-U und S/4HANA",
      "SAP IS-U und S/4HANA",
      "Utility IT",
      "SAP IS-U and S/4HANA"
    ],
    "summary": {
      "de": "Energiedaten, Abrechnung und betriebliche IT-Schnittstellen als zusammenhängende Themen betrachten.",
      "en": "Explore energy data, billing and operational IT interfaces as related topics."
    },
    "topics": {
      "de": [
        "Energiedatenmanagement",
        "Systemintegration",
        "Migration"
      ],
      "en": [
        "Energy data management",
        "systems integration",
        "migration"
      ]
    },
    "question": {
      "de": "Welche Stammdaten, Zeitreihen und Schnittstellen müssen erhalten bleiben, und wie wird die Migration geprüft?",
      "en": "Which master data, time series and interfaces must be preserved, and how is migration verified?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": [
          "IT-Lösung für Energie und Versorgung",
          "Datenanalyse und Prozessautomatisierung"
        ]
      }
    ]
  },
  {
    "slug": "it-einkauf",
    "title": {
      "de": "IT-Einkauf",
      "en": "IT procurement"
    },
    "aliases": [
      "IT-Einkauf",
      "Projekteinkäufer IT",
      "IT procurement",
      "IT purchasing"
    ],
    "summary": {
      "de": "Technische Angebote nach Leistungsumfang, Integration und Betriebsverantwortung erschließen.",
      "en": "Explore technology offers through scope, integration and operating responsibilities."
    },
    "topics": {
      "de": [
        "Leistungsabgrenzung",
        "Schnittstellen",
        "Betrieb und Support"
      ],
      "en": [
        "Service scope",
        "interfaces",
        "operation and support"
      ]
    },
    "question": {
      "de": "Welche Leistungen, Datenrechte und laufenden Kosten sind Bestandteil des Angebots?",
      "en": "Which services, data rights and recurring costs are included in the offer?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": [
          "IT-Lösung für Energie und Versorgung",
          "IT- und OT-Netze von Energieversorgern absichern"
        ]
      }
    ]
  },
  {
    "slug": "prozessautomatisierung",
    "title": {
      "de": "Prozessautomatisierung",
      "en": "Process automation"
    },
    "aliases": [
      "Prozessautomatisierung",
      "Consultant RPA",
      "RPA",
      "Process automation",
      "Robotic process automation"
    ],
    "summary": {
      "de": "Wiederkehrende Abläufe, Datenübergaben und Ausnahmebehandlung als Automatisierungskontext bündeln.",
      "en": "Bring recurring workflows, data handovers and exception handling together as an automation context."
    },
    "topics": {
      "de": [
        "RPA",
        "Datenqualität",
        "Prozesskontrolle"
      ],
      "en": [
        "RPA",
        "data quality",
        "process control"
      ]
    },
    "question": {
      "de": "Welche Schritte sind regelbasiert, wann wird menschlich geprüft, und wie werden Änderungen nachvollziehbar?",
      "en": "Which steps are rule based, when is human review required, and how are changes traceable?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": [
          "Datenanalyse und Prozessautomatisierung",
          "Skalierbarer Zugang zu KI-Anwendungen für kommunale Versorger"
        ]
      }
    ]
  },
  {
    "slug": "energieprognose",
    "title": {
      "de": "Energieprognose",
      "en": "Energy forecasting"
    },
    "aliases": [
      "Energieprognose",
      "Energieprognosemanager",
      "Energieprognosemanagerin",
      "Energy forecasting",
      "Energy forecast manager"
    ],
    "summary": {
      "de": "Verbrauchs- und Erzeugungsdaten sowie die Prüfung von Prognoseabweichungen als Themenzugang nutzen.",
      "en": "Use consumption and generation data and assessment of forecast deviations as topic entry points."
    },
    "topics": {
      "de": [
        "Zeitreihen",
        "Last- und Einspeiseprofile",
        "Datenanalyse"
      ],
      "en": [
        "Time series",
        "demand and generation profiles",
        "data analysis"
      ]
    },
    "question": {
      "de": "Welche Datenauflösung, Aktualisierung und Vergleichsbasis werden für eine Prognose benötigt?",
      "en": "Which data resolution, update frequency and comparison baseline does a forecast require?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": [
          "Datenanalyse und Prozessautomatisierung",
          "Netzkapazität und Netzausbau planen"
        ]
      }
    ]
  },
  {
    "slug": "marktanalyse",
    "title": {
      "de": "Marktanalyse",
      "en": "Market analysis"
    },
    "aliases": [
      "Marktanalyse",
      "Marktanalystin",
      "Marktanalyst",
      "Market analysis",
      "Market analyst"
    ],
    "summary": {
      "de": "Marktinformationen, Preisbestandteile und Szenarien mit Datum und Aussagegrenzen erschließen.",
      "en": "Explore market information, price components and scenarios with dates and evidence limits."
    },
    "topics": {
      "de": [
        "Preisdaten",
        "Szenarien",
        "Quellenvergleich"
      ],
      "en": [
        "Price data",
        "scenarios",
        "source comparison"
      ]
    },
    "question": {
      "de": "Welche Angaben sind beobachtet, welche modelliert, und auf welchen Zeitraum beziehen sie sich?",
      "en": "Which figures are observed, which are modelled, and which period do they describe?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": [
          "Datenanalyse und Prozessautomatisierung"
        ]
      }
    ]
  },
  {
    "slug": "produktmanagement",
    "title": {
      "de": "Produktmanagement",
      "en": "Product management"
    },
    "aliases": [
      "Produktmanagement",
      "Produktmanager",
      "Produktmanagerin",
      "Product management",
      "Product manager"
    ],
    "summary": {
      "de": "Angebote über Anwendung, Leistungsumfang und Abhängigkeiten vergleichbar machen.",
      "en": "Compare offers through application, scope and dependencies."
    },
    "topics": {
      "de": [
        "Anwendungsfälle",
        "Leistungsbild",
        "Angebotsgrenzen"
      ],
      "en": [
        "Use cases",
        "service scope",
        "offer limitations"
      ]
    },
    "question": {
      "de": "Für welchen Einsatzfall ist das Angebot bestimmt, und welche Voraussetzungen müssen erfüllt sein?",
      "en": "Which use case does the offer address, and which prerequisites must be met?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": [
          "Batteriespeicher und Energiemanagement bereitstellen",
          "Energie- und Versorgungslösung"
        ]
      }
    ]
  },
  {
    "slug": "steuerung-controlling",
    "title": {
      "de": "Steuerung und Controlling",
      "en": "Management control and controlling"
    },
    "aliases": [
      "Steuerung & Controlling",
      "Steuerung und Controlling",
      "Controlling",
      "Management control",
      "Controlling and finance"
    ],
    "summary": {
      "de": "Kosten, Projektstände und Kennzahlen anhand ihrer Datengrundlage einordnen.",
      "en": "Interpret costs, project stages and metrics through their underlying data."
    },
    "topics": {
      "de": [
        "Kostenabgrenzung",
        "Projektstatus",
        "Kennzahlen"
      ],
      "en": [
        "Cost boundaries",
        "project status",
        "metrics"
      ]
    },
    "question": {
      "de": "Sind Kennzahlen gemessen oder geplant, und welche Kosten- und Zeitgrenzen gelten?",
      "en": "Are metrics measured or planned, and which cost boundaries and time periods apply?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": [
          "Digitale Steuerung großer Energieprojekte",
          "Datenanalyse und Prozessautomatisierung"
        ]
      }
    ]
  },
  {
    "slug": "beteiligungsmanagement",
    "title": {
      "de": "Beteiligungsmanagement",
      "en": "Investment and subsidiary management"
    },
    "aliases": [
      "Beteiligungsmanagement",
      "Beteiligungsmanager",
      "Investment and subsidiary management"
    ],
    "summary": {
      "de": "Unternehmensbeziehungen und Projektrollen mit dokumentierten Quellen erschließen.",
      "en": "Explore corporate relationships and project roles using documented sources."
    },
    "topics": {
      "de": [
        "Eigentümerbezug",
        "Gesellschaften",
        "Projektrollen"
      ],
      "en": [
        "Ownership connections",
        "legal entities",
        "project roles"
      ]
    },
    "question": {
      "de": "Welche Gesellschaft trägt welche Aufgabe, und für welchen Zeitpunkt ist die Beziehung belegt?",
      "en": "Which entity carries which responsibility, and when was the relationship documented?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": []
      }
    ]
  },
  {
    "slug": "veranstaltungsmanagement",
    "title": {
      "de": "Veranstaltungsmanagement",
      "en": "Event management"
    },
    "aliases": [
      "Veranstaltungsmanagement",
      "Eventmanagement",
      "Eventmanagerin",
      "Eventmanager",
      "Event management"
    ],
    "summary": {
      "de": "Fachveranstaltungen über Themen, Programme und sachliche Unternehmensinformationen erschließen.",
      "en": "Explore specialist events through topics, programmes and factual company information."
    },
    "topics": {
      "de": [
        "Messeprogramme",
        "Fachthemen",
        "Ausstellerinformationen"
      ],
      "en": [
        "Exhibition programmes",
        "specialist topics",
        "exhibitor information"
      ]
    },
    "question": {
      "de": "Welche Programminhalte und Ausstellerangaben sind aktuell bestätigt, und auf welchen Datenstand beziehen sie sich?",
      "en": "Which programme and exhibitor details are currently confirmed, and what is their data date?"
    },
    "contexts": [
      {
        "industry": "energie",
        "solutions": []
      }
    ]
  }
];
export const industries=[{slug:"energie",enSlug:"energy",title:{de:"Energiewirtschaft",en:"Energy industry"},space:"Energie und Versorgung"}] as const;
export const functionPath=(slug:string,locale:FunctionLocale="de")=>(locale==="en"?"/en/functions/":"/funktionen/")+slug;
export const functionsPath=(locale:FunctionLocale="de")=>locale==="en"?"/en/functions":"/funktionen";
export const industryPath=(locale:FunctionLocale="de")=>locale==="en"?"/en/industries/energy":"/branchen/energie";
export const industriesPath=(locale:FunctionLocale="de")=>locale==="en"?"/en/industries":"/branchen";
export const getFunction=(slug:string)=>functionProfiles.find(item=>item.slug===slug);

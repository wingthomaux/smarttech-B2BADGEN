# Akamai – Quellenprüfung und 15 Änderungen, 12.10.2026

Stand: Sites-Quelle 46f0ce1353122e5d7c6869b9c4c01c5ada7f2828 / Version 116. Bestehende Anbieter- und Wissenspfade bleiben erhalten. Umsetzung DE/EN über `scripts/update-akamai-20261012.py`; Katalog wird mit dem bestehenden Generator neu erstellt.

## Fachliche Änderungen

1. Anbieterprofil: spezifische Produktfamilien, Kaufkontext, Fachrollen und fünf offizielle Produkt-/Aktualitätsquellen ergänzt; unkonkrete Plusserver-/Telekom-Partnerschaftsaussagen entfernt. MuleSoft-Integration (10.09.2026) mit Trennung verfügbarer und angekündigter Funktionen. CPU-/GPU-Kapazitäten getrennt.
2. 630004: vollständige englische Inferenzstudie statt deutscher Vorschau; Erhebung März 2026, 200 Beteiligte, Nordamerika/Europa und Aussagegrenzen ergänzt, kein erfundenes Veröffentlichungsdatum.
3. 630007 neu: Prolexic, DDoS-Abwehr und Routing-/SLA-Auswahlfragen; Corero-Partnerrolle sichtbar.
4. 630008 neu: Edge DNS/Shield NS53, autoritatives DNS und hybride DNS-Absicherung.
5. 630009 neu: Ion, CDN-/Web-Performance und optionale mPulse-Messung.
6. 630010 neu: Bot Manager, abgestufte Maßnahmen und separate Account-/Content-Produkte.
7. 630011 neu: Workforce Protector, ehemals LayerX; Lösungsüberblick zu Browser-/KI-/SaaS-Nutzung.
8. 630012 neu: SOTI Agentic Threat Landscape, veröffentlicht laut Akamai-Ankündigung am 22.09.2026; öffentlich geprüfte Zusammenfassung und Ankündigung, kein Berichtsvolltext.
9. 630013 neu: Anthropic-Vereinbarung vom 24.09.2026; sieben Jahre, 11,6 Mrd. USD vertragliche CPU-Verpflichtung; mögliche Erweiterung nicht als gesichert dargestellt.
10. 3236: APAC-Studie mit China/Indien/Japan/Australien konkret eingeordnet; kein Studienjahr aus Portaldatum abgeleitet.
11. 1984: APAC 2026 mit China/Indien/Japan/Singapur und 640 Befragten eingeordnet; unterschiedliche Ländergruppe, keine nachgewiesene Dublette.
12. 3239: WAF-Checkliste in Digitale Infrastruktur / Sicherheit und Resilienz statt Kosten und Produktivität; Kriterien ergänzt.
13. 3233: elf API-Abwehrfähigkeiten in Digitale Infrastruktur / Sicherheit und Resilienz; konkrete Fähigkeiten statt generischer Zuordnung.
14. 3238: Gartner Peer Insights als Kundenbewertungsbericht mit Stand Juli 2025 eingeordnet, keine aktuelle technische Empfehlung; Sicherheitstaxonomie korrigiert.
15. 3398: historische Studie 2024 von Portaldatum 13.04.2026 unterschieden; ursprüngliche PDF-Adresse liefert HTML, Volltext nicht erneut bestätigt; Akamai als Herausgeber, Plusserver als frühere Kampagnenzuordnung.

## Prüfumfang und offene Fälle

Alle 17 bisher zugeordneten Objekte: öffentliche Original-/Portaladressen abgerufen, Titel/Anbieter/öffentliche Beschreibung gesichtet. Alle neun ursprünglichen Portal-Einträge sowie heise und Security-Insider öffentlich erreichbar. Die sechs bisherigen Akamai-Originalobjekte sind weiterhin erreichbar. Sieben neue Originalressourcen einzeln gelesen. Vollständige Inferenzstudie über öffentlichen PDF-Inhalt geprüft. Formulargebundene Portal-Volltexte wurden nicht abgerufen; redaktionelle Prüfung der fünf neu geprüften Portalobjekte bezeichnet ausdrücklich nur deren öffentliche Beschreibung. Die bestehende Studie 2024 war bereits validiert und wurde nicht nochmals als neue Validierung gezählt. Netto sieben neue Wissensobjekte und zwölf neue validierte IDs.

Die API-Produktübersicht, Guardicore und Firewall for AI bleiben nach Quellenprüfung unverändert. Beide Inferenz-/Cloud-Objekte haben unterschiedliche Quellen und Zwecke (Plattformübersicht versus Fachbeitrag) und bleiben getrennt. Für weitere generische Bestandsobjekte (API Buyer’s Guide, Compliance, SOTI Apps/APIs/DDoS) wurde die öffentliche Beschreibung geprüft; sie wurden in diesem begrenzten Änderungspaket nicht neu freigegeben. Keine unbelegten Partnerprofile angelegt.

Quellen sind jeweils direkt in Anbieterprofil, Wissensobjekt und Aktualisierungsskript hinterlegt. Englische Texte sind fachlich gleichwertig; englische Originalberichte bleiben als solche gekennzeichnet. Validierungsledger additiv, keine doppelten IDs. Suche/Katalog und Wochenvergleich werden durch den bestehenden Buildgenerator aktualisiert.

## Technische Prüfung

Browser-QA entfällt, da im Managed-Container kein control-browser verfügbar ist. Der vorhandene Worker-HTML-Test prüft das aktualisierte Profil und die stabile Trennung von Original- und Fachquellen; dessen frühere Text-/Zählererwartungen wurden angepasst. Pflichtprüfung: `npm run verify` (Lint, Quellenprüfung, Build, interne Links, Funktionstests).

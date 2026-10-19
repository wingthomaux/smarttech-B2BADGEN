# IT-Sitemap- und Profilrefresh vom 19. Oktober 2026

Ausgangsbasis: veröffentlichte Version 125, Commit `8aaebf9f13c55ea8e63aed1635ac0bd55c3b743c`, 5.066 Wissensobjekte und 1.340 Anbieter. Ergebnis: **5.139 Wissensobjekte und 1.345 Anbieter**. Der eingefrorene Vergleich zum 30.09.2026 enthält jetzt 55 zusätzliche Anbieter und 453 zusätzliche Wissensobjekte.

## Quellen und Auswahl

17 Portale wurden erneut über robots.txt, Sitemap-Einstiege und 389 untergeordnete Sitemap-Abrufe untersucht. 152 ausgewählte öffentliche Artikel- und Landingpages wurden zusätzlich abgerufen. Wo Sitemaps nicht erreichbar waren, wurden öffentliche Portal-APIs, RSS oder aktuelle Übersichtsseiten genutzt. Der Schwerpunkt liegt auf IT-Management.today, CIO Whitepaper, Security-Insider, heise Business Services, connect professional, ComputerWeekly und Telecom Handel. HR-, Produktions- und Marketingportale wurden bei der Entdeckung mit berücksichtigt, ihre API-Auswahl ist keine vollständige redaktionelle Bestandsprüfung.

Sitemap-URL-Mengen enthalten auch Bilder, Archive und internationale Seiten. `lastmod`, höhere Ressourcen-IDs und wechselnde URL-Varianten gelten weder als Veröffentlichungsdatum noch als Neuheitsbeleg. Die Auswahl wird nicht mit einer Vollprüfung aller entdeckten URLs gleichgesetzt.

| Herkunft | Neue beobachtete Wissensobjekte |
| --- | ---: |
| IT-Management.today | 23 |
| Whitepaper CIO.de | 21 |
| Security-Insider | 8 |
| connect professional | 6 |
| heise Business Services | 5 |
| ComputerWeekly | 4 |
| Telecom Handel | 1 |
| Gesamt | 68 |

Weitere fünf einzeln gelesene öffentliche Originalseiten wurden als kuratierte Lösungs- beziehungsweise Anbieterübersichten aufgenommen. Nur deren IDs 880068–880072 erhöhen den persistenten Validierungsstand von 510 auf 515. Die 68 beobachteten Seiten bleiben vorstrukturiert. Insbesondere werden registrierungspflichtige Whitepaper, Formulare und Aufzeichnungen nicht durch das Lesen ihrer Landingpage validiert. Es wurden keine Formulare abgesendet oder Zugänge angelegt.

## Profile und Vernetzung

Fünf neue, eigenständige Anbieter mit deutschem und englischem Leistungsbild, spezifischen Angebotsfeldern, Fachrollen und Originalquellen:

- Omnissa: Workspace ONE, Horizon, Intelligence und Arbeitsplatzautomatisierung.
- Arista Networks: EOS, CloudVision, Unternehmens- und Rechenzentrumsnetze; angekündigte KI-Netzwerkarchitekturen zeitlich begrenzt.
- NetKnights: privacyIDEA, MFA und kommerzieller Support; Conditional Access und Remember Me aus Version 3.14.
- Commvault: Backup, Cyber-Recovery und die konkret belegte CrowdStrike-Integration.
- Barracuda Networks: Sicherheitsportfolio und AI Data Security; Oktober als angekündigter Verfügbarkeitszeitraum, ohne erfundenen Freigabetag.

Zehn vorhandene Profile wurden substanziell ergänzt: Tenable, Pendo, Quadient, Reply, Paessler, Septeo CNEE, Veeam, Scality, Scrive und Hyland. Wichtige Grenzen sind die offene Beta von Pendo Agent Toolkit, Veeams Zusatzmodul, geplante weitere ERP-Anbindungen bei Hyland sowie Rechte, Betrieb und menschliche Freigaben bei agentischen Abläufen.

Sechs neue Artikelbezüge vernetzen iTAC mit Red Hat, Slimstock mit SAP, Paessler mit Siemens, Bechtle mit Microsoft Azure, Skaylink mit AWS sowie Commvault mit CrowdStrike. Sekundärrollen sind quellenspezifisch beschrieben und ändern den primären Anbieter nicht. Amberlo bleibt Produkt von Septeo CNEE; HP Dimension wird HP Deutschland und nicht HPE zugeordnet. Der neue ALSO-Artikel ergänzt die bestehende Seite, ohne den für November angekündigten Juniper-Vertrieb vorzuverlegen.

Das vorhandene Sophos-Wissensobjekt **4784** behält ID, Original-URL, primären Anbieter und ursprüngliches Publikationsdatum 10.09.2026. Die öffentliche heise-Seite nennt jetzt den Live-Termin **22.10.2026, 11 Uhr**. Dies ist eine Metadatenkorrektur am bestehenden Objekt, keine zusätzliche Ressource oder Validierung.

## Offene Abdeckung

- **WEKA Downloads:** HTTP 503; aktuelle Abdeckung offen, keine automatische Freigabe.
- **Foundry Webcast:** Sitemap-Einstiege HTTP 404; daraus wird kein leerer Neuheitenbestand abgeleitet.
- **CIO:** Sitemap 404; die öffentliche Ressourcen-API und konkrete Landingpages liefern eine brauchbare Alternative. Uneindeutige Hewlett-Packard-Publisher bleiben offen.
- **B2B KnowHow:** Sitemap-Routen liefern umgeleitetes business-iq.net-HTML statt XML. Wiederholte Ressourcen mit wechselnden IDs werden nicht als neue Inhalte übernommen.
- **Silicon:** erster Ressourcen-Sitemap-Teil und RSS erreichbar, zweiter Teil 404, API gesperrt. Keine eindeutig neue geeignete IT-Ressource übernommen; ungeklärte Herausgeber bleiben offen.
- Oracle-Startup-Artikel sowie weitere Anbieter- und Pressefälle bleiben außerhalb dieses Pakets, wenn eindeutige vorhandene Identität oder hinreichender Lösungsbezug fehlen. Die Metadaten-Prüfliste ist kein Freigabestatus.

## Nachvollziehbarkeit und Prüfung

Deterministische Importdatei: `app/expansion-it-refresh-20261019.json`; bestehende Objektkorrektur: `app/knowledge-refresh-it-20261019.json`; zweisprachige Profile: `app/provider-profiles-it-refresh-20261019.json`. Der Kataloggenerator integriert diese Dateien ohne Änderung bestehender kanonischer IDs.

Öffentlich abrufbares Audit: `/data/source-review/it-refresh-20261019.audit.json`. Darin stehen HTTP-Fehler, Abrufzahlen und Hashes der untergeordneten Sitemaps. `/data/source-review/it-refresh-20261019.decisions.json` enthält Auswahlentscheidungen und eine Metadaten-Prüfliste; vollständige fremde Artikeltexte und Pressekontakte werden nicht gespeichert.

Pflichtabnahme: `npm run verify` einschließlich Build, Quellenprüfung, interner Links, DE/EN-Seiten, Quellenhinweisen und Regressionen. Der abschließende Veröffentlichungsstand wird über den integrierten Git-Commit und die Sites-Version dokumentiert.

Abnahme erfolgreich: `npm run verify`, 64 bestandene Tests, 12.968 geprüfte kanonische DE/EN-Detailpfade und 515 eindeutige validierte Originalseiten. Der vorhandene ESLint-Hinweis in `app/smarttech-portal.tsx` bleibt ohne Fehlerstatus.

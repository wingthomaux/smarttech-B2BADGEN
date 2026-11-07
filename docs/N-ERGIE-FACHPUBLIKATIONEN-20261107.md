# N-ERGIE: Fachpublikationen und Unternehmensbezüge

Recherche und redaktionelle Einordnung: 7. November 2026. Bestehendes Profil und stabile URL bleiben erhalten. DE/EN werden gleichwertig ergänzt.

## Umfang

`app/nergie-research.tsx` enthält fünf einzeln gesichtete Fachpublikationen und fünf Unternehmens-Originalquellen. Das Dossier ergänzt die vorhandenen behördlichen Belege. Sieben vorhandene Katalogunternehmen werden mit belegtem Beziehungstyp verlinkt; ihre Profile erhalten einen entsprechenden Rückverweis. Keine neuen Anbieter, automatischen Quellenmonitore oder Einzelvalidierungen von Wissensobjekten. Die lokale Publikationsanzeige des N-ERGIE-Profils zählt die fünf Fachmedienbezüge; globale Katalog- und Validierungszähler bleiben unverändert.

## Fachpublikationen

| Medium / Datum | Inhalt / Belegstelle | Redaktionelle Grenze |
| --- | --- | --- |
| EUROHEAT&POWER, 07.09.2026 | Baustart Sandreuth, TRICERA, 15 MW / 30 MWh, geplante Inbetriebnahme Mitte 2027; Artikelabsätze Auftrag und Dimensionierung | Meldung verwendet Unternehmensangaben; keine unabhängige Wirkungsprüfung oder Inbetriebnahmebestätigung |
| ZFK, 16.04.2026, Julian Korb | Interview mit Kerstin Fröhlich: Engpässe, individuelle Anschlüsse, flexible Vereinbarungen | Betreibersicht zum Interviewzeitpunkt; die im Einstieg genannten 95 Prozent Ablehnungen betreffen NEW Netz und werden N-ERGIE nicht zugeschrieben; Quellseite mit Abonnementhinweis |
| Energie & Management, 04.06.2024, Fritz Wilhelm | Wechsel zu GWAdriga, BTC-Plattform, SAP IS-U, frühere Thüga-SmartService-Rolle | Dienstleisterangaben als Grundlage; keine aktuelle Vertrags- oder Systemvollständigkeitsprüfung |
| netzpraxis, Jg. 63 (2024), Heft 1–2, S. 48–51 | Dr. Michał Sobótka: CLS-Systemarchitektur, N-ERGIE und BTC, damaliger Projektplan | Autor ist Geschäftsführer des beteiligten Dienstleisters; Original-PDF gelesen, erste und letzte Seite visuell geprüft; kein genauer Erscheinungstag behauptet |
| ew, 22.10.2024 | Start des CLS-ON-Produktivbetriebs, Partnerliste und zunächst fehlende ERP-Webservices | Projektstart darf nicht als vollständiger N-ERGIE-Rollout oder aktuelle vollständige ERP-Integration ausgegeben werden |

Exakte URLs, Publikationstage beziehungsweise Heftangabe und DE/EN-Kurztexte stehen direkt bei jedem Eintrag im Modul. Titel sind knapp benannt beziehungsweise für EN redaktionell übersetzt, keine nachgebildeten vollständigen Artikel.

## Originalquellen und Katalogverbindungen

| Quelle | Katalogunternehmen | Was belegt ist |
| --- | --- | --- |
| Diehl-Kundenreferenz, ohne ausgewiesenen Publikationstag | Diehl Metering GmbH | Produkte und hybrides Funknetz; rund 21.300 Zähler ausdrücklich Stand März 2025 |
| TRICERA, 03.09.2026, plus EUROHEAT&POWER | TRICERA energy GmbH | Auftrag zum Kraftwerksspeicher Sandreuth; Auftragnehmerrolle |
| ENERTRAG-Pressemitteilung (PDF), 13.11.2024, S. 1 | ENERTRAG SE | nach Testphase unterzeichneter Vertrag für Powersystem und ENERTRAG-Betrieb-Warte; Gruppe und ausführende Einheit unterschieden |
| GWAdriga, 03.06.2024, plus E&M | BTC Business Technology Consulting; SAP | Plattform und bestehendes SAP IS-U als Systembezüge; kein Nachweis direkter Verträge mit diesen Unternehmen |
| E&M, 04.06.2024 | Thüga SmartService GmbH | früherer Gateway-Administrator, inzwischen abgelöst; nicht mit Thüga AG gleichgesetzt |
| ew, 22.10.2024, plus netzpraxis | RheinEnergie AG | gemeinsamer CLS-ON-Projektkontext; keine behauptete bilaterale Liefer- oder Beteiligungsbeziehung |

ENERTRAG-HTML lieferte beim Rechercheabruf Fehlertext; die originale PDF-Fassung unter `https://enertrag.com/content/download/2723/187663?version=2` war textlich vollständig abrufbar und ist deshalb der veröffentlichte Beleg. Der zusätzliche Screenshotabruf dieses PDFs scheiterte technisch; es wurden keine rein bildlichen Inhalte daraus abgeleitet.

Die N-ERGIE-Übersichtsseite belegt Eigentümerquoten und ausdrücklich mit 2025 bezeichnete Konzernzahlen (rund 4,9 Mrd. Euro Umsatz, 2.731 Beschäftigte im Durchschnitt). AG und Konzern, Netzgebiet und Lieferverfügbarkeit bleiben getrennt.

## Nicht übernommen

- Keine Werbung, Empfehlungen oder interne kommerzielle Priorisierung im öffentlichen Profil.
- Keine Übernahme geschätzter Wassereinsparungen als gemessener N-ERGIE-Erfolg; keine heutige Hochrechnung historischer Zählerzahlen.
- Keine angebliche Siemens-/adesso-Verbindung aus unergiebigen Suchtreffern. Keine Herleitung einer Verbindung allein aus E-world-Teilnahme oder räumlicher Nähe.
- Keine pauschale S/4HANA-Migration, KRITIS-Konformität, aktuelle Anschlusskapazität oder Betriebsaufnahme aus Projektabsichten.
- Die sieben Gegenprofile erhalten nur den belegten Rückverweis, keine vollständige redaktionelle Neuprüfung.

## Technische Prüfung und Veröffentlichung

`npm run verify` ist verpflichtend. Zusätzlicher Funktionstest prüft DE/EN-Dossier, Quellenzahl, undatierte Quellen ohne erfundenes `datePublished`, Beziehungstypen, sieben erreichbare Profile samt Rückverweisen und unveränderte generierte N-ERGIE-Katalogobjekte. Sitemap-Änderungsdaten werden für die acht betroffenen Unternehmensprofile in beiden Sprachen fortgeschrieben. Bestehender Quellstand und Daten werden nicht neu gezählt.

Die in dieser Sitzung zuvor automatisch abgelehnte Vorschauübertragung wird nicht wiederholt. Lokale Build-/Link-/Funktionstests und nach regulärer Veröffentlichung die öffentlich autorisierte Liveansicht dienen der Prüfung. Vor Sites-Version: GitHub-CI, gleicher Git-Dateibaum im Sites-Spiegel, integriertes sauberes `main`, `release:check`.

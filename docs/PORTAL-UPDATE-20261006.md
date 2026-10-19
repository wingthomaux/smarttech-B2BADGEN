# Portal-Update vom 06.10.2026

Ausgangsstand: Commit `7dc5df1214fcadbbba55630155e306125f991723`, 4.717 Wissenseinträge, 1.315 Anbieter und 19 bekannte Portale. Der zuletzt veröffentlichte Tagesstand war der 30.09.2026; mehrere Portalabrufe reichten nur bis 10.–14.09. zurück.

Ergebnis: **4.919 Wissenseinträge (+202), 1.315 Anbieter (+0), 19 bekannte Portale**. 109 neue datierte Veröffentlichungen und 93 neue Ressourcen wurden aufgenommen. Zwei vorhandene Veröffentlichungen wurden mit zusätzlicher Quellenbeobachtung zusammengeführt. Eine redaktionelle ServiceNow-Referenz im Atlas kommt hinzu und zählt nicht als neues Wissensasset. Mehrfachnennungen in mehreren Portalen erklären überlappende Quellenzahlen.

Alle Ergänzungen sind `Beobachtet`, nicht als kuratiert oder volltextvalidiert deklariert. Die bestehenden IDs, Detail-URLs, Anbieteridentitäten, Taxonomie und der persistente Validierungsstand bleiben erhalten. Die bestehende Priorisierungslogik berechnet Aktivitätsscores neu (217 bestehende Scores, sechs Hinweise und zwei Vorstrukturierungsstufen ändern sich); dies ist keine neue redaktionelle Freigabe. DE/EN-Texte wurden ergänzt. Fehlende Veröffentlichungstage werden nicht durch Abruf- oder Sitemapdaten ersetzt.

## Quellenabdeckung

| Portal | Neue Wissenseinträge | Prüfung / Einschränkung |
|---|---:|---|
| B2B Expertise | 0 | Startseite und verlinkte Rubriken/Originalseiten; Flender-Beitrag vom 25.09. zur Anbieterprüfung vorgemerkt. |
| B2B KnowHow | 77 | 14 DE/EN-Listenseiten; 113 neue Asset-URLs oberhalb des bisherigen Grenzwerts 20286 geprüft; 77 neue eindeutige Assets übernommen. Fehlende Veröffentlichungstage nicht erfunden. |
| Businessleader.today | 1 | API 401; öffentliche Startseite und RSS als Ersatz geprüft; Dropbox-Sign-Beitrag ergänzt. |
| ComputerWeekly | 6 | Aktuelle Nachrichten-/Meinungsübersichten und Originalseiten; sechs Beiträge mit belegten bestehenden Anbietern übernommen. |
| connect professional | 3 | 39 aktuelle Originalseiten geprüft; vier Beiträge vorbereitet, davon drei neue Einträge und eine vorhandene Dublette. |
| Energie & Management | 0 | Aktuelle Übersicht mit 25 Links geprüft; vier neue Anbieterfälle vorgemerkt. Paywall-Volltexte nicht als gelesen ausgewiesen. |
| EU AI Gigafactories | 0 | Aktuelle offizielle Bekanntmachungen einschließlich Fristverlängerung und Q&A geprüft; bestehende Projektzuordnungen erhalten. |
| Foundry Webcast | 0 | Startseite, Übersicht und Sitemap nicht verfügbar; acht bekannte Detailseiten nachgeprüft: fünf HTTP 404, drei HTTP 502. Kein belastbares Update möglich; Bestand erhalten. |
| IT-Management.today | 77 | 175 Beiträge seit dem bisherigen Abruf über zwei API-Seiten erfasst und fachlich geprüft. |
| Interaktivierungs-Atlas | 0 | Aktuelle Originalseiten geprüft; eine ServiceNow-Referenz ergänzt, ohne Erhöhung des Wissens- oder Validierungszählers. |
| Marketingleiter.today | 4 | 55 Beiträge seit dem bisherigen Abruf über die öffentliche API erfasst und fachlich geprüft. |
| Personalleiter.today | 31 | 183 Beiträge seit dem bisherigen Abruf über zwei API-Seiten erfasst und fachlich geprüft. |
| Produktionsleiter.today | 16 | 1333 Beiträge seit dem bisherigen Abruf über 14 API-Seiten erfasst; offensichtliche Glücksspiel-/Casino-Fremdinhalte ausgeschlossen. Nur fachlich passende, belegbar zugeordnete Beiträge übernommen. |
| Security-Insider | 2 | 37 aktuelle Originalseiten geprüft; zwei Beiträge mit expliziter Anbieterzuordnung ergänzt. Seitenleisten-Anbieter nicht als Inhaltsbeleg verwendet. |
| Telecom Handel | 1 | 542 relevante Sitemap-URLs gegen Originaldaten geprüft; Prüfliste mit 235 datierten Beiträgen aktualisiert. Ein Telekom-Beitrag übernommen; unklare neue Anbieter vorgemerkt. Sitemap-lastmod nicht als Veröffentlichungsdatum verwendet. |
| WEKA Downloads | 0 | 766 überwachte Sitemap-URLs, vier neu beobachtete URLs; keine neuen geeigneten Veröffentlichungskandidaten. Aktive Freigaben unverändert. |
| Whitepaper CIO.de | 11 | 100 aktuelle Ressourcen über die öffentlich vom Portal verwendete API geprüft; 18 seit dem bisherigen Abruf. Elf neue Assets mit explizitem Anbieter und Datum ergänzt. |
| Whitepaper Silicon.de | 0 | RSS mit 50 Einträgen und aktuelle Originalseiten geprüft; MPS-Monitor-Beitrag als neuer Anbieterfall vorgemerkt. |
| heise Business Services | 5 | Aktuelle Portalübersicht mit 22 Links und Originalseiten geprüft; fünf neue Assets bestehender Anbieter ergänzt. Fehlende Datumsangaben bleiben leer. |

## Offene Fälle und Ausschlüsse

- Foundry: Prüfung durchgeführt, aber Aktualisierung wegen HTTP 404/502 nicht möglich. Bekannte Originalreferenzen bleiben erhalten. Der Fehler wird nicht als „keine neuen Inhalte“ ausgegeben.
- 31 Fälle bleiben in `public/data/source-review/portal-update-20261006.pending.json`: neue oder mehrdeutige Anbieteridentitäten, fehlende klare Quellenzuordnung oder noch zu prüfender Lösungsbezug. Beispiele: Hitachi Energy ist nicht Hitachi Vantara; Amazon Business ist nicht AWS. Unternehmensprofile werden nicht aus einer einzelnen Portalnennung automatisch erzeugt.
- Ressourcen-Dubletten wurden anhand normalisierter URLs beziehungsweise Anbieter und Titel abgeglichen. Anbieterfamilien wurden konservativ behandelt; HP-PC-Inhalte sind HP Deutschland zugeordnet, nicht HPE. Kommunikationsmittler werden nicht als Anbieter angelegt.
- Auffällige Glücksspiel-/Casino-Inhalte bei Produktionsleiter.today wurden fachlich ausgeschlossen. Dies dokumentiert eine Inhaltsbeobachtung, keine Behauptung über die Ursache.
- Gated Whitepaper und Paywall-Artikel wurden nur anhand zugänglicher Originalmetadaten geprüft; keine behauptete Volltextlektüre.

## Reproduzierbarkeit und Prüfung

Der deterministische Importer `scripts/import-portal-update-20261006.mjs` verwendet die explizite geprüfte Veröffentlichungsmenge in `public/data/source-review/portal-update-20261006.approved.json`. Ressourcen liegen in `app/observed-expansion-portals-20261006.json`; Katalog und Wochenvergleich werden durch die bestehenden Generatoren erzeugt. Ausgangsbasis des Wochenvergleichs ist der tatsächliche vorherige Katalog.

Pflichtprüfung: `npm run verify` (Lint, Quellenkandidatenprüfung, Build, interne Links und Funktionstests). Veröffentlichung ausschließlich nach Integration auf `main`, Push und erfolgreichem `npm run release:check`. Der maschinenlesbare Quellenstatus liegt in `public/data/source-review/portal-update-20261006.audit.json`.

Prüfergebnis: `npm run verify` erfolgreich; 35/35 Funktionstests, 12.468 eindeutige kanonische Detail-Links, 19 Portalansichten und unveränderter Validierungsledger mit 420 eindeutigen Assets geprüft. Import erneut ausgeführt: null neue Einträge, identischer Dateistand (idempotent). Bestehende Render-Testzähler wurden an den neuen Datenstand angepasst.

Nachtrag: Der anschließende Profildurchgang ergänzt 17 neue Anbieterprofile, überarbeitet zwei bestehende Profile und nimmt 27 weitere Wissensobjekte auf. Von den 31 vorgemerkten Fällen verbleibt ein Inhaltskonsistenzfall. Aktueller Stand und Entscheidungen: `docs/PROFILE-PRUEFFAELLE-20261006.md`.

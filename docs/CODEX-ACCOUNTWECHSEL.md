# SmartTech – Übergabe an einen anderen Codex-/GPT-Account

> Aktueller Veröffentlichungsworkflow seit 20. Oktober 2026: siehe `VEROEFFENTLICHUNG.md`. GitHub-main ist die kanonische Quelle; das produktive Sites-Projekt ist `appgprj_6ad63cbda0a08191ab86bf31aca918e5`. Angaben zu früheren Projektkennungen und Versionen weiter unten sind historische Ausgangsstände.

Dieses Repository enthält den vollständigen, freigegebenen Quell- und Arbeitsstand des öffentlichen SmartTech-Portals. Der Chatverlauf ist für die Fortsetzung nicht erforderlich. Verbindlich sind `origin/main`, `.openai/hosting.json`, `AGENTS.md` und die nachfolgend genannten persistenten Projektdateien.

## Zugriff mit einem anderen GPT-Account

Der öffentliche Zugriff auf das Portal ist kein Bearbeitungsrecht. Der andere GPT-Account kann dasselbe bestehende Sites-Projekt nur verändern oder veröffentlichen, wenn er im selben Workspace als Editor dieses Projekts freigeschaltet ist. Das Projekt darf nicht ein zweites Mal angelegt und die `project_id` in `.openai/hosting.json` darf nicht ersetzt werden.

Wenn der andere Account keinen Editorzugriff erhalten kann, kann er mit einem exportierten Repository-Archiv lokal weiterarbeiten. Er darf dann weder ein Ersatzprojekt erzeugen noch den öffentlichen Stand veröffentlichen. Seine Änderungen müssen als Commit, Patch oder neues Repository-Archiv an einen Account mit Editorzugriff zurückgegeben werden.

Die Google-Drive-Arbeitsmappe mit den Account-Inhabern gehört aus Datenschutzgründen nicht zum Repository. Für weiteres Account-Matching muss der andere GPT-Account separat Zugriff auf dieselbe Originaldatei erhalten oder eine aktuelle Datei neu bereitgestellt bekommen. In das öffentliche Projekt dürfen weiterhin nur freigegebene Kürzel, keine Namen oder Arbeitsmappen, übernommen werden.

## Kanonischer Projektstand

- Öffentliches Portal: `https://smarttech.b2badgen.com`
- Deutsche Fassung: `/`
- Englische Fassung: `/en`
- Kanonischer Quellstand: `origin/main`
- Zuletzt veröffentlichter Anwendungsstand vom 11. September 2026: Commit `54189eb3deb3d0fb2b61d8cbf5c18932813a6ef9`, Sites-Version 40. Der jeweils aktuelle Übergabestand ist immer `origin/main`.
- Bestand: 4.587 Wissensobjekte, 1.412 Anbieterfamilien und je Sprache 5.999 kanonische Detailseiten
- Persistente Validierung: 253 unterschiedliche Assets in vier Paketen
- Aktueller Wochenvergleich: 48 neue Assets und 25 neue Anbieterfamilien

Diese Zahlen sind eine dokumentierte Ausgangslage und dürfen später veralten. Für aktuelle Zahlen immer die generierten Projektdateien und die Prüfskripte verwenden.

## Persistente Zuständigkeiten im Repository

| Bereich | Maßgebliche Dateien |
| --- | --- |
| Veröffentlichungen und Katalog | `public/data/*.json`, `app/catalog.generated.json`, `scripts/generate-catalog.mjs` |
| Quellenkandidaten | `docs/QUELLEN-KANDIDATEN.md`, `public/data/source-candidates/`, `public/data/source-state/`, `public/data/source-review/` |
| Redaktionelle Korrekturen | `app/editorial-overrides.ts`, `app/provider-normalization.ts`, `app/publication-attribution.ts` |
| Validierungsfortschritt | `app/validation-ledger.json`, `app/validation-status.ts`, `scripts/check-validation-sources.mjs` |
| Wochenzugänge | `app/weekly-update.generated.json` |
| Account-Kürzel | `app/account-owners.generated.json`, `app/account-owner-direct-extensions.json`, `app/account-owner-inferences.json`, `app/account-owners.ts` |
| Englische Übersetzung | `app/translations.en.generated.json`, `app/english.ts`, `scripts/generate-english-translations.py` |
| Stabile URLs und SEO | `app/catalog-paths.ts`, die Detailrouten unter `app/wissen`, `app/anbieter` und `app/en`, `app/sitemap.xml/route.ts` |
| Crawlerregel | `app/robots.txt/route.ts` |
| Funktion und Darstellung | `app/smarttech-portal.tsx`, `app/site-header.tsx`, `app/language-toggle.tsx`, `app/globals.css` |

Generierte JSON-Dateien nur über ihren Generator oder eine nachvollziehbare deterministische Aktualisierung verändern. Der Validierungsstand, direkte und inferierte Account-Zuordnungen sowie die Quellentrennung müssen erhalten bleiben.

## Fachliche Regeln, die ohne Chatkontext gelten

- Originalquellen bleiben direkt erreichbar; interne Karten und Suchtreffer führen auf kanonische Detailseiten.
- `Beobachtet`, `Kuratiert` und `Community` bleiben getrennte Herkunftstypen.
- H Zwo B und vergleichbare Kommunikationsmittler sind nur `via`-Quellen. Inhalte werden dem belegten realen Anbieter zugeordnet.
- `Roland Franz & Partner, Steuerberater` und `FRTG Steuerberatungsgesellschaft` bleiben im Datenbestand, aber außerhalb der Top-Listen.
- Anbieterfamilien werden nur bei belastbarer Evidenz zusammengeführt.
- Zuständigkeitskürzel erscheinen in der Oberfläche, jedoch nie in Anbietername, URL, Canonical, Metadaten oder strukturierten Daten.
- Deutsche und englische Detailseiten besitzen stabile eigene URLs und gegenseitige Sprachalternativen. Deutsche Inhalte werden in der englischen Fassung als automatisch übersetzt gekennzeichnet; bereits englische Originaltitel bleiben unverändert.
- Seit der Nutzerfreigabe vom 19. Oktober 2026 dürfen alle Crawler öffentliche Inhaltsseiten in beiden Sprachen abrufen. Die frühere Homepage-Beschränkung ist aufgehoben.

## Start auf dem anderen Rechner

1. Den anderen GPT-Account nach Möglichkeit demselben Workspace und als Editor dem bestehenden SmartTech-Sites-Projekt hinzufügen.
2. In Codex das bestehende Projekt öffnen und den aktuellen `origin/main`-Stand mit einer kurzlebigen Sites-Repository-Berechtigung in ein neues Verzeichnis klonen. Keine Tokens speichern.
3. Alternativ das bereitgestellte Repository-Archiv entpacken. Ohne Sites-Editorzugriff nur lokal arbeiten und Änderungen zurückgeben.
4. `AGENTS.md`, dieses Dokument und `docs/CODEX-MEHRGERAETE.md` vollständig lesen.
5. Node.js `>=22.13.0` und unter Windows vorzugsweise WSL 2 verwenden.
6. `npm run install:ci`, danach `npm run project:status` und `npm run verify` ausführen.
7. Für jede Aufgabe einen neuen Branch von frisch abgerufenem `origin/main` erzeugen. Niemals direkt auf `main` arbeiten.

## Weitere Daten- und Übersetzungsläufe

Nach neuen Katalogobjekten zuerst den Kataloggenerator und anschließend `npm run translate:en` ausführen. Der Übersetzungsgenerator nutzt lokal das Argos-Translate-Modell Deutsch → Englisch; die Katalogdaten werden nicht an einen externen Übersetzungsdienst gesendet. Das generierte Übersetzungs-JSON wird eingecheckt, das Modell selbst nicht.

Neue Validierungen dürfen bereits gezählte Asset-IDs nicht erneut verwenden. Account-Treffer aus der Originaldatei bleiben von portfoliobasierten S/T-Inferenzen getrennt. Nicht belastbare Fälle bleiben offen.

## Integration und Veröffentlichung

1. `npm run verify` auf dem Aufgaben-Branch erfolgreich abschließen.
2. Committen, `origin/main` erneut abrufen und den Branch darauf rebasen.
3. Nur einen geprüften Branch in `main` integrieren und `main` übertragen.
4. Den Remote-Stand erneut abrufen und `npm run release:check` ausführen.
5. Nur den exakten sauberen `main`-Commit im bestehenden Sites-Projekt als neue Version speichern und mit unverändert öffentlichem Zugriff veröffentlichen.

## Start-Prompt für den anderen GPT-Account

> Arbeite am bestehenden SmartTech-Projekt für https://smarttech.b2badgen.com. Nutze ausschließlich die vorhandene project_id aus .openai/hosting.json und lege kein zweites Site-Projekt an. Lies AGENTS.md, docs/CODEX-ACCOUNTWECHSEL.md und docs/CODEX-MEHRGERAETE.md vollständig. Prüfe zunächst Projektzugriff, origin/main, Arbeitsverzeichnis und npm run project:status. Installiere die gesperrten Abhängigkeiten und führe npm run verify aus. Lege vor Änderungen einen eigenen Branch von frischem origin/main an. Bewahre Katalog, Validierungsstand, Account-Mapping, deutsche und englische URLs, Originalquellen, Sitemap, robots.txt und alle fachlichen Schutzregeln. Veröffentliche nur einen geprüften, übertragenen und mit release:check freigegebenen main-Stand. Wenn dieser Account keinen Editorzugriff auf das bestehende Sites-Projekt hat, arbeite nur lokal und gib die Änderungen als Commit, Patch oder Repository-Archiv zurück.

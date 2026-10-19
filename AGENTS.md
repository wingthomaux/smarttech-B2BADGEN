# SmartTech – Arbeitsregeln für Codex

Diese Regeln gelten für jede Codex-Sitzung und jeden Rechner, der dieses Repository bearbeitet.

## Gemeinsamer Stand

- `origin/main` ist die einzige kanonische Quelle und entspricht dem zuletzt freigegebenen Quellstand.
- Beginne Änderungen nie direkt auf `main`. Erzeuge pro Aufgabe und Rechner einen eigenen Branch oder einen Codex-Worktree von einem frisch abgerufenen `origin/main`.
- Verwende Branch-Namen nach dem Muster `codex/<rechner>/<thema>-YYYYMMDD`, zum Beispiel `codex/notebook/account-matching-20260909`.
- Derselbe Branch darf nicht gleichzeitig auf zwei Rechnern ausgecheckt sein.
- Prüfe vor jeder Änderung `git status --short --branch` und rufe den aktuellen Stand von `origin/main` ab.
- Vor der Übergabe oder Integration: Änderungen committen, `origin/main` erneut abrufen und den Arbeits-Branch auf `origin/main` rebasen. Konflikte in Katalog-, Mapping- oder Validierungsdateien inhaltlich auflösen; keine Seite pauschal übernehmen.
- Integriere immer nur einen vollständig geprüften Branch. Lösche oder überschreibe keine fremden, uncommitteten Änderungen.

## Veröffentlichung

- Veröffentliche nie aus einem Feature-Branch, einem veralteten Checkout oder einem Arbeitsverzeichnis mit offenen Änderungen.
- Eine Veröffentlichung erfolgt ausschließlich aus `main`, nachdem der integrierte Commit erfolgreich nach `origin/main` übertragen wurde.
- Führe unmittelbar vor dem Speichern einer Sites-Version `npm run release:check` aus. Wenn die Prüfung fehlschlägt, nicht veröffentlichen.
- Verwende ausschließlich das bestehende Sites-Projekt aus `.openai/hosting.json`. Die `project_id` darf nicht ersetzt werden; für dieses Portal darf kein zweites Site-Projekt angelegt werden.
- Nutze für Git nur kurzlebige, vom Sites-Projekt bereitgestellte Zugangsdaten. Schreibe Tokens nie in Dateien, Git-Konfigurationen oder Remote-URLs.
- Wenn zwischen Prüfung und Veröffentlichung ein neuer Commit auf `origin/main` erscheint, Veröffentlichung abbrechen, synchronisieren und erneut prüfen.

## Fachliche Schutzregeln

- Bewahre stabile Detailseiten, Originalquellen, Taxonomie, Sitemap und die vorhandene Trennung `Beobachtet` / `Kuratiert` / `Community`.
- Bewahre die `robots.txt`-Regel: OpenAI- und xAI/Grok-Crawler dürfen alle Seiten abrufen; andere Crawler nur die Startseite.
- Kommunikationsagenturen und Mittler wie H Zwo B sind keine Anbieter. Ordne Veröffentlichungen dem belegten realen Anbieter zu und erwähne den Mittler höchstens als `via`.
- Die bekannten Steuerberatungsgesellschaften bleiben im Datenbestand, erscheinen aber nicht in Top-Listen.
- Account-Zuordnungen müssen konservativ erfolgen. Direkte Dateitreffer und aus Portfoliowirkung abgeleitete `(S)`-/`(T)`-Zuordnungen bleiben im Projekt unterscheidbar.
- Anbietername, sprechende URL, Canonical, Metadaten und strukturierte Daten bleiben frei von internen Zuständigkeitskürzeln.
- Für neue und überarbeitete Unternehmensprofile gilt `docs/PROFILSTANDARD.md`: Serviceware ist die Referenz für Tiefe und Quellenklarheit. Schreibe DE und EN gleichwertig, differenziere Leistungen, Einsatzfälle, Zielrollen und Auswahlfragen und belege Aussagen mit offiziellen Anbieterquellen. Anzahl der Stichpunkte ist kein Selbstzweck; verifiziere Originalinhalte einzeln, bevor sie als kuratiert oder geprüft erscheinen.
- Committe keine hochgeladenen Account-Arbeitsmappen, personenbezogenen Inhabernamen, Zugangsdaten oder temporären Exporte. Im öffentlichen Projekt werden nur die freigegebenen Kürzel geführt.

## Daten- und Codeänderungen

- Bearbeite generierte JSON-Dateien nur über den zugehörigen Generator oder eine nachvollziehbare, deterministische Aktualisierung.
- Lies vor dem Aktivieren neuer Quellen `docs/QUELLEN-KANDIDATEN.md`. Quellenmonitore dürfen nur Prüflisten erzeugen und keine ungeprüften Inhalte veröffentlichen.
- `WEKA Downloads` bleibt bis zur Prüfung konkreter Originalseiten ein vorbereiteter, aber inaktiver Kandidat. Sitemap-`lastmod` darf dort nicht als Veröffentlichungsdatum oder alleiniger Neuheitsbeleg verwendet werden.
- Zähle bereits validierte Assets nicht erneut und erhalte den persistenten Validierungsstand.
- Führe Anbieterfamilien, Marken und Mutter-/Tochtergesellschaften nur bei belastbarer Evidenz zusammen.
- Bewahre bestehende Funktionen und das vorhandene Erscheinungsbild, sofern die Aufgabe keine Änderung verlangt.

## Pflichtprüfungen

- Vor der Übergabe eines Branches: `npm run verify`.
- Bei Änderungen an Links, Pfaden, Anbieter-Mappings oder Detailseiten müssen interne Linkprüfung und Funktionstests erfolgreich sein.
- Dokumentiere im Abschluss: Branch, Commit, Prüfstatus, fachliche Änderungen, offene Fälle und ob veröffentlicht wurde.

Weitere Hinweise für den zweiten Rechner stehen in `docs/CODEX-MEHRGERAETE.md`.
Bei einem Wechsel auf einen anderen GPT-Account ist zusätzlich
`docs/CODEX-ACCOUNTWECHSEL.md` verbindlich zu lesen.

# SmartTech mit Codex auf mehreren Rechnern

## Zielbild

Beide Rechner greifen auf dasselbe bestehende Sites-Projekt und dasselbe Git-Repository zu. Sie bearbeiten jedoch nie denselben Branch. `origin/main` ist der gemeinsame Integrations- und Veröffentlichungsstand; jede Aufgabe entsteht in einem eigenen Branch oder Codex-Worktree.

## Einmalige Einrichtung auf dem zweiten Rechner

1. In der ChatGPT-Desktop-App mit demselben Workspace anmelden und Codex öffnen.
2. Das bestehende Site-Projekt `SmartTech` beziehungsweise `https://smarttech.b2badgen.com` auswählen. Kein neues Site-Projekt erzeugen.
3. Codex anweisen, die aktuelle Quelle des bestehenden Sites-Projekts mit einer kurzlebigen Repository-Berechtigung in ein neues lokales Verzeichnis zu klonen. Zugangsdaten dürfen nicht gespeichert werden.
4. Das Projektverzeichnis in Codex als vertrauenswürdiges Repository öffnen, damit `AGENTS.md` und die projektbezogenen Regeln geladen werden.
5. Node.js `>=22.13.0` verwenden. Unter Windows wird WSL 2 empfohlen, weil die geprüften Sites-Hilfsskripte Linux-Werkzeuge wie `flock` und GNU `timeout` verwenden.
6. Abhängigkeiten einmalig mit `npm run install:ci` installieren. Anschließend `npm run project:status` und `npm run verify` ausführen.

## Beginn jeder Aufgabe

1. Prüfen, dass keine offenen Änderungen vorhanden sind.
2. Den aktuellen Stand von `origin/main` abrufen.
3. Einen eigenen Branch oder Codex-Worktree von `origin/main` anlegen. Der Branch enthält Rechner und Thema, zum Beispiel `codex/desktop/navigation-20260909`.
4. Erst danach Dateien ändern.

Codex-Worktrees sind besonders geeignet, wenn auf einem Rechner mehrere Aufgaben parallel laufen. Ein Branch darf trotzdem immer nur einem Checkout zugeordnet sein.

## Übergabe und Integration

1. `npm run verify` erfolgreich abschließen.
2. Änderungen mit einer konkreten Beschreibung committen.
3. `origin/main` erneut abrufen und den Aufgaben-Branch darauf rebasen.
4. Den Aufgaben-Branch übertragen und erst nach Prüfung in `main` integrieren.
5. Nach der Integration `main` übertragen. Andere Rechner beginnen neue Arbeiten immer wieder vom aktualisierten `origin/main`.

Länger laufende Arbeiten bleiben auf ihrem Feature-Branch. Neue Änderungen auf `main` werden vor der Integration per Rebase aufgenommen. Dadurch kann die tägliche Wartung weiterlaufen, ohne eine parallel entwickelte Funktion zu überschreiben.

## Veröffentlichung ohne gegenseitiges Überschreiben

Nur der aktuelle, saubere und bereits übertragene `main`-Stand darf veröffentlicht werden:

1. `origin/main` frisch abrufen.
2. `npm run release:check` ausführen.
3. Den exakten `HEAD`-Commit als Sites-Version speichern.
4. Diese gespeicherte Version in das bestehende SmartTech-Projekt veröffentlichen.
5. Wenn inzwischen ein anderer Commit auf `origin/main` liegt, abbrechen und erneut synchronisieren.

Eine reine Bearbeitung eines Feature-Branches veröffentlicht nichts. Dadurch bleibt eine noch nicht integrierte Arbeit auf dem zweiten Rechner unsichtbar und kann den laufenden Stand nicht zurücksetzen.

## Schnellstart-Prompt für Codex auf dem zweiten Rechner

> Öffne das bestehende öffentliche Sites-Projekt SmartTech unter https://smarttech.b2badgen.com. Hole den aktuellen Quellstand des zugehörigen Repositorys in ein neues lokales Verzeichnis, ohne ein neues Site-Projekt anzulegen oder Zugangsdaten zu speichern. Lies danach AGENTS.md vollständig, installiere die gesperrten Abhängigkeiten und prüfe den Projektstatus. Lege für meine nächste Aufgabe einen eigenen Codex-Worktree beziehungsweise Branch von origin/main an. Arbeite niemals direkt auf main und veröffentliche nur nach Integration, Synchronisation und erfolgreichem release:check.

## Nützliche Befehle

- `npm run project:status` zeigt Branch, offene Änderungen und Abstand zum bekannten `origin/main`.
- `npm run verify` führt Linting, Build, interne Linkprüfung und Funktionstests aus.
- `npm run release:check` bricht ab, wenn nicht der saubere, vollständig synchronisierte `main`-Stand vorliegt.

`release:check` verwendet den lokal bekannten Remote-Stand. Deshalb muss unmittelbar davor ein erfolgreicher Abruf von `origin/main` erfolgt sein.

## Englischen Katalog fortschreiben

Die veröffentlichte englische Fassung verwendet die eingecheckte Datei `app/translations.en.generated.json`. Wenn neue Wissensobjekte hinzukommen, muss sie vor `npm run verify` mit `npm run translate:en` ergänzt werden. Der Generator arbeitet lokal mit dem deutschen-englischen Argos-Translate-Modell; Kataloginhalte werden dabei nicht an einen externen Übersetzungsdienst übertragen. Fehlt das Modell, zunächst `argostranslate` installieren, den Paketindex laden und einmalig das Paket `de` → `en` in Version 1.3 installieren. Die normale Build- und Veröffentlichungsumgebung benötigt das Modell nicht.

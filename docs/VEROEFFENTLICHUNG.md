# SmartTech: ein Quellstand, zwei Git-Repositories

Seit dem Abgleich vom 20. Oktober 2026 gilt:

- Kanonische Entwicklung: `wingthomaux/smarttech-B2BADGEN`, Branch `main`.
- Produktives Sites-Projekt: `appgprj_6ad63cbda0a08191ab86bf31aca918e5`.
- Die frühere Projekt-ID `appgprj_6a99b5cec63c8191a25316199547e841` ist für Veröffentlichungen nicht mehr zu verwenden.
- Produktive Adresse: `https://smarttech.b2badgen.com`; die bestehende Cloudflare-Weiterleitung nach `https://www.b2badgen.com/smarttech/` bleibt erhalten.
- `.openai/hosting.json` und `.openai/project-contract.json` müssen dieselbe produktive Projektkennung enthalten. `npm run project:check` prüft das ohne Netzwerkzugriff.

## Arbeiten auf MSI und anderen Rechnern

Immer mit frisch abgerufenem GitHub-`main` in einem eigenen Aufgabenbranch beginnen. Keine unabhängigen inhaltlichen Änderungen allein im Sites-Spiegel belassen. Generierte Kataloge bleiben geschützt; der kompakte Browserindex wird mit `node scripts/generate-portal-index.mjs` beziehungsweise beim Build deterministisch erzeugt und nicht eingecheckt.

## Prüfung und Veröffentlichung

1. Änderungen im Aufgabenbranch umsetzen und `npm run verify` ausführen. Der Lauf umfasst Projektkennung, Linting, Quellenregeln, Build, interne Links, Rechteseiten, Footer, Sprachkennzeichnung, Sitemap und Suchzustände.
2. Den aktuellen GitHub-`main` erneut lesen, Änderungen abgleichen und in GitHub integrieren. GitHub-CI muss erfolgreich sein.
3. Mit einer frischen kurzlebigen Sites-Berechtigung das bestehende Sites-Repository öffnen. Keine Tokens in Dateien, Remote-URLs oder Git-Konfigurationen speichern.
4. Den geprüften GitHub-Dateistand in einen Aufgabenbranch des Sites-Spiegels übernehmen. Bestehende uncommittete Arbeit erhalten. Die beiden Git-Historien nicht erzwingen oder überschreiben. Nach Integration in den Sites-`main` muss dessen `git rev-parse HEAD^{tree}` exakt der von GitHub für `main` zurückgegebenen Tree-SHA entsprechen. Bei Abweichung nicht veröffentlichen.
5. Sites-Quelle mit dem Sites-Workflow übertragen und paketieren. Den Remote-Stand frisch abrufen, `origin/main` aktualisieren und unmittelbar vor dem Speichern `npm run release:check` ausführen. Bei fortgeschrittenem GitHub- oder Sites-`main` erneut abgleichen und prüfen.
6. Nur das bestehende Projekt veröffentlichen. Keine Domain- oder DNS-Änderung ist für normale Releases erforderlich.
7. `npm run verify:live` kontrolliert die produktiven Rechteseiten, Footer, Dokumentsprachen, Sitemap, erlaubten Weiterleitungsziele und Crawlerzugriff. Der Lauf benötigt Netzwerkzugriff. Proxy- oder Netzwerksperren sind ausdrücklich als Prüfgrenze zu dokumentieren und dürfen nicht als erfolgreiche Prüfung gelten.

## Änderungsdaten der Sitemap

`datePublished` bezeichnet das Veröffentlichungsdatum der Originalquelle, nicht die letzte Änderung einer SmartTech-Seite. Verifizierte wesentliche Änderungen einer SmartTech-Seite werden mit ihrem tatsächlichen Datum in `app/page-modified.json` eingetragen. Ohne belastbares Datum wird `lastmod` weggelassen. Unveränderte Seiten erhalten bei einem neuen Build kein neues Änderungsdatum. Die vier Rechteseiten tragen den belegten Stand vom 20. Oktober 2026.

## Suchzustände und Datenschutz

Freitext, Portal, Themen- und Taxonomiefilter sowie der aktive Tab werden in der URL gespeichert. Sie bleiben beim Sprachwechsel erhalten. „Suche teilen“ kopiert nur die Rechercheparameter; Trackingparameter werden nicht mitgeteilt. Es wird kein zusätzlicher Browser-Speicher angelegt. Persönliche oder vertrauliche Suchbegriffe sollten nicht in geteilten Links stehen.

## Assets unter dem Cloudflare-Unterpfad

Der Produktions-Build verwendet die öffentliche Asset-Basis aus `.openai/project-contract.json`. Damit zeigen auch dynamische JavaScript-Imports auf `/smarttech/assets/`, nicht auf die Blogger-Domainwurzel `/assets/`. Die HTML-Seite allein ist kein ausreichender Funktionstest: `verify:live` prüft zusätzlich den Bootstrap-Import und dessen JavaScript-Antwort. Dynamisch erzeugte Suchtreffer und Sprachlinks erhalten denselben öffentlichen Pfadpräfix.

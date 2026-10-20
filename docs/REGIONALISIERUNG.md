# Regionale Anbieterübersicht

Stand: 20. Oktober 2026. Die Regionalseiten ergänzen den bestehenden Katalog; Anbieter-URLs und die Zuordnung von Wissensobjekten ändern sich nicht.

- Deutsch: `/regionen`, `/regionen/[slug]`; Englisch: `/en/regions`, `/en/regions/[slug]`.
- Zum Start 15 Anbieter, 22 belegte Standorte und 16 Länder-/Regionalübersichten (Deutschland, Österreich, Schweiz mit belegten Bundesländern/Kantonen). Nur Regionen mit Inhalt erhalten Seiten und Sitemap-Einträge.
- `app/provider-locations.json` ist ein redaktionell gepflegter Datenbestand, keine generierte Datei. Jeder Standort benennt den Kataloganbieter, die konkrete Gesellschaft, den Ort, die Region, die Standortart, eine offizielle Quelle und den Abgleichstag. Die verlinkten Impressums- oder Standortseiten wurden für die Ortsangaben herangezogen. Ein Impressum allein bestätigt keinen Konzernhauptsitz.
- Eine lokale Gesellschaft wird mit Namen angezeigt, ohne sie mit dem Konzern rechtlich gleichzusetzen. Hauptsitz, Impressumsadresse, Niederlassung und Entwicklungszentrum bleiben unterscheidbar. Geografische Elternzuordnungen sind explizit; keine automatische Ableitung aus Firmennamen, Domains oder Absatzmärkten.
- Länderansichten zählen jeden Anbieter einmal, auch bei mehreren Standorten. Regionalfilter durchsuchen Anbieter, Namensvarianten, Gesellschaften und Orte; Standortarten werden kombiniert gefiltert. Die Filter sind über GET-URLs teilbar und bleiben beim Sprachwechsel erhalten. Gefilterte Ansichten verweisen per Canonical auf die Region und sind `noindex,follow`.
- Alle Inhalte sind serverseitig sichtbar und ohne JavaScript navigierbar. Ein Formular ohne `action` erhält den aktuellen URL-Pfad auch hinter dem bestehenden Cloudflare-Präfix `/smarttech`. Keine neue API, Karte, Ortung oder externe Laufzeitabfrage.

## Erweiterung über eine Unternehmensliste

Der Nutzer kann eine CSV-/Excel-Liste liefern: Unternehmensname und Ort, vorzugsweise zusätzlich PLZ, Land und Website/Domain. Rechnungsadressen sind als Rechnungsadressen zu behandeln; ein Hauptsitz darf daraus nicht ohne weiteren Beleg abgeleitet werden.

Der Abgleich erfolgt zuerst über eindeutige Katalognamen und belegte Varianten, danach über Domain und Gesellschaft. Unscharfe Namen, mehrere Orte, Tochtergesellschaften und nicht gefundene Unternehmen kommen in eine separate Prüfliste. Keine automatische Familienzusammenführung. PLZ müssen als Text erhalten bleiben. Gleichnamige Orte benötigen PLZ/Land zur Auflösung.

Die Rohdatei, Rechnungsdaten und interne Kennungen werden nicht eingecheckt oder veröffentlicht. Erst nach Abgleich werden die für die Regionalisierung freigegebenen Ortsangaben übernommen. Die Herkunft ist als übermittelte Rechnungsadresse zu kennzeichnen; der vorliegende öffentliche Erstbestand besteht ausschließlich aus offiziellen Quellen. Änderungen müssen bestehende offizielle Standorte erhalten und widersprüchliche Adressen zur Prüfung stellen.

## Prüfungen

`npm run verify` umfasst Datenintegrität, Kreisfreiheit der Regionshierarchie, kanonische Anbieterbezüge, DE-/EN-Seiten, Sitemap, Standortfilter, leere Trefferlisten, Dublettenfreiheit und Rückverlinkung der Profile. Neue regionale Nachweise sind getrennt von der bestehenden Wissensobjekt-Validierung; sie erzeugen keine zusätzlichen kuratierten Assets.

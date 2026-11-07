# Startseite: Regionen, Städte und eWorld, 7. November 2026

## Nutzerauftrag

Den Bereich „Neu seit dem letzten Update“ pausieren und Regionen/Städte sowie eWorld prominenter und detaillierter darstellen. Gilt für DE und EN im bestehenden öffentlichen SmartTech-Projekt.

## Umsetzung

- Der bisherige Updatebereich einschließlich neuer Unternehmensprofile und Wissensobjekte rendert auf der Homepage nicht mehr. `weeklyUpdatesVisible=false` in `app/smarttech-portal.tsx` steuert die Pause; Vergleichsdaten, Generatoren und vorhandene Aktualisierungsfunktionen bleiben erhalten. Keine zeitgesteuerte Reaktivierung.
- Neuer regionaler Einstieg unmittelbar nach dem Suchbereich, vor Taxonomie und Katalog. Die bisherige kompakte Linkreihe im Statistikbereich entfällt zugunsten beschreibender Karten.
- Fünf Karten: Nürnberg, Mittelfranken, Wittlich, München (Stadt), München (Landkreis), jeweils mit örtlichem Kontext, Themen und direktem Berichtseinstieg. Die Beschreibungen fassen ausschließlich vorhandene Berichte zusammen.
- eWorld: hervorgehobener Bereich mit 798 Ausstellern, Termin 16.–18.02.2027, Ort Essen, Verzeichnislink und funktionierender GET-Suche nach Unternehmen oder Ort. Quellenstand 26.10.2026 und fehlende erneute Live-Bestätigung der Messeangaben bleiben sichtbar.
- Header-Anker für Regionen und eWorld. Die bestehenden Detailseiten, Anbieterprofile, Belege, Such- und Filterfunktionen bleiben erhalten.

## Inhaltliche Grenzen

München (Stadt) und Landkreis bleiben getrennt. Portazon wird dem Trierer Raum zugeordnet, ohne eine Versorgung in Wittlich zu unterstellen. eWorld bleibt eine Messeübersicht. Keine neuen Anbieter, Wissensobjekte oder Einzelvalidierungen.

## Prüfung

`npm run verify` mit aktualisierten Anforderungen zur pausierten Anzeige und neuen Funktionstests für alle Regionseinstiege, beide Sprachen, Exportstand und E-world-Suche. Bestehende Tests prüfen die unveränderten Vergleichsdaten weiter.

Die separate verwaltete Vorschau wurde durch die automatische Freigabeprüfung wegen eines möglichen zusätzlichen Uploads zu workers.cloudflare.com abgewiesen. Kein Ausweichen auf andere Vorschau-Uploads. Die visuelle und interaktive Prüfung erfolgt auf der regulär autorisierten öffentlichen SmartTech-Veröffentlichung. Zusätzlich GitHub-CI, identische GitHub-/Sites-Dateibäume und release:check.

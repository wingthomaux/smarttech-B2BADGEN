# Funktionskatalog: Start mit Energiewirtschaft

10.11.2026. Neuer Bereich im bestehenden öffentlichen SmartTech-Projekt, DE/EN gleichwertig. Ausdrücklich beauftragte einmalige Bearbeitung; pausierte automatische Updates bleiben pausiert.

## Fachliche Struktur

Zehn generische Funktionsbegriffe: kommunaler Vertrieb, energiewirtschaftliche IT, IT-Einkauf, Prozessautomatisierung, Energieprognose, Marktanalyse, Produktmanagement, Steuerung/Controlling, Beteiligungsmanagement, Veranstaltungsmanagement. Keine Namen, Kontaktdaten, Profile einzelner Personen oder Entscheidungsbefugnisse übernommen. Kein Export der angemeldeten Community-Teamdaten, kein personenbezogener Quellenanhang. Funktionsseiten sind redaktionelle Themenzuschnitte, keine Behauptung einer N-ERGIE-Abteilungsstruktur.

`app/function-catalog.ts` trennt stabile Funktions-ID, DE/EN-Bezeichnungen, generische Aliasbegriffe und Branchenkontexte mit bestehenden Lösungsthemen. Die Branche ist Kontext einer Funktion und kein Bestandteil ihrer ID. Eine Funktion kann später mehrere Branchenkontexte erhalten. `industries` hält den ersten Brancheneintrag. Aufgabenfragen sind redaktionell formuliert; sie sind weder verbindliche Stellenbeschreibung noch behauptete Produktleistung.

## Verknüpfungen

- /funktionen und /en/functions: Übersicht; zehn Detailrouten pro Sprache.
- /branchen und /en/industries: Start der Branchenstruktur, derzeit ein freigegebener Kontext.
- /branchen/energie und /en/industries/energy: alle Funktionen und Lösungsthemen aus dem vorhandenen Wirkungsraum Energie und Versorgung.
- Lösungsthemen führen zu den bestehenden kombinierten Katalogfiltern (space + solution). Der ursprüngliche Bestand einschließlich Prüf-/Herkunftsstatus wird nicht verändert.
- Fachrollen-Badges in Anbieterprofilen verlinken ausschließlich erkannte Begriffe/Aliase mit Wortgrenzen; keine Ableitung aus Personen oder organisationsinternen Entscheidungen. Längere überlappende Begriffe haben Vorrang.
- N-ERGIE erhält einen redaktionellen Navigationseinstieg zu den zehn generischen Funktionen. Der Text unterscheidet fachliche Orientierung von tatsächlichen Zuständigkeiten.
- Startseite, Lösungen-Reiter, Seitennavigation, Sitemap, Canonicals und Sprachwechsel erschließen den Bereich. Strukturelle Rollenlinks ändern keine Profilbeschreibung und erhalten deren fachliches Datumsprotokoll.

## Belege und Grenzen

Am 10.11.2026 gezielt gesichtete öffentliche Anbieterquellen für den fachlichen Anwendungskontext:
- https://www.n-ergie.de/geschaeftskunden/ : Geschäftskundenangebote, Energiebelieferung und Energiedienstleistungen. Keine Ableitung von Personenrollen oder interner Organisation.
- https://learning.sap.com/courses/configuring-device-management-in-sap-s-4hana-utilities/understanding-the-energy-data-management-components : Energie-Datenmanagement im Utilities-Systemkontext. Keine Bestätigung einer spezifischen Migration bei N-ERGIE.

Lösungsverknüpfungen sind redaktionelle Themenzuordnungen zu exakt vorhandenen Lösungskategorien, keine Funktionsgarantien oder Empfehlungen. Beteiligungs- und Veranstaltungsmanagement enthalten derzeit bewusst keine einzeln freigegebenen Energie-Lösungszuordnungen. Diese Lücke wird auf den Seiten sichtbar benannt. Keine neuen Wissensobjekte, Anbieterentitäten, Validierungszähler oder Quellenmonitore.

## Erweiterung

Neue Funktionen erhalten eigene stabile ID und DE/EN-Texte mit fachlichen Themen, Abgrenzung und geprüften Links. Weitere Branchen erhalten einen industries-Eintrag, einen eigenen Seitenkontext und passende contexts-Zuordnungen; leere Platzhalterseiten nicht veröffentlichen. Die globalen generischen Funktions-IDs bleiben dabei bestehen. Für jede Erweiterung Sitemap, tatsächliches lastmod, Sprachfassung, Linkprüfung und Tests mitführen. Kein automatischer Ausbau während der angeordneten Pause.

## Abnahme

Pflichtlauf npm run verify; Funktionstests für alle neuen Routen, Sprachwechsel, Filterlinks, Rollenlinks und datensparsames Schema. Bestehende CI vor Integration, Sites-Build, identische Git-Dateibäume, clean main und release:check vor Speicherung. Bestehendes Projekt und öffentliche Zieladresse erhalten. Keine Wiederholung der früher abgelehnten Vorschau; Live-Kontrolle nach Veröffentlichung.

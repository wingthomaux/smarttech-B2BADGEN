# Regionen München: Quellen und Abgrenzung

Prüfstand: 21. Oktober 2026. Zwei getrennte Berichte mit gleichwertigem DE/EN-Inhalt:

- `/region/muenchen-stadt` und `/en/region/muenchen-stadt`
- `/region/muenchen-landkreis` und `/en/region/muenchen-landkreis`

Beide folgen `REGIONEN.md`: Bericht, zwei leere Erwerbsblöcke und Nutzerhinweis. Schlanke Startseitenlinks und gegenseitige Verlinkung erschließen sie. Kein Umbau des Kataloglayouts, keine neuen Anbieterentitäten, Portale, Wissensobjekte oder Validierungen. Das vorhandene M-net-Profil wird verlinkt. Wittlich bleibt unverändert. Die vier neuen `lastmod` beruhen auf dieser redaktionellen Bearbeitung; bestehende Änderungsdaten werden nicht fortgeschrieben.

## Gebiet und Zahlen

- https://www.landkreis-muenchen.de/landkreis/gemeinden-und-staedte/ bestätigt 29 Kommunen, darunter Unterhaching und Oberhaching, und grenzt die Zuständigkeit ausdrücklich von der Landeshauptstadt ab.
- https://www.landkreis-muenchen.de/landkreis/daten-und-fakten/ bestätigt 354.396 Landkreiseinwohner am **31.12.2024**. Im Bericht steht diese Zahl mit Datum und ausdrücklich nicht als Stand 2026 oder Stadtbevölkerung.
- https://stadt.muenchen.de/infos/statistik-schon-gewusst.html erklärt die Abweichung von zensusbasierter amtlicher Fortschreibung und kommunalem Melderegister. Deshalb keine ungeprüfte Stadteinwohnerzahl; keine Vermischung mit dem Landkreis. Die administrative Abgrenzung wird auch durch die Kreisquelle getragen.

## Grokipedia und Lizenz

https://grokipedia.com/page/Munich und https://grokipedia.com/page/Munich_(district) wurden direkt live abgerufen (je HTTP 200). Der normale Webabruf scheiterte, daher erfolgte die Kontrolle des vollständigen HTML-Inhalts einschließlich Fußzeile über einen direkten Abruf.

Beide Fußzeilen nennen © 2026 SpaceXAI und Nutzungs-/Datenschutzlinks; **keine CC-BY-SA-4.0-Kennzeichnung**, keinen Creative-Commons-Link und keine Wikipedia-Übernahmeangabe. Nach `REGIONEN.md` enthalten die kurzen, klar abgegrenzten Regionalauszüge die SpaceXSI-/xAI-Zuordnung und beide vorgegebenen Hinweise. DE ist als gekürzte Übersetzung, EN als gekürzte Bearbeitung gekennzeichnet. Unternehmensredaktion, Zahlenabgleich und Erwerbsblöcke stehen außerhalb des Enzyklopädieauszugs.

Aus Munich werden nur Hauptstadt-, Lage- und Wirtschaftsrahmen übernommen. Keine Bevölkerungs-, BIP-, Arbeitsmarkt- oder Leistungszahlen. Beim Landkreis wird der regionale Rahmen übersetzt; die im Vorspann genannte Einwohnerzahl wurde separat an der offiziellen Kreistabelle bestätigt. Unternehmensabschnitte sind keine Übersetzung erfundener oder ungeprüfter Grokipedia-Firmenartikel. Es wird kein fehlender Regionsartikel oder bereits eingereichter Vorschlag behauptet.

## Stadt: getrennte Anbieter und Rollen

- https://www.swm.de/impressum bestätigt Stadtwerke München GmbH, Emmy-Noether-Straße 2, 80992 München, AG München HRB 121920. Die dort separat aufgeführten SWM-Gesellschaften werden nicht zusammengezogen und nicht pauschal als Vertragspartner ausgegeben. https://www.swm.de/unternehmen/waermewende belegt Fernwärme, Nahwärme, Wärmepumpen und den geplanten Ausbau der Tiefengeothermie. Transformationsziele sind keine bereits erreichte Versorgung oder Anschlusszusage.
- https://www.m-net.de/rechtliches/impressum bestätigt M-net Telekommunikations GmbH, Frankfurter Ring 158, 80807 München, AG München HRB 108514. https://www.m-net.de/geschaeftskunden/business-internet belegt Premium-IP, Glasfaser-SDSL und Direct-Access. Die allgemeine Geschäftskunden-Startseite zeigte einen Wartungshinweis und wird nicht als Leistungsbeleg verwendet. Keine Aktionspreise, Standortverfügbarkeit oder Servicegarantien ungeprüft übernommen.

## Landkreis: örtliche Infrastruktur

- https://geothermie-unterhaching.de/kontakt/impressum/ bestätigt Geothermie Unterhaching GmbH & Co KG, Witneystraße 1, 82008 Unterhaching, AG München HRA 80430 und die separat benannte Beteiligungs-GmbH als Komplementärin. https://geothermie-unterhaching.de/ belegt örtliche Fernwärme, Netzausbau und Kundenprozesse. Animierte Zähler, Preiswerbung und Referral-Vergütung werden nicht übernommen.
- https://www.gemeindewerke-oberhaching.de/impressum bestätigt Gemeindewerke Oberhaching GmbH, Bajuwarenring 17, 82041 Oberhaching, AG München HRB 165464. https://www.gemeindewerke-oberhaching.de/wissenswertes-glasfaser belegt gemeinsamen Tiefbau von Wärme-/Glasfaserleitungen, unabhängige Glasfaseranschlüsse sowie die Trennung von Netzeigentum und Tarifbuchung. https://www.gemeindewerke-oberhaching.de/vertriebspartner-glasfaser belegt die Partnerrolle. Kein Mittler wird als Eigentümer des Netzes ausgegeben; keine flächendeckende Lieferbarkeit für den Landkreis behauptet.

Die vier Firmenidentitäten sind über ihre offiziellen Impressen belegt. Aktuelle amtliche Registerabdrucke wurden nicht separat abgerufen; das steht in beiden Artikeln. Keine Drittprofil-Finanzkennzahlen, Personenlisten oder internen Account-Zuordnungen übernommen. Redaktionelle Auswahlfragen sind als solche erkennbar.

## Prüfung

`npm run verify` am 21.10.2026 erfolgreich: Projektkennung, Linting, Quellenregeln, Produktionsbuild, interne Linkprüfung und **76/76 Funktionstests**. Die neuen Tests prüfen die vier Routen, Gebiets- und Anbietertrennung, Bevölkerungsdatum, getrennte Erwerbsblöcke, Lizenzbereich, Canonicals, Sprachwechsel, Sitemap und alle lokalen Navigationslinks sowie die Auslieferung ohne Katalog-/Hydrierungsskripte. `git diff --check` erfolgreich. Katalog und persistenter Validierungsstand (515 eindeutige Assets) bleiben unverändert.

Der erste Lauf brach beim Linting ab, weil ESLint den Git-ignorierten temporären Veröffentlichungs-Spiegel unter `work/` inklusive Build-Artefakten mitlas und das Speicherlimit erreichte. `work/**` ist deshalb nun auch explizit im Linter ausgeschlossen; Anwendungsquellen und Tests bleiben geprüft.

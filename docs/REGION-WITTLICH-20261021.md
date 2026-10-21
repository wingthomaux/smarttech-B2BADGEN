# Quellenprüfung: Region Wittlich, 21. Oktober 2026

Umsetzung: `/region/wittlich` und `/en/region/wittlich`, Einstieg neben dem Portallink der jeweiligen Startseite. Keine Katalogdaten oder Validierungszähler geändert. Neue Seiten tragen das tatsächliche Bearbeitungsdatum in `app/page-modified.json`; andere `lastmod` bleiben unberührt. Kein Release und kein `release:check`.

## Bestätigte Quellen

- https://aeins.de/impressum/ nennt A EINS Business Intelligence GmbH, Am kleinen Rotenberg 21, 54516 Wittlich, Amtsgericht Wittlich HRB 12294.
- https://aeins.de/ beschreibt den Open Business Hub mit Commerce, Sales und Content Hub und nennt Energie und Telekommunikation als Branchen. `/open-business-hub/` leitet auf diese Startseite weiter; deshalb wird direkt die Startseite verlinkt.
- https://aeins.de/smart-city-super-app/ belegt die Zusammenarbeit mit Stadtwerken Trier auf Basis des Open Business Hub. Beschreibungen möglicher Services werden nicht als aktuelle Erwerbsangebote oder Verfügbarkeit in Wittlich ausgegeben.
- https://www.portazon.de/ nennt unter anderem Parken, Laden und das digitale SWT-Kundencenter. https://www.portazon.de/impressum/ nennt Portazon GmbH, Ostallee 7–13, 54290 Trier, Amtsgericht Wittlich HRB 45102. Deshalb getrennte Identitäten; keine Zusammenführung oder ungesicherte Konzern-/Eigentümerbeziehung.
- https://www.bernkastel-wittlich.de/landkreis/staedte-und-gemeinden/ bestätigt Wittlich als Kreisstadt und die Zuordnung zum Landkreis.
- https://openregister.de/company/DE-HRB-T2408-12294 wurde live gelesen. Die öffentliche **Drittanbieter-Registerwiedergabe** nennt A EINS IT GmbH (Eintrag 2005), A EINS Digital Innovation GmbH (03.12.2019) und A EINS Business Intelligence GmbH (21.03.2025). Sie ist ausdrücklich kein selbst abgerufener amtlicher Registerabdruck. Das amtliche Portal https://www.handelsregister.de/ war erreichbar, der unternehmensbezogene Originalabdruck ließ sich in diesem Durchgang nicht beziehen. Diese Prüfgrenze steht auch im Artikel.

## Grokipedia und Lizenz

- https://grokipedia.com/page/Wittlich: direkter Live-HTTP-Abruf erfolgreich (200). Der Web-Rechercheabruf allein scheiterte; geprüft wurde deshalb der direkt geladene HTML-Inhalt einschließlich Fußzeile. Die Fußzeile nennt © 2026 SpaceXAI, Terms of service und Privacy policy, **keine CC-BY-SA-4.0-Kennzeichnung**, keinen Creative-Commons-Link und keine Wikipedia-Übernahmeangabe. Nach der Projektregel wird der kurze regionale Auszug mit SpaceXSI-/xAI-Community-Zuordnung und beiden vorgegebenen englischen Hinweisen versehen. DE ist als gekürzte Übersetzung, EN als gekürzter Auszug markiert. Nur der regionale Rahmen stammt daraus; Unternehmensredaktion und Erwerbsblöcke stehen außerhalb.
- Verifizierter Konflikt im Wittlich-Text: 19.049 im Vorspann mit Stand 2024, im Abschnitt Population Dynamics mit 31.12.2023. Keine Einwohnerzahl übernommen. Die Landesstatistik unterscheidet zudem Stichtage und Zensusbasen; eine Zahl ohne diese Grundlagen wäre nicht belastbar.
- Der gemeldete abweichende Landkreisstand konnte nicht nachgeprüft werden: `/page/Bernkastel-Wittlich`, `/page/Bernkastel_Wittlich` und `/page/Bernkastel-Wittlich_district` lieferten 404. Der Artikel behauptet deshalb keinen bestätigten numerischen Vergleich mit dem Landkreisartikel, sondern nennt diese offene Prüfung. Auch keine stillschweigende Gleichsetzung von Stadt- und Landkreisbevölkerung.
- https://grokipedia.com/page/A_EINS_Business_Intelligence und https://grokipedia.com/page/Portazon: direkt geprüft, beide 404. Vorschläge unter https://grokipedia.com/suggest stehen aus; nichts eingereicht. Der Personenartikel Andy_Altmeyer wird nicht als Übersetzungsvorlage verwendet.

## Verworfen / nicht übernommen

- Bilanz-, Umsatz- und sonstige Finanzkennzahlen aus Unternehmens-Drittprofilen.
- Widersprüchliche Deutschlandticket-Preisangaben und Nichtverfügbarkeit auf der Portazon-Startseite: kein Preis, keine Buchbarkeit übernommen.
- Ungeprüfte Einwohnerzahl, werbliche Erfolgsversprechen, pauschale Datenschutzgarantien der Anbieter, unbestätigte Verfügbarkeit in Wittlich.

## Prüfung

Die neuen Funktionstests prüfen beide gerenderten Routen, Canonicals, Dokumentsprachen, Sitemap-Datum, getrennte Identitäten und Erwerbsblöcke, Lizenzhinweise, Einstieg und lokale Links sowie die Auslieferung ohne Hydrierungs-/Katalogskripte.

`npm run verify` am 21.10.2026 erfolgreich: Projektvertrag, Linting, Quellenregeln, Produktionsbuild, interne Linkprüfung und **74/74 Funktionstests**. Der bestehende persistente Validierungsstand (515 eindeutige Assets) blieb unverändert. `git diff --check` erfolgreich.

Lokale Umgebung: Windows, Node 24.20.0 und Git Bash. `install:ci` konnte wegen des fehlenden Linux-`flock` nicht verwendet werden; stattdessen gesperrte Abhängigkeiten mit `npm ci` installiert, ohne Lockdateiänderung. Die vollständige unveränderte Verify-Pipeline lief anschließend erfolgreich mit Git Bash im PATH. Keine Veröffentlichung; `release:check` wurde nicht ausgeführt.

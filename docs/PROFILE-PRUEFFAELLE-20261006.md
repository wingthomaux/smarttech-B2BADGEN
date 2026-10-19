# Unternehmensprofile und Prüffälle – 06.10.2026

Dieser Durchgang ergänzt das bereits veröffentlichte Portal-Update (Commit `72de8bfd59a98af37b5dc8eac79871ca3142660d`). Ausgangsstand: 4.919 Wissensobjekte, 1.315 Anbieter. Ergebnis: **4.946 Wissensobjekte und 1.332 Anbieter**, also **27 weitere Wissensobjekte und 17 neue Unternehmensprofile**. Gegenüber dem Tagesvergleich vom 30.09. sind damit 229 Wissensobjekte und 17 Unternehmensprofile hinzugekommen.

## Profile und Identitäten

Neue Profile: A-LIGN, Amazon Business, Flender, Flowserve, Hitachi Energy, Lynus, MPS Monitor, Oldcastle Infrastructure, PASCOM, Rubrik, Solutions2Share, Stadtwerke Karlsruhe, Tata Communications, Tektronix, Windhoff Group, e-con, genua.

Überarbeitete bestehende Profile: **Drata** und **Telefónica Deutschland**. O2 Business bleibt beim vorhandenen deutschen Telefónica-Profil; keine neue O2-Firma. Amazon Business ist ein ausdrücklich als Angebot gekennzeichnetes Beschaffungsprofil innerhalb Amazon, kein zusätzlich behauptetes unabhängiges Unternehmen und keine Zusammenführung mit AWS. Hitachi Energy ist von Hitachi Vantara getrennt. PASCOM ist Anbieter, Pia das Produkt. e-con AG ist anhand der offiziellen Klinikum-Fallstudie und der eigenen Gesellschaftsangaben zugeordnet; ähnlich benannte econ-Unternehmen wurden nicht übernommen. Lynus beschreibt die Gruppe, vertragliche Liefergesellschaften bleiben zu unterscheiden.

Alle 19 bearbeiteten Profile enthalten substantielle DE/EN-Beschreibungen, differenzierte Angebotsfelder, Fachrollen, Kauf- und Integrationsfragen sowie überprüfte offizielle Anbieterquellen. Details und Nachweise stehen in `app/provider-profiles-portals-20261006.json` und `public/data/source-review/portal-profile-reviews-20261006.json`. Profile allein erhöhen den Validierungsledger nicht.

## Die 31 Prüffälle

- 27 Originalseiten mit geklärter Zuordnung als **Beobachtet** aufgenommen, mit spezifischer Taxonomie, stabilen IDs und DE/EN-Texten. Zugängliche Metadaten und gegebenenfalls Artikel wurden geprüft; gated PDFs, Webinarinhalte und Assessments wurden nicht als vollständig gelesen oder durchgeführt behauptet.
- Oldcastle: zwei Portal-URLs mit identischem Anbieter, Titel, Inhaltsteaser, Dateigröße und Umfang auf ein Wissensobjekt zusammengeführt; zweite URL als Quellenbeobachtung erhalten.
- Ergon: zwei zusätzliche Portalreferenzen zum vorhandenen Identity-First-Thema verknüpft. Keine neuen Wissensobjekte und keine zusätzliche Validierung; Identität einzelner PDF-Fassungen bleibt ausdrücklich unbelegt.
- ABB/Control: Logo-Hinweis klärt ABB als Anbieterbezug, aber Ressourcentitel zu explosionsgefährdeten Bereichen und Teaser zur Wärmetauscherinstrumentierung sind nicht eindeutig konsistent. Originaldokument oder Korrektur erforderlich. Ein Fall bleibt in der Prüfliste.

Die gemeinsamen Herausgeber A-LIGN und Drata behalten ihre separaten Profile. Das gemeinsam angebotene Whitepaper hat genau eine Wissens-ID und ist bei beiden Firmen verknüpft; die Gesamtzahl der Assets zählt es einmal. Die offiziellen Siemens-Ressourcenseiten belegen drei bislang unklare Syndication-Zuordnungen. Kontrollierte Publisher-Zuordnung verhindert IndustryWeek oder Oil & Gas Journal als falsche Herstellerprofile.

Datumsregeln bleiben erhalten: Abrufdaten und Webinartermine sind keine Veröffentlichungstage. Die Termine 15.10. beziehungsweise 12.11.2026 werden gesondert angegeben. Die E&M-Teaser hinter Paywall bleiben als solche benannt; e-con wird zusätzlich über eine frei zugängliche eigene Fallstudie belegt. Leistungszahlen in Ressourcentiteln sind Quellenbehauptungen, keine unabhängig verifizierten Messergebnisse.

## Offene Grenzen

Ein Inhaltskonsistenzfall bleibt offen. Foundry Webcast ist aus dem ersten Portal-Update weiterhin technisch blockiert (404/502); der aktuelle Bestand wurde nicht entfernt. Die 420 bereits einzeln validierten Wissensobjekte und sämtliche 4.919 vorherigen Wissensdatensätze bleiben unverändert erhalten. Bestehende Anbieter und deren kanonische Pfade bleiben erhalten.

## Technische Prüfung

Katalog und Tagesvergleich entstehen durch `scripts/generate-catalog.mjs`. Der Generator unterstützt zusätzliche, explizit belegte Anbieter einer gemeinsamen Ressource; er zählt Gesamtassets weiterhin nach eindeutigen IDs. Alle bisherigen Wissensobjekte wurden vor dem Build vollständig mit dem letzten Commit verglichen und sind identisch. Die Pflichtprüfung ist `npm run verify`; vor Veröffentlichung ist zusätzlich `npm run release:check` auf dem sauber integrierten und gepushten `main` erforderlich.

Die Katalognamen `Solutions2Share` und `e-con` folgen der bestehenden Normalisierung; die geprüften juristischen Bezeichnungen Solutions2Share GmbH und e-con AG stehen im Profiltext. Ein zusätzlicher Bindungscheck stellt sicher, dass alle 19 geprüften Profile unter ihren tatsächlich verwendeten kanonischen Katalognamen erreichbar sind.

Prüfergebnis: `npm run verify` erfolgreich (35/35 Tests, 12.556 eindeutige kanonische Detail-Links, 19 Portale und 19 zweisprachige Profilbindungen). Zusätzlich wurden alle 38 DE/EN-Profilansichten im gebauten Worker auf Status 200, individuelle Texte und offizielle Quellenlinks geprüft. Die gemeinsame Ressource ist bei A-LIGN und Drata erreichbar und wird einmal gezählt.

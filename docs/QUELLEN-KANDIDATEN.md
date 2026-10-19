# SmartTech – Quellenkandidaten

## Gezielter Whitepaper-Abgleich vom 29. September 2026

Sechs neue Landingpages von Security-Insider und heise Business Services wurden mit konkretem Anbieter und Zugangsmodell einzeln erfasst. Die genaue Publikation am 29. September ist nicht belegt; dieses Datum bezeichnet den SmartTech-Erfassungstag. Die Portale dienen als beobachtete Quellen, der Formular- oder Mitgliederdownload bleibt ungeprüft. Quellen, Auswahl und Grenzen stehen in `docs/WHITEPAPER-UPDATE-20260929.md`. Der automatische Portalindex schaltet auch weiterhin keine weiteren Ressourcen frei.

## EU AI Gigafactories Research Monitor

`https://euaigf.b2badgen.com/` ist eine vom Herausgeber redaktionell geprüfte Übersicht über öffentlich bekannte AI-Gigafactory-Projekte und deren belegbaren Verfahrensstand (Abgleich: 27. September 2026). 41 namentlich genannte Organisationen wurden als eigene Entitäten abgeglichen; BULL und IONOS waren bereits vorhanden, 39 Seiten kamen hinzu. Die Verbindung zur Übersicht wird auf den deutsch- und englischsprachigen Unternehmensseiten mit Projektname und Status direkt verlinkt.

Die redaktionelle Prüfung der Übersicht ist keine Einzelvalidierung von 41 Produktressourcen und keine Bestätigung eingereichter Angebote. Die Übersicht unterscheidet angekündigte Kandidaturen, Teilnahmeabsichten, Vorphasen und unbestätigte Berichte. Diese Beziehungen werden daher nicht als `Kuratiert`-Wissensobjekt, beobachtete Portalpublikation oder Anbieterprodukt gezählt. Für 39 neue Entitäten fehlt weiterhin eine einzeln überprüfte offizielle Produkt- oder Unternehmensquelle; ihre Seiten kennzeichnen sich durch einen vorsichtigen Projektkontext und bleiben vor einer vollständigen Profilausarbeitung offen. Seit 28. September wird der Monitor im Verzeichnis der beobachteten redaktionellen Quellen geführt, mit einem Link auf die Gesamtübersicht und Rückverweisen von den 41 zugeordneten Unternehmensprofilen. Es entstehen dadurch keine 41 zusätzlichen Artikel oder Validierungen.

## Interaktivierungs-Atlas

`https://atlas.b2badgen.com/` dokumentiert am 28. September 2026 87 Fallstudien. Im SmartTech-Portalverzeichnis werden zunächst vier konkrete Originalartikel verlinkt, deren Unternehmenszuordnung zu vorhandenen Anbieterprofilen eindeutig ist: Adobe Creative Cloud, Siemens Industrial Copilot, Salesforce Agentforce und NVIDIA Agent Toolkit. Die Fallstudien sind redaktionelle Quellenbezüge und keine einzeln validierten Produktressourcen. Historische Fälle und Unternehmen ohne eindeutiges vorhandenes SmartTech-Profil werden nicht pauschal zugeordnet. Der Atlas selbst bietet Zugang zu den übrigen Fällen.

## WEKA Downloads

Die öffentliche Sitemap `https://www.weka.de/download-sitemap.xml` ist technisch erreichbar und wird als aktive beobachtete Quelle mit redaktioneller Prüfschranke geführt.

Stand 15. September 2026 enthält sie 763 Downloadseiten. 519 URLs tragen ein `lastmod` aus 2026; 470 davon wurden seit dem 8. September geändert. Diese Häufung ist eine Sammelaktualisierung und kein belastbarer Beleg für 470 neue Downloads. Neue Seiten werden deshalb ausschließlich über einen persistenten Vergleich der URL-Menge erkannt. Das echte Veröffentlichungsdatum muss später von der jeweiligen Originalseite kommen.

Priorisiert werden Qualität, ISO und Audit, Energie, Einkauf und Logistik, Datenschutz, Produkt- und Elektrosicherheit, Arbeitsschutz und Gefahrstoffe sowie Umwelt- und ausgewählte Ingenieurthemen. Betriebsrat, Personalrat, Ordnungsamt, Bürgermeister und Kämmerei bleiben standardmäßig ausgeschlossen, sofern kein außergewöhnlich klarer SmartTech-Bezug belegt wird.

Am 15. September 2026 wurden 61 Veröffentlichungen mit echtem Publikationsdatum 2026 freigegeben. Ältere Veröffentlichungen von 2015 bis 2025 blieben ausgeschlossen. Jeder aktive Datensatz bewahrt die Original-URL, das Article-JSON-LD-Publikationsdatum und den Herausgebernachweis für WEKA Intelligence.

Der Monitor erzeugt für neu entdeckte URLs weiterhin nur eine Prüfliste. Er übernimmt keine neue Seite automatisch in den Katalog. Vor jeder weiteren Freigabe sind Originalseite und Download, Titel, Datum, tatsächlicher Herausgeber, Zugangsmodell, Dubletten, kaufbarer Lösungsbezug und SmartTech-Taxonomie zu prüfen. WEKA darf nur als Anbieter erscheinen, wenn die jeweilige Originalseite WEKA als tatsächlichen Herausgeber des Assets belegt.

Einmalige Ausgangsbasis:

`npm run source:weka:baseline`

Spätere Delta-Prüfung:

`npm run source:weka`

Die Konfiguration liegt in `public/data/source-candidates/weka-downloads.config.json`, der persistente URL-Stand in `public/data/source-state/weka-downloads.json` und die Prüfliste in `public/data/source-review/weka-downloads.pending.json`.

## Whitepaper Silicon.de

Die öffentliche Quelle `https://whitepaper.silicon.de/wp-sitemap-posts-resource-2.xml` ist als beobachtete Portalquelle aktiviert. Da die konkrete Teilsitemap am 15. September 2026 trotz Eintrag im WordPress-Sitemap-Index einen HTTP-404-Fehler lieferte, erfolgt die belastbare Erfassung über den öffentlichen WordPress-Endpunkt für den Inhaltstyp `resource`.

Aufgenommen werden ausschließlich veröffentlichte Ressourcen mit echtem WordPress-Publikationsdatum im Kalenderjahr 2026. Der Anbieter stammt aus dem expliziten Taxonomiefeld `displayed_advertisers`; Formate wie Whitepaper, E-Book, Video, Infografik und Podcast bleiben erhalten. Sitemap-`lastmod` wird nicht als Publikationsdatum verwendet.

## Telecom Handel

Die öffentliche Sitemap `https://www.telecom-handel.de/sitemap` wird als aktive beobachtete B2B-Quelle für Geschäftskommunikation, Netze, Managed Services und den ITK-Channel geführt. Maßgeblich ist ausschließlich das sichtbare Datum auf der jeweiligen Artikelseite; das Sitemap-`lastmod` dient nicht als Publikationsdatum.

Der Prüflauf vom 17. September 2026 fand 216 auf 2026 datierte Beiträge in den Bereichen Business Solutions, Distribution und communicate. Freigegeben werden nur Beiträge mit belastbarer Anbieterzuordnung, erkennbarem Lösungs-, Investitions- oder Channelbezug und bereits vorhandenem SmartTech-Anbieterprofil. Personalien, Incentives, reine Eventankündigungen und generische Marktnachrichten bleiben ausgeschlossen. Die bereits beim M-net-Ausbau erfasste URL wird nicht doppelt übernommen.

Fehlende Anbieterfamilien werden in `docs/TELECOM-HANDEL-POTENZIAL.md` getrennt zur Abstimmung geführt. Der Monitor erzeugt nur die Prüfliste `public/data/source-review/telecom-handel.pending.json`; er veröffentlicht keine Beiträge automatisch.

Prüflauf:

`npm run source:telecom-handel`

## Tagesabgleich 30. September 2026

Fünf zusätzliche Security-Insider-Landingpages einzeln geprüft und beobachtet aufgenommen. Vier Kandidaten bereits vorhanden; Formularvolltexte bleiben unvalidiert. Details und offene Fälle: `docs/TAGESUPDATE-20260930.md`.

## marconomy – 8. Oktober 2026

Die drei Whitepaper-/Webinar-Sitemaps wurden vollständig als URL-Prüfliste gelesen. Nach Einzelprüfung der öffentlichen Landingpages werden 32 ausgewählte Ressourcen beobachtet übernommen und mit realen Ressourcenanbietern verknüpft. Das Portal ist in DE/EN mit Rückverweisen aktiv; weitere Sitemap-Treffer werden nicht automatisch freigegeben. Formular-Downloads und Aufzeichnungen bleiben ungeprüft. Audit und Identitätsgrenzen: `docs/MARCONOMY-20261008.md`, Einzelzuordnungen: `public/data/source-review/marconomy-20261008.json`.

## Althaller – gezielte Presseverweise, 9. Oktober 2026

Neun konkrete Originalseiten von iBusiness, PR-Journal, medienrot, markenartikel, et, INTERNET WORLD Austria, W&V und marconomy geprüft. Sieben zusätzliche Portalprofile erfassen ausschließlich diese ausgewählten Artikel. Keine allgemeine Sitemap-Aufnahme oder automatischen Veröffentlichungen. Studienpartner, Pressemitteilungsbasis, historische Ausgabe 2025/26 und W&V-Abonnement sind kenntlich gemacht. Details: `docs/ALTHALLER-PRESSE-20261009.md`.

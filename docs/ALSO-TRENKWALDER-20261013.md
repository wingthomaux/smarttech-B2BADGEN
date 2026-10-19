# ALSO und Trenkwalder – 13. Oktober 2026

Zwei neue, gleichwertige DE/EN-Unternehmensprofile. ALSO ist ein ITK-Distributor und Plattformanbieter mit Schweizer Gruppenholding; die deutsche Gesellschaft ist im Profil gesondert genannt. Trenkwalder ist als Gruppenmarke für Workforce Services eingeordnet. Personaldienste, Business Solutions und Learning werden nicht als identische Vertragsgesellschaften ausgegeben.

## Umfang und Quellenprüfung

21 neue Wissensobjekte (IDs 850000–850020): 14 ALSO-Angebotsfelder, vier aktuelle Trenkwalder-Leistungsübersichten und drei beobachtete Presse-/Veranstaltungsquellen. Die 18 offiziellen Leistungs- und Unternehmensseiten wurden einzeln öffentlich gelesen; sie erhöhen den persistenten Validierungsstand von 473 auf 491. Die CTV-Mitteilung vom März 2020, die undatierte Academy-Landingpage und die Presseveröffentlichung vom September 2026 bleiben beobachtet und werden nicht mitvalidiert. Die einzelnen Original-URLs, Quellenhinweise und DE/EN-Texte sind in `app/expansion-also-trenkwalder-20261013.json` und den zugehörigen Profil-/Übersetzungsdateien dokumentiert.

ALSO-Angebotsfelder: Cloud Marketplace, KI-Anwendungen, IoT, Huntress-Security-Distribution, HPE-Portfolio, Finanzierung, Logistik, Digital Signage, Gesundheits-IT, Lifecycle, Workplace as a Service, UCC, Schulausstattung und Managed Print. Trenkwalder: Workforce/Recruiting, Payroll, Field Service und LLM-unterstützte Kundenkommunikation. Die Zuordnung zu Wirkungsräumen folgt dem jeweiligen konkreten Leistungsbild statt der gesamten Unternehmensnavigation.

## Beziehungsumfang

ALSO und Trenkwalder verweisen wechselseitig auf ihre Profile und auf zwei gemeinsame, kanonische Wissensobjekte. Die CTV-Quelle nennt Trenkwalder Learning als Webinaranbieter für den 27. März 2020. Die ALSO-Academy-Seite nennt Trenkwalder.learning sowie Trenkwalder Learning GmbH, enthält aber kein sichtbares Veranstaltungsdatum. Keine Aufzeichnung angesehen und kein Formular abgeschickt. Diese Belege bestätigen keine laufende Kooperation oder heutige Buchbarkeit. Droege-Zugehörigkeit ist getrennt über ALSO-Aktionärs-/Governancequellen und die Trenkwalder-Historie erläutert. Eine aktuelle Beteiligungsquote wird nicht behauptet.

HPE wird am neuen ALSO-Objekt als Hersteller verknüpft; ALSO bleibt primärer Anbieter des Distributionsangebots. Huntress wird als Hersteller im Text genannt, erhält aber ohne eigenes Profil keine generische neue Anbieterentität. Die Juniper-Erweiterung ist für den 1. November 2026 angekündigt und am Prüftag noch zukünftig.

## Zeit- und Qualitätsgrenzen

Keine ungeprüften Kapazitätszahlen: ALSO-Logistikseite nennt widersprüchliche Paket-/Flächenzahlen; Standortverzeichnis unterscheidet nicht überall eindeutig Landesgesellschaften und Plattformpartner. Alte ISO-/Förderprogrammbezüge begründen keine aktuelle Zertifizierung oder Förderfähigkeit. Trenkwalder-Seite enthält Coming-soon-Demos, widersprüchliche Kandidatenzahlen und Platzhaltermetriken; keine Behauptung einer voll verfügbaren Matching-Plattform oder selbst entwickelten Foundation-Model-Familie.

## Prüfung

Worker-HTML-Tests für beide Sprachen, alle 21 Detailseiten, wechselseitige Anbieter-/Wissensverweise, Quellenwarnungen, zukünftige Verfügbarkeit und Nichtvalidierung beobachteter Quellen. Interne Pfade, Lint, Quellenkandidatenprüfung und Build über `npm run verify`. Browser-QA ist in dieser Umgebung ohne unterstütztes Browser-Plugin nicht verfügbar. Vor Speichern gilt zusätzlich `npm run release:check` nach Integration auf main.

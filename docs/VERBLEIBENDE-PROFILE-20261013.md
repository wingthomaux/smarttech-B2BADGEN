# Sichtung der 223 verbleibenden Unternehmensprofile, 13.10.2026

Ausgangsstand: Version 121, Commit 22d62e4, 1356 Anbieter, 5056 Wissensobjekte; 1133 individuelle und 223 generische Profile. Jeder der 223 Namen wurde mit vorhandenen Artikelmetadaten auf Anbieterrolle und Relevanz gesichtet. Je Name wurde eine repräsentative öffentliche Quelle abgerufen: 203 erreichbar, 20 technisch blockiert oder mit Timeout. Das ist keine Volltextvalidierung aller Artikel und keine offizielle Identitätsbestätigung sämtlicher Anbieter.

## Ergebnisse

- 14 offizielle Leistungsquellen geprüft, Profile in DE/EN erstellt: TransGate, MQ result consulting, raumAKUSTIKS, Human AI Contact, Ferdinand Eisele, IT-KS OG, Smart Landlord, SwiPay, KFK KONRAD, Degro, Dehner Logistik, SCM Creative Management, Adacta und Zulassungsautomat. Software, Beratung, Gruppenbetrieb und private Verwaltungsservices werden unterschieden. Keine pauschalen Compliance-, Einsparungs- oder KI-Erfolgszusagen.
- Adacta ist laut eigener Plattformquelle Softwareanbieter für Versicherungen, keine PR-Agentur. Drei bisherige Artikel gehen unter den belegten Namen Adacta. Bestehender Profilpfad wird in DE/EN weitergeleitet.
- CharterHouse London: öffentlicher Eintrag 2206 nennt Charterhouse Voice & Data Limited. Offizielle Charterhouse-Quelle und vorhandenes Profil stimmen überein. Zusammenführung mit Charterhouse, alter Profilpfad wird weitergeleitet. Das Whitepaper bleibt in seinem bisherigen Prüfstatus.
- 24 fachfremde Profile und 31 nicht einzeln validierte Wissensobjekte aus aktiver Suche, Sitemap und Katalog ausgeschlossen. Beispiele: private Seniorenbegleitung, lokale Immobilienvermarktung, Verbraucherprodukte, Fanveranstaltung und private Finanzbildung. Jeder Ausschluss ist mit Titeln, ursprünglichen IDs, URLs und Begründung archiviert. Keine Rohpublikation gelöscht. Validierungsledger sowie alle als redaktionell geprüft markierten Assets geschützt. Förderverein Musentempel und Veranstaltungsbüro Wagner bleiben wegen vorhandener Prüfstatus erhalten, ohne dadurch als neue Technologieanbieter bestätigt zu werden.
- 184 Profile bleiben ungeklärt: 136 benötigen offizielle Leistungs-/Identitätsbelege, 35 einen gesonderten Rollenabgleich (Mittler/Fachmedium/Produkt/Gemeinschaftseintrag), 13 sind technisch blockiert. Einige weitere technisch blockierte Meldungen konnten über offizielle Anbieterquellen im 14er-Paket geklärt werden. Kein automatisches Profil aus ungesicherten Meldungen erzeugt.

Die verbleibenden ungeklärten Seiten zeigen einen bilingualen Hinweis zur offenen Anbieterrolle. Sie bleiben erreichbar und durchsuchbar, erscheinen aber nicht in Anbieter-Toplisten. Dies verbessert die Auswahlqualität, ohne ungesicherte Hersteller-/Lieferrollen zu behaupten. Kommunikationsmittler werden nicht allein aufgrund eines Kundenartikels als Hersteller beschrieben. Für SCM und IT-KS sind eigene technische Umsetzungsleistungen aus Originalquellen belegt.

## Quellen und Reproduzierbarkeit

`app/provider-audit-remaining-20261013.json` enthält genau 223 Einzelentscheidungen mit Abrufstatus, ursprünglichen Objekten, Zielnamen und Begründung. `app/provider-profiles-remaining-20261013.json` und das deterministische Profilschreibskript enthalten geprüfte Originalquellen und DE/EN-Texte. Der Kataloggenerator wendet nur explizit ausgeschlossene IDs/URLs an, nicht pauschale Keywordfilter. Alte Quellbestände bleiben erhalten.

Neuer Stand: 1331 Anbieter, davon 1147 individuell profiliert und 184 generisch mit offenem Prüfhinweis. 5025 aktive Wissensobjekte. 473 IDs im Validierungsledger unverändert; keine Erhöhung durch Profil- oder Relevanzprüfung. Wochenzugänge bleiben 41 Anbieter und 339 Objekte. 14 Profile sind quellenbelegt, die übrigen 184 ausdrücklich nicht vollständig geprüft. Weitere Prüfung muss an diesen konkreten Restfällen ansetzen.

Pflichtprüfung: npm run verify einschließlich Build, Links und HTML-Funktionstests. Tests prüfen DE/EN-Profile, alte Profilweiterleitungen, offene Rollenhinweise, Ausschluss ohne Verlust validierter Assets und korrekte Nettozählung. Browser-QA ist im Managed-Container nicht verfügbar.

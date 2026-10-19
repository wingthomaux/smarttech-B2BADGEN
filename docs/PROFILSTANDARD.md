# Redaktionsstandard für SmartTech-Unternehmensprofile

Stand 24.09.2026. Referenzprofil: **Serviceware**. Der Standard gilt für jedes neue Profil und für jede Überarbeitung einer bestehenden Unternehmensseite. Er ist unabhängig von der Menge vorhandener Portalartikel.

## Inhalt und Darstellung

1. **Identität:** Eindeutige Anbieterentität, historische Namen und Marken nur mit Beleg; keine doppelte Firma aus einem Produktnamen. Slug und bestehende Links erhalten.
2. **Leistungsbild:** Ein substanzieller deutscher und inhaltlich gleichwertiger englischer Text erklärt Produktfamilien, ihren Zusammenhang und die Grenze zu Partnerleistungen. Keine austauschbaren Werbesätze.
3. **Kaufkontext:** Der Text nennt konkrete Einsatzfelder, Abhängigkeiten oder Auswahlfragen, etwa Integration, Betrieb, Daten, Skalierung oder Zuständigkeiten, soweit durch Quellen und Portfolio gedeckt.
4. **Struktur:** Angebotsschwerpunkte und Fachrollen sind spezifisch genug, dass ein Leser Anbieter vergleichen kann. Umfang richtet sich nach dem Portfolio; keine künstliche Verlängerung durch Synonyme.
5. **Quellen:** Eine erreichbare offizielle Anbieterquelle belegt die Unternehmensdarstellung. Kuratierte Originalinhalte werden mit Titel, URL, Anbieterrolle, Inhalt und Datum je Eintrag geprüft. Beobachtete Drittquellen bleiben erkennbar getrennt.
6. **Status:** Produktübersicht oder Profiltext geben Whitepaper, Artikel und Ressourcen nicht automatisch frei. Nur einzeln geprüfte Wissensobjekte erhöhen Validierungszähler.
7. **Abnahme:** DE/EN-Inhalt, Anbieteridentität, Originalquelle, interne Detailpfade, Links und Darstellung prüfen. `npm run verify` ausführen; vor Veröffentlichung gelten zusätzlich die Regeln in `AGENTS.md`.

Serviceware hat elf Angebotsschwerpunkte, elf Fachrollen und 23 einzeln kuratierte Originalinhalte. Diese Zahlen sind ein Maß für seinen belegten Portfolio- und Quellenumfang, keine Quote für jeden anderen Anbieter.

## Bestandsprüfung vom 24.09.2026

Der Katalog enthält **1.458 Unternehmensseiten**. Davon haben **28** einen eigenen zweisprachigen Profiltext mit den strukturierten Feldern in `app/provider-profiles.ts`; **1.430** zeigen noch den generischen Katalogtext. Von den 28 eigenen Profilen waren vor dieser Überarbeitung bei einer einfachen Tiefenprüfung **16** kürzer als 60 deutsche Wörter oder hatten weniger als acht Angebotsfelder oder acht Fachrollen; danach stehen **14** auf der Prüfliste. Drei davon haben inzwischen einen differenzierten Text, aber jeweils sieben fachlich begründbare Felder. Diese Heuristik ist kein automatisches Urteil über die inhaltliche Qualität schmaler Portfolios. Einzelheiten stehen in `docs/PROFIL-TIEFE-20260924.md`.

Zuerst die vorhandenen kurzen Profile mit hoher Relevanz und guten Originalquellen vertiefen; anschließend Anbieter ohne eigenes Profil in sinnvollen Paketen nach Relevanz und Quellenlage bearbeiten. Die bestehenden 1.430 generischen Seiten dürfen nicht durch automatisch aufgeblähte Standardtexte als vollständig ausgegeben werden. Für jedes Paket den geprüften Umfang und offene Originalinhalte dokumentieren.

## Fortschreibung vom 24.09.2026

Im nächsten Durchgang wurden 89 weitere Anbieter mit eigenem zweisprachigem Leistungs- und Kaufkontext ergänzt und 11 der schon vorhandenen Profile vertieft. Damit haben 117 der 1.458 Unternehmensseiten ein eigenes Profil; 1.341 zeigen weiter den generischen Katalogtext. Die 100 bearbeiteten Seiten und ihre Anbieterquellen stehen in `docs/100-PROFILE-20260924.md`. Diese Zahl beschreibt die Profiltexte, keine zusätzlich einzeln geprüften Originalinhalte.

Im zweiten 100er-Durchgang erhielten weitere 100 Kataloganbieter eigene zweisprachige Profile. Damit verfügen 217 Seiten über einen individuellen Profiltext; 1.241 bleiben generische Katalogseiten. Die neuen Quellen und die Auswahl stehen in `docs/100-PROFILE-FOLGE-20260924.md`. Die Zahl der redaktionell geprüften Wissensobjekte ändert sich dadurch nicht.

Im dritten 100er-Durchgang erhielten weitere 100 Kataloganbieter eigene deutsch- und englischsprachige Profile. Damit verfügen 317 Seiten über einen individuellen Profiltext; 1.141 bleiben generische Katalogseiten. Die Auswahl und Anbieterquellen stehen in `docs/100-PROFILE-DRITTE-WELLE-20260924.md`. Der Prüfstatus einzelner Wissensobjekte bleibt davon unberührt.

## Korrigierte Nettozählung und vierter Durchgang vom 26.09.2026

Die frühere Zahl 317 zählte Bearbeitungen additiv: 79 der 100 Einträge der dritten Welle waren bereits in der ersten Welle vorhanden und wurden erneut vertieft. Zudem enthält die Basisdatei 29 Anbieter. Nach Abgleich aller Profilnamen mit dem Katalog hatten vor dem vierten Durchgang **239 unterschiedliche Seiten** einen individuellen Profiltext.

Der vierte Durchgang ergänzt **100 zuvor generische Seiten** mit eigenem deutsch- und englischsprachigem Leistungs- und Kaufkontext. Damit sind **339 von 1.458** Unternehmensseiten individuell profiliert; **1.119** bleiben generisch. Namen und offizielle Anbieterquellen stehen in `docs/100-PROFILE-VIERTE-WELLE-20260926.md`. Die Zahl einzeln geprüfter Wissensobjekte ändert sich dadurch nicht.

Im fünften Durchgang wurden weitere **100 zuvor generische Katalogseiten** individuell in DE und EN beschrieben. Damit sind **439 von 1.458** Seiten profiliert; **1.019** bleiben generisch. Die Auswahl und Anbieterquellen stehen in `docs/100-PROFILE-FUENFTE-WELLE-20260926.md`. Dieser Textdurchgang verändert den Validierungsstand einzelner Wissensobjekte nicht.

Im sechsten Durchgang wurden **100 Katalogseiten** bearbeitet, davon **92 zuvor generische** und acht bereits profilierte Seiten. Nach korrigierter Nettozählung waren damit **531 von 1.458** Seiten profiliert; **927** blieben generisch. Namen, Überschneidungen, Identitätsentscheidungen und offizielle Anbieterquellen stehen in `docs/100-PROFILE-SECHSTE-WELLE-20260927.md`. Der Status einzeln geprüfter Wissensobjekte ändert sich dadurch nicht.

Im siebten Durchgang erhielten **100 weitere zuvor generische Seiten** individuelle Profile in DE und EN. Damit sind **631 von 1.458** Seiten profiliert; **827** bleiben generisch. Alle 100 Namen sind neu gegenüber den bisherigen Profilwellen. Auswahl und Quellen stehen in `docs/100-PROFILE-SIEBTE-WELLE-20260927.md`. Die Zahl einzeln kuratierter Wissensobjekte bleibt gleich.

## EU-AI-Gigafactories-Zugänge vom 28.09.2026

Die 39 neu aus dem EU-AI-Gigafactories-Monitor aufgenommenen Unternehmensseiten erhalten jeweils eine individuelle Beschreibung, Angebotsschwerpunkte und typische Fachrollen in DE und EN (`app/provider-profiles-euaigf.ts`). Zusammen mit zwei bereits bestehenden Profilen sind damit alle 41 auf der Quelle beobachteten Organisationen mit diesen Feldern versehen. Insgesamt sind 670 von 1.497 Unternehmensseiten individuell profiliert; 827 bleiben generisch. Die neuen Texte sind ein erster, später erneut zu prüfender Durchgang. Besonders bei Projektgesellschaften und Kapitalgebern bezeichnet der Text deren belegbaren Unternehmens- beziehungsweise Beteiligungskontext und behandelt die konkrete Rolle oder Lieferleistung im Gigafactory-Vorhaben ausdrücklich als offen. Dies fügt keine kuratierten Wissensobjekte oder Einzelvalidierungen hinzu.

## Achter 100er-Durchgang vom 28.09.2026

Weitere **100 zuvor generische Katalogseiten** erhielten eine eigene Beschreibung, Angebotsschwerpunkte und typische Fachrollen in DE und EN. Damit sind **770 von 1.497** Unternehmensseiten individuell profiliert; **727** bleiben generisch. Die Anbieterquellen und Identitätsgrenzen stehen in `docs/100-PROFILE-ACHTE-WELLE-20260928.md`. Der Durchgang ist eine erste Profilbearbeitung und keine Einzelvalidierung der auf den Seiten verlinkten Wissensobjekte.

## Neunter 100er-Durchgang vom 28.09.2026

Weitere **100 zuvor generische Katalogseiten** erhielten individuelle Beschreibungen, Angebotsschwerpunkte und typische Fachrollen in DE und EN. Damit sind **870 von 1.497** Seiten individuell profiliert; **627** bleiben generisch. Die Namen, offiziellen Organisationsquellen und vorsichtigen Identitätsentscheidungen stehen in `docs/100-PROFILE-NEUNTE-WELLE-20260928.md`. Eine Profilergänzung verändert den Einzelprüfstatus verlinkter Wissensobjekte nicht.

## Zehnter 100er-Durchgang vom 28.09.2026

Weitere **100 zuvor generische Katalogseiten** erhielten Beschreibungen, Angebotsschwerpunkte und typische Fachrollen in DE und EN. Damit sind **970 von 1.497** Seiten individuell profiliert; **527** bleiben generisch. Namen und offizielle Quellen stehen in `docs/100-PROFILE-ZEHNTE-WELLE-20260928.md`. Die Texte sind eine erste Einordnung, deren Produktdetails später vertieft werden; Wissensobjekte werden dadurch nicht einzeln validiert.

## Elfter 100er-Durchgang vom 28.09.2026

Weitere **100 zuvor generische Katalogseiten** erhielten eigene DE/EN-Beschreibungen sowie Angebotsschwerpunkte, Fachrollen und offizielle Anbieterquellen. Damit sind **1.070 von 1.497** Seiten erstmals individuell profiliert; **427** bleiben generisch. Die Liste und offene Identitätsfragen stehen in `docs/100-PROFILE-ELFTE-WELLE-20260928.md`. Gemeinsame Fachrollen und Auswahlfragen sind eine erste Struktur und keine Aussage, dass die Produktportfolios in Serviceware-Tiefe einzeln kuratiert sind. Es wurden keine verlinkten Wissensobjekte zusätzlich validiert.

## Qualitätsprüfung der Restliste vom 28.09.2026

Die 427 generischen Namen wurden einzeln nach Anbieteridentität und SmartTech-Bezug gesichtet. 167 Namen und 278 nicht tragfähige Quellmeldungen wurden entfernt, 25 Quellnamen normalisiert oder zusammengeführt und 17 aktive Anbieter mit DE/EN-Profil samt offizieller Quelle ergänzt. Netto hat der Katalog **1.310 Anbieter, davon 1.082 individuell profiliert und 228 generisch**. Die 420 einzeln validierten Wissensobjekte bleiben erhalten. Die offenen Namen und alle Entscheidungen stehen in `docs/427-PROFIL-AUDIT-20260928.md` und `docs/427-anbieter-audit-20260928.json`. Die verbleibenden generischen Seiten dürfen ohne Quellenprüfung nicht als vollständig profiliert gezählt werden.

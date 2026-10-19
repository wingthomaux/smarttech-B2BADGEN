# Whitepaper-Update für den 29. September 2026

Vergleichsbasis: veröffentlichte Version 95 vom 28. September 2026 (`dfddf4492f591514688457ad3b235615bb04c91d`). Sie enthält 1.310 Anbieter und 4.647 Wissensobjekte. Die eingefrorene Baseline in `app/weekly-baseline.json` hält genau diese IDs und Namen fest; die neue Homepage zeigt den Katalogstand vom 29. September gegenüber dem 28. September.

Sechs neu **erfasste** Landingpages aus zwei vorhandenen Fachportalen sind einzeln auf Titel, Anbieter und Zugangsmodell geprüft. Das ist kein Beleg, dass alle Dokumente am 29. September erschienen sind. Bei Security-Insider wird auf den sichtbaren Seiten kein genauer Veröffentlichungstag ausgewiesen; heise nennt bei der ausgewählten Ressource das Erscheinungsjahr 2026 und Registrierungspflicht. Downloads hinter Formular oder Anmeldung wurden nicht abgerufen. Die Ressourcen bleiben daher `Beobachtet` und `Vorstrukturiert`, nicht `Kuratiert` oder als vollständig redaktionell validiert gezählt. Die Produktbezüge wurden mit offiziellen Anbieterquellen gegengeprüft.

| Portal | Ressource | Anbieter | Originalquelle |
| --- | --- | --- | --- |
| Security-Insider | Identity First – von der E-ID bis zum AI-Agent | Ergon Informatik AG | https://www.security-insider.de/identity-first-von-der-e-id-bis-zum-ai-agent-d-6aad2f60c3cf4/ |
| Security-Insider | Sovereign Cloud: Europas Weg zu mehr digitaler Unabhängigkeit | Ivanti | https://www.security-insider.de/sovereign-cloud-europas-weg-zu-mehr-digitaler-unabhaengigkeit-d-6a904def8456e/ |
| Security-Insider | State of Microsoft 365 Security Report 2026 | CoreView | https://www.security-insider.de/state-of-microsoft-365-security-report-d-6a6c65e349d1e/ |
| Security-Insider | Der Endpoint ist die neue KI-Control-Plane | Mondoo | https://www.security-insider.de/der-endpoint-ist-die-neue-ki-control-plane-d-6a7190756b9cb/ |
| Security-Insider | Cybersicherheit im Zeitalter autonomer KI | CANCOM | https://www.security-insider.de/cybersicherheit-im-zeitalter-autonomer-ki-d-6a67396e49e59/ |
| heise Business Services | IT-Sicherheit im Krankenhaus: Keine Chance für Cyberkriminelle | ESET Deutschland | https://business-services.heise.de/security/security-management/beitrag/it-sicherheit-im-krankenhaus-keine-chance-fuer-cyberkriminelle-5107 |

Ergon, Ivanti, Mondoo, CANCOM und ESET Deutschland sind neue Anbieter im Katalog, jeweils mit eigenem DE/EN-Profil, sechs Angebotsschwerpunkten, sechs Fachrollen und offizieller Quelle (`app/provider-profiles-whitepapers.ts`). CoreView war bereits vorhanden. Die sechs Datensätze stehen in `app/observed-expansion-whitepapers-20260929.json` und werden durch den Kataloggenerator aufgenommen. Die 420 zuvor einzeln validierten Wissensobjekte bleiben unverändert.

Nicht übernommen wurden bloße Teaser ohne eindeutigen Anbieter, Dubletten (darunter ein bereits vorhandenes RapidFort-Whitepaper), ein älterer MPS-Migrationsreport ohne Beleg für ein neues Publikationsdatum und weitere Heise-Premiuminhalte ohne separat geklärte Quelle. Für eine spätere Hochstufung sind der tatsächliche Dokumentinhalt, das genaue Publikationsdatum und die Quellenrechte einzeln zu prüfen.

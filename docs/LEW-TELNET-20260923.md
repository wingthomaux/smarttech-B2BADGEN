# LEW TelNet – Profilüberarbeitung vom 23.09.2026

Branch: `codex/work/lew-telnet-20260923`.

Das bestehende Profil `/anbieter/lew-telnet-171uz` erhält eine deutsche und englische Beschreibung, Angebotsschwerpunkte und fachlich abgeleitete Käuferrollen. Sieben Originalquellen werden als kuratierte Lösungsübersichten eingebunden; die bestehende Portalpublikation bleibt getrennt erhalten. Anbietername, URL und bestehende Artikel-ID bleiben stabil.

## Geprüfte Originalquellen

- https://www.lew.de/fuer-unternehmen/it-dienstleistungen – Portfolio und expliziter Nachweis der LEW TelNet GmbH als Vertragspartner.
- https://www.lew.de/fuer-unternehmen/it-dienstleistungen/rechenzentrum/colocation – Green Data Center Augsburg, Inbetriebnahme 2025, Shared Rack/Rack/Cage und Betriebsleistungen.
- https://www.lew.de/fuer-unternehmen/it-dienstleistungen/rechenzentrum/managed-hardware – dedizierte Server, Aufgabenverteilung und Servicelevel.
- https://www.lew.de/fuer-unternehmen/it-dienstleistungen/rechenzentrum/backup-services – VEEAM Cloud Backup, Standort und kundenseitige Lizenzvoraussetzung.
- https://www.lew.de/fuer-unternehmen/it-dienstleistungen/vernetzung-netzinfrastruktur/standortvernetzung – Managed WAN und dedizierte Verbindungen.
- https://www.lew.de/fuer-unternehmen/it-dienstleistungen/vernetzung-netzinfrastruktur/cloud-connect – Cloud-Kopplung Frankfurt/München und genannte Cloud-Anbieter.
- https://www.lew.de/fuer-unternehmen/it-dienstleistungen/it-sicherheit – Managed Firewall, DDoS-Abwehr und Anschlussvoraussetzung.

Die Seiten waren beim Rechercheabruf inhaltlich zugänglich. Neue IDs: 680000–680006. `addedAt` bezeichnet den Aufnahmetag; ein nicht belegtes Veröffentlichungsdatum wird nicht gesetzt. Produktinformationen werden als Anbieterangaben eingeordnet, nicht als unabhängiger Leistungsnachweis. Keine pauschalen Compliance- oder Verfügbarkeitsgarantien übernommen.

## Offener Fall

Die bestehende B2B-KnowHow-Quelle `https://b2b-knowhow.com/assets/18695-in-10-schritten-zur-data-center-strategie` ließ sich über den Recherchezugang nicht erneut abrufen. Daher bleibt Artikel 3453 unverändert im beobachteten Bestand und wird nicht neu als redaktionell geprüft markiert. Ein Volltext- oder Downloadcheck des Whitepapers wird nicht behauptet.

## Prüfungen und Veröffentlichung

`npm run verify` erfolgreich: Linkprüfung und 18 Funktionstests, einschließlich gerenderter LEW-Profile in Deutsch und Englisch sowie Backup-Detailseite. Veröffentlichung erfolgt nach zusätzlicher Release-Prüfung aus sauberem, synchronisiertem `main`.

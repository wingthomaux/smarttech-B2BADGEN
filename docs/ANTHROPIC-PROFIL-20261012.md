# Anthropic-Profil und bestehende SmartTech-Verknüpfungen – 12.10.2026

Neues eigenes DE/EN-Profil für Anthropic PBC. Claude ist Produkt-/Modellfamilie, kein separat angelegtes Unternehmen. Quellen: https://www.anthropic.com/company, https://claude.com/solutions/enterprise, https://claude.com/platform/api, https://claude.com/product/claude-code und https://www.anthropic.com/project/glasswing. Alle Seiten öffentlich gelesen. Das Profil differenziert Wissensarbeit, Softwareentwicklung, APIs, Enterprise-Verwaltung, Governance und Sicherheitsforschung; beschreibt Auswahlfragen ohne pauschale Datenschutz- oder Verfügbarkeitsgarantien. Verweise zu Akamai, Tenable, ML6, BeyondTrust und Dropbox grenzen ihre Rollen ab.

## Sechs bestehende Artikel

| ID | Ursprünglicher Anbieter | Bezug zu Anthropic |
|---|---|---|
| 630013 | Akamai | Siebenjährige CPU-Infrastrukturvereinbarung, Anthropic als Kunde |
| 2583 | Tenable | Claude-gestützte Exposure-Management-Workflows |
| 2582 | Tenable | Claude Compliance API und Tenable One |
| 2003 | ML6 | Claude Partner Network / Implementierung in Europa |
| 2413 | BeyondTrust | Teilnahme an Project Glasswing |
| 2134 | Dropbox | Konnektor für Claude; Plugins für Cowork und Claude Code |

Die fünf Portalartikel wurden am 12.10.2026 vollständig öffentlich gelesen; ihre Quelldaten bleiben erhalten. Die Tenable-Originalmeldung https://www.tenable.com/press-releases/tenable-announces-strategic-integration-with-the-claude-compliance-api wurde gegengeprüft: Originaldatum 21.05.2026 gegenüber Portaldatum 01.06.2026. Akamai 630013 war bereits validiert und wird nicht erneut gezählt. Fünf neue Validierungen, keine neuen Wissensobjekte. 4839 (allgemeiner GEO/AEO-Beitrag mit Claude-Nennung) ist kein direkter Unternehmens-/Partnerbezug und wird nicht zugeordnet. Ankündigungen und Preview-/Programmzugang werden nicht als uneingeschränkt verfügbare Produkte ausgegeben.

Die Zuordnung nutzt `additionalProviders` über sechs deterministische Patches in `app/knowledge-enrichment-anthropic-20261012.json`. IDs, Titel, URLs, Erst-Anbieter und Ursprung Beobachtet/Kuratiert bleiben bestehen. Keine Duplikate. Generator baut Anbieter, Sitemap und Suchbestand neu. Die Artikelsuche berücksichtigt zusätzliche Anbieter, damit die Dropbox-Verknüpfung bei „Anthropic“ mitgefunden wird. Profilebene ist über „Anthropic“ und „Claude“ suchbar. Neue Quellen werden manuell belegt, kein neuer automatischer Quellenmonitor.

Prüfungen: `npm run verify`, ergänzt um einen Worker-HTML-Test für DE/EN, alle sechs Links, unveränderte Erst-Anbieter und Ausschluss des GEO-Artikels. Wochenvergleich enthält nun 39 neue Anbieter bei unverändert 338 neuen Assets; zugehörige Testerwartung aktualisiert. Browser-QA im Managed-Container ohne control-browser nicht verfügbar. Veröffentlichung über das bestehende SmartTech-Projekt nach Integration auf main und Release-Prüfung.

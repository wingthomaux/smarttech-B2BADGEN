# eWorld im Regionsbereich der Homepage

Die deutsche und englische Homepage verlinken neben den bestehenden Regionszugängen auf `eWorld · 798 Aussteller`. Die Routen `/region/eworld` und `/en/region/eworld` erschließen alle bereits aufgenommenen Aussteller mit Unternehmensprofil, Ort/Land, Halle/Stand und direktem Messequellenlink.

Eine GET-Suche filtert Unternehmen, Ort, Land und Stand; Suchbegriff und Rücksetzlink bleiben beim Sprachwechsel erhalten. Die Seite wird ohne zusätzliche Client-Anwendung gerendert. Sie bezeichnet eWorld ausdrücklich als Messeübersicht und nicht als geografisches Vertriebsgebiet. Datenstand und Quellenbegrenzung des Exports bleiben sichtbar. Keine neuen Unternehmensdaten, Kontaktlisten, Wissensobjekte oder Validierungen. Canonicals und Sitemap ergänzen beide Sprachfassungen; Wittlich und München bleiben erhalten.

Prüfung: `npm run verify` einschließlich Integrationstest für Homepage, alle 798 Profil- und Quellenlinks, Sprachwechsel, Suche und Leersuche. Veröffentlichung über den bestehenden GitHub-/Sites-Prozess.

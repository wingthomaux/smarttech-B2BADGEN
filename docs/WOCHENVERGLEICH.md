# Homepage-Vergleich seit dem letzten Katalogstand

Die Homepage vergleicht den aktuellen Katalog mit dem eingefrorenen Stand in `app/weekly-baseline.json`. Der Basisstand entspricht dem veröffentlichten Commit `37369d6` vom 25. September 2026. Die Datei enthält die damaligen normalisierten Unternehmensnamen und Wissensobjekt-IDs. Der Generator `scripts/generate-catalog.mjs` bildet nur die Differenz ab; ein älteres Veröffentlichungsdatum oder ein neues Crawldatum begründet keinen Zugang.

Am 28. September 2026 ergeben sich 39 neue Unternehmensprofile aus dem EU-AI-Gigafactories-Monitor und 0 neue Wissensobjekte. Die redaktionellen Projektbezüge werden als solche bezeichnet. Das Profil eines Projektbeteiligten ist kein Nachweis eines kaufbaren Angebots; es erhöht weder die Zahl kuratierter Assets noch den persistenten Validierungsstand.

Für den nächsten Inhaltsschritt zuerst neue Originalquellen einzeln prüfen und in den passenden Quellbeständen erfassen. Nach Veröffentlichung eines abgeschlossenen Updates die Basisdatei aus genau diesem veröffentlichten Katalogstand neu erstellen, `previousThrough` auf dessen Stichtag setzen und den neuen `currentThrough` angeben. Dann `npm run verify` und `npm run release:check` gemäß `AGENTS.md` ausführen. Die vorherige Vergleichsperiode sollte in der Versionshistorie nachvollziehbar bleiben.

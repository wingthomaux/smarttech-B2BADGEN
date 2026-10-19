# Sichtbarkeit der neuesten Ergänzungen auf der Startseite

Die Daten des IT-Refreshs waren veröffentlicht, aber die Startseite sortierte die neuen Anbieter nach der Menge ihrer Wissensobjekte. Die fünf jüngsten Anbieter lagen dadurch außerhalb der ersten acht Karten. Neue Wissensobjekte waren ausschließlich im anfangs inaktiven Tab verfügbar.

Die Startseite zeigt jetzt zwei unmittelbar sichtbare Abschnitte für neue Unternehmensprofile und Wissensobjekte. Die Anbieter stehen nach ihrem ersten dokumentierten Katalog-Erfassungstag in absteigender Reihenfolge; innerhalb desselben Tages kommt das jüngste Importpaket zuerst. Fehlende Erfassungsdaten werden nicht erfunden und stehen am Ende. Die Anzahl der Inhalte dient nicht mehr als Aktualitätssortierung. Quellen-Veröffentlichungsdatum und Katalog-Erfassung bleiben getrennt.

Die ersten zehn Anbieter- und neun Wissensobjektkarten erscheinen ohne Tab-Wechsel. Die vollständigen 55 beziehungsweise 453 Einträge bleiben über die vorhandenen Schaltflächen erreichbar. DE und EN verwenden dieselbe Auswahl. Die fünf neuen IT-Anbieter stehen zuerst: Barracuda Networks, Commvault, NetKnights, Arista Networks und Omnissa.

Es werden keine Unternehmensprofile oder Wissensobjekte neu gezählt; Katalog und Validierungsstand bleiben unverändert. Regression prüft die tatsächlichen gerenderten Startseiten in beiden Sprachen einschließlich der initial sichtbaren Karten und der beiden Erweiterungsschaltflächen.

Abnahme: `npm run verify` erfolgreich, 65 bestandene Tests einschließlich der initial sichtbaren Anbieter- und Wissenskarten in DE und EN.

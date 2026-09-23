# I Bonomo – Geschichte und Stammbaum

React-/TypeScript-Webapplikation (Vite) zur Geschichte der Familie Bonomo, genannt Calzin.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # statischer Build nach dist/
```

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/data/history.ts` | Kapitel und Zeittafel, nacherzählt nach Willi Bonomo (1965) |
| `src/data/family.ts` | Stammbaum als verschachtelte Datenstruktur – hier Personen ergänzen |
| `src/components/FamilyTree.tsx` | Klassischer Stammbaum mit Zoom, Suche, Ein-/Ausklappen und Linienfilter |
| `public/wappen.png` | Familienwappen, freigestellt vom Titelblatt von «I Bonomo» (1965) |
| `public/favicon*`, `icon-*`, `apple-touch-icon.png` | Favicons: kleine Grössen zeigen nur den Schild, grosse das ganze Wappen |

## Stammbaum nachführen

Personen werden in `src/data/family.ts` mit `p(name, lebensdaten, { … })` erfasst, Ehepartner mit `s(…)`.
Wichtige Felder: `spouses`, `children`, `union` (aus welcher Ehe), `childSurname` (Nachname der Kinder,
wie im Original an der Verbindungslinie), `stammhalter`, `nickname`, `notes`.

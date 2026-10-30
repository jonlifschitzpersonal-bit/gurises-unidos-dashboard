---
target: MetricCard (6.2)
total_score: 18
max_score: 28
na_heuristics: 3,7,10
p0_count: 0
p1_count: 3
target_identity: "file:D:\\Escritorio\\proyectos\\gurises-unidos-dashboard\\components\\MetricCard.tsx"
target_fingerprint: "sha256:e5a9adecce480e154aa0a9d7dd32b47b0d0d387cf47b0c6cfd621904ff346b0c"
target_path: "D:\\Escritorio\\proyectos\\gurises-unidos-dashboard\\components\\MetricCard.tsx"
timestamp: 2026-10-30T23-10-12Z
slug: components-metriccard-tsx
---
Method: dual-agent (A: design review · B: detector + browser), isolated sub-agents.

Target: components/MetricCard.tsx (with components/StatusBadge.tsx), rendered on a temporary page /verify-cards. Score taken before the fixes listed below; the fingerprint is the fixed file.

## Design Health Score (component surface)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Loading announced, error explicit; "Cargando" didn't say what (fixed); no period on the card |
| 2 | Match system / real world | 2 | Neutral "— 0%" reads as minus; "período" vs "año anterior"; "12%" vs "4,0 %" |
| 3 | User control and freedom | n/a | Not interactive; retry belongs to the section |
| 4 | Consistency and standards | 3 | Faithful to Figma and tokens; impersonal error copy |
| 5 | Error prevention | 2 | Empty value and signed trendValue weren't handled (fixed) |
| 6 | Recognition rather than recall | 3 | Comparison base is screen-reader only |
| 7 | Flexibility and efficiency | n/a | Display component |
| 8 | Aesthetic and minimalist design | 3 | Clean and flat; stock KPI card shape |
| 9 | Error recovery | 2 | "No se pudo cargar" has no cause and no way out |
| 10 | Help and documentation | n/a | No help surface applies |
| **Total** | | **18/28** | **Acceptable (64%)** |

## Detector (B)
- Files: 0 findings. URL (default and 320): `overused-font` (Inter) only, false positive: the system's decided typeface.
- Every computed color is a token. Contrasts: lowest 4.79 (Activo badge, 12px/500). Heights 194/162 (193.8 is DPR border snapping). No overflow at 320 in the grid.

## Fixed in code
- The h3 stays during loading (sr-only), and the article is named by it (`aria-labelledby`): heading navigation and card names work while loading.
- `value` accepts null or "" and shows "—" (Figma annotation), with "Sin dato" for the screen reader.
- A leading sign in `trendValue` is dropped, so the reader never hears "Subió +4,0 %".
- Long values wrap (`wrap-anywhere`) instead of crossing the border at 240px.

## To decide (issue #38)
Visible comparison base, neutral glyph, percent format, error copy and retry place, no-data copy, title while loading, long values, row alignment (subgrid), small drops in red, no-trend height.

## Rejected
- Headings level as a prop: the Figma annotation fixes it as an h3 under the section's h2.
- `min-w-60` duplicates the grid: it is the component's min width from Figma, kept so the card holds it outside the grid.
- `size-3.5` arrow off the icon sizes: it is the size drawn in Figma.

## Persona red flags
- Director preparing a donor report: can't tell from the card what "↑ 12%" compares against.
- NVDA user: heard "Cargando" three times with no names and no headings (fixed).

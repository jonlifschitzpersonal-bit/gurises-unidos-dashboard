# Current state

> What is built **and verified** today. Updated when a slice closes.
> Last update: 2026-10-30.

## Built and verified

| Area | What | Evidence |
|---|---|---|
| Project | Next.js 16.4.3 + React 19 + TypeScript + Tailwind v4, App Router, no `src/` | `npm run lint` and `npm run build` pass |
| Design tokens | Semantic colors, radii and text styles from Figma in `app/globals.css`. Tailwind's palette, font sizes and radii are reset | Measured with `getComputedStyle` on `/tokens` against the Figma variables: colors, the 6 text styles, radii and spacing match; `bg-red-500` has no effect |
| Font and metadata | Inter via `next/font`, `lang="es"`, title and description | Served HTML checked |
| `/tokens` | Every token with its Tailwind class | No horizontal scroll at 320px |
| `/` | Placeholder page with a link to `/tokens` | — |
| Fictitious data notice | `DemoNotice` in the root layout, on every screen: a region named "Aviso de datos ficticios" with a `border-accent` bottom edge; the copy covers the data and the actions that don't save; closes with the X and stays closed in that browser (`localStorage`); an inline script hides it before the first paint ([#20](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/20), [#29](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/29)) | Measured in Chrome against the Figma `DemoNotice` at 1280 (41px) and 320px (3 lines, 81px); keyboard, focus, accessibility tree, reload, client navigation, blocked storage and the console checked (ledgers in PRs #24 and #29's PR). Impeccable `critique` 17/28 and `audit` 16/20 before the fixes |
| Git workflow | Backlog in GitHub Issues with 3 milestones; PR and issue templates; `main` protected by a ruleset (PR required, squash only, no force push or deletion); branches deleted on merge | Ruleset "Protect main" active; first PR closed #1 |
| Design review (Impeccable 4.8.0) | `PRODUCT.md` and `DESIGN.md` (+ `.impeccable/design.json`) derived from the docs, Figma and `globals.css`; the design hook on for this project ([#27](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/27)) | `impeccable doctor`: no drift. A test file with gradient text, written by the agent, got a `gradient-text` finding from the hook; deleted after |

## Not built yet

- System components in code (`Icon`, `Button`, `MetricCard`, `StatusBadge`, and new ones such as `Tabs` and `Sidebar`).
- Dashboard screens: shell, indicators, table, filters and states.
- Fictitious data.
- Dark mode.
- Deploy (not published).

## Design (Figma)

- The design system exists: variables, text styles and the components `Icon`, `Button`, `MetricCard`, `StatusBadge` and `DemoNotice`.
- The Gurises Unidos screens are **not designed yet** in the Figma file.

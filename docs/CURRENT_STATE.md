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
| Git workflow | Backlog in GitHub Issues with 3 milestones; PR and issue templates; `main` protected by a ruleset (PR required, squash only, no force push or deletion); branches deleted on merge | Ruleset "Protect main" active; first PR closed #1 |

## Not built yet

- System components in code (`Icon`, `Button`, `MetricCard`, `StatusBadge`, and new ones such as `Tabs` and `Sidebar`).
- Dashboard screens: shell, indicators, table, filters and states.
- Fictitious data.
- Dark mode.
- Deploy (not published).

## Design (Figma)

- The design system exists: variables, text styles and the components `Icon`, `Button`, `MetricCard` and `StatusBadge`.
- The Gurises Unidos screens are **not designed yet** in the Figma file.

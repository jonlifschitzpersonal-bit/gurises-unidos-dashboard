# Current state

> What is built **and verified** today. Updated when a slice closes.
> Last update: 2026-10-30.

## Built and verified

| Area | What | Evidence |
|---|---|---|
| Project | Next.js 16.4.3 + React 19 + TypeScript + Tailwind v4, App Router, no `src/` | `npm run lint` and `npm run build` pass |
| Design tokens | Semantic colors, radii and text styles from Figma, **generated**: Figma Console MCP export (DTCG) in `tokens/figma/` → `npm run tokens` (Style Dictionary 5.7.1) → `app/tokens.css`, imported by `globals.css`. Tailwind's palette, font sizes and radii are reset. The build stops if a name differs from the Figma WEB code syntax, a semantic color isn't an alias, `space/N` isn't N × 4px or a token group is unknown; `npm run lint` fails if `tokens.css` was edited by hand ([#33](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/33), [ADR 0007](adr/0007-tokens-generated-from-figma.md)) | Measured with `getComputedStyle` on `/tokens` against the Figma variables (2026-10-30, 5.2). After the pipeline, the compiled CSS has the same declarations and rules as before (only their order changed). Each of the 6 checks was broken on purpose and failed; a re-export without changes leaves the JSON and the CSS identical. First tokens added through it: the Button pressed state, `color/action/primary/bg-pressed` and `color/action/subtle/bg-pressed` ([#14](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/14)); the diff showed only those 4 variables |
| Font and metadata | Inter via `next/font`, `lang="es"`, title and description | Served HTML checked |
| `/tokens` | Every token with its Tailwind class, Figma name, value and primitive (as text), and the usage note from its Figma description; colors grouped by namespace, an anchor nav for the four groups and one row anatomy. It reads `app/tokens/tokens.ts`, generated from Figma ([#31](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/31)) | Measured in Chrome with `getComputedStyle`: the 22 colors, 6 text styles, 4 radii and 10 spacing steps match the value written in their row; spacing bars start at the same x; no horizontal scroll at 320px or with text at 200%; minimum text contrast 7.56:1; visible focus ring on the nav; console clean. Impeccable `critique` 21/28 (was 16/28) and `audit` 17/20, detector clean |
| `/` | Placeholder page with a link to `/tokens` | — |
| Fictitious data notice | `DemoNotice` in the root layout, on every screen: a region named "Aviso de datos ficticios" with a `border-accent` bottom edge; the copy covers the data and the actions that don't save; closes with the X and stays closed in that browser (`localStorage`); an inline script hides it before the first paint ([#20](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/20), [#29](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/29)) | Measured in Chrome against the Figma `DemoNotice` at 1280 (41px) and 320px (3 lines, 81px); keyboard, focus, accessibility tree, reload, client navigation, blocked storage and the console checked (ledgers in PRs #24 and #32). Impeccable `critique` 17/28 and `audit` 16/20 before the fixes |
| Git workflow | Backlog in GitHub Issues with 3 milestones; issue and PR templates; closed slices pushed straight to `main`, with `Closes #N` and the ledger in the closing commit (since 2026-10-30; before, PRs #19 to #32 with squash merge); the ruleset blocks force pushes and deleting `main` | Ruleset "Protect main" active with 2 rules (`deletion`, `non_fast_forward`); the PR rule removed on 2026-10-30 |
| Design review (Impeccable 4.8.0) | `PRODUCT.md` and `DESIGN.md` (+ `.impeccable/design.json`) derived from the docs, Figma and the tokens; the design hook on for this project ([#27](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/27)) | `impeccable doctor`: no drift. A test file with gradient text, written by the agent, got a `gradient-text` finding from the hook; deleted after |

## Not built yet

- System components in code (`Icon`, `Button`, `MetricCard`, `StatusBadge`, and new ones such as `Tabs` and `Sidebar`).
- Dashboard screens: shell, indicators, table, filters and states.
- Fictitious data.
- Dark mode.
- Deploy (not published).

## Design (Figma)

- The design system exists: variables, text styles and the components `Icon`, `Button`, `MetricCard`, `StatusBadge` and `DemoNotice`.
- The Gurises Unidos screens are **not designed yet** in the Figma file.

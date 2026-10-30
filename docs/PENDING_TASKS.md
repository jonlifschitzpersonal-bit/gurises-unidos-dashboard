# Pending tasks

> The order of work, what is blocked and the debt we keep on purpose.
> Each task is a [GitHub issue](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues); this file keeps the order and the reasons, the issues keep the details.
> Last update: 2026-10-30.

## Next, in order

| # | Task | Milestone | Notes |
|---|---|---|---|
| 1 | [#37](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/37) Button accessibility: forced colors, loading announcement, keyboard | System components | Class 6.3, with the accessibility pass of every component |
| 2 | [#2](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/2) Storybook | System components | `Icon` (#12), `Button` (#3), `StatusBadge` (#13) and `MetricCard` (#4) are built: their issues close with their stories |
| 3 | [#35](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/35) Token reference in Storybook, `/tokens` dev-only | System components | Right after Storybook. Blocks the first deploy (#8): `/tokens` is not part of the public demo |
| 4 | [#7](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/7) Design the screens in Figma | Dashboard v1 | Desktop, mobile and the 6 states; new components `Tabs`, `Sidebar`, table, selectors, search; the "Datos ficticios" marker in the top bar (#30) |
| 5 | [#15](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/15) Slice 1: app shell, with [#30](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/30) the fixed "Datos ficticios" marker | Dashboard v1 | Blocked by #7 |
| 6 | [#8](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/8) Slice 2: indicators + preview deploy | Dashboard v1 | Blocked by #38 (MetricCard decisions), #6, #15 and [#35](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/35). Before the deploy: [#16](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/16) favicon |
| 7 | [#17](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/17) Slice 3: projects table, [#18](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/18) Slice 4: filters, search and states | Dashboard v1 | |
| 8 | [#9](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/9) "Cargar métricas", [#10](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/10) "Nuevo proyecto" | Dashboard v1 | Built complete; confirming saves nothing ([ADR 0006](adr/0006-backend-actions-without-persistence.md)) |

## Product decisions pending

| Decision | Issue |
|---|---|
| Fictitious data set: how many projects and years, names and statuses | [#6](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/6) |
| Button: contrast between variants, hover on tinted surfaces, 44px in mobile forms (from the 6.2 critique) | [#36](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/36) |
| MetricCard: visible comparison base, neutral glyph, percent format, error and no-data copy, retry place, title while loading, long values, row alignment (from the 6.2 critique) | [#38](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/38) |

## Known debt

| Item | Issue | Why it waits |
|---|---|---|
| Tabular figures in the `heading/metric` text style | [#5](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/5) | Must be enabled in Figma first, then added to the text style class |
| `app/favicon.ico` is still the Next.js default | [#16](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/16) | Needs the Gurises Unidos mark; replace it before the first deploy |
| The `DemoNotice` close button is internal, not a `Button` | [#3](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/3) | The only icon-only button so far, and its hover changes the icon color while `Button` ghost fills the background (Impeccable `extract`: different intent). It moves to `Button` when a second icon-only button appears, with an icon-only option designed in Figma first |
| Usage notes for the tokens that don't share a value, the text styles, radii and spacing | [#34](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/34) | Each text needs Jonathan's approval; it belongs to the token usage guide (design system docs phase) |
| Icons use text colors (`text-text-muted`, `text-text-default`); there is no `color/icon/muted` | [#34](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/34) | To be settled in the token usage guide (design system docs phase) |
| Dark mode | [#11](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/11) | Figma Starter allows one mode per collection; it will be built in code by redefining the semantic colors |
| Without JavaScript, the `DemoNotice` X renders but does nothing | — | Accepted: the dashboard's filters and flows need JavaScript too, and the notice still shows |
| No backend, no login | — | Out of scope for v1 ([ADR 0005](adr/0005-fictitious-data-no-backend.md)). Actions like "Nuevo proyecto" are built but don't save ([ADR 0006](adr/0006-backend-actions-without-persistence.md)) |

# Pending tasks

> The order of work, what is blocked and the debt we keep on purpose.
> Each task is a [GitHub issue](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues); this file keeps the order and the reasons, the issues keep the details.
> Last update: 2026-10-30.

## Next, in order

| # | Task | Milestone | Notes |
|---|---|---|---|
| 1 | [#13](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/13) `StatusBadge`, [#4](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/4) `MetricCard` | System components | Variants with `cva`. `Icon` (#12) and `Button` (#3) are built: their issues close with their stories (6.4). The Figma `MetricCard` default title ("Menciones en ChatGPT") comes from another project: use a Gurises Unidos one |
| 2 | [#37](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/37) Button accessibility: forced colors, loading announcement, keyboard | System components | Class 6.3, with the accessibility pass of every component |
| 3 | [#2](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/2) Storybook | System components | Stories for every variant and state close #12, #3, #13 and #4 |
| 4 | [#35](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/35) Token reference in Storybook, `/tokens` dev-only | System components | Right after Storybook. Blocks the first deploy (#8): `/tokens` is not part of the public demo |
| 5 | [#7](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/7) Design the screens in Figma | Dashboard v1 | Desktop, mobile and the 6 states; new components `Tabs`, `Sidebar`, table, selectors, search; the "Datos ficticios" marker in the top bar (#30) |
| 6 | [#15](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/15) Slice 1: app shell, with [#30](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/30) the fixed "Datos ficticios" marker | Dashboard v1 | Blocked by #7 |
| 7 | [#8](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/8) Slice 2: indicators + preview deploy | Dashboard v1 | Blocked by #4, #6, #15 and [#35](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/35). Before the deploy: [#16](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/16) favicon |
| 8 | [#17](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/17) Slice 3: projects table, [#18](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/18) Slice 4: filters, search and states | Dashboard v1 | |
| 9 | [#9](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/9) "Cargar métricas", [#10](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/10) "Nuevo proyecto" | Dashboard v1 | Built complete; confirming saves nothing ([ADR 0006](adr/0006-backend-actions-without-persistence.md)) |

## Product decisions pending

| Decision | Issue |
|---|---|
| Fictitious data set: how many projects and years, names and statuses | [#6](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/6) |
| Button: contrast between variants, hover on tinted surfaces, 44px in mobile forms (from the 6.2 critique) | [#36](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/36) |

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

# Pending tasks

> What comes next, what is blocked and the debt we keep on purpose.
> Last update: 2026-10-30.

## Next

| # | Task | Notes |
|---|---|---|
| 1 | Git workflow: branches, PRs and issues | Install and authenticate GitHub CLI (`gh`) first |
| 2 | System components in code: `Icon`, `Button`, `MetricCard`, `StatusBadge` | Variants with `cva`, accessibility, Storybook |
| 3 | Design the Gurises Unidos screens in Figma | Main screen at desktop and mobile, plus the 6 states. New components: `Tabs`, `Sidebar`, table, selectors, search |
| 4 | Slice 1: app shell | Sidebar, top bar, tabs |
| 5 | Slice 2: indicators + preview deploy on Vercel | Reach indicator and 3 secondary cards |
| 6 | Slices 3–4: projects table, filters and states | Global year and department filters, local search, the 6 states |
| 7 | Flows: "Cargar métricas" and "Nuevo proyecto" | Designed and built complete; confirming saves nothing ([ADR 0006](adr/0006-backend-actions-without-persistence.md)) |

## Product decisions pending

| Decision | Options |
|---|---|
| Fictitious data set | How many projects and years; which project names and statuses |

## Known debt

| Item | Why it waits |
|---|---|
| Tabular figures in the `heading/metric` text style | Must be enabled in Figma first, then added to the text style class |
| `color/action/secondary/bg-pressed` token for the Button pressed state | Missing in Figma |
| `app/favicon.ico` is still the Next.js default | Needs the Gurises Unidos mark; replace it before the first deploy |
| Dark mode | Figma Starter allows one mode per collection; it will be built in code by redefining the semantic colors |
| No backend, no login | Out of scope for v1 ([ADR 0005](adr/0005-fictitious-data-no-backend.md)). Actions like "Nuevo proyecto" are built but don't save ([ADR 0006](adr/0006-backend-actions-without-persistence.md)) |

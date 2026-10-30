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

## Product decisions pending

| Decision | Options |
|---|---|
| What "Cargar métricas" and "Nuevo proyecto" do in v1 | Hide them, show them disabled with an explanation, or open a form that doesn't save |
| Fictitious data set | How many projects and years; which project names and statuses |

## Known debt

| Item | Why it waits |
|---|---|
| Tabular figures in the `heading/metric` text style | Must be enabled in Figma first, then added to the text style class |
| `color/action/secondary/bg-pressed` token for the Button pressed state | Missing in Figma |
| Dark mode | Figma Starter allows one mode per collection; it will be built in code by redefining the semantic colors |
| No backend, no login | Out of scope for v1 ([ADR 0005](adr/0005-fictitious-data-no-backend.md)) |

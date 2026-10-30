# v1 case study: what to keep and what to improve

Source: the published case study of the first version (https://jonathanlif.com.ar/casos/gurises-unidos.html) and its public demo with fictitious data (https://pis-dashboard-nine.vercel.app/). Read on 2026-10-30.

## How v1 was built

- Freelance project: meetings with the organization, UX/UI in Figma, design system, React implementation and QA.
- Stack: React, Storybook, Figma Code Connect.
- Components: Button, MetricCard, Badge, Tabs, Sidebar (documented in Storybook). EmptyState and ErrorState stayed inside the feature because they had a single use.
- Built with Claude Code in six deliveries: structure and navigation, actions, indicators, table, filters and states. Each check marked PASS, FAIL, UNVERIFIED or OUT OF SCOPE.

## Decisions that carry over to v2

| Decision | Why |
|---|---|
| Reach first, full row | It is the number donors ask for. It measures reach, not impact. |
| Year and department filters are global; search is local | Indicators always describe the selected period and place; search only helps find a project. |
| Retry keeps the error message visible | Replacing it with a skeleton made the screen jump and hid what happened. |
| No button in the initial empty state | "Cargar métricas" had no flow behind it. |
| Secondary text with at least 4.5:1 contrast | v1 used `#a1a1aa` (2.56:1) and had to fix it to `#737373` (4.74:1). v2's `color/text/muted` is already 7.56:1 on white. |
| Promote a component to the system only when it has more than one use | Keeps the system small. |

## Open questions from v1 (not measured)

- Time saved compared to the Excel files.
- Whether leadership reads each indicator correctly, especially with an active search (indicators show the total, the table shows the matches).
- What information is still assembled outside the dashboard.
- Usage frequency and users beyond leadership.

## What v2 changes

- Next.js + Tailwind v4 instead of plain React ([ADR 0001](../adr/0001-nextjs-tailwind-stack.md)).
- Tokens mapped one to one with Figma, with only the system in the theme ([ADR 0002](../adr/0002-design-tokens-in-tailwind-theme.md)).
- A documented Figma ↔ code mapping instead of Code Connect, which needs an Organization plan ([ADR 0003](../adr/0003-figma-console-mcp.md)).

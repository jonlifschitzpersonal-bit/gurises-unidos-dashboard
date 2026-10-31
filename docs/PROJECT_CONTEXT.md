# Project context

## The client

**Gurises Unidos** is a Uruguayan NGO that runs social projects with children, teenagers and their families. It tracked its projects in several Excel files, each with many sheets and no common structure.

## The problem

To report to donors, leadership had to go through file after file to build the picture of the year. The data existed, but it was scattered.

## Users

| User | Needs |
|---|---|
| **NGO leadership** (primary) | A global view of projects, beneficiaries and results for a period, to prepare donor reports. |
| Project staff (future) | Load and update their project data. The flows exist in v1 but don't save ([ADR 0005](adr/0005-fictitious-data-no-backend.md), [ADR 0006](adr/0006-backend-actions-without-persistence.md)). |

**It is an internal tool.** Only leadership sees the screen. Donors get a separate report and never see the dashboard.

## Voice and brand

- **UI copy is Spanish (Uruguay), with voseo.** Instructions use *vos*: "Elegí un año", "Probá de nuevo". Buttons use the infinitive: "Cargar métricas", "Reintentar". Messages speak as the organization, in the first person plural: "No pudimos cargar los datos".
- **Demo notice (fixed copy):** "Demo con datos ficticios: no son cifras reales de Gurises Unidos y lo que cargues no se guarda." It covers the data and the actions that don't save ([ADR 0006](adr/0006-backend-actions-without-persistence.md)). The band can be closed; once the top bar exists, a small "Datos ficticios" marker stays there and can't be closed.
- **No brand assets yet.** The name "Gurises Unidos" appears as text only. There is no logo or color palette of the organization in the project, and none is invented; the favicon waits for a real file ([#16](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/16)). The colors are the design system's.

## What the dashboard shows

**Main screen**

- **Top bar:** search, year selector and department selector.
- **Reach indicator** (full row): children and teenagers reached. It is the headline number. It measures **reach, not impact**, and the UI must not suggest otherwise.
- **Secondary indicators** (three cards), each with its change vs. the previous year (for example "+4,0 % vs. año anterior"): families reached, teachers trained, active projects.
- **Projects table:** each project with its status, intensity and number of beneficiaries.
- **Actions:** "Cargar métricas" and "Nuevo proyecto". Built as complete flows (form, validation, states); confirming saves nothing in v1 ([ADR 0006](adr/0006-backend-actions-without-persistence.md)).
- **Navigation:** a sidebar and tabs ("Proyectos", "Métricas", "Beneficiarios").

**Not in the public demo:** `/tokens`, the design token reference, is a tool for building the dashboard. It works in development only; the portfolio shows the token reference in the published Storybook instead (Jonathan's call, 2026-10-30, [#35](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/35)).

**Filters**

| Filter | Scope |
|---|---|
| Year | **Global:** changes the indicators and the table. |
| Department | **Global:** changes the indicators and the table. |
| Search | **Local:** filters the table only; indicators keep showing the total. |

Known trade-off: with an active search, the indicators show the total while the table shows only the matches. The UI has to make that clear.

**States** (each one is designed, not improvised)

| State | Behavior |
|---|---|
| Populated | Indicators and table with data. |
| Loading | Skeletons with the same size as the content. |
| Error | "No pudimos cargar los datos" + "Reintentar" button. |
| Retry | The error message stays; the button switches to loading. No full-screen skeleton. |
| Empty (initial) | "Aún no hay datos cargados" + explanation. **No button**: there is no flow behind it yet. |
| Empty (by filter) | No projects match the filters. Different copy from the initial empty state. |

## Sources of truth

| What | Where |
|---|---|
| Design, tokens and components | Figma "Design Engineer Journey" (see `CLAUDE.md`) |
| Tokens in code | `app/tokens.css`, generated from the Figma export in `tokens/figma/` ([ADR 0007](adr/0007-tokens-generated-from-figma.md)) |
| Components in code | `components/`, same names, props and values as the Figma components ([ADR 0008](adr/0008-component-variants-cva-lucide.md)) |
| Product rules and states | This file |
| Decisions | [`docs/adr/`](adr/README.md) |
| Status | [`CURRENT_STATE.md`](CURRENT_STATE.md) and [`PENDING_TASKS.md`](PENDING_TASKS.md) |
| Backlog (each task in detail) | [GitHub Issues](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues), grouped by milestone. The order of work is in `PENDING_TASKS.md` |

## Data

**Fictitious** data with a realistic structure: Uruguay's 19 departments, several years, projects with status, intensity and beneficiaries. No backend or login in v1 ([ADR 0005](adr/0005-fictitious-data-no-backend.md)).

## Background

This is the second version of a dashboard designed and built for Gurises Unidos as a freelance project. The first one was built in React with Storybook; this version rebuilds it in Next.js + Tailwind on a design system mapped one to one with Figma. Lessons from v1: [`research/v1-case-study.md`](research/v1-case-study.md).

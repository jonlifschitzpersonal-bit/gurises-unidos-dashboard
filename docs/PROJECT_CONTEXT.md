# Project context

## The client

**Gurises Unidos** is a Uruguayan NGO that runs social projects with children, teenagers and their families. It tracked its projects in several Excel files, each with many sheets and no common structure.

## The problem

To report to donors, leadership had to go through file after file to build the picture of the year. The data existed, but it was scattered.

## Users

| User | Needs |
|---|---|
| **NGO leadership** (primary) | A global view of projects, beneficiaries and results for a period, to prepare donor reports. |
| Project staff (future) | Load and update their project data. Out of scope for v1 ([ADR 0005](adr/0005-fictitious-data-no-backend.md)). |

## What the dashboard shows

**Main screen**

- **Top bar:** search, year selector and department selector.
- **Reach indicator** (full row): children and teenagers reached. It is the headline number. It measures **reach, not impact**, and the UI must not suggest otherwise.
- **Secondary indicators** (three cards), each with its change vs. the previous year (for example "+4,0 % vs. año anterior"): families reached, teachers trained, active projects.
- **Projects table:** each project with its status, intensity and number of beneficiaries.
- **Actions:** "Cargar métricas" and "Nuevo proyecto". Their behavior in v1 is a pending decision ([`PENDING_TASKS.md`](PENDING_TASKS.md)).
- **Navigation:** a sidebar and tabs ("Proyectos", "Métricas", "Beneficiarios").

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
| Tokens in code | `app/globals.css` |
| Product rules and states | This file |
| Decisions | [`docs/adr/`](adr/README.md) |
| Status | [`CURRENT_STATE.md`](CURRENT_STATE.md) and [`PENDING_TASKS.md`](PENDING_TASKS.md) |

## Data

**Fictitious** data with a realistic structure: Uruguay's 19 departments, several years, projects with status, intensity and beneficiaries. No backend or login in v1 ([ADR 0005](adr/0005-fictitious-data-no-backend.md)).

## Background

This is the second version of a dashboard designed and built for Gurises Unidos as a freelance project. The first one was built in React with Storybook; this version rebuilds it in Next.js + Tailwind on a design system mapped one to one with Figma. Lessons from v1: [`research/v1-case-study.md`](research/v1-case-study.md).

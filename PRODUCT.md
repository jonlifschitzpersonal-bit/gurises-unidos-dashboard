# Product

<!-- impeccable:product-schema 1 -->

<!--
  Impeccable's product record. Not a source of truth: every fact here comes
  from docs/PROJECT_CONTEXT.md, docs/adr/ or docs/research/. When those change,
  regenerate this file from them (`/impeccable init`, then check it with
  `/impeccable doctor`). If this file and docs/ disagree, docs/ wins.
-->

## Platform

web

## Users

- **Primary: the leadership of Gurises Unidos**, a Uruguayan NGO that runs social projects with children, teenagers and their families. They use the dashboard to get the global picture of projects, beneficiaries and results for a period, and to prepare their reports for donors.
- **Internal tool.** Only leadership sees the screen. Donors get a separate report and never see the dashboard.
- **Future: project staff**, loading and updating their project's data. The flows exist but don't save yet.

## Product Purpose

The organization tracked its projects in several Excel files, each with many sheets and no common structure. To report to donors, leadership went through file after file to build the picture of the year. The dashboard puts that picture in one place: reach and results by year and department.

Success means leadership can answer a donor report's questions for a period and a place without opening the Excel files. How much time that saves has never been measured.

## Positioning

Built around one organization's reporting cycle, not a generic analytics tool. The headline number is **reach**: children and teenagers reached, in a full row, because it is what donors ask for. It measures reach, not impact, and the interface must never suggest otherwise.

## Operating Context

- Leadership prepares donor reports for a year, sometimes for one of Uruguay's 19 departments.
- Before the dashboard, the material was Excel files; the dashboard replaces assembling them by hand.
- Screens are designed for desktop and mobile.

## Capabilities and Constraints

- **Main screen:** top bar with search, year selector and department selector; the reach indicator (full row); three secondary indicators (families reached, teachers trained, active projects), each with its change vs. the previous year ("+4,0 % vs. año anterior"); a projects table with status, intensity and beneficiaries; navigation with a sidebar and the tabs "Proyectos", "Métricas" and "Beneficiarios".
- **Filters:** year and department are global (indicators and table); search is local (table only). Known trade-off: with an active search, the indicators show the total and the table only the matches, and the UI has to make that clear.
- **Six designed states:** populated, loading (skeletons the size of the content), error ("No pudimos cargar los datos" + "Reintentar"), retry (the message stays, the button loads, no full-screen skeleton), empty initial ("Aún no hay datos cargados", no button) and empty by filter (different copy).
- **Actions:** "Cargar métricas" and "Nuevo proyecto" are complete flows (form, validation, states); confirming saves nothing (ADR 0006).
- **Data:** fictitious, with a realistic structure. No backend and no login in v1 (ADR 0005). The public demo must say the data is fictitious and that loading saves nothing; the `DemoNotice` does it on every screen, and once the top bar exists a fixed "Datos ficticios" marker stays in it.
- **Design system:** tokens and components map one to one between Figma and code. A visual change that needs a new value becomes a token, in Figma first (see DESIGN.md).
- **Undecided:** the fictitious data set (how many projects and years, names and statuses), issue #6.

## Brand Commitments

- **Name:** "Gurises Unidos", as text. There is no logo or color palette of the organization in the project: don't invent a mark or a brand color. The favicon waits for a real file (issue #16).
- **Voice:** Spanish (Uruguay), with voseo. Instructions use *vos* ("Elegí un año", "Probá de nuevo"); buttons use the infinitive ("Cargar métricas", "Reintentar"); messages speak as the organization in the first person plural ("No pudimos cargar los datos").

## Evidence on Hand

- **No real data.** Every number, project and name is fictitious. Never present them as real figures of the organization.
- **No testimonials, quotes, usage metrics or time-saved figures exist.** Don't fabricate them.
- The first version's case study and demo, and what carries over: `docs/research/v1-case-study.md`.

## Product Principles

1. **A number says only what it measures.** Reach is not impact; a filtered table is not the total.
2. **The selected year and department frame every number,** and it is always clear what a number covers.
3. **Every state is designed, not improvised:** loading, error, retry, empty and empty by filter.
4. **The demo is honest:** fictitious data is always declared, and flows behave like the real ones without pretending to save.

## Accessibility & Inclusion

- Target: WCAG 2.2 AA.
- Text contrast of at least 4.5:1, including secondary text (a v1 lesson: its muted gray was 2.56:1).
- Every action is a real `<button>` or link, reachable by keyboard, with visible focus.
- Changes and states are readable as text by screen readers, not only by color or icon.

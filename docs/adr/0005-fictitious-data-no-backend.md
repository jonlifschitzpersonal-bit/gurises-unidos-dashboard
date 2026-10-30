# 0005. Fictitious data and no backend in v1

- **Status:** Accepted
- **Date:** 2026-10-30

## Context

The dashboard has to work as a real product: filters, search, table and every state. The client's real data lives in Excel files that are private. In the real product, the organization would load and update its own data, which needs a database, forms and login.

## Options considered

1. **Fictitious data, everything else working.** A realistic data set (Uruguay's 19 departments, several years, projects with status, intensity and beneficiaries). Filters, search, table and the 6 states work against it.
2. **Real data loading.** "Cargar métricas" and "Nuevo proyecto" save to a database, with users and login. Closer to production, but adds a backend, auth and data validation.

## Decision

Option 1 for v1. Data loading is a later stage.

## Consequences

- The data layer is written so a real source can replace it later without touching the UI: the screens get their data and states through one place.
- Loading, error and retry are still built and testable (for example with a simulated delay or failure), because they will exist with a real source.
- What "Cargar métricas" and "Nuevo proyecto" do in v1 is a pending product decision ([`PENDING_TASKS.md`](../PENDING_TASKS.md)).
- The public demo must say the data is fictitious.

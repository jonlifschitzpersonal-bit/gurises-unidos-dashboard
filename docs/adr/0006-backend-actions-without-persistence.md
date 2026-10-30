# 0006. Backend actions are fully built, without persistence

- **Status:** Accepted
- **Date:** 2026-10-30

## Context

[ADR 0005](0005-fictitious-data-no-backend.md) leaves the backend out of v1 and left open what "Cargar métricas" and "Nuevo proyecto" do. The product has to look and behave like a real one, including the flows that would need a backend.

## Options considered

1. **Hide the actions.** Simple, but the product looks incomplete and the flows are never designed.
2. **Show them disabled with an explanation.** Honest, but the flows are still missing.
3. **Build the full flows without saving.** Forms, validation, loading and confirmation states are designed and implemented; confirming doesn't persist anything.

## Decision

Option 3. Every action that would need a backend is designed in Figma and built in code like a real flow. When the user confirms, nothing is saved and the dashboard data doesn't change.

## Consequences

- The flows can be reviewed, tested and shown in the portfolio as they would work in production.
- Submitting goes through one data function that does nothing today, so a real backend can be plugged in later without touching the UI.
- What the user sees right after confirming is defined when each flow is designed.
- The demo notice that the data is fictitious also covers these actions.

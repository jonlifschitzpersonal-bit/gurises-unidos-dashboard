# 0004. The project lives in its own repository

- **Status:** Accepted
- **Date:** 2026-10-29

## Context

The project was created inside a learning repository with exercises and notes. It is meant to be a client-grade product and a portfolio piece, with its own pull requests, issues and deploy.

## Options considered

1. **Keep it in the learning repository.** One place for everything, but its history, PRs and issues would mix with unrelated material.
2. **Own public repository.** Clean history and a link that can be shared as is.

## Decision

Own public repository: `gurises-unidos-dashboard` on GitHub (created as `dashboard-ai-visibility`; renamed when the product became the Gurises Unidos dashboard).

## Consequences

- Commits, PRs, issues and the Vercel project belong to this repository only.
- Reusable agent skills live elsewhere and are not part of this repository yet; the rules this project needs are in `CLAUDE.md`.

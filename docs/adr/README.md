# Architecture Decision Records

An ADR records one decision that shapes the project: the context, the options considered, what was chosen and what it costs. They answer "why is it like this?" without having to ask whoever made it.

## Rules

- **One decision per file**, numbered: `NNNN-short-title.md`.
- **ADRs are not edited once accepted.** If a decision changes, write a new ADR and mark the old one as `Superseded by NNNN`.
- Research that led to a decision (comparisons, tests, sources) goes in [`../research/`](../research/) and is linked from the ADR.

## Index

| # | Decision | Status |
|---|---|---|
| [0001](0001-nextjs-tailwind-stack.md) | Next.js + React + TypeScript + Tailwind v4 | Accepted |
| [0002](0002-design-tokens-in-tailwind-theme.md) | Design tokens with Figma names, only the system in the Tailwind theme | Accepted |
| [0003](0003-figma-console-mcp.md) | Figma Console MCP to read and write Figma | Accepted |
| [0004](0004-own-repository.md) | The project lives in its own repository | Accepted |
| [0005](0005-fictitious-data-no-backend.md) | Fictitious data and no backend in v1 | Accepted |

## Template

```markdown
# NNNN. Title

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD

## Context
What problem or force makes this decision necessary.

## Options considered
1. Option A: pros and cons.
2. Option B: pros and cons.

## Decision
What was chosen, in one or two sentences.

## Consequences
What gets easier, what gets harder, what we accept.
```

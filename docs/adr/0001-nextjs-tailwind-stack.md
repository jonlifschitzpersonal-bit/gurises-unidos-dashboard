# 0001. Next.js + React + TypeScript + Tailwind v4

- **Status:** Accepted
- **Date:** 2026-10-29

## Context

The dashboard needs routes, a dev server, a production build and an easy deploy. Its components have to map to Figma components and its styles to Figma variables. The design engineer roles this project targets ask for React, Next.js, TypeScript and Tailwind.

## Options considered

1. **Next.js (App Router) + Tailwind v4.** Routes from folders, server components by default, deploys to Vercel with no config. Tailwind v4 reads design tokens from CSS (`@theme`), so Figma variables map to classes directly.
2. **Vite + React + CSS Modules.** Lighter, but routing, metadata and fonts have to be added by hand, and tokens become custom properties that every component references manually.
3. **Plain HTML and CSS.** Fine for a single section, but it doesn't scale to components with variants and data states.

## Decision

Next.js 16 with the App Router, React 19, TypeScript and Tailwind CSS v4, created with `create-next-app@16.4.3` (pinned version), no `src/` folder and the `@/*` import alias.

## Consequences

- Tailwind classes are the styling language; any value outside the theme stands out in a review.
- TypeScript catches props that don't exist, which keeps component APIs aligned with Figma properties.
- Next.js 16 changed APIs relative to older versions: agents must read `node_modules/next/dist/docs/` before writing code (see `AGENTS.md`).

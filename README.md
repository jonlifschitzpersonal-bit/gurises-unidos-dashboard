# Gurises Unidos — dashboard

A dashboard for the leadership of Gurises Unidos, a Uruguayan NGO that works with children, teenagers and their families. It brings together the reach and results of every project, which used to be scattered across Excel files, so leadership can prepare reports for donors.

It is built from a Figma file prepared for agents ("AI-ready"), with a design system whose tokens and components map one to one between Figma and code. **The data is fictitious.**

> **Status: in progress.** The project is scaffolded and the design tokens are in place. Next: system components and the dashboard slices. See [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md).

## What it does

- **Reach first:** children and teenagers reached, plus families reached, teachers trained and active projects, each compared with the previous year.
- **Projects table** with status, intensity and beneficiaries.
- **Global filters** by year and department; **search** that filters the table only.
- **Every state designed:** loading, error, retry, empty and empty by filter.

Details in [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4, themed only with the design system tokens

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm run build` | Production build (the same check Vercel runs) |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |

## Project structure

```
app/
├── layout.tsx        # wraps every page: font (Inter), language, metadata
├── page.tsx          # home ( / )
├── tokens/page.tsx   # every design token with its Tailwind class ( /tokens )
└── globals.css       # Tailwind and the design tokens (@theme)
docs/
├── PROJECT_CONTEXT.md   # product, users, states, sources of truth
├── CURRENT_STATE.md     # what is built and verified
├── PENDING_TASKS.md     # what comes next and known debt
├── adr/                 # architecture decisions, one per file
└── research/            # the context behind each decision
CLAUDE.md                # rules for coding agents
```

## Design tokens

The Tailwind theme only contains the tokens from Figma, with the same names (slashes become dashes: `color/text/muted` → `--color-text-muted` → `text-text-muted`). Why: [ADR 0002](docs/adr/0002-design-tokens-in-tailwind-theme.md).

- **Colors:** Tailwind's palette is turned off. Primitives (`--gray-600`) are plain CSS variables and generate no classes; components use the semantic tokens.
- **Text styles:** one class per Figma text style (`text-label-md` sets size, line height and weight).
- **Radii:** `rounded-sm | md | lg | full` with the Figma values (6, 8, 12, 9999px).
- **Spacing:** Tailwind's default scale, which already matches `space/N` = N × 4px.

## Roadmap

- [x] Scaffold the Next.js + Tailwind project
- [x] Load the Figma tokens into the Tailwind theme
- [x] Agent-ready docs (`CLAUDE.md`, context, state, decisions)
- [ ] System components with variants, accessibility and Storybook
- [ ] Design the Gurises Unidos screens in Figma
- [ ] Dashboard slices: app shell, indicators, projects table, filters and states
- [ ] Preview deploy on Vercel

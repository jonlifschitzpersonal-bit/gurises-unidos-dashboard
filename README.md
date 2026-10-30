# Dashboard — AI visibility

A product dashboard that shows how a brand appears in AI assistants (ChatGPT, Gemini, Perplexity and Claude). It is built from a Figma file prepared for agents ("AI-ready"), with a design system whose tokens and components map one to one between Figma and code.

> **Status: in progress.** The project is scaffolded; the design system tokens come next, followed by the system components and the dashboard slices.

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
```

## Design tokens

The Tailwind theme only contains the tokens from Figma, with the same names (slashes become dashes: `color/text/muted` → `--color-text-muted` → `text-text-muted`).

- **Colors:** Tailwind's palette is turned off. Primitives (`--gray-600`) are plain CSS variables and generate no classes; components use the semantic tokens.
- **Text styles:** one class per Figma text style (`text-label-md` sets size, line height and weight).
- **Radii:** `rounded-sm | md | lg | full` with the Figma values (6, 8, 12, 9999px).
- **Spacing:** Tailwind's default scale, which already matches `space/N` = N × 4px.

## Roadmap

- [x] Scaffold the Next.js + Tailwind project
- [x] Load the Figma tokens into the Tailwind theme
- [ ] Agent-ready docs (`CLAUDE.md`, context, decisions)
- [ ] System components with variants, accessibility and Storybook
- [ ] Dashboard slices: app shell, metric cards
- [ ] Preview deploy on Vercel

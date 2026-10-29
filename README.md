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
├── layout.tsx    # wraps every page: fonts, language, metadata
├── page.tsx      # home ( / )
└── globals.css   # Tailwind and the design tokens (@theme)
public/           # static files
```

## Roadmap

- [x] Scaffold the Next.js + Tailwind project
- [ ] Load the Figma tokens into the Tailwind theme
- [ ] Agent-ready docs (`CLAUDE.md`, context, decisions)
- [ ] System components with variants, accessibility and Storybook
- [ ] Dashboard slices: app shell, metric cards
- [ ] Preview deploy on Vercel

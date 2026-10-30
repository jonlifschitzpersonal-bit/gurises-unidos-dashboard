@AGENTS.md

# Gurises Unidos — dashboard

Dashboard for the leadership of Gurises Unidos, a Uruguayan NGO, to see the reach and results of its social projects and prepare reports for donors. Product, users and sources of truth: [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md).

**Before starting a task, read:**
- [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md): what is built and verified today.
- [`docs/PENDING_TASKS.md`](docs/PENDING_TASKS.md): what comes next, blockers and known debt.
- [`docs/adr/`](docs/adr/README.md): decisions already made. Don't reopen one without saying so; propose a new ADR that supersedes it.

This file holds stable rules only. Project status goes in `docs/`, never here.

## Commands

| Command | Use |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run lint` | ESLint |
| `npm run build` | Production build (what Vercel runs) |

A change is not done until `npm run lint` and `npm run build` pass.

## Stack

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4. No `src/` folder; import alias `@/*`. Why: [ADR 0001](docs/adr/0001-nextjs-tailwind-stack.md).

| Where | What goes there |
|---|---|
| `app/` | Routes (`page.tsx`), the root `layout.tsx` and `globals.css` |
| `app/tokens/` | Page that shows every design token with its class (`/tokens`) |
| `components/` | System components (created in the component phase) |

## Design source

- **Figma file:** "Design Engineer Journey" (fileKey `E8QHJIEO0sSdSqPPDCjNQd`). Variables in collections `Primitives` and `Semantic`; text styles `label/*`, `body/sm`, `heading/*`; components `Icon`, `Button`, `MetricCard`, `StatusBadge`.
- **Read it with Figma Console MCP** (Desktop Bridge plugin), not the official Figma MCP. Why: [ADR 0003](docs/adr/0003-figma-console-mcp.md).
- Read the exact node, its component description and its annotations before implementing. If an annotation contradicts the drawing, ask.

## Design tokens

All tokens live in `app/globals.css`. Rules ([ADR 0002](docs/adr/0002-design-tokens-in-tailwind-theme.md)):

- **Names match Figma**, slashes become dashes: `color/text/muted` → `--color-text-muted` → `text-text-muted`. Color classes repeat words on purpose (`text-text-muted`, `bg-bg-surface`); don't rename them.
- **Only the system exists.** Tailwind's color palette, font sizes and radii are reset. `bg-red-500`, `text-sm` or `rounded-xl` generate nothing.
- **Components use semantic colors only.** Primitives (`--gray-600`) are plain variables outside `@theme` and have no classes.
- **Text styles are one class each** (`text-label-md` sets size, line height and weight). Don't combine `font-*` and `leading-*` to imitate one.
- **Spacing is Tailwind's default scale**, which matches Figma's `space/N` = N × 4px (`space/1-5` → `p-1.5`).
- **No arbitrary values** (`p-[22px]`, `text-[#333]`). If a value has no token, stop and propose one; it gets added in Figma and here.
- Dark mode is not built yet. When it is, it redefines the semantic colors; components don't change.

## Conventions

- **UI copy is in Spanish (Uruguay)** and `lang="es"`. Code, docs, commits and PRs are in English.
- **Component and prop names match Figma:** layer and component names become component names; Figma properties become props with the same names and values.
- **Semantic HTML:** `<button>` for actions, `<a>`/`next/link` to navigate, never a clickable `<div>`. Visible focus on every interactive element.
- **Every data view has its states:** loading, error, retry, empty and empty by filter (see `docs/PROJECT_CONTEXT.md`).
- Server components by default; `"use client"` only where there is state or events, as low in the tree as possible.

## How to work

1. **Plan before code:** observable result, scope, states, what is reused or created, files touched. Wait for approval.
2. Implement in small slices.
3. Run `npm run lint` and `npm run build`.
4. **Verify with evidence:** measure in the browser against Figma and report each check as PASS, FAIL, UNVERIFIED or OUT OF SCOPE. What wasn't tested is UNVERIFIED, never PASS.
5. When a slice closes, update `docs/CURRENT_STATE.md` and `docs/PENDING_TASKS.md`. A new architecture decision gets an ADR in `docs/adr/`.
6. If you assume something, say it and name the risk.

## Don't

- Edit generated files: `node_modules/`, `.next/`, `package-lock.json` (unless a dependency changes, and say so), `next-env.d.ts`, the Next.js block in `AGENTS.md`.
- Add dependencies or change config (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`) without saying why in the plan.
- Invent states, colors or copy that aren't in Figma or `docs/`. Ask instead.

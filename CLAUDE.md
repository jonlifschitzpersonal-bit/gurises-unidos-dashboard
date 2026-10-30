@AGENTS.md

# Gurises Unidos — dashboard

Dashboard for the leadership of Gurises Unidos, a Uruguayan NGO, to see the reach and results of its social projects and prepare reports for donors. Product, users and sources of truth: [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md).

**Before starting a task, read:**
- The issue you are working on (`gh issue view <N>`): its "done when", source and blockers.
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

- **UI copy is in Spanish (Uruguay), with voseo** ("Elegí un año"; buttons in the infinitive), and `lang="es"`. Voice and brand: `docs/PROJECT_CONTEXT.md`. Code, docs, commits and PRs are in English.
- **Component and prop names match Figma:** layer and component names become component names; Figma properties become props with the same names and values.
- **Semantic HTML:** `<button>` for actions, `<a>`/`next/link` to navigate, never a clickable `<div>`. Visible focus on every interactive element.
- **Every data view has its states:** loading, error, retry, empty and empty by filter (see `docs/PROJECT_CONTEXT.md`).
- Server components by default; `"use client"` only where there is state or events, as low in the tree as possible.

## How to work

Work goes in **slices**: a small piece of the product with an observable result and a "done when". One slice = one issue = one branch = one PR. Small, because a short diff can be reviewed in full.

1. **Read first:** the issue, the state docs, the exact Figma node (with its description and annotations) and the existing components and tokens.
2. **Plan before code, and wait for approval.** The plan answers:
   - the observable result;
   - what is in scope and what is out, on purpose;
   - the states;
   - the Figma evidence;
   - the decisions already approved (issue, ADR);
   - assumptions, each with its risk;
   - what is reused, extended, created or kept internal to the component (create only with real reuse);
   - the tokens used;
   - the files touched and why;
   - what is fictitious;
   - the checks to run;
   - the product decisions still open. Ask them; don't decide them.

   For layout questions, show 2 or 3 ASCII wireframes before Figma or code: they are cheap and keep the discussion on structure.
3. **Implement only what was approved.** If the plan has to change in a way that affects the result, scope or behavior, stop and ask. Smaller technical changes are listed in the PR under "Differences with the approved plan".
4. Run `npm run lint` and `npm run build`.
5. **Verify with evidence:** measure in the browser against Figma and report each check as PASS, FAIL, UNVERIFIED or OUT OF SCOPE. What wasn't tested is UNVERIFIED, never PASS.
6. **Close the slice:** update `docs/CURRENT_STATE.md` and `docs/PENDING_TASKS.md` in the same PR, and add an ADR in `docs/adr/` for a new architecture decision. A slice is not closed with a FAIL, or with a check its issue requires left UNVERIFIED.
7. **Stop.** Don't start the next slice until this PR is merged and the next one is asked for.
8. If you assume something, say it and name the risk.

## Design review (Impeccable)

[Impeccable](https://impeccable.style/docs) reviews the design on top of the Figma ledger: the ledger checks that the code matches Figma; Impeccable checks that the design holds up.

- **`PRODUCT.md` and `DESIGN.md` are derived, not sources of truth.** `PRODUCT.md` comes from `docs/PROJECT_CONTEXT.md` and the ADRs; `DESIGN.md` (and `.impeccable/design.json`) from the Figma variables and components and `app/globals.css`. When those change, regenerate them (`/impeccable init`, `/impeccable document`) and run `/impeccable doctor`. If they disagree, the sources win.
- **The design hook is on** (`.impeccable/config.json`): it checks every UI edit and, at the end of a turn, the files touched. Triage each finding: fix real problems; an ignore needs evidence and is disclosed in the PR.
- **At the close of every UI slice, run `critique` and `audit`.** Fix each high-priority finding in the slice or file it as an issue.
- **It can improve the system, not skip it.** A color, size or type style that doesn't exist becomes a token, in Figma first. Product calls (what is shown, what a text says) are proposed and Jonathan decides. Any command that changes something is worked as a slice.

## Git workflow

The backlog lives in [GitHub Issues](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues), grouped by milestone. `main` is protected: changes reach it only through a pull request, merged with squash.

1. **Start from an issue.** If there is none, create it (`gh issue create`) before the branch.
2. **Update `main` and branch from it:** `git switch main && git pull`, then `git switch -c <type>/<issue>-<slug>`. Types: `feat`, `fix`, `docs`, `chore`, `refactor`. Example: `feat/15-app-shell`.
3. **One branch, one issue.** Don't mix unrelated changes or refactors; open another issue instead.
4. **Read the diff before every commit** (`git status`, `git diff --staged`). Never commit secrets, `.env*` or generated files.
5. **Commits with one intent each:** imperative subject in English, under 72 characters, and a body that says why when it isn't obvious.
6. **Open the PR with `gh pr create`**, filling every section of `.github/pull_request_template.md`. Include `Closes #N` so the issue closes on merge.
7. **Don't merge your own PR.** Jonathan reviews it on GitHub and merges it.

## Don't

- Edit generated files: `node_modules/`, `.next/`, `package-lock.json` (unless a dependency changes, and say so), `next-env.d.ts`, the Next.js block in `AGENTS.md`.
- Add dependencies or change config (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`) without saying why in the plan.
- Invent states, colors or copy that aren't in Figma or `docs/`. Ask instead.

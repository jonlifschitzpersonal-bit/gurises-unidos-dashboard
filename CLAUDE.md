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
| `npm run lint` | ESLint, and checks that `app/tokens.css` matches the Figma export |
| `npm run tokens` | Builds `app/tokens.css` from `tokens/figma/` (after exporting from Figma) |
| `npm run build` | Production build (what Vercel runs) |

A change is not done until `npm run lint` and `npm run build` pass.

## Stack

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4. No `src/` folder; import alias `@/*`. Why: [ADR 0001](docs/adr/0001-nextjs-tailwind-stack.md).

| Where | What goes there |
|---|---|
| `app/` | Routes (`page.tsx`), the root `layout.tsx`, `globals.css` and the generated `tokens.css` |
| `app/tokens/` | Page that shows every design token with its class, value and usage note (`/tokens`). It reads `tokens.ts`, generated from Figma |
| `components/` | System components, one per Figma component, with variants in `cva` ([ADR 0008](docs/adr/0008-component-variants-cva-lucide.md)) |
| `lib/` | Shared helpers: `cn()` joins classes and resolves conflicts, aware of the generated text styles |
| `tokens/figma/` | The Figma export (DTCG JSON) the token CSS is built from. Never edited by hand |
| `scripts/tokens/` | The token build (Style Dictionary) and the Figma script that exports the text styles |

## Design source

- **Figma file:** "Design Engineer Journey" (fileKey `E8QHJIEO0sSdSqPPDCjNQd`). Variables in collections `Primitives` and `Semantic`; text styles `label/*`, `body/sm`, `heading/*`; components `Icon`, `Button`, `MetricCard`, `StatusBadge`.
- **Read it with Figma Console MCP** (Desktop Bridge plugin), not the official Figma MCP. Why: [ADR 0003](docs/adr/0003-figma-console-mcp.md).
- Read the exact node, its component description and its annotations before implementing. If an annotation contradicts the drawing, ask.

## Design tokens

Tokens are **generated from Figma**, never written by hand ([ADR 0007](docs/adr/0007-tokens-generated-from-figma.md)): `tokens/figma/*.tokens.json` (the export) → `npm run tokens` (Style Dictionary) → `app/tokens.css`, which `app/globals.css` imports, and `app/tokens/tokens.ts`, the list the `/tokens` page shows. `npm run lint` fails if either doesn't match the export.

**Usage notes live in Figma**, in each variable's description (when to use it and when not). They are exported with the variables and shown on `/tokens`. Read them before choosing between two tokens with the same value.

**To change or add a token:**
1. Change it in Figma first (semantic colors point to a primitive; set the WEB code syntax to `var(--<name with dashes>)`).
2. Export the variables with Figma Console MCP: `figma_export_tokens` with `format: "dtcg"`, `sizeUnit: "px"` and `outputPath` set to `tokens/figma/variables.tokens.json`.
3. If text styles changed, run `scripts/tokens/export-text-styles.figma.js` with `figma_execute` and save the result as `tokens/figma/text-styles.tokens.json`.
4. Run `npm run tokens`. If it stops, Figma and code don't map 1 to 1: read the error and fix it in Figma, or extend `scripts/tokens/build.mjs` for a new kind of token.
5. Review the diff of the JSON, `app/tokens.css` and `app/tokens/tokens.ts`: it should show only the change you made.

Rules ([ADR 0002](docs/adr/0002-design-tokens-in-tailwind-theme.md)):

- **Names match Figma**, slashes become dashes: `color/text/muted` → `--color-text-muted` → `text-text-muted`. Color classes repeat words on purpose (`text-text-muted`, `bg-bg-surface`); don't rename them.
- **Only the system exists.** Tailwind's color palette, font sizes and radii are reset. `bg-red-500`, `text-sm` or `rounded-xl` generate nothing.
- **Components use semantic colors only.** Primitives (`--gray-600`) are plain variables outside `@theme` and have no classes.
- **Text styles are one class each** (`text-label-md` sets size, line height and weight). Don't combine `font-*` and `leading-*` to imitate one.
- **Spacing is Tailwind's default scale**, which matches Figma's `space/N` = N × 4px (`space/1-5` → `p-1.5`).
- **No arbitrary values** (`p-[22px]`, `text-[#333]`). If a value has no token, stop and propose one; it gets added in Figma and exported.
- Dark mode is not built yet. When it is, it redefines the semantic colors; components don't change.

## Conventions

- **UI copy is in Spanish (Uruguay), with voseo** ("Elegí un año"; buttons in the infinitive), and `lang="es"`. Voice and brand: `docs/PROJECT_CONTEXT.md`. Code, docs, commits and PRs are in English.
- **Component and prop names match Figma:** layer and component names become component names; Figma properties become props with the same names and values.
- **Semantic HTML:** `<button>` for actions, `<a>`/`next/link` to navigate, never a clickable `<div>`. Visible focus on every interactive element.
- **Every data view has its states:** loading, error, retry, empty and empty by filter (see `docs/PROJECT_CONTEXT.md`).
- Server components by default; `"use client"` only where there is state or events, as low in the tree as possible.

## How to work

Work goes in **slices**: a small piece of the product with an observable result and a "done when". One slice = one issue, with one or more commits. Small, because a short diff can be reviewed in full.

**No pull requests: closed slices go straight to `main`.** Jonathan's checkpoints are the approved plan and the ledger reported when the slice closes; each slice stays readable as its own commits on GitHub.

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
3. **Implement only what was approved.** If the plan has to change in a way that affects the result, scope or behavior, stop and ask. Smaller technical changes are listed in the closing commit under "Differences with the approved plan" and reported to Jonathan.
4. Run `npm run lint` and `npm run build`.
5. **Verify with evidence:** measure in the browser against Figma and report each check as PASS, FAIL, UNVERIFIED or OUT OF SCOPE. What wasn't tested is UNVERIFIED, never PASS.
6. **Close the slice:** update `docs/CURRENT_STATE.md` and `docs/PENDING_TASKS.md` in the same push, and add an ADR in `docs/adr/` for a new architecture decision. A slice is not closed with a FAIL, or with a check its issue requires left UNVERIFIED.
7. **Push the closed slice, report its ledger and stop.** Don't start the next slice until it is asked for.
8. If you assume something, say it and name the risk.

## Design review (Impeccable)

[Impeccable](https://impeccable.style/docs) reviews the design on top of the Figma ledger: the ledger checks that the code matches Figma; Impeccable checks that the design holds up.

- **`PRODUCT.md` and `DESIGN.md` are derived, not sources of truth.** `PRODUCT.md` comes from `docs/PROJECT_CONTEXT.md` and the ADRs; `DESIGN.md` (and `.impeccable/design.json`) from the Figma variables and components and `app/tokens.css`. When those change, regenerate them (`/impeccable init`, `/impeccable document`) and run `/impeccable doctor`. If they disagree, the sources win.
- **The design hook is on** (`.impeccable/config.json`): it checks every UI edit and, at the end of a turn, the files touched. Triage each finding: fix real problems; an ignore needs evidence and is disclosed in the closing commit.
- **At the close of every UI slice, run `critique` and `audit`.** Fix each high-priority finding in the slice or file it as an issue.
- **It can improve the system, not skip it.** A color, size or type style that doesn't exist becomes a token, in Figma first. Product calls (what is shown, what a text says) are proposed and Jonathan decides. Any command that changes something is worked as a slice.

## Git workflow

The backlog lives in [GitHub Issues](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues), grouped by milestone. Work happens on `main` and is pushed directly, with no pull requests (Jonathan's call, 2026-10-30: one person reviews, so merging was a step without a review). The "Protect main" ruleset still blocks force pushes and deleting `main`, so history is never rewritten.

1. **Start from an issue.** If there is none, create it (`gh issue create`) before the code. Docs-only fixes can go without one.
2. **Update `main` first:** `git switch main && git pull`.
3. **Something unrelated that comes up gets its own issue and its own commit**, and is reported, never slipped in unannounced.
4. **Read the diff before every commit** (`git status`, `git diff --staged`). Never commit secrets, `.env*` or generated files.
5. **Commits with one intent each:** imperative subject in English, under 72 characters, and a body that says why when it isn't obvious.
6. **The commit that finishes an issue closes it:** `Closes #N` in its body, plus the verification ledger (PASS / FAIL / UNVERIFIED / OUT OF SCOPE, one line per check) and "Differences with the approved plan" if there are any. GitHub closes the issue when the commit reaches `main`.
7. **Push only closed slices:** after `npm run lint`, `npm run build` and the verification pass, so `main` never holds half a slice. Never force push; fix a mistake with a new commit (`git revert` if needed).
8. **A pull request only if Jonathan asks for one** (for example, a risky change he wants to review first). Then fill every section of `.github/pull_request_template.md` and don't merge it yourself.

## Don't

- Edit generated files: `node_modules/`, `.next/`, `package-lock.json` (unless a dependency changes, and say so), `next-env.d.ts`, the Next.js block in `AGENTS.md`.
- Add dependencies or change config (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`) without saying why in the plan.
- Invent states, colors or copy that aren't in Figma or `docs/`. Ask instead.

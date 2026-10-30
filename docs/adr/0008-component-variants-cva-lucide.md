# 0008. Component variants with cva, class merging with tailwind-merge, icons from lucide-react

- **Status:** Accepted
- **Date:** 2026-10-30

## Context

The system components (`Button`, `Icon`, `StatusBadge`, `MetricCard`) come from Figma component sets whose variants multiply (`Button`: variant × size × state = 24). In code, each Figma property becomes a prop with the same name and values (CLAUDE.md), and the styles have to stay readable as "a base plus what each variant changes", the way `figma_analyze_component_set` reports them.

The Figma `Icon` set is based on Lucide (16×16, 1.5px stroke), with name equivalences in its description (`currency` → `dollar-sign`, `arrow-up` → `move-up`).

## Options considered

1. **Hand-written class maps per component.** No dependency, but every component reinvents defaults, variant typing and conflict handling.
2. **`class-variance-authority` (cva) + `clsx` + `tailwind-merge`**, the pattern shadcn/ui uses: a typed table of variants with defaults, and a `cn()` helper so a `className` passed by the consumer overrides the defaults instead of fighting them.
3. **Importing shadcn/ui components.** They bring their own design and token names; this system already has its components in Figma.
4. **Icons:** copying the SVG paths from Lucide into our own file, or the `lucide-react` package. Copying is a second source of truth for geometry the project doesn't own.

## Decision

Option 2 for variants, with shadcn/ui as a model for the API only, and `lucide-react` for the icons:

- Each component defines its variants with `cva`; `hover`, `focus` and `pressed` stay CSS states, never props.
- `lib/cn.ts` joins classes with `clsx` and resolves conflicts with `tailwind-merge`, **extended with the text styles generated from Figma** (`app/tokens/tokens.ts`). Without that, `tailwind-merge` takes `text-label-md` for a text color and drops it next to `text-text-muted`.
- `components/Icon.tsx` maps the Figma names to Lucide components. The 1.5px stroke stays real at any size with `vector-effect: non-scaling-stroke` (rule in `app/globals.css`).
- Exact versions (`--save-exact`), all published at least two weeks earlier: `class-variance-authority` 0.7.1, `clsx` 2.1.1, `tailwind-merge` 3.7.0, `lucide-react` 1.57.0.

## Consequences

- Four runtime dependencies, all small; `lucide-react` is tree-shaken to the 12 icons used.
- A new text style in Figma reaches `cn()` automatically through the generated list.
- A new icon is added to the Figma set first, then to the map in `Icon.tsx` with its Lucide equivalent checked by shape.
- Components stay server components unless they need state: `Button` doesn't wrap `onClick`, so it can be rendered from a server component.

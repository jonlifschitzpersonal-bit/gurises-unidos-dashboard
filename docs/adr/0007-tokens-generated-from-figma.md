# 0007. Token CSS generated from a Figma export with Style Dictionary

- **Status:** Accepted
- **Date:** 2026-10-30
- **Refines:** [0002](0002-design-tokens-in-tailwind-theme.md). Names, `@theme` and the resets stay as decided there; what changes is how the CSS is written: generated, not copied by hand.

## Context

The tokens lived twice: as Figma variables and as a hand-kept copy in `app/globals.css` (and a third copy in `/tokens`). They matched, but nothing kept them matching: a value changed in Figma never reached the code, and a hand edit in the CSS went unnoticed.

Constraints:

- The Figma file is on the Starter plan. The Variables REST API is Enterprise-only, so a CI job can't read the variables.
- Figma Console MCP (ADR 0003) reads them through the Desktop Bridge plugin and exports W3C DTCG JSON. Its export covers variables only, not text styles.

## Options considered

1. **Keep copying by hand.** No tooling, but drift is only caught by reading both sides.
2. **Tokens Studio** (Figma plugin, free tier) exporting JSON. Another plugin to keep in the file, a manual export in Figma, and its own token format next to the variables.
3. **Figma Console MCP export to DTCG + Style Dictionary.** The agent exports when asked; the JSON is committed; Style Dictionary (the standard build tool for tokens) generates the CSS with a custom format for Tailwind v4's `@theme`.
4. **Figma Console MCP straight to CSS** (its `tailwind-v4` format). One step less, but its output is `@theme inline` with resolved values: primitives would become classes and aliases would be lost.

## Decision

Option 3:

- `tokens/figma/variables.tokens.json` comes from `figma_export_tokens` (DTCG); `tokens/figma/text-styles.tokens.json` from `scripts/tokens/export-text-styles.figma.js`, run in Figma with `figma_execute`. Both are committed snapshots of Figma and are never edited by hand.
- `npm run tokens` (`scripts/tokens/build.mjs`) removes the export timestamps, so a re-export without changes is not a diff, and writes `app/tokens.css`: primitives in `:root`, semantic colors as `var()` to their primitive, radii and text styles in `@theme`, with the resets. `app/globals.css` imports it.
- The build fails when Figma and code would stop mapping 1 to 1: a CSS name different from the variable's WEB code syntax, a semantic color that isn't an alias, a `space/N` that isn't N × 4px, a token group the script doesn't place, a font that isn't loaded, or exports from two different Figma files.
- `npm run lint` runs the build with `--check`: it fails if `app/tokens.css` doesn't match the JSON.
- Tailwind doesn't scan `scripts/` and `tokens/` (`@source not`), so words in them don't become classes.

## Consequences

- A change in Figma reaches the code as a readable diff in the JSON and in `app/tokens.css`, reviewed like any other change.
- This is a mapping with an automatic check, not a live sync: the code only learns about a Figma change when someone exports again. Without the Enterprise API, the export can't run in CI.
- A new kind of token (shadows, a second font, modes for dark mode) needs a change in `scripts/tokens/build.mjs`; the build stops until it gets one.
- Adds `style-dictionary` as a dev dependency.
- Declarations in `app/tokens.css` follow the export's alphabetical order, not the old hand-picked one. The compiled CSS has the same declarations and rules as before.

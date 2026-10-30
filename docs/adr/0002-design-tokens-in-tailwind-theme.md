# 0002. Design tokens with Figma names, only the system in the Tailwind theme

- **Status:** Accepted
- **Date:** 2026-10-30

## Context

Figma holds the design tokens: primitive colors (`gray/600`), semantic colors (`color/text/muted`), radii, spacing and text styles. Tailwind ships its own palette, font sizes and radii. If both coexist, an agent can write `text-gray-500` or `rounded-lg` and the result looks almost right while being outside the system. Tailwind's `rounded-lg` is 8px; the system's `radius/lg` is 12px.

## Options considered

1. **Extend Tailwind's theme** with the system tokens. Fast, but every Tailwind default stays available.
2. **Replace the theme with the system only.** Reset each group that overlaps (`--color-*`, `--radius-*`, `--text-*: initial`) and define the Figma tokens.
3. **Rename tokens in Figma to match Tailwind classes** (`text-muted` instead of `color/text/muted`). Shorter classes, but the class prefix (`text-`, `bg-`, `border-`) would be duplicated, Figma's variable folders would flatten, and the Figma file would depend on one CSS tool.

## Decision

Option 2:

- Names are the Figma names with slashes turned into dashes: `color/text/muted` → `--color-text-muted` → `text-text-muted`. The repeated word is accepted: one name from Figma to the class is worth more than a shorter class.
- Primitives are plain CSS variables in `:root`, outside `@theme`, so they generate no classes. Semantic colors live in `@theme` and point to them, like aliases in Figma.
- Colors go in `@theme` without `inline`, so a future mode (dark) can redefine them. Only the font, which depends on a variable set by `next/font`, uses `@theme inline`.
- Text styles are one utility each (`--text-label-md` with its `--line-height` and `--font-weight`).
- Spacing keeps Tailwind's default scale, which already matches `space/N` = N × 4px.

## Consequences

- Any color, font size or radius outside the system generates no CSS, so it shows up as unstyled in the browser and in review.
- Color classes read oddly (`bg-bg-surface`, `text-text-muted`). This is on purpose; don't rename them.
- A new token must be added in Figma first and then in `app/globals.css`, with the same name.
- Spacing is not restricted: `p-7` exists even though Figma has no `space/7`. Reviews must catch it.

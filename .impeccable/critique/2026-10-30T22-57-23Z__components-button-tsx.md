---
target: Button (6.2)
total_score: 23
max_score: 32
na_heuristics: 3,9
p0_count: 0
p1_count: 1
target_identity: "file:D:\\Escritorio\\proyectos\\gurises-unidos-dashboard\\components\\Button.tsx"
target_fingerprint: "sha256:556ca69c750e2bb11541641fd0fccb7928c80bfe56798f8dcb85e18e8c86aafb"
target_path: "D:\\Escritorio\\proyectos\\gurises-unidos-dashboard\\components\\Button.tsx"
timestamp: 2026-10-30T22-57-23Z
slug: components-button-tsx
---
Method: dual-agent (A: design review · B: detector + browser), isolated sub-agents.

Target: components/Button.tsx (with components/Icon.tsx and their use in components/DemoNotice.tsx), rendered on a temporary page /verify-button.

## Design Health Score (component surface)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Spinner and stable width; the end of loading isn't announced |
| 2 | Match system / real world | 3 | Infinitive labels, Spanish screen reader text |
| 3 | User control and freedom | n/a | A button has no undo; it belongs to the flow |
| 4 | Consistency and standards | 3 | Native button, props match Figma; the notice X is a documented exception |
| 5 | Error prevention | 3 | Loading blocks double clicks; implicit form submission is the form's job |
| 6 | Recognition rather than recall | 3 | Typed IconName with Figma names |
| 7 | Flexibility and efficiency | 2 | No API for the 44px mobile form rule; labels couldn't wrap (fixed) |
| 8 | Aesthetic and minimalist design | 3 | Calm and flat, but the three variants are hard to tell apart |
| 9 | Error recovery | n/a | A button has no error state |
| 10 | Help and documentation | 3 | JSDoc and comments; no Storybook yet (6.4) |
| **Total** | | **23/32** | Good |

## Design specificity
Authored for this product: the API is Figma's one to one and every departure is explained. Visually, three soft-blue buttons are generic; the character lives in the details.
Deterministic scan: 0 findings in the source files. URL scan: overused-font (Inter) — false positive, a documented system decision; text-overflow ×8 at 320px — caused by the test page grid, but it pointed at the real nowrap issue below.

## Priority issues
1. [P1] Weak hierarchy between variants: primary fill and secondary border are blue/200 on white (~1.5:1); the subtle hover (blue/50) equals bg-accent-subtle, so it disappears on the notice band. Token decision in Figma, by Jonathan → issue.
2. [P2] Long labels overflowed at 320px (whitespace-nowrap + shrink-0). Fixed in the slice: labels wrap only when they don't fit. The 44px mobile form rule has no API yet → issue (decide in Figma).
3. [P2] Loading isn't reliably announced (name change on a focused button; nothing when it ends) → class 6.3 issue.
4. [P2] Forced colors removes the button outlines (inset ring is a box-shadow) → class 6.3 issue. UNVERIFIED live.
5. [P3] Props spread after the loading attributes could override them: fixed. Space while loading still shows :active → 6.3 issue.

## Persona red flags
- Leadership on a projector: primary and secondary wash out.
- Screen reader user: hears nothing when loading ends.
- Windows High Contrast user: buttons look like plain text.

## Minor observations
- Spinner butt caps vs Lucide round caps: rejected, Figma draws the arc with square ends.
- disabled + loading together is undefined; the types could forbid it.
- `[&_svg]:size-4` fixes icon size inside Button on purpose.

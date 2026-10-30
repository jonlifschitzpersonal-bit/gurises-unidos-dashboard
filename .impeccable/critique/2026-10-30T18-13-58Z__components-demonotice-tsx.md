---
target: DemoNotice
total_score: 17
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 1
target_identity: "file:D:\\Escritorio\\proyectos\\gurises-unidos-dashboard\\components\\DemoNotice.tsx"
target_fingerprint: "sha256:55ec7852bda38ebff01412a19aced383d5e6431bdebc78e155c0117f711c60be"
target_path: "D:\\Escritorio\\proyectos\\gurises-unidos-dashboard\\components\\DemoNotice.tsx"
timestamp: 2026-10-30T18-13-58Z
slug: components-demonotice-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector + browser sub-agent)

## Design Health Score — DemoNotice (Operate)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | The "fictitious" status disappears for good after one click and scrolls away |
| 2 | Match system / real world | 3 | Plain copy; doesn't say actions save nothing (ADR 0006 says the notice covers them) |
| 3 | User control and freedom | 2 | No way to bring it back short of clearing site data |
| 4 | Consistency and standards | 3 | Matches Figma, tokens only; `<aside>` = complementary landmark doesn't fit |
| 5 | Error prevention | 2 | Mistaking demo numbers for real isn't guarded once closed or scrolled past |
| 6 | Recognition rather than recall | 2 | After closing, relies on remembering the data is fake |
| 7 | Flexibility and efficiency | n/a | One-shot control |
| 8 | Aesthetic and minimalist | 3 | Flat, one line; X ~1,380px from the message at wide widths |
| 9 | Error recovery | n/a | No error states; blocked storage degrades correctly |
| 10 | Help and documentation | n/a | It is itself in-context help |
| **Total** | | **17/28** | **Acceptable** |

## Design Specificity Verdict
LLM: the form is the standard announcement banner; the copy and the pre-paint behavior are specific. Acceptable in Operate mode, but DESIGN.md calls it the signature component.
Deterministic scan: CLI 0 findings (DemoNotice.tsx, layout.tsx); browser overlay on / 0 findings.

## Priority Issues
- [P1] The only declaration of fictitious data can be switched off forever in one click, and scrolls away. Breaks Product Principle 4. Fix: a permanent compact "Datos ficticios" marker (future top bar), optionally session-scoped close or a way to show it again. /impeccable harden
- [P2] Copy doesn't cover the actions that save nothing (ADR 0006). Fix: extend the fixed copy, or state it in each flow. /impeccable clarify
- [P2] The band is hard to notice: Mist Blue on white is 1.09:1 with no edge. Fix: 1px bottom border with a new token color/border/accent (blue-200), Figma first; keep the X near the message (with the shell layout). /impeccable polish
- [P3] `<aside aria-label="Aviso">`: wrong landmark, generic name. Fix: `<section aria-label="Aviso de datos ficticios">`. /impeccable audit

## Persona Red Flags
- Riley: closes it on a shared browser; nobody after sees a label; with JS off the X does nothing.
- Sam: announced as "Aviso, complementario"; the name doesn't say what it is about.
- Casey: 32×32 X under the 44pt comfort size, top right.
- Dirección: screenshots the reach number after closing the notice weeks ago; nothing says "ficticio".

## Minor Observations
- Hover only darkens the X (band is already Mist Blue): quiet affordance.
- Focus ring flush with the button (no offset).
- The notice also shows on /tokens, a page with no data.

## Questions to Consider
- Who is the notice for, if only leadership sees the screen?
- Would the honest version be impossible to dismiss but nearly invisible?

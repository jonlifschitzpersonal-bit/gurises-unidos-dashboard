# 0009. Async action feedback: the Button shows it is busy, the caller announces the result

- **Status:** Accepted
- **Date:** 2026-10-31

## Context

`Button` has a `loading` prop (Figma: `loading`): a spinner, the same width, no second press, and still focusable (`aria-disabled`, not `disabled`). Its accessible name becomes "Guardar, cargando". The 6.2 review (#37) found two gaps:

- A name change on the focused element is not announced the same way by every screen reader, so the start of loading may go unheard.
- The end of loading is silent: the name goes back to "Guardar", which says nothing about whether it worked.

Only the code that started the action knows the outcome ("Proyecto creado", "No se pudo guardar"), and that text is product copy that changes per flow.

## Options considered

1. **The Button announces everything** (a live region inside or next to it). It can say "cargando", but not the outcome. A live region inside a `<button>` is also unreliable: the button's children become part of its name.
2. **A global announcer** (one live region in the layout and an `announce()` helper, like React Aria). Works anywhere, but adds a client singleton and a context before any flow needs it.
3. **The caller announces the result** in a `role="status"` region it renders, which is always in the DOM and starts empty. The Button only shows that it is busy.

## Decision

Option 3. The `Button` keeps its loading name ("<label>, cargando") and `aria-disabled`. Each flow that triggers an async action renders a `role="status"` element (polite) next to the action and writes the result into it when loading ends. The region exists before the message, or screen readers miss it. The text comes from `docs/PROJECT_CONTEXT.md` or Figma for that flow, like any copy.

If the region can be visible text (a confirmation under the form), it is visible; if not, it is `sr-only`.

`loading` wins over `disabled`: a loading button is never `disabled`, because that would move focus to the page start.

## Consequences

- Every flow (#9 "Cargar métricas", #10 "Nuevo proyecto", a future "Reintentar") owns its result message and its status region. Their plans list both.
- If three or more flows repeat the same region, it is extracted into a shared component (or option 2), in a new ADR.
- Whether the start of loading is spoken depends on the screen reader. Not checked with one yet ([#39](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/39)): if NVDA does not speak the name change, the caller's status region also announces the start.

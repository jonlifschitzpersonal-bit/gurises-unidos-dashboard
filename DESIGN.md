---
name: Gurises Unidos dashboard
description: Reach and results of an NGO's projects, counted honestly.
colors:
  bg-surface: "#ffffff"
  bg-accent-subtle: "#eef6ff"
  bg-skeleton: "#f3f4f6"
  text-default: "#111827"
  text-muted: "#4b5563"
  text-disabled: "#9ca3af"
  icon-accent: "#0b3f6e"
  border-default: "#e5e7eb"
  border-accent: "#a8d6ff"
  action-primary-bg: "#a8d6ff"
  action-primary-bg-hover: "#8cc7ff"
  action-primary-bg-pressed: "#70b8ff"
  action-secondary-border: "#a8d6ff"
  action-secondary-text: "#0b3f6e"
  action-subtle-bg-hover: "#eef6ff"
  action-subtle-bg-pressed: "#cbe6ff"
  action-disabled-bg: "#e5e7eb"
  focus-ring: "#2b7fd4"
  feedback-positive: "#15803d"
  feedback-negative: "#b91c1c"
  feedback-neutral: "#4b5563"
  feedback-positive-subtle: "#f0fdf4"
  feedback-negative-subtle: "#fef2f2"
  feedback-neutral-subtle: "#f3f4f6"
typography:
  heading-metric:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: "2.25rem"
  heading-section:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.75rem"
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.25rem"
  label-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: "1.25rem"
  label-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: "1.25rem"
  label-xs:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: "1rem"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  "0-5": "2px"
  "1": "4px"
  "1-5": "6px"
  "2": "8px"
  "2-5": "10px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
components:
  button-primary:
    backgroundColor: "{colors.action-primary-bg}"
    textColor: "{colors.text-default}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.action-primary-bg-hover}"
  button-primary-pressed:
    backgroundColor: "{colors.action-primary-bg-pressed}"
  button-primary-disabled:
    backgroundColor: "{colors.action-disabled-bg}"
    textColor: "{colors.text-disabled}"
  button-secondary:
    textColor: "{colors.action-secondary-text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "40px"
  button-secondary-hover:
    backgroundColor: "{colors.action-subtle-bg-hover}"
  button-secondary-pressed:
    backgroundColor: "{colors.action-subtle-bg-pressed}"
  button-ghost:
    textColor: "{colors.text-default}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "40px"
  button-ghost-hover:
    backgroundColor: "{colors.action-subtle-bg-hover}"
  button-ghost-pressed:
    backgroundColor: "{colors.action-subtle-bg-pressed}"
  button-sm:
    padding: "6px 12px"
    height: "32px"
  metric-card:
    backgroundColor: "{colors.bg-surface}"
    rounded: "{rounded.lg}"
    padding: "20px"
  status-badge-active:
    backgroundColor: "{colors.feedback-positive-subtle}"
    textColor: "{colors.feedback-positive}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
    height: "24px"
  status-badge-paused:
    backgroundColor: "{colors.feedback-neutral-subtle}"
    textColor: "{colors.feedback-neutral}"
  status-badge-error:
    backgroundColor: "{colors.feedback-negative-subtle}"
    textColor: "{colors.feedback-negative}"
  demo-notice:
    backgroundColor: "{colors.bg-accent-subtle}"
    textColor: "{colors.text-default}"
    typography: "{typography.body-sm}"
    padding: "4px 8px 4px 16px"
---

<!--
  Impeccable's record of the visual system. Not a source of truth: the tokens
  come from the Figma variables (built into app/tokens.css), and the components from
  the Figma file "Design Engineer Journey" (page 02 - Components). Token keys
  are the code names (color/text/muted → text-muted). When Figma or
  app/tokens.css change, regenerate this file (`/impeccable document`) and
  check it with `/impeccable doctor`. If they disagree, Figma and tokens.css win.
-->

# Design System: Gurises Unidos dashboard

## Overview

**Creative North Star: "The Honest Count"**

Every number on screen says only what it measures, and the interface gets out of its way. The surfaces are white and flat, separated by thin gray borders and white space, never by shadows. A single soft blue carries actions, focus and the informational accent; green and red appear only to report a change, and always with an arrow and a written value next to them. Typography is one family, Inter, with a large semibold figure for metrics and small, even labels around it.

The character is **calm and precise**: restrained surfaces, careful details. The details are where the care shows: the icon aligned with the first line of text, a focus ring on every control, states drawn on purpose instead of improvised. Density is moderate. This is a tool leadership opens to prepare a report, so scanning and consistency come before expression.

**Key Characteristics:**
- Flat white surfaces with 1px gray borders; no shadows.
- One soft blue for actions, focus and info; color never decorates data.
- Trends always pair color with an arrow and text.
- Inter only, six text styles, each applied as one class.
- Spacing on a 4px grid; three radii plus a pill.

## Colors

A near-monochrome gray system with one soft blue and two feedback hues, all from a small primitive palette.

### Primary
- **Soft Sky** (`action-primary-bg`): fill of the primary button, with near-black text on top. It is light on purpose: the action is visible without shouting. It deepens to **Brighter Sky** (`action-primary-bg-hover`) on hover.
- **Harbor Navy** (`icon-accent`, `action-secondary-text`): the informational icon and the secondary button's text. The dark end of the same blue, used where blue has to carry text-level contrast.
- **Signal Blue** (`focus-ring`): the 2px focus ring, and nothing else.

### Neutral
- **Paper White** (`bg-surface`): page and card background.
- **Mist Blue** (`bg-accent-subtle`, `action-subtle-bg-hover`): the demo notice band, the metric card's icon circle, and the hover fill of secondary and ghost buttons.
- **Ink** (`text-default`): body text, metric values, button labels.
- **Slate** (`text-muted`): secondary text and metric titles, 7.56:1 on white.
- **Ash** (`text-disabled`): disabled labels only.
- **Hairline Gray** (`border-default`): card borders and dividers.
- **Sky Edge** (`border-accent`): the edge of a Mist Blue surface, so it doesn't dissolve into white (the demo notice's bottom border). Same value as Soft Sky, but not an action color.
- **Fog** (`bg-skeleton`, `feedback-neutral-subtle`): loading skeletons and the paused badge.
- **Disabled Gray** (`action-disabled-bg`): disabled button fill and border.

### Feedback
- **Growth Green** (`feedback-positive`) on **Green Wash** (`feedback-positive-subtle`): upward trends and the "Activo" badge.
- **Alert Red** (`feedback-negative`) on **Red Wash** (`feedback-negative-subtle`): downward trends and the "Error" badge.
- **Slate** (`feedback-neutral`) on **Fog**: no change, and the "Pausado" badge.

### Named Rules
**The Quiet Blue Rule.** Blue is for actions, focus and information. Data never gets a decorative color; a number is Ink.

**The Color Plus Words Rule.** Green and red never travel alone: a trend carries its arrow and its written value, and a badge carries its fixed label ("Activo", "Pausado", "Error").

**The System-Only Rule.** Components use semantic colors only. A color that is not in this list does not exist yet: it is proposed, added in Figma, then exported to `app/tokens.css` (`npm run tokens`).

## Typography

**Body Font:** Inter (with system-ui, sans-serif)

**Character:** One neutral, highly legible family. Hierarchy comes from size and weight, never from a second typeface.

### Hierarchy
- **Metric** (`heading-metric`, 600, 28px, 36px line height): the value of a metric card. The largest text on screen.
- **Section heading** (`heading-section`, 600, 20px, 28px): section titles such as "Resumen".
- **Body** (`body-sm`, 400, 14px, 20px): running text, metric titles, the demo notice.
- **Label** (`label-md`, 500, 14px, 20px): button labels.
- **Small label** (`label-sm`, 500, 13px, 20px): the trend value of a metric card.
- **Tiny label** (`label-xs`, 500, 12px, 16px): status badges.

### Named Rules
**The One Class Rule.** A text style is applied as one class that sets size, line height and weight together. Never rebuild one from separate size, weight and leading values.

## Layout

Spacing follows a 4px grid, named after Figma's `space/N` (N × 4px, with half steps such as `1-5` = 6px). Common steps: 4px between an arrow and its value, 8px inside buttons and the notice, 12px between the parts of a card, 16px and 20px for padding.

Breakpoints are 640, 768, 1024 and 1280px; layouts are written mobile first. Metric cards sit in a grid that wraps on its own, with a 240px minimum card width. The demo notice spans the full width, first on every screen. Pages must have no horizontal scroll at 320px.

## Elevation & Depth

The system is flat. There are no shadows: depth is conveyed by a 1px Hairline Gray border (inside the box) and by white space. The only element drawn outside a box is the 2px focus ring.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest and stay flat on hover. A state shows through a fill or a ring, never through lift.

## Shapes

Gently curved corners in three sizes plus a pill: 6px for small controls (the notice's close button), 8px for buttons, 12px for cards, and a full pill for status badges. Icon-holding circles (the metric card's 40px icon background) are full circles. Icons are 16px with a 1.5px stroke, based on Lucide; inside a metric card the icon is 20px.

## Components

Specs come from the Figma components. Which ones are built in code is in `docs/CURRENT_STATE.md`.

### Buttons
- **Shape:** gently curved (8px).
- **Primary:** Soft Sky fill, Ink label, 10px × 16px padding, 40px tall; an optional 16px icon before the label with an 8px gap.
- **Secondary:** transparent with a 1px Soft Sky border, Harbor Navy label.
- **Ghost:** transparent, Ink label, no border.
- **Small size:** 6px × 12px padding, 32px tall.
- **Hover:** primary goes to Brighter Sky; secondary and ghost fill with Mist Blue.
- **Pressed** (`:active`, one step darker than hover; no variant in Figma, it is annotated): primary goes to Deep Sky (`action-primary-bg-pressed`); secondary and ghost fill with Pale Sky (`action-subtle-bg-pressed`).
- **Focus:** a 2px Signal Blue ring outside the button, on keyboard focus only.
- **Disabled:** Disabled Gray fill (primary) or border (secondary), Ash label.
- **Loading:** a 16px spinner takes the icon's place, so the width doesn't change; with no icon it sits over the label, which turns transparent but is still read. The button keeps its focus.

### Metric card
- **Corner Style:** 12px.
- **Background:** Paper White with a 1px Hairline Gray border.
- **Internal Padding:** 20px, with 12px between parts.
- **Content, top to bottom:** a 20px icon in a 40px Mist Blue circle; the title in Slate (`body-sm`); the value in Ink (`heading-metric`); the trend (arrow + value in `label-sm`), green for up, red for down, Slate for neutral.
- **States:** `loading` (skeleton the size of the content, no trend, no icon; the title stays for screen readers) and `error` (value "—", no trend). With no value, the card shows "—". The trend can be hidden for a first period with nothing to compare. Open design questions: [#38](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/38).
- **Limit:** down is always red. A metric where going down is good needs a design decision first.

### Status badge
- **Style:** pill, 4px × 8px padding, a 6px dot and a fixed label (`label-xs`), 6px apart.
- **Status:** `active` green ("Activo"), `paused` gray ("Pausado"), `error` red ("Error"). The label is fixed per status, so color and text never contradict. Not clickable.

### Demo notice (signature)
- **Style:** a full-width Mist Blue band with a 1px Sky Edge bottom border (included in its height: 41px), first on every screen: a Harbor Navy info icon, the fixed message in Ink (`body-sm`) and a 32px close button with a Slate X that turns Ink on hover and focus.
- **Alignment:** the icon and the X stay aligned with the first line when the message wraps.
- **Behavior:** once closed, it stays closed in that browser. When the top bar exists, a small fixed "Datos ficticios" marker stays in it and can't be closed.

## Do's and Don'ts

### Do:
- **Do** use only the semantic tokens above, by their code names (`text-text-muted`, `bg-bg-surface`).
- **Do** add a missing value as a token, in Figma first and then exported to `app/tokens.css` (`npm run tokens`).
- **Do** pair every green or red with an arrow and a written value, or a fixed label.
- **Do** keep secondary text at Slate or darker (at least 4.5:1).
- **Do** show a 2px Signal Blue focus ring on every interactive element.
- **Do** draw loading skeletons at the size of the content they replace.

### Don't:
- **Don't** use arbitrary values (`p-[22px]`, `text-[#333]`) or Tailwind's default palette, font sizes or radii: they are turned off and fail silently.
- **Don't** add shadows, gradients or glows; the system is flat.
- **Don't** color a number for emphasis; emphasis comes from size and weight.
- **Don't** use a second typeface.
- **Don't** invent a logo, brand mark or brand color for Gurises Unidos.

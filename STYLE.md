# Perpl Explainer Style System

The chrome (palette, nav, container, typography, CTAs, footer, mobile, focus, reduced-motion) is defined **once** in [`styles.css`](./styles.css). Every explainer page links it and adds only its page-specific styles inline.

This document explains the *why* — design rationale, page-type rules, brand colour usage. For exact values, read [`styles.css`](./styles.css). For audit rules used to review explainers, see [`REVIEW.md`](./REVIEW.md). To add a new explainer, see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## Brand colours and the indigo rule

Perpl has two brand colours:

| Colour | Hex | Token | Use |
|---|---|---|---|
| **Perpl Purple** | `#6F5CFF` | `--perpl` | Filled moments only — buttons with white text, `:focus-visible` rings, `.skip` link background, brand fills inside SVGs. |
| **Indigo** | `#A2A4FF` | `--indigo` | Text on dark — active nav links, CTA text, prose-page accents. |

**The rule:** Perpl Purple does not pass AA contrast as small text on `--bg` (~4.4:1). Indigo does (~8.4:1). So:

- For **filled** elements (purple background, white text) → use `--perpl`.
- For **text on dark** (no purple background behind it) → use `--indigo`.
- For **focus rings** (large outline, not text) → use `--perpl`.

Never use `--perpl` as a text colour on `--bg` directly. If you find yourself writing `color: var(--perpl)` somewhere that isn't a focus ring, check that the background fills the text first; otherwise switch to `--indigo`.

---

## Page types

Set the right modifier class on the `<main>` element and the chrome typography flows automatically.

| Type | `<main>` class | Container | Use when |
|---|---|---|---|
| **Prose** | `main.prose` | 680px | Overview pages: paragraphs + headings + minor figures |
| **Prose wide** | `main.prose-wide` | 760px | Prose with large embedded SVG figures (e.g. order-book overview) |
| **Interactive** | `main.app` | 1160px | Simulators, controls, real-time data |
| **Diagrams** | `main.diagrams` | 1100px | Diagram-grid pages |

Each modifier sets the appropriate type scale (prose uses 16px body / 24px h1; interactive uses denser sizes). Don't override `font-size` on `h1`/`h2`/`p` unless you have a real reason.

---

## Naming convention

Each section gets a folder. Inside:

- **`overview.html`** — the prose explanation. The reader's first stop.
- **`index.html`** — the interactive page. The simulator or toy.

Don't use other names like `interactive.html` — it breaks the convention every other section follows. The site landing page (`/index.html`) is the only exception.

---

## CTAs

Two variants live in `styles.css`:

- **`.cta-primary`** — neutral dark background, indigo text. The default.
- **`.cta-secondary`** — flatter, muted blue text. For tertiary actions.

**Section theming is allowed.** Add a modifier like `.theme-green` to tint the primary CTA's background to match the section's accent. The text stays `--indigo` so contrast is preserved. Available themes: `theme-green`, `theme-amber`, `theme-blue`, `theme-red`. Use the modifier when the section has a clear accent identity (security = green, funding = green, liquidations = red, etc.). Skip it for neutral sections.

```html
<a class="cta cta-primary theme-green" href="...">Try the simulator</a>
```

What you should NOT do:

- Don't use solid `var(--perpl)` background CTAs. The old order-book pattern is being phased out.
- Don't introduce new `.theme-*` modifiers without adding the rule to `styles.css`.
- Don't override the text colour. It must stay `--indigo` (or white on a `--perpl` fill).

---

## Tokens — when to add new ones

The `:root` block in `styles.css` is the canonical set. Don't introduce new colour hex values in CSS chrome without adding them to `:root` first. Two exceptions:

- **SVG `fill=`/`stroke=` attributes** can use raw hex. GitHub-palette diagram colours (`#58a6ff`, `#3fb950`, `#f85149`) are fine inside SVGs; don't use them in CSS.
- **Page-specific palettes** (callout backgrounds, versus card tints, equation block colour, simulator-specific tints) — leave as raw hex inline. They're intentionally bespoke and don't belong in the canon.

If you find yourself reaching for the same hex value across multiple pages, that's a signal to add it to `:root`.

---

## Accessibility — non-negotiable

These come from `styles.css` automatically when you link it:

- `:focus-visible` outline (Perpl Purple, 2px)
- `prefers-reduced-motion` block (kills animations/transitions)
- Mobile-responsive nav (`@media (max-width: 768px)`)

These must be added per page in markup:

- **Skip-to-content link** as the first child of `<body>`:
  ```html
  <a class="skip" href="#main">Skip to content</a>
  ```
- **Semantic main wrapper:** `<main class="prose" id="main">` (or `prose-wide`/`app`/`diagrams`). Not `<div class="page">`.
- **Active nav link** has `aria-current="page"`.
- **Every SVG figure** has `role="img"` and a `<title>` element describing what the diagram shows.
- **Visual-only containers** (bit-tree grids, simulator state vis) get `role="img"` + `aria-label`.
- **Activity logs / step feeds** get `role="log" aria-live="polite" aria-atomic="false"`.
- **Interactive elements** are real `<button>` (or `<a href>`), never `<div onclick>`.

See [`REVIEW.md`](./REVIEW.md) for the full audit checklist.

---

## SVG figure text sizes

The most common readability complaint is tiny text inside diagrams. Inline figures render at ~712px wide in `prose-wide`, so an SVG `<text font-size="8">` shows up at ~7-8 effective pixels — and on mobile it's worse.

Guidance for new diagrams:

- **Aim for `font-size="10"` or higher** on any text the reader is meant to read.
- **`font-size="9"` is OK for axis ticks, secondary annotations, and decorative labels** that contribute to the figure's gestalt but aren't critical.
- **Anything under 9 needs a reason.** If a label "doesn't fit", give the label more space rather than shrinking the type.
- **Always pair dense diagrams with the lightbox** so readers can enlarge for the smallest text. See below.

Page-specific HTML text (`.note`, `.versus-body`, `.callout`, table cells, etc.) follows similar rules: prose body 12-13px minimum, uppercase labels 11px minimum. The canon's typography defaults are fine; this guidance is for the page-specific styles you write inline.

---

## Figure lightbox (opt-in)

Pages with embedded SVG figures (`<svg class="fig-svg">`) can opt into a click-to-enlarge lightbox by including:

```html
<script src="/lightbox.js" defer></script>
```

What it does:

- Wraps every `.fig-svg` in a clickable container.
- Adds a "⤢ Click to enlarge" badge that fades in on hover/focus.
- On click (or keyboard Enter/Space), opens the SVG in a native `<dialog>` modal at up to 1200px wide.
- ESC closes; click backdrop closes; close button is keyboard-focusable.
- No dependencies. Respects `prefers-reduced-motion` automatically (the canon's reduced-motion block already kills transitions globally).

When to use: any explainer where the SVG figures contain text smaller than ~10px or are layout-dense. Order-book, change-order, and security all qualify.

When not to use: pages with no SVG figures, or where the figures are already visually clear at the prose-wide container (~712px usable). Loading the script doesn't break anything if there are no `.fig-svg` elements (it short-circuits), but skip it for cleanliness.

The dialog's chrome and the badge styling are in `styles.css` so the look stays consistent across explainers.

---

## What NOT to do

- **No Wik** in standard explainers. Wik (the candle mascot) is share-card / branding territory.
- **Don't put chrome rules in inline `<style>`.** Chrome lives in `styles.css`. Inline `<style>` is for page-specific styles only (figure CSS, simulator UI, callouts).
- **Don't use Segoe UI.** The font stack is in `styles.css` — Inter via system stack.
- **Don't introduce new colours in CSS without adding to `:root`.**
- **Don't use `var(--perpl)` as a text colour on dark backgrounds.** Use `--indigo`.
- **Don't break the file naming convention.** `overview.html` for prose, `index.html` for interactive.

---

## Ownership

`styles.css` is the source of truth. This document explains it; it does not override it. When the canon evolves, update `styles.css` first, then this document.

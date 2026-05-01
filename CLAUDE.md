# Repo instructions for Claude

You are working in the `perplfoundation/explainers` repo. The team uses you to draft, edit, and review interactive explainers for Perpl (a perpetual futures DEX on Monad).

## Always read these first

When the user asks you to create or edit any explainer, **before writing any HTML**:

1. Read [`STYLE.md`](./STYLE.md) — design rationale, page-type rules, brand colour usage.
2. Skim [`styles.css`](./styles.css) — the canonical chrome. The literal source of truth.
3. If reviewing, read [`REVIEW.md`](./REVIEW.md) — audit checklist.

## When creating a new explainer

1. Create a folder: `<section>/` (kebab-case, e.g. `liquidations/`, `funding-rates/`).
2. Inside, two pages:
   - `overview.html` — prose explanation
   - `index.html` — interactive simulator
3. Each page links the canonical chrome:
   ```html
   <link rel="stylesheet" href="/styles.css">
   ```
4. Each page sets the right `<main>` modifier:
   - Prose: `<main class="prose" id="main">` (or `prose-wide` if it has large embedded SVG figures)
   - Interactive: `<main class="app" id="main">`
5. Each page starts with a skip link as the first child of `<body>`:
   ```html
   <a class="skip" href="#main">Skip to content</a>
   ```
6. Page-specific styles (figures, simulator UI, callouts, equations) go in an inline `<style>` block. Never put chrome rules inline — they live in `styles.css`.
7. If the page has `<svg class="fig-svg">` figures, include the lightbox so readers can click to enlarge them:
   ```html
   <script src="/lightbox.js" defer></script>
   ```
   The script auto-attaches to every `.fig-svg`. No further markup needed. Skip it for pages with no SVG figures.

## SVG figures

When you generate SVG diagrams:

- Set `viewBox` and add the canonical class: `<svg class="fig-svg" viewBox="0 0 W H" role="img" aria-labelledby="figN-title">`.
- First child must be `<title id="figN-title">` describing the diagram for screen readers.
- Avoid `font-size` attributes below 10. Anything 7-9 is hard to read inline and even hard in the lightbox at full zoom. If a label needs more space, give the label more space — don't shrink the type.
- Use the Perpl token palette (`--green`, `--red`, `--blue`, `--purple`, etc.) for fills and strokes. GitHub-palette colours (`#58a6ff`, `#3fb950`, `#f85149`) are tolerated in legacy diagrams but new ones should use Perpl tokens for consistency.

## Brand colour rule (the most common mistake)

- `--perpl` (`#6F5CFF`) — **filled moments only.** Buttons with white text, focus rings, brand fills inside SVGs.
- `--indigo` (`#A2A4FF`) — **text on dark.** Active nav, CTA text, prose accents.

Never use `color: var(--perpl)` on `--bg` directly. Fails AA. Use `var(--indigo)` instead.

## When editing an existing explainer

- Don't add chrome rules to inline `<style>`. If the chrome needs changing, change `styles.css`.
- Don't introduce new colour hex values without adding them to `:root` in `styles.css`.
- Keep figure/simulator/callout CSS inline — it's intentionally page-specific.
- Run the [`REVIEW.md`](./REVIEW.md) checklist before declaring done.

## When reviewing an explainer

Use [`REVIEW.md`](./REVIEW.md). Output findings grouped by P0–P3, with file:line references. Don't auto-fix — present the audit, then ask which bands to fix.

## Don't

- Don't add `Wik` (the candle mascot) to standard explainers. Wik is share-card territory only.
- Don't break the file naming convention (`overview.html` + `index.html`).
- Don't use Segoe UI. Inter is the font; it's already in `styles.css`.
- Don't strip out the skip link, focus ring, or `prefers-reduced-motion` — these are non-negotiable a11y baselines.
- Don't skip linking `styles.css` "to keep the page self-contained." Self-contained is the old way; canonical chrome is the new way.

## Project context

- **Stack:** plain HTML + inline JS for interactives, no build step. Pages are served as static files via GitHub Pages.
- **Audience:** crypto-native and engineering-curious users — they read the prose, then play with the simulator.
- **Tone:** precise, calm, data-grounded. No marketing fluff. Numbers and trade-offs over adjectives.

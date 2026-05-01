# Perpl Explainer Review Checklist

Run this checklist on every explainer before merging. Group findings by priority — P0 blocks ship, P3 is polish. Used by the `/review-explainer` skill on the design side.

The chrome bits (focus ring, reduced-motion, mobile nav) are automatic if `styles.css` is linked correctly. This checklist is for everything else.

---

## P0 — ship blockers

**Chrome integrity**

- [ ] `<link rel="stylesheet" href="/styles.css">` in `<head>` (use `/styles.css` for absolute path; `../styles.css` works locally too)
- [ ] `<title>` ends in `— Perpl` or `Perpl <Section>`
- [ ] Favicon: `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`

**Semantic structure**

- [ ] Skip link is the first child of `<body>`: `<a class="skip" href="#main">Skip to content</a>`
- [ ] Single `<main>` element with one of: `class="prose"`, `class="prose-wide"`, `class="app"`, `class="diagrams"` — and `id="main"`
- [ ] Active nav link has `aria-current="page"`
- [ ] No `<div onclick>` — all interactive elements are real `<button>` or `<a href>`

**Diagram accessibility**

- [ ] Every `<svg>` figure has `role="img"` and a child `<title>` describing what it shows
- [ ] Visual-only containers (bit-tree grids, tree visualisations, animated simulator panels) have `role="img"` and an `aria-label`
- [ ] Activity logs / step feeds have `role="log"`, `aria-live="polite"`, `aria-atomic="false"`
- [ ] If the page has `<svg class="fig-svg">` figures, `<script src="/lightbox.js" defer></script>` is included so readers can enlarge them. No SVG figures on the page → skip the script.

**Brand colour rule**

- [ ] No `color: var(--perpl)` on a dark background (text fails AA). Active nav, CTA text, prose accents → use `var(--indigo)`.
- [ ] `var(--perpl)` only appears as: focus ring outline, `.skip` background, brand fills inside SVGs, or as a button background paired with white/light text.

---

## P1 — should fix

**WCAG AA contrast (4.5:1 normal text, 3:1 large/bold)**

- [ ] Body text on `--bg`: `var(--tx)` = 14:1 ✓
- [ ] Subtitle on `--bg`: `var(--tx2)` = 7:1 ✓
- [ ] Labels / fig titles on `--bg`: `var(--tx3)` = 5.7:1 ✓
- [ ] Spot-check page-specific palettes:
  - `.callout` text colours on tinted backgrounds
  - `.versus-card.them` body text on red-tinted bg
  - Small uppercase labels (`.fig-title`, `.cmp-table th`, etc.)
- [ ] Don't rely on colour alone to communicate state — pair with icon/text/border style.

**Token discipline**

- [ ] No new colour hex values introduced in CSS chrome without adding to `:root` in `styles.css`
- [ ] SVG `fill=`/`stroke=` may use raw hex; CSS chrome may not
- [ ] Page-specific palettes (callout, versus, eq) intentionally bespoke — leave alone

**Cross-page consistency**

- [ ] Active nav uses `var(--indigo)` (not `var(--perpl)`)
- [ ] State-colour semantics match: `--green` = positive/Perpl-side, `--red`/`--red-text` = negative/baseline-side, `--amber` = warning, `--blue` = neutral info
- [ ] CTA pattern: subtle (`.cta-primary` neutral or themed), not solid `--perpl` background
- [ ] If themed CTA used (`.theme-green` etc.), section identity justifies it

**File naming**

- [ ] `overview.html` for prose, `index.html` for interactive
- [ ] No legacy `interactive.html` / other names

---

## P2 — polish

**Readability**

- [ ] Line length ≤ 80ch (680-760px container with 16px text is the sweet spot)
- [ ] Heading hierarchy is sequential — no skipping h1 → h3
- [ ] For pages with 5+ sections, sub-headings (h3) or a TOC after the subtitle help skimming
- [ ] Activity-log / annotation text ≥ 11px
- [ ] Page-specific text (`.note`, `.versus-body`, `.callout`, `.cmp-table`, etc.) ≥ 12px for body content, ≥ 11px for uppercase labels. If you find values like 10-11px in plain prose-style copy, bump them.
- [ ] SVG `<text>` elements ≥ 10px wherever possible. 7-9px text inside diagrams is the most common readability complaint — flag any new SVG that introduces it. Existing legacy SVGs at smaller sizes should be paired with the lightbox so readers can enlarge.

**Touch targets**

- [ ] Interactive controls ≥ 24×24 px (AA), aim for 44×44 (AAA / Apple HIG)
- [ ] Pure visualisation cells (bit-cells, tree-nodes) can be smaller — they're not tappable

**Diagram palette**

- [ ] SVG diagrams may use GitHub colours (`#58a6ff`, `#3fb950`, `#f85149`) — fine
- [ ] If migrating, prefer Perpl tokens (`--blue`, `--green`, `--red`) inside SVGs for cross-page consistency

---

## P3 — nice to have

- [ ] Open Graph / Twitter card meta tags
- [ ] Description meta tag
- [ ] Per-page TOC for explainers > 6 sections
- [ ] Print stylesheet (rare, only if explicitly needed)

---

## Output format

When running this checklist as an audit, output a table grouped by priority:

```
| Priority | Finding | File:line | Suggested fix |
|---|---|---|---|
| P0 | Skip link missing | overview.html:1 | Add <a class="skip" href="#main">Skip to content</a> as first child of <body> |
| P1 | Active nav uses --perpl text | index.html:25 | Change to var(--indigo) |
| ... |
```

Then ask the user which priority bands to fix.

# Contributing a new explainer

This guide is for adding a new explainer to the Perpl explainer set. Most of the heavy lifting is done by the canonical chrome (`styles.css`); your job is to write the content and any page-specific figures or simulators.

## TL;DR

1. Make a folder: `<section>/`
2. Drop in `overview.html` (prose) and `index.html` (interactive)
3. Link `styles.css`, use the `<main>` modifier classes
4. Run `REVIEW.md` checklist before opening a PR

## Step-by-step

### 1. Pick a section name

Kebab-case, lowercase. Should be a thing, not a verb. Examples that exist: `margin`, `security`, `order-book`, `funding`, `numbers`, `change-order`. Make a folder.

### 2. Decide which pages you need

Most sections have two:

- **`overview.html`** — the reader's first stop. Pure prose with maybe some figures. Sets up the "why" and the conceptual model.
- **`index.html`** — the interactive simulator or toy. Lets the reader poke at the system and develop intuition.

Some sections only need one. That's fine — but use the conventional names. Don't invent `interactive.html` or `simulator.html`.

### 3. Set up the boilerplate

For a prose page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/styles.css">
  <title>Your Topic — Perpl</title>
  <style>
    /* page-specific styles only — figures, callouts, etc. */
  </style>
</head>
<body>

<a class="skip" href="#main">Skip to content</a>

<nav class="site-nav">
  <a href="/" class="site-logo"><img src="/Colour=Primary_White.svg" alt="Perpl"></a>
  <div class="site-links">
    <a href="/">← All Explainers</a>
    <a class="active" href="overview.html" aria-current="page">Overview</a>
    <a href="index.html">Interactive</a>
  </div>
</nav>

<main class="prose" id="main">
  <h1>Your Topic</h1>
  <p class="subtitle">A one-sentence promise of what the page will explain.</p>

  <p>Body content...</p>

  <div class="footer">Perpl: Fully on-chain perpetual DEX on Monad</div>
</main>

</body>
</html>
```

For an interactive page, swap `<main class="prose">` for `<main class="app">`, swap `.subtitle` for `.sub`, and add your simulator markup + JS. The skip link, nav, footer, etc. are identical.

### 4. Write the content

- Prose tone: precise, calm, data-grounded. Numbers over adjectives.
- Lead with the user's question, then the mechanism, then the trade-off.
- Each major section gets an `<h2>`. For sections > 5 in length, consider `<h3>` sub-sections.
- Use `<strong>` for emphasis sparingly.
- Figures get `<svg role="img" aria-labelledby="figN-title">` with a `<title id="figN-title">` describing what the diagram shows.

### 5. Use the canon

Don't write your own chrome. The canon covers:

- Colours (palette via `:root`)
- Typography (h1, h2, p, .subtitle / .sub)
- Site nav and active state
- Containers (`main.prose`, `main.app`, etc.)
- CTAs (`.cta-primary`, themed variants)
- Footer
- Mobile responsive nav
- Focus ring, reduced-motion

If you find yourself fighting the canon, that's a signal — either you're doing something wrong, or the canon needs to grow. Open a discussion.

### 6. Add to the landing page

Edit `/index.html` to link your new section.

### 7. Run the review checklist

Open `REVIEW.md` and walk through the P0 and P1 items. Common misses:

- Skip link forgotten
- Active nav uses `var(--perpl)` instead of `var(--indigo)`
- SVG missing `role="img"` + `<title>`
- Inline `<style>` block accidentally redefines body or nav rules

### 8. Open a PR

Title format: `Add <section> explainer` or `Update <section>: <change>`. Include in the description:

- A one-line summary of the page
- Screenshots of overview + interactive
- Confirmation that REVIEW.md P0 items pass

## Working with Claude

The repo has a `CLAUDE.md` file that primes Claude on these rules automatically. When you open a session in this repo, Claude reads it first and knows to:

- Link `styles.css`
- Use `<main>` modifier classes
- Apply the brand colour rule (`--perpl` filled, `--indigo` text)
- Run `REVIEW.md` before declaring done

Just ask: *"Create a new explainer for [topic]"* and Claude will follow the conventions.

If Claude does something off-pattern, point it at `STYLE.md` or `styles.css`.

## Updating the canon itself

Sometimes you'll need a new chrome rule (a new `<main>` modifier, a new CTA theme, a new token). Process:

1. Open a PR that touches `styles.css`, `STYLE.md`, and any pages that use the new rule
2. Get a second pair of eyes — chrome changes affect every page
3. After merge, do a sweep across existing pages to apply the new rule consistently

Don't introduce a one-off chrome rule into a single page's inline `<style>`. That defeats the purpose.

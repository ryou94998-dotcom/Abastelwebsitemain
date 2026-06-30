# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing website for Abastel LLP, hosted on GitHub Pages directly from the `docs/` folder (repo was originally named `abastel`, then renamed to `docs` so GitHub Pages could serve it — see `docs/CNAME` for the custom domain `abastel.in`). No build step, no package manager, no framework: plain HTML/CSS/vanilla JS.

## Commands

There is no build/lint/test tooling. To preview locally, serve `docs/` with any static file server, e.g.:

```
npx serve docs
```

Open `docs/index.html` (or any `docs/pages/*.html`) directly in a browser also works since all asset paths are relative.

## Architecture

**Two different page templates with two different nav/footer strategies:**

- `docs/index.html` and `docs/404.html` have the nav and footer markup written inline in the HTML, and load `js/main.js` (+ `js/animations.js`, and `js/immersive-carousel.js` for index.html only).
- Every page under `docs/pages/*.html` has **no nav/footer markup in the HTML at all**. Instead they load `../js/shared.js`, which injects `NAV_HTML` and `FOOTER_HTML` (defined as template strings inside that file) at the top/bottom of `<body>` on page load. When changing nav links, footer content, the mobile menu, or the contact form's submit handler, the same logic exists in **both** `js/main.js` (for index/404) and `js/shared.js` (for pages) — edit both or they'll drift.
- All pages then load `js/animations.js`, a shared "motion layer" that is additive/defensive (every effect no-ops if its target markup is missing), so it's safe to include on any page. It handles scroll-triggered fade-ups (staggers siblings with `.fade-up`), nav scrolled-state, a scroll progress bar, back-to-top button, and animated stat counters.
- `js/immersive-carousel.js` only powers the homepage's "Our Verticals" carousel (`#immersiveStage`) — a hand-rolled, vanilla-JS reimplementation of Framer's ImmersiveCarousel component: the active card sits centered at full scale, neighbors fan out behind it scaled down/blurred by distance, navigated via arrows, click-to-focus, arrow keys, or horizontal wheel/swipe. Each card's "Explore →" button links out to that vertical's page under `docs/pages/`. Not used on inner pages.

**Active nav state:** `<body data-page="...">` is matched against `data-page` attributes on nav `<a>` links to highlight the current section — this convention must be kept in sync if a page is renamed or a new page added to the nav lists in both `main.js`/index.html and `shared.js`.

**Path conventions:** `docs/index.html` links to `pages/...` and assets as `css/...`/`js/...` (root-relative to `docs/`); files inside `docs/pages/` link back up with `../css/...`, `../js/...`, and `../index.html`. Keep this `../` prefixing consistent when adding new pages.

**Styling:** all styles live in one file, `docs/css/style.css`, built around CSS custom-property design tokens defined in `:root` (colors, fonts `Exo 2`/`DM Sans`, spacing scale `--space-xs..xl`, `--max-w`, `--nav-h`). Prefer reusing existing tokens/utility classes (`.container`, `.grid-2/3/4`, `.btn`, `.display-xl/lg/md`, `.tag`, `.fade-up`) over hardcoding new values. Page-specific one-off styles are added as inline `<style>` blocks in that page's `<head>` rather than polluting the shared stylesheet.

**Contact form:** `docs/pages/contact.html` posts to a Formspree endpoint (`action="https://formspree.io/f/YOUR_FORM_ID"` — currently a placeholder) via `fetch` in the submit handler shared between `main.js`/`shared.js`.

**Verticals:** the business has fixed set of product verticals reflected in nav, footer, and `docs/pages/`: Telecom & Fiber, Plastic Granules & Recycling, Moulds & Machining, Packaging, Aerospace, AI, Software — plus company pages (Our Story, Our Team, Factory Tour, Gallery, Contact). Adding a new vertical means adding it to the nav/footer/mobile-menu markup in *both* `main.js` and `shared.js`, plus the corresponding page under `docs/pages/`.

**Images:** organized by vertical under `docs/` in folders with spaced names (e.g. `docs/Moulding and machining/`, `docs/telecom products/`, `docs/Media/Apple card header images/`) rather than a single `images/` directory.

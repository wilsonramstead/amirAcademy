# Amir Academy Website — Master Improvement Plan

**Status:** REBUILD IMPLEMENTED 2026-07-20 on local `improvements` branch — NOT pushed.
Wilson: preview locally (`python -m http.server 8000`), then merge/push manually.
Outstanding items needing Wilson: see "REMAINING" notes in files 01, 04, 05, 07, 08.
**Created:** 2026-07-20 by Fable
**Site:** https://amiracademy.com (GitHub Pages, CNAME present, branch `master` = live)

---

## ⚠️ Hard Rules (read before ANY work session)

1. **NO `git commit` and NO `git push` — ever.** Wilson commits manually. This site is
   live on GitHub Pages; the `master` branch deploys directly. All work stays as
   uncommitted local changes until Wilson has verified everything locally.
2. **No deployments, no publishing, no external services signed up for** without asking.
3. Verify everything locally first: `python -m http.server 8000` (or any static server)
   from the repo root, then browse `http://localhost:8000`.
4. Before deleting any file, confirm it is referenced nowhere (`grep` across all HTML/CSS/JS).
   Deletions are still local-only and reversible until Wilson commits.
5. Keep the site unmistakably Amir Academy — same structure, content hierarchy, and
   messaging. This is a **premium polish pass**, not a redesign from scratch.

---

## What this site actually is

A static HTML website (9 pages) built on a Bootstrap 4 / jQuery template ("Edugate"-style
gym template), deployed via GitHub Pages. **It is not React Native, not Next.js, no build
step.** The React Native / Expo / Core.X mobile-app prompts do not apply to this repo;
their *intent* (design system, motion, responsive, premium feel, a11y, performance,
conversion) has been translated into the category plans below.

Pages: `index.html`, `about.html`, `kids.html`, `events.html`, `facility.html`,
`pricing.html`, `contact.html`, plus `courses.html` and `gallery.html` (not in the nav
but still cross-linked from other pages) and `main.html` (0 bytes, dead).

## Headline findings from the initial scan (Fable)

| # | Finding | Severity |
|---|---------|----------|
| 1 | **Contact form is broken in production.** `contact.html` posts to `contact_process.php` — GitHub Pages cannot run PHP, so submissions silently fail. This is a lead-generation site for a gym; this is the single most business-critical bug. | CRITICAL |
| 2 | **~572 MB of images**, many single PNGs at 10–21 MB (`kids1.png` 21 MB, `gallery5.png` 20 MB…). `kids.html` has 35 `<img>` tags, `index.html` 32, `events.html` 29 — pages likely weigh 100+ MB. Also a 19 MB `facility.mov`. | CRITICAL |
| 3 | **Zero `loading="lazy"` attributes** anywhere; no `srcset`, no WebP/AVIF, no thumbnails for gallery grids. | CRITICAL |
| 4 | **13 render-blocking CSS files + ~20 jQuery-era JS libraries** loaded on every page (owl carousel, slick, gijgo datepicker, magnific popup, wow, waypoints, counterup, countdown, paroller, nice-select, price-range, ajaxchimp…). Most are unused template leftovers. | HIGH |
| 5 | **Template baggage deployed with the live site:** `doc/` (template documentation, 1.1 MB), `assets/scss/`, `assets/songs/` (7.4 MB of mp3s + `site-audio.js`), empty `main.html`, two bundled jQuery versions. | HIGH |
| 6 | Preloader spinner delays first content; inline styles scattered through headers; `style.css` is ~9,000 lines of template CSS. | MEDIUM |
| 7 | `courses.html` and `gallery.html` orphaned from nav but still linked from page bodies — inconsistent IA. | MEDIUM |
| 8 | SEO foundation exists (meta/OG/canonical/sitemap/robots) but no `LocalBusiness`/`SportsActivityLocation` structured data — high value for a local gym. | MEDIUM |

---

## Category plans (one tracking file each)

| File | Category | Primary owner |
|------|----------|---------------|
| [01-performance.md](01-performance.md) | Images, asset weight, loading strategy | **Opus agents** (mechanical) |
| [02-design-system.md](02-design-system.md) | Visual polish, CSS consolidation, premium feel | **Fable** (judgment) + Opus (sweeps) |
| [03-motion-interaction.md](03-motion-interaction.md) | Hover/scroll/micro-interactions | Fable (direction) + Opus (apply) |
| [04-responsive.md](04-responsive.md) | Mobile/tablet/desktop behavior | Opus (audit) → Fable (decisions) |
| [05-accessibility.md](05-accessibility.md) | WCAG AA: contrast, alt, headings, keyboard | **Opus agents** (mostly mechanical) |
| [06-seo-local.md](06-seo-local.md) | Local SEO, structured data, per-page meta | Opus (implement) after Fable spec |
| [07-content-conversion.md](07-content-conversion.md) | Copy, CTAs, trust, signup funnel | **Fable** (business judgment) |
| [08-tech-debt-cleanup.md](08-tech-debt-cleanup.md) | Dead files, libraries, repo hygiene, contact form fix | Opus (execute) after Fable approves list |

Each file tracks: findings → tasks (checkboxes) → status → verification notes.
Update the file as work progresses in that category.

---

## Execution phases (when Wilson says go)

**Phase 0 — Safety & baseline** (Fable, ~minutes)
- Create a local working branch (`improvements` — local only, never pushed).
- Start local server; capture baseline: page weights, Lighthouse scores, screenshots.

**Phase 1 — Parallel audits** (Opus agents, cheap; Fable synthesizes)
- 4–5 read-only Opus agents fan out: asset/usage inventory, CSS/JS dead-code audit,
  page-by-page visual+responsive audit, accessibility sweep, SEO/content audit.
- Fable merges results into the category files and finalizes priorities.

**Phase 2 — Critical fixes** (mostly Opus, Fable reviews diffs)
- Fix contact form (static-friendly service — Formspree/Web3Forms — **Wilson picks &
  creates the account**; we wire it up).
- Image pipeline: script to convert/resize to WebP + sized fallbacks, gallery thumbnails,
  `loading="lazy"`, `width`/`height` attributes, compress or replace `facility.mov`.
- Delete/quarantine template baggage (approved list in 08).

**Phase 3 — Design & polish pass** (Fable-led; Opus for repetitive application)
- Design tokens, typography scale, button/card consistency, motion, premium details —
  applied page by page per files 02/03/04.

**Phase 4 — Content & conversion** (Fable)
- CTAs, trust signals, pricing clarity, per-page copy tightening (07).

**Phase 5 — Verification** (Opus checks + Fable final review)
- Every page on mobile/tablet/desktop widths, Lighthouse re-run, link check,
  form test, before/after weight table. Wilson reviews locally → commits manually.

---

## Fable vs. Opus credit strategy

**Use Opus agents for** (high volume, low ambiguity — ~70% of total work):
- All Phase 1 read-heavy audits (thousands of lines of template HTML/CSS to inventory).
- Image conversion scripting and the mechanical HTML edits (lazy/srcset/alt/dimensions)
  across all 9 pages.
- Dead CSS/JS confirmation greps and removals from an approved list.
- Repetitive application of an already-decided style change across pages.
- Verification sweeps (link checking, attribute audits, per-page checklists).

**Reserve Fable for** (judgment, synthesis, brand — ~30%):
- Synthesizing audit results and setting priorities.
- Design-system decisions (tokens, type scale, what "premium" means here).
- Hero/pricing/contact UX decisions and all copywriting.
- Reviewing every Opus-produced diff before it counts as done.
- Anything ambiguous, destructive, or brand-facing.

Working pattern per task: **Fable writes a tight spec → Opus agent executes →
Fable spot-checks the diff → tracking file updated.**

---

## Open questions for Wilson (answer whenever — not blocking planning)

1. Contact form backend: Formspree / Web3Forms / other? (Needs an account you create.)
2. Are `courses.html` and `gallery.html` meant to be in the nav, merged into other
   pages, or retired?
3. Is the audio player (`site-audio.js`, `assets/songs/`) still wanted anywhere?
4. Any brand assets beyond `logo.png` (fonts, brand colors, photography you prefer)?

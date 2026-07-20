# 02 — Design System & Visual Polish

**Status:** NOT STARTED (planning only)
**Primary owner:** Fable (design judgment) · Opus for repetitive application sweeps
**Quality bar:** Stripe / Linear / Apple-level polish, adapted to a martial-arts gym —
dark, energetic, confident. Site must stay unmistakably Amir Academy.

## Current state (from initial scan)
- Template-derived look: Bootstrap 4 + ~9,000-line `assets/css/style.css` of generic
  template CSS; `assets/css/main.css` is a 1-line stub.
- Inline styles in structural places (logo text, preloader text, header link) —
  e.g. `index.html` logo: `style="color: white; … font-size: 1.5rem"` and red
  preloader text — signs there is no single source of truth.
- Three icon font systems loaded (Font Awesome, themify, flaticon).
- Body class `black-bg` with red accent (brand direction appears to be black/red/white).

## Audit tasks (Phase 1 — Opus gathers, Fable judges)
- [ ] A1. Inventory every color, font-size, font-family, border-radius, shadow, and
      spacing value actually used across the 9 pages (computed from HTML + used CSS).
      Output frequency tables so Fable can pick the canonical scale.
- [ ] A2. Screenshot every page at 390px / 768px / 1440px (local server + Playwright or
      manual) and file per-page visual issues: alignment, spacing rhythm, hierarchy,
      cluttered or unfinished-feeling sections, weak CTAs, inconsistent cards/buttons.
- [ ] A3. Typography audit: which families load (incl. from template CSS), which are
      used, heading hierarchy per page.

## Design decisions (Fable — after audit)
- [ ] D1. Define tokens as CSS custom properties in ONE new stylesheet
      (`assets/css/site.css` or a cleaned `main.css`): brand colors (black/red/white +
      grays), type scale, spacing scale, radius, shadows, transitions.
- [ ] D2. Pick ONE icon system; map used icons; drop the other two.
- [ ] D3. Canonical button system (primary / secondary / ghost) and card treatment.
- [ ] D4. Section rhythm: consistent vertical padding + max-widths across all pages.
- [ ] D5. Hero treatment for index (currently just "Welcome to / Amir Academy" over a
      slider with a single slide — decide on a stronger hero with real value prop + CTA;
      coordinate copy with 07-content-conversion).

## Implementation tasks (Fable leads pages with judgment; Opus applies decided patterns)
- [ ] I1. Introduce token stylesheet; migrate inline styles into classes.
- [ ] I2. Sweep all 9 pages to the canonical buttons/cards/sections (Opus, per Fable spec).
- [ ] I3. Header/nav polish: consistent sticky behavior, active-page state, spacing.
- [ ] I4. Footer polish: consistent across all pages (audit found footers vary — verify).
- [ ] I5. Kill template leftovers visible in UI (e.g. unused slider markup, placeholder
      sections) — coordinate with 08.

## Verification
- [ ] V1. Side-by-side before/after screenshots per page; consistency checklist
      (one button style, one card style, one heading scale everywhere).

## Progress log
- 2026-07-20 — Plan created. No changes made.

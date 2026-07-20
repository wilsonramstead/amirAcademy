# 05 — Accessibility (WCAG AA)

**Status:** NOT STARTED (planning only)
**Primary owner:** Opus agents (audit + mechanical fixes) · Fable reviews contrast/design calls

## Known risk areas (from initial scan)
- Dark theme with red accents (`black-bg`, red text) — red-on-black frequently fails
  AA contrast (4.5:1); needs measurement and possibly a lighter accent for text uses.
- Template markup: generic `alt="Logo"`-style alts, decorative images likely missing
  empty alts, heading levels chosen for styling not structure.
- jQuery plugins (slicknav menu, magnific popup, carousels) have historically poor
  keyboard/ARIA behavior — needs testing.
- Preloader + WOW.js entrance animations: content hidden until JS; no
  `prefers-reduced-motion` handling (see 03).

## Audit tasks (Phase 1 — Opus)
- [ ] A1. Per page: heading hierarchy (exactly one h1, no skipped levels), landmark
      elements (`header/nav/main/footer` — partially present), page `<title>` +
      `lang` attributes.
- [ ] A2. Every `<img>`: meaningful alt or `alt=""` if decorative. Output fix list.
- [ ] A3. Contrast measurement of every text/background combo in use (from 02/A1 color
      inventory). Flag failures with suggested AA-passing alternatives.
- [ ] A4. Keyboard walk: tab order, visible focus, mobile menu, lightbox, form —
      operable and escapable by keyboard only.
- [ ] A5. Forms (`contact.html`): labels bound to inputs, error messaging, required
      indication.
- [ ] A6. Run axe / Lighthouse a11y audit per page; record scores here.

## Implementation tasks (Phase 2/3 — Opus)
- [ ] I1. Alt text sweep (Fable writes alts for brand-important photos; Opus the rest).
- [ ] I2. Heading/landmark corrections per A1.
- [ ] I3. Contrast fixes via tokens (coordinate with 02 — change the token, not
      scattered values).
- [ ] I4. Focus styles: visible, consistent, on-brand.
- [ ] I5. Form labels/aria + accessible error states.
- [ ] I6. `prefers-reduced-motion` (shared with 03/I4).

## Verification
- [ ] V1. Lighthouse a11y ≥ 95 every page; manual keyboard pass; screen-reader
      spot-check (NVDA) on index + contact.

## Progress log
- 2026-07-20 — Plan created. No changes made.

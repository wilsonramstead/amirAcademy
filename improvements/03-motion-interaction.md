# 03 — Motion & Interaction

**Status:** NOT STARTED (planning only)
**Primary owner:** Fable (direction) · Opus (application across pages)
**Bar:** Subtle, professional motion à la Linear/Stripe/Vercel. Never distracting.
No new heavy libraries — prefer CSS transitions/animations and small vanilla JS
(IntersectionObserver); the goal is to REMOVE jQuery-era animation libs, not add more.

## Current state
- Template ships WOW.js + animate.css (`data-animation="fadeInLeft"` attrs in hero),
  owl carousel, slick, paroller (parallax), counterup, countdown — heavy jQuery-era
  motion stack, mostly unused or used for one tiny effect each.
- Preloader spinner is the first "animation" users see (feels dated; see 01/F6).
- Hover/focus/active states inherited from template CSS — need audit for consistency.

## Audit tasks (Phase 1 — Opus)
- [ ] A1. Inventory every animation/interaction actually present per page: which
      elements animate, which library powers it, is it doing anything valuable.
- [ ] A2. Hover/focus/active state audit for all interactive elements (nav links,
      buttons, cards, gallery items, form fields) — note missing or inconsistent states.

## Direction (Fable)
- [ ] D1. Define a minimal motion system in the token stylesheet: 2–3 durations,
      1–2 easings, standard hover elevation/color transitions, one scroll-reveal
      pattern (IntersectionObserver + CSS class, staggered, `prefers-reduced-motion`
      respected).
- [ ] D2. Decide replacement for WOW.js/animate.css entrance effects (likely the
      IntersectionObserver reveal) and whether any carousel is worth keeping vs.
      a static grid / CSS scroll-snap.

## Implementation tasks
- [ ] I1. Implement reveal utility + apply to section entrances (Opus, per spec).
- [ ] I2. Consistent hover/focus states for nav, buttons, cards, gallery (Opus sweep).
- [ ] I3. Remove replaced animation libraries (coordinate with 08 removal list).
- [ ] I4. Respect `prefers-reduced-motion` globally.

## Verification
- [ ] V1. Click/hover through every page; confirm no jank, no motion on
      reduced-motion, nothing animates "just because".

## Progress log
- 2026-07-20 — Plan created. No changes made.

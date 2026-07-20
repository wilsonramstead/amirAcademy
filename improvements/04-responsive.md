# 04 — Responsive & Cross-Device

**Status:** NOT STARTED (planning only)
**Primary owner:** Opus (audit + mechanical fixes) · Fable (layout decisions)
**Scope:** phones (360–430px), tablets (768–1024px), laptop/desktop (1280–1920px).
Most gym-site traffic is mobile — mobile is the primary target, not an afterthought.

## Current state
- Bootstrap 4 grid + template `responsive.css`; slicknav powers the mobile menu.
- Not yet audited in browser — the template is nominally responsive but heavy images,
  fixed heights, and template sections often break at real sizes.

## Audit tasks (Phase 1 — Opus, local server + narrow/wide viewports)
- [ ] A1. Every page at 360, 390, 430, 768, 1024, 1440, 1920px: note overflow,
      cramped/stretched sections, tiny text, oversized whitespace, awkward stacking,
      images cropping badly, touch targets < 44px.
- [ ] A2. Mobile nav (slicknav) behavior: open/close, styling, does it match brand,
      is the "Contact us" CTA reachable on mobile (currently `d-none d-lg-block` —
      hidden on mobile: confirm and flag).
- [ ] A3. Tables/pricing cards behavior at narrow widths (`pricing.html`).
- [ ] A4. Landscape phone + iPad spot checks.
- [ ] A5. Check `<meta name="viewport">` consistency across all pages and any
      user-scalable restrictions.

## Decisions (Fable)
- [ ] D1. Breakpoint strategy within existing Bootstrap grid (don't replace the grid;
      fix within it).
- [ ] D2. Mobile header pattern: keep slicknav vs. lightweight custom menu (leans
      custom if we're removing jQuery — coordinate with 08).
- [ ] D3. Max-width/readability rules for text-heavy sections on desktop.

## Implementation tasks
- [ ] I1. Fix all issues from A1 page by page (Opus, per Fable decisions).
- [ ] I2. Ensure mobile CTA visibility (header or sticky).
- [ ] I3. Fluid type via `clamp()` for headings in the token stylesheet.

## Verification
- [ ] V1. Re-walk all pages at all A1 widths; zero horizontal scroll, all targets ≥ 44px.

## Progress log
- 2026-07-20 — Plan created. No changes made.

## 2026-07-20 — IMPLEMENTED
- New layout is mobile-first: fluid clamp() type scale, grids collapse 3->2->1, gallery auto-fill, schedule table scrolls in .table-wrap, custom mobile nav with "Book a Free Class" CTA now VISIBLE on mobile (was d-none), 44px+ touch targets.
- REMAINING (Wilson): real-device walk at 360/768/1024 widths — see A1 checklist.

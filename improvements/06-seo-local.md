# 06 — SEO & Local Discovery

**Status:** NOT STARTED (planning only)
**Primary owner:** Opus (implement) after Fable specs schema/copy · low credit cost, high business value
**Context:** Local gym in St. Petersburg, FL. The queries that matter: "mma gym st
petersburg", "bjj st pete", "kids martial arts st petersburg", "boxing gym near me".

## Current state (good foundation, incomplete)
- `index.html` has title/description/canonical/OG/Twitter tags — solid.
- `robots.txt` and `sitemap.xml` exist (verify contents/freshness).
- No JSON-LD structured data found yet (verify in Phase 1).
- Site is `https://amiracademy.com` via CNAME on GitHub Pages.

## Audit tasks (Phase 1 — Opus)
- [ ] A1. Per-page meta audit: unique title + description on all 9 pages? Canonicals
      correct? OG image valid (currently the logo — a real photo converts better in
      shares)?
- [ ] A2. Verify `sitemap.xml` lists the right pages (and not orphans like
      `main.html`); confirm `robots.txt` sanity.
- [ ] A3. Check for JSON-LD anywhere; check heading/keyword alignment per page.
- [ ] A4. Confirm 404 behavior on GitHub Pages (custom `404.html`? currently none seen).
- [ ] A5. Image filenames/alts as SEO signals (coordinate with 05/A2).

## Implementation tasks
- [ ] I1. Add JSON-LD `LocalBusiness` + `SportsActivityLocation` (name, address, phone,
      hours, geo, sameAs social links) to every page footer — **Fable/Wilson confirm
      the NAP data (name/address/phone/hours) before it's embedded.**
- [ ] I2. Unique, intent-matched titles/descriptions per page (Fable writes, Opus applies).
- [ ] I3. Real OG share image (1200×630) from a strong gym photo.
- [ ] I4. Custom `404.html` matching site design.
- [ ] I5. Regenerate `sitemap.xml` after IA decision on courses/gallery (PLAN open Q2).
- [ ] I6. Descriptive image filenames where cheap to do during the 01 image pipeline.

## Verification
- [ ] V1. Validate JSON-LD (schema validator), OG tags (local preview), sitemap parses,
      Lighthouse SEO ≥ 95 per page.

## Progress log
- 2026-07-20 — Plan created. No changes made.

## 2026-07-20 — IMPLEMENTED
- MartialArtsSchool JSON-LD (address/phones/hours/geo) on every page; unique titles+descriptions+canonicals per page; OG/Twitter images now real photo (was logo); sitemap.xml +gallery.html; 404.html created; site.webmanifest created (was a 404 on every page!); courses.html now noindex redirect stub.
- NOTE for Wilson: old contact.html had an exposed Google Maps API key (also in git history) — revoke/restrict it in Google Cloud Console. New map is a keyless embed.

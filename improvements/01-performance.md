# 01 — Performance & Asset Weight

**Status:** NOT STARTED (planning only)
**Primary owner:** Opus agents (mechanical) · Fable specs the pipeline & reviews
**Rule reminder:** local changes only — no commit/push, no deploys.

## Why this matters
This is the single biggest user-facing problem. Individual gallery PNGs are 10–21 MB and
pages embed up to 35 of them with no lazy loading — on a phone over cellular, key pages
may never finish loading. For a local gym site, most visitors ARE on phones.

## Confirmed findings (initial Fable scan, 2026-07-20)

- [ ] F1. `assets/img` = **572 MB**. Worst offenders: `kids1.png` 21 MB, `gallery5.png` 20 MB,
      `gallery2.png` 20 MB, `kids25.png` 19 MB, `kids24.png` 19 MB, `about.png` 18 MB, and
      ~20 more files over 10 MB. All PNG screenshots/photos that should be JPEG/WebP.
- [ ] F2. `assets/img/gallery/facility.mov` = **19 MB** QuickTime file (poor web support).
- [ ] F3. **Zero** `loading="lazy"` attributes across all pages. No `srcset`/`sizes`, no
      `width`/`height` attributes (→ layout shift), no WebP/AVIF.
- [ ] F4. Image counts per page: kids 35, index 32, events 29, about 23, facility 14,
      pricing 11, courses 10, contact 6, gallery 5.
- [ ] F5. 13 render-blocking CSS files in `<head>` on every page; ~20 JS libraries at the
      bottom, most unused (see 08-tech-debt for the removal list; the perf win lands here).
- [ ] F6. Preloader overlay (`#preloader-active`) hides content until JS runs.
- [ ] F7. `assets/songs/` 7.4 MB mp3s + `site-audio.js` still shipped.
- [ ] F8. No font preloading; Font Awesome + themify + flaticon icon fonts all loaded
      (three icon systems).

## Audit tasks (Phase 1 — Opus)
- [ ] A1. Full image inventory: every `<img>`/CSS `background-image` → file, dimensions,
      displayed size, bytes. Output a table sorted by waste (bytes vs. needed).
- [ ] A2. Baseline metrics per page: total transfer weight, request count, Lighthouse
      performance score (local server). Record here for before/after comparison.
- [ ] A3. Confirm which CSS/JS files are actually referenced/used per page.

## Implementation tasks (Phase 2 — Opus executes, Fable reviews)
- [ ] I1. Write a local image pipeline script (e.g. Node `sharp` in scratchpad, or
      ImageMagick/cwebp): resize to max displayed size ×2, export WebP + JPEG fallback.
      Target: no image file over ~300 KB; gallery thumbnails ~50–100 KB.
- [ ] I2. Replace `<img>` tags with `<picture>`/`srcset` + `loading="lazy"` (all except
      above-the-fold hero/logo) + explicit `width`/`height`.
- [ ] I3. Gallery grids: link thumbnail → full image (existing magnific-popup lightbox
      can stay for now) so grids load thumbnails only.
- [ ] I4. Convert `facility.mov` → H.264 MP4 (+ poster image, `preload="none"`), target
      under ~5 MB, or decide with Wilson to move it to YouTube embed.
- [ ] I5. Consolidate CSS: keep bootstrap + one merged site stylesheet actually in use;
      drop unused libs (list approved in 08 first).
- [ ] I6. Replace or minimize preloader (fade only, CSS-driven, never blocks > 300 ms).
- [ ] I7. `defer` remaining scripts; remove unused JS libs (per 08 approved list).
- [ ] I8. Original full-res images: move out of the deployed repo (e.g. local
      `_originals/` added to `.gitignore`) — decide with Wilson; never delete originals.

## Verification (Phase 5)
- [ ] V1. Re-run A2 metrics; add before/after table here. Target: every page < 3 MB
      transfer (ideally < 1.5 MB), Lighthouse perf ≥ 90 desktop / ≥ 80 mobile.
- [ ] V2. Visual spot-check every page — no broken/blurry images, lightboxes still work.

## Progress log
- 2026-07-20 — Plan created; initial findings recorded. No changes made.

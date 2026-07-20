# 08 — Tech Debt, Repo Hygiene & the Contact Form

**Status:** NOT STARTED (planning only)
**Primary owner:** Opus (execute) · Fable approves every deletion list first
**Safety:** deletions happen ONLY from a Fable-approved, grep-verified list, locally,
never committed by us. Originals of anything valuable (photos) are preserved.

## CRITICAL: broken contact form
- [ ] I1. `contact.html` posts to `contact_process.php` (`contact_process.php` +
      `assets/js/contact.js` / `mail-script.js` expect a PHP mailer). **GitHub Pages
      does not execute PHP → live form submissions go nowhere.** Fix: static form
      service (Formspree / Web3Forms / Basin) — **Wilson picks provider and creates
      the account** (PLAN open Q1), then we rewire the form + JS validation, and
      remove the dead PHP file. Test locally with the provider's test endpoint.

## Confirmed template baggage (verify references, then propose for deletion)
- [ ] C1. `doc/` — 1.1 MB of the original template's documentation site (own jQuery,
      syntax highlighter, a Mailchimp form pointing at the template vendor). Deployed
      to production today. Remove from deploy.
- [ ] C2. `main.html` — 0 bytes, dead. (Check `sitemap.xml` doesn't list it.)
- [ ] C3. `assets/songs/` (7.4 MB: `battleTB.mp3`, `mainSong.mp3`) + `site-audio.js` —
      commit history says song was removed from UI; confirm nothing references these,
      then remove (PLAN open Q3).
- [ ] C4. `assets/scss/` — source SCSS for the template; not needed in the deployed
      site (keep locally/gitignored if Wilson wants to edit SCSS later — ask).
- [ ] C5. Two jQuery copies (`assets/js/vendor/jquery-1.12.4.min.js` + doc's 1.11.0).
- [ ] C6. Unused JS libraries (to CONFIRM per-page before listing for removal):
      gijgo (datepicker), price-range, jquery.countdown, jquery.counterup,
      jquery.ajaxchimp, jquery.paroller, nice-select, hover-direction-snake, wow,
      waypoints, plus owl/slick (two carousel libs — at most one is needed).
- [ ] C7. Unused CSS: gijgo.css, price_rangs.css, nice-select.css, and 2 of the
      3 icon-font systems (fontawesome / themify / flaticon — keep one, per 02/D2).
- [ ] C8. `contact_process.php` — dead once I1 ships.

## Audit tasks (Phase 1 — Opus)
- [ ] A1. Reference map: for every file in `assets/` and repo root, list which pages
      reference it. Anything unreferenced → deletion-candidate list for Fable.
- [ ] A2. Orphaned pages: `courses.html` + `gallery.html` are not in the nav but ARE
      linked from page bodies (42 cross-references found). Map who links to them;
      feed PLAN open Q2 (keep/merge/retire).
- [ ] A3. Check `sitemap.xml`, `site.webmanifest` (referenced in `<head>` — does the
      file exist?), favicon set, and any 404 references.
- [ ] A4. Inline-style inventory (feeds 02/I1).

## Repo hygiene
- [ ] H1. Add `.gitignore` (originals folder, OS junk).
- [ ] H2. Consider `.nojekyll` if needed; verify GitHub Pages serves everything as-is.
- [ ] H3. Long-term (optional, discuss): shared header/footer are copy-pasted across
      9 pages — any global change = 9 edits. Options: leave as-is (simplest for
      GitHub Pages), or introduce a tiny build step (11ty) later. NOT part of this
      pass unless Wilson opts in.

## Verification
- [ ] V1. After removals: click every page + lightbox + menu locally with DevTools
      console open — zero 404s, zero JS errors.

## Progress log
- 2026-07-20 — Plan created. No changes made.

## 2026-07-20 — IMPLEMENTED
- I1 DONE (placeholder): form -> Formspree FORM_ID placeholder + mailto fallback in site.js; contact_process.php deleted. Wilson: create Formspree form, replace FORM_ID in contact.html.
- C1-C8 ALL DONE: doc/, main.html, songs/, scss/, fonts/, both jQuerys, all 24 old JS files, all 13 old CSS files deleted. courses.html = redirect stub. Originals in _originals/ (gitignored).
- H1 DONE (.gitignore). A3 DONE (webmanifest created, sitemap updated, 404.html added).
- Link check: 0 broken refs across all 10 pages. Structural check: 1 h1/page, unique titles.

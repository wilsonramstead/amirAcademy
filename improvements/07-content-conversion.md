# 07 — Content, Trust & Conversion

**Status:** NOT STARTED (planning only)
**Primary owner:** Fable (business/copy judgment) · Opus for research/inventory only
**The question every page must answer:** would this convince a parent or an adult
beginner in St. Pete to walk in for a first class?

## Funnel reality check
The #1 conversion path for a gym site is: land → trust → **contact/trial signup**.
Right now the endpoint of that funnel — the contact form — **silently fails in
production** (posts to PHP on GitHub Pages; see 08/I1). Fixing that outranks every
copy improvement in this file.

## Audit tasks (Phase 1 — Opus inventories, Fable evaluates)
- [ ] A1. CTA inventory: every button/link that asks the visitor to act, per page —
      text, destination, visibility. Flag pages with no clear next step.
      (Known: header "Contact us" CTA is hidden on mobile — `d-none d-lg-block`.)
- [ ] A2. Trust-signal inventory: testimonials, coach bios/credentials ("41 years"
      claim on index), photos of real classes, schedule clarity, pricing clarity,
      social links, reviews. What exists, what's missing, per page.
- [ ] A3. Copy pass inventory: template placeholder text still live anywhere? Vague
      headlines? (Hero currently says only "Welcome to Amir Academy" — no value prop.)
- [ ] A4. Pricing page: is the offer understandable in 5 seconds? Is there a
      low-friction first step ("first class free"-type offer) anywhere?
- [ ] A5. Note: index has a commented-out "how to sign up Core.X" section now pointing
      to contact (recent commits) — confirm the Core.X story on the site is coherent.

## Decisions & implementation (Fable — after audit)
- [ ] D1. Primary CTA strategy: one primary action sitewide (e.g. "Book a Free Class"),
      present on every page, visible on mobile (sticky or in-header).
- [ ] D2. Hero rewrite: value prop + location + CTA (with 02/D5).
- [ ] D3. Trust layer: coach credibility, real-photo proof, testimonials/Google
      reviews (ask Wilson what testimonial material exists).
- [ ] D4. Pricing page clarity pass + first-visit offer framing (with Wilson).
- [ ] D5. Per-page closing CTA sections so no page dead-ends.
- [ ] I1. Apply approved copy/CTA changes (Opus for mechanical application).

## Verification
- [ ] V1. Walk the funnel as three personas (parent, adult beginner, experienced
      fighter) on mobile: can each find their program, believe it, and act in
      under a minute?

## Progress log
- 2026-07-20 — Plan created. No changes made.

## 2026-07-20 — IMPLEMENTED
- Funnel unbroken: form posts to Formspree placeholder w/ mailto fallback (never a dead end); "Book a Free Class" CTA in header on every page incl. mobile; hero has real value prop + dual CTAs; cta-band on every page; stale "Next Event: May 9" fixed; index/about duplication resolved (index=overview, about=full story+bios); name spellings standardized (Rasa Lukosiute, Brandon Spenser — VERIFY with Amir which spelling is correct).
- REMAINING (needs Wilson): Formspree account, testimonials/Google reviews material, social media links (none exist on site), free-trial offer wording confirmation ("first class is always free" — confirm this is accurate!).

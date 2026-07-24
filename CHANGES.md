# otoroclub.com v2 — build notes & open decisions

Built from `otoro-website-v2-handoff.md` (multi-page rebuild) plus the mid-build
"The Journey" menu-tab handoff. This file records every decision left as a
`TODO`, every place a brand rule collided with the newer copy system, and the
architectural calls made along the way — per handoff §13.5.

**Status:** shipped to a preview branch (`v2-multipage`), NOT to production.
Production still serves the previous single-page site until Kevin reviews.

---

## Architecture

- **Static build, no framework.** Pages are assembled by `build.mjs` from shared
  partials in `src/partials/` + per-page content in `src/pages/`. Run
  `node build.mjs` to regenerate the flat `.html` files at the repo root. The
  deployed output is pure static HTML (good for crawlers, per-page `<head>`,
  structured data). Edit the partials/pages and rebuild — never hand-edit the
  generated files.
- **Clean URLs** via `vercel.json` (`cleanUrls: true`): `/ceremony/run-of-show`
  serves `ceremony/run-of-show.html`.
- **Palette:** the site was already on the LOCKED brand palette (`#2B3441` /
  `#C4A164` / cream, Hamilton Archive display + Arial body). Kept as-is — this is
  a match-existing situation, not the legacy web palette the proposal sites use.
- **Legacy hash redirects** (`#about`, `#experience`, `#gallery`, …) are mapped
  to the new routes client-side in `script.js` (hashes can't be redirected
  server-side).

## Routes built (28)

Home; ceremony (+ run-of-show, included, food-safety); formats (+ intimate,
social, grand); occasions (+ private-events, weddings, corporate, partnerships);
about (+ team, press); gallery; faq; inquire (+ thank-you); journey;
legal/{privacy, terms, accessibility, food-safety-allergens, cancellation,
cookies}. Plus `sitemap.xml`, `robots.txt`.

`/about/press` was added as the brand-assets **stub** the handoff §3 calls for
(no press logos / "as featured in" / quotes until Kevin supplies cleared assets).

---

## §12 Open Decisions — left as TODO, NOT resolved

Each is marked with a `TODO` comment at the relevant file. Kevin must rule before
these ship.

1. **1989 / Riviera provenance lineage (§12.1).** Omitted, per the May 2026
   rulebook that retired provenance as the differentiator. The newer copy system
   reinstates it as the moat. TODO comment left on `/about`. If reinstated it
   needs its own route and becomes the only place a "best in San Diego"-type
   claim is earned.
2. **"curated" (§12.2).** Treated as banned (rulebook wins over the copy doc).
   Not used anywhere.
3. **"Enquire" (§12.3).** Overruled — American **INQUIRE** only, everywhere.
4. **Superlatives (§12.4).** "best/rarest cuts on earth" softened to neutral
   phrasing ("the rare cuts", "the finest cuts of the fish").
5. **24-hour follow-up promise (§12.5).** Omitted. The thank-you page and
   confirmation copy set an expectation without promising a timeframe.
6. **Whole-fish promise per tier (§12.6).** LIVE, not theoretical — a recent
   engagement was two bigeye, not one bluefin. Hero uses the safe "a fish broken
   down in front of the room". TODO comments on `/formats` and `/formats/intimate`
   flag where to soften "whole fish" → "the finest cuts of the fish" if smaller
   formats receive a portion.

## Brand-rule vs. copy-doc collisions (beyond §12)

- **The Reserve & take-home fish.** The current LIVE site is built around "The
  Reserve" (guests take premium cuts home) and the copy doc makes it a core
  pillar — but the v2 handoff's IA drops it entirely (no Reserve route/section).
  Resolution: followed the handoff — The Reserve is **not** a homepage section or
  route. It survives only (a) verbatim in the ported FAQ answer, and (b) as a
  fixed, non-selectable anchor in The Journey composer (where the Journey handoff
  explicitly requires it). **Decision for Kevin:** does otoroclub.com still lead
  with The Reserve, or is it retired from the marketing narrative? The two
  handoffs disagree.

## Contract-dependent legal copy — TODO

The six legal pages are working-voice drafts. Every place that needs an
authoritative figure or term is a visible `TODO` block (styled `.todo`) or an
HTML comment, because the master services agreement was not available at build
time. Notably: deposit amount & refundability, headcount-lock window (handoff
says 72h — unconfirmed), sourcing-window definition, limitation-of-liability /
insurance language, data-retention period, processor list, permit/cert names.
**Do not publish the legal pages until these are filled from the contract.**

---

## The Journey (`/journey`) — adaptation note

The Journey handoff was written against a **different site variant** than this
repo: it references `--bone` / `--tuna-red` / `--room-bg` tokens, a "qualify-first
router", a "segment intent", and a "fused inquiry form" — none of which exist in
this codebase (this site is navy/cream/gold Hamilton with a standalone
`/inquire`). Rather than block, the intent was honored and adapted:

- Built as a `/journey` route with the composer ending in **this site's real
  inquiry form**, embedded on the same page so it never dead-ends (qualify-first).
- Tokens translated to this site's locked palette; the Nakaochi step uses the
  dark `navy-deep` "room" surface (this site's equivalent of `.room`).
- **§0.2 exposure fork — took the recommended middle path:** three Signature
  Journeys shown in full as illustration + a course palette framed as "a starting
  point, shaped with your itamae". **Kevin still owns this fork** (full
  transparency / middle / signatures-only).
- Choose-counts enforced (Raw 1–2, Warm/Rice 1, etc.); the live cut + The Reserve
  are fixed non-selectable anchors; every composition closes "confirmed with your
  itamae based on your guest count and the fish". No prices, no cart, no storage —
  state is in memory only and the composition serializes into the inquiry email's
  `Journey` field (mailto fallback never blank).
- Nav: added under a top-level **The Journey** entry point in copy and CTAs
  (this site's nav is the 5-flyout system, not the "Experience ▾" dropdown the
  Journey handoff assumed). **TODO for Kevin:** decide whether The Journey should
  live under a flyout or stay a linked destination.

## Not done / needs Kevin

- Fill legal pages from the contract (above).
- Confirm the §12 rulings and the Reserve question.
- Supply: itamae name(s)/bio, per-Signature-Journey photography, a downloadable
  brand-assets pack for `/about/press`.
- Turn on Vercel Web Analytics + Speed Insights in the project (they load only
  after cookie consent).
- Verify the FormSubmit inbox (`reservations@otoroclub.com`) is confirmed on
  FormSubmit so inquiries deliver.
- Full accessibility audit (keyboard paths, focus, contrast) before production.

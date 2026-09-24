# Otoro Club Website — Content & UX Handoff

Generated 2026-09-24 from `~/Sites/otoro-club-website/src`. This is every word of copy currently live on otoroclub.com, in reading order, page by page — built for a rebrand/UX pass, not for a code change.

## Purpose of this doc
---
## Route index

- `/about` — About — Otoro Club
- `/about/press` — Press & Media Kit — Otoro Club
- `/about/team` — The Team — About — Otoro Club
- `/ceremony/cutter` — The Cutter — Blake Ito — Otoro Club
- `/ceremony/food-safety` — Food Safety, Permitting & Load-out — Otoro Club
- `/ceremony/included` — What Is Included — The Ceremony — Otoro Club
- `/ceremony` — The Ceremony — Otoro Club
- `/ceremony/run-of-show` — Run of Show — The Ceremony — Otoro Club
- `/faq` — FAQ — Otoro Club
- `/featured-artist` — Featured Artist — Jacelyn Rene — Otoro Club
- `/gallery` — Gallery — Otoro Club
- `/` — Otoro Club — Live bluefin ceremonies in La Jolla, California
- `/inquire` — Inquire — Otoro Club
- `/journey` — Design Your Journey — Otoro Club
- `/legal/accessibility` — Accessibility Statement — Otoro Club
- `/legal/cancellation` — Cancellation Policy — Otoro Club
- `/legal/cookies` — Cookie Policy & Preferences — Otoro Club
- `/legal/food-safety-allergens` — Food Safety & Allergen Notice — Otoro Club
- `/legal/privacy` — Privacy Policy — Otoro Club
- `/legal/terms` — Terms of Service — Otoro Club
- `/menu` — Menu — Otoro Club
- `/occasions/corporate` — Corporate — Occasions — Otoro Club
- `/occasions` — Occasions — Otoro Club
- `/occasions/partnerships` — Partnerships — Occasions — Otoro Club
- `/occasions/private-events` — Private Events — Occasions — Otoro Club
- `/occasions/weddings` — Weddings — Occasions — Otoro Club


Kevin (Headliner Cards / Akaer Studio) is rebranding Otoro Club and needs to rework the site's UX flow. This is the full copy inventory so that work can start from what's actually live, not a guess. It is a **read-only content snapshot** — it is not the site's source of truth (that's the repo) and editing this file does nothing to the live site.

## How the site is built (matters for UX/IA work)

- **Stack:** no framework. Vanilla HTML/CSS/JS. `src/partials/*.html` (shared chrome) + `src/pages/**/*.html` (one fragment per route, each opening with a `<!--META … META-->` JSON block for `<title>`/description/path) are assembled by `node build.mjs` into flat, crawlable `.html` files at the repo root. **Never hand-edit the generated root `.html` — edit `src/` and rebuild.**
- **25 routes**, one flat level of nesting (`/ceremony/cutter`, `/legal/terms`, etc.), `cleanUrls: true` on Vercel so no `.html` in any link.
- **Nav:** a 5-panel mega-flyout (The Ceremony / Formats / Occasions / About / Plan an Event) on desktop, a burger drawer on mobile. See the full flyout copy in “Primary navigation” below — it effectively **is the site's IA**, more so than any page.
- **No forms anywhere, by design (Kevin's July 2026 call).** `/inquire` and the `/journey` composer both end in a `mailto:reservations@otoroclub.com` button, not a submitted form. If the rebrand reconsiders this, it's a real UX decision, not a bug.
- **No price shown anywhere on the site** (also Kevin's call, same date) — copy uniformly redirects to “pricing is shared when we confirm the date.” The `/menu` and `/journey` pages are built around that absence; worth deciding whether the rebrand keeps price-opacity as a brand stance or changes it.
- **`/journey`** is an in-memory “compose your experience” flow (Signature Journeys + Build Your Own) that pre-fills the `/inquire` mailto — it's the most interactive/app-like part of the site and the best candidate for real UX-flow rework. It is currently **not in the top nav**, only reachable via interior CTAs — flagged as an open decision below.
- **6 legal pages are unvetted drafts** (`/legal/*`) — deposit amount, headcount-lock window, liability language, retention period are still generic placeholder text, not pulled from an actual contract. Don't treat their copy as final/approved.
- **Two locked palettes coexist** in the brand system: the live site runs `#0B1B2B` navy / `#C9A36B` gold / `#F7F4EE` cream (Cormorant Garamond + Inter + DM Mono, but body text is set in Arial on this site specifically — a deliberate per-site departure from the brand skill's Hamilton-Sans rule). A rebrand is a legitimate moment to reconcile this.
- **Gated/unlaunched page:** `/featured-artist` is excluded from the sitemap (pre-launch). Treat its copy as draft.

## Known content caveats (so “missing” or duplicate text isn't mistaken for a typo)

- Some lines repeat 2–3x in a row in this dump (e.g. the homepage's “Exclusive catering engagements in La Jolla, Calif.”). That's real markup — marquee/ticker elements and sr-only/visible duplicate nodes in the source — not an extraction error.
- Bare `-` lines mark list items that had no visible label text of their own (icon-only or a timestamp-only `<li>`) — check the source fragment if one needs context.
- `[→ /path]` after a link's text is that link's destination — pulled straight from `href`, useful for mapping click-through flow without re-clicking the live site.

---
## Shared chrome (appears on every page)

### Utility bar (top strip)  `(src/partials/_utility.html)`

La Jolla, Calif.

reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]
&middot;
@otoroclubsd [→ https://www.instagram.com/otoroclubsd/]

### Primary navigation (mega-flyout + burger drawer)  `(src/partials/_nav.html)`

The Ceremony

The Ceremony

Maguro kaitai, in the room.

Overview

What happens in the room [→ /ceremony#room]
The four movements [→ /ceremony#movements]
The cuts, in sequence [→ /ceremony#cuts]
The itamae [→ /ceremony#itamae]
The Cutter [→ /ceremony/cutter]

Detail

Run of show [→ /ceremony/run-of-show]
What is included [→ /ceremony/included]
Setup & load-out [→ /ceremony/food-safety#load-out]
Food safety & permitting [→ /ceremony/food-safety]

forty minutes. one bluefin. no back-of-house.

Menu

Menu

Ceremonies, stations, and the card.

Deluxe Bluefin Ceremony
130–200 guests
A whole bluefin, and the full crew behind it. [→ /menu#ceremonies]
Bluefin&aacute; Bluefin Ceremony
50–100 guests
The balance of the fish, portioned for the host. [→ /menu#ceremonies]
Bigeye Tuna Ceremony
50–70 guests
The same sequence, on a smaller frame. [→ /menu#ceremonies]

Also

Stations & lighter formats [→ /menu#stations]
Smaller parties [→ /menu#smaller]
The appetizer card [→ /menu#appetizers]
Additions [→ /menu#additions]

Occasions

Occasions

Where the ceremony travels.

Private

Private events [→ /occasions/private-events]
Milestone dinners [→ /occasions/private-events#milestone]
Weddings [→ /occasions/weddings]

Business

Corporate evenings [→ /occasions/corporate]
Brand activations [→ /occasions/corporate#brand]
Client dinners [→ /occasions/corporate#client]

Partners

Venues & hotels [→ /occasions/partnerships]
Resident chefs [→ /occasions/partnerships#chefs]
Preferred vendor [→ /occasions/partnerships#preferred]

the room, mid-service.

About

About

The fish is the programming.

Otoro Club

Who we are [→ /about]
The team [→ /about/team]
Service area [→ /about#service-area]

Media

Gallery [→ /gallery]
Instagram [→ https://www.instagram.com/otoroclubsd/]
Press & media kit [→ /about/press]

Practical

FAQ [→ /faq]
Food safety & allergens [→ /legal/food-safety-allergens]
Contact [→ /inquire]

Plan an Event

Plan an Event

Inquire about a date.

Start

Inquire by email [→ /inquire]
What we need [→ /inquire#date]
Design your journey [→ /journey]

Before you book

What we need from you [→ /inquire#what-we-need]
Venue requirements [→ /ceremony/food-safety#venue]
Deposits & headcount [→ /legal/cancellation#deposits]
Cancellation policy [→ /legal/cancellation]

Contact

reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]
@otoroclubsd [→ https://www.instagram.com/otoroclubsd/]
Inquire [→ /inquire]

Inquire [→ /inquire]

The Ceremony
Overview [→ /ceremony]
The Cutter [→ /ceremony/cutter]
Run of show [→ /ceremony/run-of-show]
What is included [→ /ceremony/included]
Food safety & permitting [→ /ceremony/food-safety]

Menu
The full menu [→ /menu]
Ceremonies [→ /menu#ceremonies]
Stations & lighter formats [→ /menu#stations]
Smaller parties [→ /menu#smaller]
Appetizers [→ /menu#appetizers]
Additions [→ /menu#additions]

Occasions
Overview [→ /occasions]
Private events [→ /occasions/private-events]
Weddings [→ /occasions/weddings]
Corporate [→ /occasions/corporate]
Partnerships [→ /occasions/partnerships]

About
Who we are [→ /about]
The team [→ /about/team]
Gallery [→ /gallery]
FAQ [→ /faq]
Press & media kit [→ /about/press]

Plan an Event
Inquire by email [→ /inquire]
Design your journey [→ /journey]
Venue requirements [→ /ceremony/food-safety#venue]
Deposits & cancellation [→ /legal/cancellation]

Inquire [→ /inquire]

Sushi Glossary

reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]

### Guest-notices band  `(src/partials/_notices.html)`

Guest Notices

Raw seafood. Engagements serve raw and undercooked fish. Consuming raw or undercooked seafood may increase your risk of foodborne illness, particularly for guests who are pregnant, immunocompromised, elderly, or have certain medical conditions.

Allergens. Fish, shellfish, soy, sesame, wheat, and egg are present in our service. Notify us in writing of any allergy at least seven days before the engagement. We cannot guarantee an allergen-free environment.

Sourcing & substitution. Species, cuts, and portioning are subject to availability at market. Where a whole bluefin is unavailable, an equivalent grade may be substituted with notice to the host.

Photography. Engagements may be photographed for our portfolio. Hosts may opt out in writing before the event date. Alcohol service, where added, requires separate arrangement and licensing.

Full food safety & allergen notice [→ /legal/food-safety-allergens]

### Footer  `(src/partials/_footer.html)`

Live bluefin ceremonies as private event programming in La Jolla. A whole fish, broken down by hand in the room, served in sequence as it is cut.

The Ceremony

Overview [→ /ceremony]
Run of show [→ /ceremony/run-of-show]
What is included [→ /ceremony/included]
Food safety [→ /ceremony/food-safety]

Menu & Occasions

Menu [→ /menu]
Occasions [→ /occasions]
Weddings [→ /occasions/weddings]
Corporate [→ /occasions/corporate]
Partnerships [→ /occasions/partnerships]

About

Who we are [→ /about]
The team [→ /about/team]
Gallery [→ /gallery]
FAQ [→ /faq]
Press & media kit [→ /about/press]

Sushi Glossary

Plan an Event

Inquire [→ /inquire]
Venue requirements [→ /ceremony/food-safety#venue]
Deposits & cancellation [→ /legal/cancellation]
reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]

Privacy Policy [→ /legal/privacy]
Terms of Service [→ /legal/terms]
Accessibility [→ /legal/accessibility]
Food Safety & Allergens [→ /legal/food-safety-allergens]
Cancellation Policy [→ /legal/cancellation]
Cookie Preferences [→ #]

@otoroclubsd [→ https://www.instagram.com/otoroclubsd/]
&middot;
La Jolla, Calif. &middot; 2026

&copy; 2026 Otoro Club LLC. All rights reserved. Otoro Club is a private event catering service; we do not operate a restaurant and do not sell fish at retail. Every engagement is quoted to the venue, date, and headcount. Photography depicts prior engagements.

Photography & film: @sam.g.beatty [→ https://instagram.com/sam.g.beatty]

### Cookie consent banner  `(src/partials/_cookie.html)`

We use a small set of cookies to understand how the site is used. You can decline non-essential cookies, manage them, or accept.

Decline
Manage [→ /legal/cookies]
Accept

### Global Sushi Glossary flyout  `(src/partials/_glossary.html)`

Glossary

Reference

## Sushi Glossary

A counter-side reference to the words worth knowing — the formats, the fish, the technique, and the etiquette.

Search the glossary

Clear

---
## Pages

### Route `/about`  `(src/pages/about/index.html)`

- **<title>:** About — Otoro Club
- **meta description:** Otoro Club stages live bluefin ceremonies as private event programming in La Jolla and greater San Diego. Who we are and where we serve.

Otoro Club [→ /]/About

About

# The fish is the programming.

Otoro Club stages live bluefin ceremonies as private event programming
in La Jolla and greater San Diego. We bring the fish, the itamae, and
the room, and run the evening end to end.

Who we are

## A ceremony, made portable.

A whole bluefin, broken down by hand in the room, served in sequence as it is cut.

We built Otoro Club around a single idea: the most memorable part of
an evening should happen in front of the guests, not behind a kitchen
door. So the whole fish comes into the room, the itamae works it by
hand, and every cut is served as it is taken. There is no
back-of-house.

We do events only — no restaurant, no retail, no fish sold at market.
Every engagement is quoted to the venue, the date, and the headcount,
and run by our team from load-in to load-out.

Meet the team [→ /about/team]

Service area

## La Jolla and greater San Diego.

We are based in La Jolla and serve
greater San Diego. The ceremony travels, and setup, service, and
clean-up travel with it. If a venue sits outside the immediate area,
it is worth asking.

Inquire about a date [→ /inquire]

### Route `/about/press`  `(src/pages/about/press.html)`

- **<title>:** Press & Media Kit — Otoro Club
- **meta description:** Brand assets for Otoro Club: logos, photography, and boilerplate for press and partners.

Otoro Club [→ /]/ About [→ /about]/Press & media kit

Press & media kit

# Brand assets, on request.

Logos, photography, and boilerplate for press and partners. For assets
or an interview, write to us and we will send what you need.

Boilerplate

## The short description.

Otoro Club stages live bluefin tuna-cutting ceremonies — maguro
kaitai — as private event programming in La Jolla and greater San
Diego. A whole bluefin is broken down by hand in the room over about
forty minutes, and akami, chutoro, and otoro are served in sequence as
they are cut. Events only; no restaurant and no retail.

Assets

## Logos & photography.

A downloadable brand pack — logo lockups, cleared photography, and
usage notes — is available on request. Email
reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Press%20%26%20media%20kit]
and we will send the current set.

Contact us [→ /inquire]

### Route `/about/team`  `(src/pages/about/team.html)`

- **<title>:** The Team — About — Otoro Club
- **meta description:** The itamae at the board and the service team who run each Otoro Club engagement from load-in to load-out.

Otoro Club [→ /]/ About [→ /about]/The team

The team

# The itamae and the service team.

Every engagement is run by a chef at the board and a service team on the
floor — the people who make the ceremony happen and leave the room clean.

At the board

## One knife, the whole evening.

The itamae leads the breakdown, sets the pace of the tasting, and
keeps the room with the fish. The service team handles the station,
the pass, and load-out, so the host does nothing operational — two
staff members cover load-in and clean-up from end to end.

the team, before the room fills.

Kevin Charles Macaraeg

Marcus Jasso

Armand Vasseghi

Brandon Greenwell

Brendon Jasso

Inquire about a date [→ /inquire]

### Route `/ceremony/cutter`  `(src/pages/ceremony/cutter.html)`

- **<title>:** The Cutter — Blake Ito — Otoro Club
- **meta description:** Blake Ito at the board. Second-generation bluefin, featured at select Otoro Club engagements in La Jolla and greater San Diego.

Otoro Club [→ /]/ The Ceremony [→ /ceremony]/The Cutter

The Cutter

# The hands behind the fish.

Blake Ito is second-generation bluefin. He brings the fish, and the
family that has chosen it, into the room.

Second generation

## The family that chooses the fish, at the board.

The knife, and the family behind it.

His father built the family’s sourcing operation. Blake has worked
in seafood since he was a kid, and he has spent his life around whole
fish — selecting them, breaking them down, and learning what
separates one loin from the next.

So he does not only cut. He comes from the family that has chosen the
fish, whole, for decades. It is the same access the rest of this site
describes, with a name and a knife attached.

The frame, lifted for the room.

What it adds

## What a named cutter changes.

Featured at select engagements. Inquire for availability.

- A named master cutter at the board for the length of the engagement

- The rare cuts — kama collar, cheek, nakaochi — worked by the family that supplies them

- The Reserve, portioned by the person who knows the fish best

Portioning to order, at the board.

the cut, narrated, minutes before it is tasted.

Recent work

## Where the knife has been.

Inquire

## Ask about featuring Blake.

You’re inquiring about: Featuring Blake Ito, master cutter

Tell us the room and the date. Availability is confirmed by
arrangement — Blake is featured at select engagements.

Occasion — optional

Inquire about featuring Blake [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Featured%20cutter%20inquiry]

or copy our address: reservations@otoroclub.com

### Route `/ceremony/food-safety`  `(src/pages/ceremony/food-safety.html)`

- **<title>:** Food Safety, Permitting & Load-out — Otoro Club
- **meta description:** How Otoro Club handles cold chain, food safety, permitting, venue requirements, and load-out for a live bluefin engagement.

Otoro Club [→ /]/ The Ceremony [→ /ceremony]/Food safety & permitting

Food safety & permitting

# Cold chain, permitting, and load-out.

Safe handling of raw fish is built into how the ceremony runs. We
coordinate the requirements for each venue as part of planning the date.

How we handle it

### Cold chain

- Temperature-controlled from delivery through service

- The fish stays whole and cold until it is opened in the room

- Portioning to order keeps the cuts at peak

Venue requirements

## What the room needs.

A load-in path for equipment, a stable surface for the station,
standard power, and access to water where possible. Most private
homes, event spaces, hotels, and clubs qualify without changes. We
walk the specifics for your venue before we confirm the date.

Setup & load-out

## The room is handed back clean.

Load-out is part of every engagement, never a separate charge.

At the close, the team breaks down the station, packs out the
equipment, and removes and disposes of all fish and food waste. Hosts
and venue managers do no teardown. The space leaves as it was found.

Food safety & allergen notice [→ /legal/food-safety-allergens]

### Route `/ceremony/included`  `(src/pages/ceremony/included.html)`

- **<title>:** What Is Included — The Ceremony — Otoro Club
- **meta description:** What an Otoro Club engagement includes, and the short list the host provides. Everything that touches the fish and the floor is ours.

Otoro Club [→ /]/ The Ceremony [→ /ceremony]/What is included

What is included

# Everything but the venue and the guests.

Otoro Club runs every part that touches the fish and the floor — the
sourcing, the itamae, the ceremony, the station, service, and full
load-out. The host provides the room and the guest list.

Included in every engagement

### The fish

- A whole bluefin, sourced against your locked headcount

- Cold-chain handling from delivery to service

- Portioning by hand across the tasting

### The ceremony

- The itamae and the live breakdown

- The tasting served in sequence, cut to order

- Hand rolls and the courses your format calls for

### The service

- Service staff for the pass and the floor

- Station, boards, knives, and the full kit

- Wasabi, ginger, serving utensils, and plates

### Load-in & load-out

- Setup and breakdown of the station

- Removal and disposal of all fish and food waste

- The space handed back as it was found

What the host provides

## A room, power, and the guest list.

We need a venue with access for load-in, a stable surface for the
station, and standard power. Where alcohol is served, it is arranged
and licensed separately. Anything specific to your venue we confirm
during planning.

Venue requirements [→ /ceremony/food-safety#venue]

### Route `/ceremony`  `(src/pages/ceremony/index.html)`

- **<title>:** The Ceremony — Otoro Club
- **meta description:** A whole bluefin broken down by hand in the room. What happens in the room, the four movements, the cuts in sequence, and the itamae at the board.

Otoro Club [→ /]/The Ceremony

Maguro kaitai

# Maguro kaitai, in the room.

A whole bluefin, broken down by hand in front of the guests over about
forty minutes, and served in sequence as it is cut. No back-of-house.
The ceremony is the programming — it decides how the evening moves.

What happens in the room

## One fish, one continuous sequence.

The bluefin arrives whole and stays in view. Nothing is prepped out of sight.

The itamae opens the loin at a station in the room and works it down
by hand, naming each cut in Japanese and English as it comes off the
frame. Portions are passed as they are taken, so the first course a
guest tastes was on the fish a minute earlier. The frame stays on the
table until the last guest leaves.

Because the whole fish is present and the menu is the host’s,
the room can be shaped around the cuts a restaurant rarely plates —
the collar, the cheek, the spine scraped to order.

The four movements

## Arrival. Breakdown. Tasting. Close.

Each engagement runs in four movements, in the same order every time —
about three hours end to end. The room and the headcount change; the
sequence does not.

The full run of show [→ /ceremony/run-of-show]

The cuts, in sequence

## Lean to fat, as the knife reaches them.

### Akami

- The lean loin. Cut first, cleanest expression of the fish.

### Chutoro

- The medium belly. The turn from lean to rich.

### Otoro

- The fattest belly. Served last, at peak.

### Kama &middot; the collar

- A scarce cut a restaurant rarely plates. Two per fish.

lean to fat, laid out in sequence.

The itamae

## One knife. One fish. In the room.

The chef at the board works the whole engagement in front of the guests.

The itamae leads the breakdown, sets the pace of the tasting, and
keeps the room with the fish rather than a kitchen. A service team
handles the station, the pass, and load-out, so the host does nothing
operational.

Inquire about a date [→ /inquire]

### Route `/ceremony/run-of-show`  `(src/pages/ceremony/run-of-show.html)`

- **<title>:** Run of Show — The Ceremony — Otoro Club
- **meta description:** The four movements of an Otoro Club engagement, timed: arrival, the breakdown, the tasting, and the close.

Otoro Club [→ /]/ The Ceremony [→ /ceremony]/Run of show

The four movements

# Forty minutes. One bluefin. No back-of-house.

An engagement runs about three hours in four movements, in the same
order every time. Timings scale a little with the room; the sequence
holds.

-
Arrival &middot; 0:00–0:30

### Whole, on ice.

The bluefin is on the presentation table before anything is served. Guests arrive to it, walk past it, photograph it. Welcome pours as the room fills.

-
The Breakdown &middot; 0:30–1:10

### Forty minutes, in the room.

The itamae opens the loin in front of the guests and names each cut as it is taken. Nothing is prepped out of sight. This is the movement the evening is built around.

-
The Tasting &middot; 1:10–2:15

### Served as it is cut.

Akami, then chutoro, then otoro, portioned and passed in sequence off the board. Hand rolls made to order. Warm and rice courses follow where the format calls for them.

-
The Close &middot; 2:15–3:00

### The room, after.

A final course, and the frame left on the table until the last guest leaves. The team breaks the station down and loads out; the space is handed back clean.

the loin, off the frame.

## Design the evening around it.

Compose a journey course by course, or send us the date and let us shape it with you.

Design your journey [→ /journey]

### Route `/faq`  `(src/pages/faq.html)`

- **<title>:** FAQ — Otoro Club
- **meta description:** Answers on what Otoro Club is, what a full-service engagement includes, food safety and permitting, guest counts, service area, and how to inquire.

Otoro Club [→ /]/FAQ

FAQ

# The questions we are asked.

## Frequently asked questions

### What is Otoro Club?

Otoro Club stages live bluefin tuna-cutting ceremonies as private event programming in La Jolla and greater San Diego. A whole bluefin is broken down by hand in the room over about forty minutes, and akami, chutoro, and otoro are served in sequence as they are cut. We bring the fish, the itamae, the station, and the service team, and run the event end to end. There is no back-of-house.

### What is included in a full-service Otoro Club engagement?

Everything but the venue and the guests. Otoro Club sources the bluefin, brings the itamae and the ceremony, staffs the event, provides the station and service ware, serves the tasting, and handles load-in, service, and full clean up and load out at the close. The host chooses the room and the date. We manage every part that touches the fish and the floor.

### What happens to the rest of the fish?

A whole bluefin yields more than a single evening can serve. On a bluefin ceremony the balance of the fish is guaranteed to the host: portioned by hand, kept on cold chain, and packed at the close. It goes to the host, not to the guests. We call it The Reserve.

### Do you handle clean up and load out after the event?

Yes. Clean up and load out are part of every engagement, never a separate charge. The team breaks down the station, packs out the equipment, removes and disposes of all fish and food waste, and leaves the space as it was found. Hosts and venue managers do no teardown. Two staff members handle load-in and clean up from end to end.

### Is it truly full-service, and what does the host have to do?

Nothing operational. From load-in to load-out, Otoro Club runs the setup, the breakdown, the service, and the clean up. There is no host prep, no coordination needed during the event, and no mess left behind. The host provides the venue and the guest list, and the room is handed back clean at the end of the night.

### What kinds of events do you produce in San Diego?

Otoro Club produces private dinners, weddings, corporate evenings and brand activations, and milestone celebrations across La Jolla and greater San Diego. The ceremony is the same at every occasion: a whole bluefin broken down in the room and served in sequence. Setup, service, and clean up are included whatever the format.

### How does the live bluefin tuna cutting work?

An itamae opens a whole bluefin loin in front of the guests and names each cut — akami, chutoro, otoro — as it comes off the frame. It runs about forty minutes and is both the performance and the meal, served as it is cut. We bring the station, the boards, and the full kit, and pack every piece of it back out during load-out.

### How do you handle food safety and permitting?

Otoro Club handles safety, sanitation, and permitting for each event. Cold-chain handling and safe breakdown of the fish are built into how the ceremony runs, and load-out includes removing and disposing of all fish and food waste, so nothing is left behind for the venue. We coordinate the requirements for each San Diego venue as part of planning the date.

### What areas do you serve?

Otoro Club is based in La Jolla and serves greater San Diego. If a venue sits outside the immediate area, it is worth asking. The ceremony travels, and setup, service, and clean up travel with it.

### How many guests can you accommodate?

Engagements run from a table of ten to twenty up to a room of two hundred. A bigeye ceremony suits fifty to seventy; a bluefin ceremony fifty to one hundred; the Deluxe bluefin ceremony one hundred thirty to two hundred. Smaller parties are served by a private chef or a composed display. We scale the fish, the portioning, and the team to the headcount so the room never feels stretched.

### How do I inquire, and how far in advance?

Email the venue, the date, and a rough guest count to reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]. Because the bluefin is sourced against a locked headcount, it is best to reach out a few weeks ahead. We will confirm the format, walk through what is included from setup through load-out, and hold the date.

Have a date in mind? Inquire about it. [→ /inquire]

### Route `/featured-artist`  `(src/pages/featured-artist.html)`

- **<title>:** Featured Artist — Jacelyn Rene — Otoro Club
- **meta description:** Jacelyn Rene, watercolor and gyotaku artist, working alongside the cutters as Otoro Club's featured artist.
- **excluded from sitemap** (gated/pre-launch)

Otoro Club

## Not yet public.

This page is in preparation. Enter the access phrase to continue.

Access phrase

Enter

Incorrect phrase. Try again.

Featured Artist

# Jacelyn Rene

Gyotaku & Watercolor

Jacelyn Rene works in watercolor and gyotaku — the centuries-old
Japanese practice of taking an impression directly from a fish. She
makes her prints live, at the table, turning the quiet mechanics of a
single fish into something you can keep. We’ve invited her to work
alongside our cutters as Otoro Club’s featured artist.

The tail, inked and ready to press.

The First Cut

## The one part that is never served.

When a bluefin is broken down by hand, the first cut is the tail.
It’s how the cutter reads the fish — the ring of fat, the
color, the grade — and it’s the one part that never
reaches a plate. Jacelyn takes that tail and, while the rest of the
fish is served in sequence, makes a single signed gyotaku from it.

Nothing is wasted. The one part of the fish that is never served
becomes the only part that lasts — a print of the exact fish at
your table, made in the room, the night it was cut.

How it works

## Pressed live, through the seating.

The tail comes off at the start of the ceremony and is pressed live in
front of the room. Jacelyn finishes, mounts, and signs the piece
through the seating. The host leaves with the original; a small,
naturally limited number of additional prints can be pulled from the
same fish for guests who want one.

About Jacelyn

## Art, at the table.

Jacelyn Rene is a watercolor and gyotaku artist who has brought her
live “imprint” work to omakase and fine-dining rooms. Her
practice sits at the intersection of art and the table — pieces
made not only to be seen, but to mark a moment.

jacelynrene.com [→ https://www.jacelynrene.com]
Instagram @jacelynnrene [→ https://www.instagram.com/jacelynnrene/]
TikTok @jacelynnrene [→ https://www.tiktok.com/@jacelynnrene]

The work

## A print of the exact fish.

A finished gyotaku, signed and framed.

Inquire

## Add Jacelyn to your ceremony.

Tell us the room and the date, and we will bring the artist with the fish.

Inquire about featuring Jacelyn [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Featured%20artist%20inquiry&body=Inquiring%20about%3A%20Adding%20Jacelyn%20Rene%2C%20featured%20artist%0A%0AVenue%3A%20%0ADate%3A%20%0AGuest%20count%3A%20%0A%0AAbout%20the%20event%3A%20]

or copy our address: reservations@otoroclub.com

### Route `/gallery`  `(src/pages/gallery.html)`

- **<title>:** Gallery — Otoro Club
- **meta description:** A private ceremony, in frames: the whole fish, the breakdown, the tasting, and the room.

Otoro Club [→ /]/Gallery

Gallery

# A private ceremony.

The whole fish, the breakdown, the tasting, and the room. Photography by @sam.g.beatty [→ https://instagram.com/sam.g.beatty].

cut to order, served in low light.

the fish, brought in whole.

the station, mid-service.

hand rolls, made to order.

the knife, over the loin.

the room, between courses.

nothing left off the board.

the team, before the room fills.

the room, after.

whole, before the first cut.

the loin, off the frame.

lean to fat, in sequence.

belly, seared to order.

presented, cut to order.

hand rolls, with caviar.

the tasting, laid out.

the team, at the pass.

the room, together.

## See it in your room.

Send the venue and the date, and we will come back with what the ceremony looks like there.

Inquire about a date [→ /inquire]

### Route `/`  `(src/pages/index.html)`

- **<title>:** Otoro Club — Live bluefin ceremonies in La Jolla, California
- **meta description:** Otoro Club stages live bluefin ceremonies as private event programming in La Jolla and greater San Diego. A whole bluefin broken down by hand in the room, served in sequence as it is cut.

Exclusive catering engagements in La Jolla, Calif.

Exclusive catering engagements in La Jolla, Calif.

La Jolla, Calif.

# A fish broken down in front of the room.

Live bluefin ceremonies as private event programming. A whole fish,
opened by hand and served in sequence as it is cut.

Inquire [→ /inquire]

01 / The Ceremony [→ /ceremony]

01 / The Ceremony

## The main event.

Otoro Club stages live bluefin ceremonies as private event
programming in La Jolla.

A whole bluefin is broken down by hand in the room over about forty
minutes. Akami, chutoro, and otoro are portioned and served in
sequence as they are cut. The itamae works the loin in front of the
guests and names each cut as it comes off the frame. There is no
back-of-house, and no kitchen between the knife and the guest.

The ceremony is what the evening is built around. It decides where
guests stand, when the room turns, and what people are still talking
about on the way out.

Maguro kaitai
The breakdown itself. A whole tuna taken apart by hand, in view, in one continuous sequence.

Akami &middot; Chutoro &middot; Otoro
Lean loin, medium belly, fattest belly. Cut and served in that order, as the knife reaches them.

Itamae
The chef at the board. One knife, one fish, working the whole engagement in the room.

Read the ceremony in full [→ /ceremony]

The four movements

## The knife, the room, the sequence.

Each engagement runs in four movements, in the same order every time.
The room and the headcount change. The sequence does not.

-
Arrival &middot; 0:00–0:30

### Whole, on ice.

The bluefin is on the presentation table before anything is served. Guests arrive to it, walk past it, photograph it. Welcome pours.

-
The Breakdown &middot; 0:30–1:10

### Forty minutes, in the room.

The itamae opens the loin in front of the guests. Each cut is named as it is taken, in Japanese and English. Nothing is prepped out of sight.

-
The Tasting &middot; 1:10–2:15

### Served as it is cut.

Akami, then chutoro, then otoro, portioned and passed in sequence off the board. Hand rolls made to order.

-
The Close &middot; 2:15–3:00

### The room, after.

A final course and the frame left on the table until the last guest leaves.

The full run of show [→ /ceremony/run-of-show]

02 / Menu

## Ceremonies, stations, and the card.

A whole bluefin or a bigeye, opened in the room and served in sequence.
Lighter formats for a cocktail hour, and a table for ten to twenty.

### Deluxe Bluefin Ceremony

130–200 guests

- a 100–120 pound bluefin, opened in the room.

- the full sequence, through the &#333;toro finale.

- two chefs, two sous chefs, and four on the floor.

### Bluefin&aacute; Bluefin Ceremony

50–100 guests

- the same fish, the same sequence, a smaller room.

- the balance of the fish, guaranteed. portioned and packed for the host.

### Bigeye Tuna Ceremony

50–70 guests

- a 40–60 pound bigeye from hawaii.

- the ceremony on a smaller frame.

Stations, smaller parties, the appetizer card, and additions sit alongside any ceremony.

The full menu [→ /menu]

03 / Gallery

## A private ceremony.

cut to order, served in low light.

the station, mid-service.

hand rolls, made to order.

the room, between courses.

the team, before the room fills.

the room, after.

The full gallery [→ /gallery]

Instagram

## The room, as it happens.

@otoroclubsd [→ https://www.instagram.com/otoroclubsd/]

04 / Inquire

## Inquire about a date.

Tell us the venue, the date, and the guest count. We will come back with
what the ceremony looks like in that room.

reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]

Inquire [→ /inquire]

### Route `/inquire`  `(src/pages/inquire/index.html)`

- **<title>:** Inquire — Otoro Club
- **meta description:** Tell us the venue, the date, and the guest count, and we will come back with what a live bluefin ceremony looks like in that room.

Otoro Club [→ /]/Inquire

Plan an event

# Inquire about a date.

Tell us the venue, the date, and the guest count. We will come back with
the format, what is included from setup through load-out, and hold the
date.

Inquiry

## Write us a line.

Send the venue, the date, and a rough guest count to
reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]
and we will take it from there.

Email us [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry&body=Venue%3A%20%0ADate%3A%20%0AGuest%20count%3A%20%0AOccasion%3A%20%0A%0AAbout%20the%20event%3A%20]

or copy our address: reservations@otoroclub.com

Because the bluefin is sourced against a locked headcount, a few weeks’ notice is best.

What we need from you

## Three things to start.

The venue, the date, and a rough guest count are enough to begin. If
you have allergies or dietary needs, note them — fish, shellfish, soy,
sesame, wheat, and egg are present in our service, and we ask for any
allergy in writing at least seven days ahead. From there we confirm the
format, walk through what is included from setup through load-out, and
hold the date. If your venue is undecided, tell us the area.

Design your journey first [→ /journey]

### Route `/journey`  `(src/pages/journey.html)`

- **<title>:** Design Your Journey — Otoro Club
- **meta description:** Compose your party's experience from the whole fish — a starting point, shaped with your itamae. Every path begins an inquiry.

Otoro Club [→ /]/The Journey

The Journey

# Design your journey.

One whole fish, served the way you choose. A starting point — your final
menu is shaped with your itamae, and set by your guest count and the
fish. No prices here; this begins a conversation, not an order.

Always included

The live cut

A whole bluefin broken down by hand in the room, served in sequence as it is cut.

Always included

The Reserve

The balance of the fish, portioned by hand and packed cold at the close. It goes to the host.

Two ways in

## Be guided, or compose your own.

Be guided
Three Signature Journeys, composed for you.

Compose your own
Step through the courses and shape the evening.

### The Cut

Four courses

- Sashimi Platter

- Nakaochi in the room

- Otoro Signature Roll

- Grilled Kama

Choose The Cut

### The Ceremony

Five courses

- Otoro Flight

- Nakaochi in the room

- Hand-Roll Bar

- Aburi Ō-toro

- Negitoro Donburi

Choose The Ceremony

### The Omakase

Five courses, with an elevation

- Sashimi Platter

- Nakaochi in the room

- Toro-Taku

- Chū-toro Sukiyaki

- Ochazuke

- Caviar Service elevation

Choose The Omakase

A starting point — your final menu is shaped with your itamae, and set by your guest count and the fish.

Your journey

## The evening, so far.

Choose a Signature Journey or compose your own, and it builds here.

Every journey is confirmed with your itamae based on your guest count and the fish size.

Begin your inquiry

## Send it as the start of a conversation.

You’re planning:

Your journey travels with the email — we will confirm the format, the guest count, and the fish with your itamae.

Email your inquiry [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]

or copy our address: reservations@otoroclub.com

The Reserve is included on every bluefin ceremony, and goes to the host.

### Route `/legal/accessibility`  `(src/pages/legal/accessibility.html)`

- **<title>:** Accessibility Statement — Otoro Club
- **meta description:** Our commitment to an accessible website, known gaps, and how to report a barrier.

Otoro Club [→ /]/Legal/Accessibility

Legal

# Accessibility Statement

Last updated: July 2026.

Otoro Club wants this site to be usable by everyone. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.

## What we do

- Text is set at readable sizes with sufficient contrast.

- The site works with a keyboard; menus and controls are reachable and dismissible, with a visible focus indicator.

- Images carry descriptive alternative text.

- Motion is limited to gentle fades and respects the “reduce motion” setting.

## Known gaps

## Report a barrier

If you run into a barrier on this site, tell us and we will work to fix it and to give you the information you need another way. Email reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Accessibility] and a person will respond.

### Route `/legal/cancellation`  `(src/pages/legal/cancellation.html)`

- **<title>:** Cancellation Policy — Otoro Club
- **meta description:** Deposits, the headcount lock, cancellation inside the sourcing window, and rescheduling.

Otoro Club [→ /]/Legal/Cancellation Policy

Legal

# Cancellation Policy

Last updated: July 2026.

Because each engagement is built around a whole bluefin sourced for your date and headcount, our deposit and cancellation terms protect the sourcing. The signed services agreement controls; this page summarizes it.

## Deposits & headcount

A deposit secures the date and the fish. Final headcount locks ahead of the event, and the bluefin is sourced against that number.

## Cancellation

Once the fish is sourced for your date, that cost cannot be recovered, so cancellations inside the sourcing window are non-refundable to the extent of what has been committed.

## Rescheduling

Where a date can be moved before the fish is sourced, we will work with you to reschedule and to apply your deposit to the new date, subject to availability.

## Contact

reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Cancellation%20policy].

### Route `/legal/cookies`  `(src/pages/legal/cookies.html)`

- **<title>:** Cookie Policy & Preferences — Otoro Club
- **meta description:** The categories of cookies this site uses, their purposes, and how to change your preferences.

Otoro Club [→ /]/Legal/Cookie Policy

Legal

# Cookie Policy & Preferences

Last updated: July 2026.

This site uses a small set of cookies and similar storage. You can decline non-essential cookies without losing access to the site.

## Categories

### Essential

Used to remember your cookie choice so we do not ask again. Stored in your browser under otoro.cookieConsent. Always on; without it we cannot honor your preference.

### Analytics

Vercel Web Analytics and Speed Insights help us understand how the site is used and how fast it loads. These are first-party and cookieless, and they load only after you accept. If you decline, they are not loaded.

## Change your preferences

Reopen the cookie choices at any time using the button below, or clear this site’s data in your browser.

Manage cookie preferences

## Contact

reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Cookie%20policy].

### Route `/legal/food-safety-allergens`  `(src/pages/legal/food-safety-allergens.html)`

- **<title>:** Food Safety & Allergen Notice — Otoro Club
- **meta description:** Raw seafood, allergens, sourcing and substitution, cold-chain handling, permitting, and the seven-day written allergy notice.

Otoro Club [→ /]/Legal/Food Safety & Allergens

Legal

# Food Safety & Allergen Notice

Last updated: July 2026.

## Raw seafood

Our engagements serve raw and undercooked fish. Consuming raw or undercooked seafood may increase your risk of foodborne illness, particularly for guests who are pregnant, immunocompromised, elderly, or who have certain medical conditions. Guests should make their own decision accordingly.

## Allergens

Fish, shellfish, soy, sesame, wheat, and egg are present in our service. Please notify us in writing of any allergy at least seven days before the engagement so we can plan for it. We prepare food in a shared environment and cannot guarantee an allergen-free environment.

## Sourcing & substitution

Species, cuts, and portioning are subject to availability at market. Where a whole bluefin is unavailable, an equivalent grade may be substituted with notice to the host.

## Cold chain & handling

The fish is kept temperature-controlled from delivery through service. It stays whole and cold until it is opened in the room, and portions are cut to order. Load-out includes removing and disposing of all fish and food waste, so nothing is left behind for the venue.

## Permitting

We handle safety, sanitation, and permitting for each event, and coordinate the requirements for each venue as part of planning the date.

## Photography

Engagements may be photographed for our portfolio. Hosts may opt out in writing before the event date. Alcohol service, where added, requires separate arrangement and licensing.

### Route `/legal/privacy`  `(src/pages/legal/privacy.html)`

- **<title>:** Privacy Policy — Otoro Club
- **meta description:** How Otoro Club collects, uses, and protects the information you share through an inquiry.

Otoro Club [→ /]/Legal/Privacy Policy

Legal

# Privacy Policy

Last updated: July 2026.

This policy explains what Otoro Club LLC (“Otoro Club,” “we”) collects when you contact us, why we collect it, and the choices you have. We are a private event catering service in La Jolla, California.

## What we collect

When you email us an inquiry, we receive whatever you include: your name, email address, and any details you choose to share — typically the venue, the event date, the estimated guest count, and notes about the occasion. We do not run a form on this site; inquiries reach us by email.

## Why we collect it

We use this information to respond to your inquiry, plan and quote an engagement, coordinate the event, and keep records of our bookings. We do not sell your information.

## How it is handled

Inquiries reach us by email and are stored in our email and business records. We use hosting and analytics providers to run this site.

- Hosting: Vercel.

- Analytics: Vercel Web Analytics and Speed Insights, loaded only after you accept cookies.

## Retention

We keep inquiry records for as long as needed to respond and to maintain our business records.

## Your rights — California residents

Under the California Consumer Privacy Act (CCPA/CPRA), California residents may request access to, correction of, or deletion of the personal information we hold, and may ask how it is used. We do not sell personal information. To make a request, email reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Privacy%20request].

## Contact

Questions about this policy: reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Privacy%20policy].

### Route `/legal/terms`  `(src/pages/legal/terms.html)`

- **<title>:** Terms of Service — Otoro Club
- **meta description:** The terms that apply to using this site and to inquiring about an Otoro Club engagement.

Otoro Club [→ /]/Legal/Terms of Service

Legal

# Terms of Service

Last updated: July 2026.

These terms apply to your use of otoroclub.com and to inquiries made through it. The engagement itself is governed by the written services agreement between Otoro Club LLC and the host, which controls if anything here conflicts with it.

## What we provide

Otoro Club is a private event catering service. We stage live bluefin tuna-cutting ceremonies as event programming. We do not operate a restaurant and do not sell fish at retail.

## Inquiries and quotes are not offers

Information on this site, and any estimate or quote we provide, is for planning only and is not a binding offer. An engagement is confirmed only by a signed services agreement and the required deposit.

## Deposits, headcount, and substitution

A deposit secures the date and the sourcing of the fish. Final headcount locks ahead of the event, and the fish is sourced against it. Species, cuts, and portioning are subject to availability at market, and an equivalent grade may be substituted with notice to the host.

## Venue access

The host is responsible for arranging venue access for load-in and load-out, a suitable space and power for the station, and any permissions the venue requires. Where alcohol is served, it is arranged and licensed separately.

## Limitation of liability

## Governing law

These terms are governed by the laws of the State of California, without regard to conflict-of-laws rules.

## Contact

reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Terms%20of%20service].

### Route `/menu`  `(src/pages/menu/index.html)`

- **<title>:** Menu — Otoro Club
- **meta description:** The Otoro Club menu — bluefin and bigeye ceremonies, stations, smaller parties, the appetizer card, and additions. Every engagement includes utensils, accoutrements, and cleaning.

Otoro Club [→ /]/Menu

Menu

# The offerings.

every engagement includes all utensils, ginger, shoyu, wasabi, plates,
and accoutrements. cleaning fee included.

Ceremonies [→ #ceremonies]
Stations [→ #stations]
Smaller parties [→ #smaller]
Appetizers [→ #appetizers]
Additions [→ #additions]

Ceremonies

## A whole fish, opened in the room.

### Deluxe Bluefin Ceremony

130–200 guests

- 100–120 pound bluefin tuna (ensenada, mx)

- tuna presentation and commentary

- nakaochi

- tray pass appetizer &middot; marinated tofu

- sashimi platter service

- handroll bar service

- aburi (torched sashimi) service

- &#333;toro sashimi grand finale

2 chefs &middot; 2 sous chefs &middot; 2 back of house &middot; 1 front of house

### Bluefin&aacute; Bluefin Ceremony

50–100 guests

- 100–120 pound bluefin tuna (ensenada, mx)

- tuna presentation and commentary

- nakaochi

- tray pass appetizer &middot; marinated tofu

- sashimi platter service

- handroll bar service

- aburi (torched sashimi) service

- &#333;toro sashimi grand finale

- the balance of the fish, guaranteed. portioned and packed for the host.

1 chef &middot; 1 sous chef &middot; 1 back of house &middot; 1 front of house

### Bigeye Tuna Ceremony

50–70 guests

- 40–60 pound bigeye tuna (hawaii)

- tuna presentation and commentary

- nakaochi

- tray pass appetizer &middot; marinated tofu

- sashimi platter service

- handroll bar service

- aburi (torched sashimi) service

- &#333;toro sashimi grand finale

1 chef &middot; 1 sous chef &middot; 1 back of house &middot; 1 front of house

Inquire [→ /inquire]

Stations & lighter formats

## Half a fish, or a station.

### Bigeye Tuna Appetizer

50–70 guests

- half of a 40–60 pound bigeye tuna (hawaii)

- tray pass or stationed

- cocktail-hour sashimi. light bites.

### Tuna Handroll Bar

50–70 guests

- a standing handroll station. made to order, eaten in hand.

- sets up wherever the room gathers.

the station, mid-service.

Smaller parties

## Ten to twenty guests.

### Private Chef

- a menu shaped to the table.

### Sushi & Sashimi Displays

- prepared in our kitchen and delivered composed.

- or arranged on site by our chef to suit the room.

- for birthdays and corporate gatherings that call for the table without the ceremony.

Inquire [→ /inquire]

Appetizers

## Two knives.

this card is bluefin, and nothing else. two knives — raw and seared.

Raw

Bluefin Carpaccio italian
akami sliced thin. olive oil, lemon, sea salt, shaved fennel.

Bluefin Crudo italian
ch&#363;toro cut thick. olive oil, flaky salt, citrus, chili.

Tartare Classique french
hand-cut akami. dijon, shallot, caper, chive. served on toast.

Tostada de At&uacute;n baja
raw bluefin on a crisp tostada. chipotle mayo, avocado, crispy leek.

Aguachile sinaloan
bluefin in chile-lime-cucumber broth. served cold, in glass.

Seared

Ventresca a la Plancha spanish
belly seared on the flat top. sea salt, olive oil.

Morrillo andalusian
the nape, seared. a cut from the ronqueo tradition of c&aacute;diz.

Tuna au Poivre french
pepper-crusted loin, seared rare. sliced, cognac cream.

Harissa-Seared Bluefin north african
harissa crust. yogurt-tahini.

Additions

## Set alongside any offering.

### Event Photography

- lauren evelyn. eight events shot with otoro club.

### Gyotaku Prints

- a live painting during the event. a gyotaku print taken from the very fish you are eating. hand signed, each one of a kind.

- five prints made per event.

## Inquire

Tell us the date, the room, and how many. We’ll take it from there.

reservations@otoroclub.com [→ mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry]

Inquire about a date [→ /inquire]

### Route `/occasions/corporate`  `(src/pages/occasions/corporate.html)`

- **<title>:** Corporate — Occasions — Otoro Club
- **meta description:** Client dinners, brand activations, and team evenings built around a live bluefin ceremony.

Otoro Club [→ /]/ Occasions [→ /occasions]/Corporate

Corporate

# Something for the room to gather around.

Client dinners, brand activations, and team evenings. The ceremony gives
a corporate room a center and a reason to stay in it.

Client dinners

## A dinner that carries the room.

For a table of clients or partners, the breakdown does the work a
speech usually has to. The evening has a shape without a program, and
the conversation follows the fish. Discreet, seated, and run end to
end by our team.

Brand activations

## Built to be in the room, not on a screen.

A live moment a brand evening can be planned around.

The whole fish, the knife, and the sequence give an activation a
genuine centerpiece — one that photographs and holds a standing crowd.
We work with your team on the format, the pass, and how it sits inside
the wider night.

Design your journey [→ /journey]

## Plan a corporate evening.

Send the venue, the date, and a rough headcount, and we will come back with the format.

Inquire about a date [→ /inquire]

### Route `/occasions`  `(src/pages/occasions/index.html)`

- **<title>:** Occasions — Otoro Club
- **meta description:** Where the ceremony travels: private events, weddings, corporate evenings and brand activations, and venue and chef partnerships.

Otoro Club [→ /]/Occasions

Occasions

# Where the ceremony travels.

Wherever the room is, the fish, the itamae, the boards, and the service
come with it. The ceremony is the same at every occasion — a whole
bluefin broken down in the room and served in sequence.

The occasions

## One ceremony, every room.

01

### Private Events

Milestone dinners, donor evenings, and private-home hosting. The full ceremony brought to a room you have already chosen.

Private events &rarr; [→ /occasions/private-events]

02

### Weddings

A live breakdown as the cocktail-hour centerpiece, or a reception course cut to order while the room is standing.

Weddings &rarr; [→ /occasions/weddings]

03

### Corporate

Client dinners, brand activations, and team evenings that need something for the room to gather around.

Corporate &rarr; [→ /occasions/corporate]

04

### Partnerships

Preferred-vendor relationships with hotels, clubs, and event spaces, and collaborations with resident chefs.

Partnerships &rarr; [→ /occasions/partnerships]

## Tell us the occasion.

Send the venue, the date, and a rough headcount, and we will shape the ceremony to the night.

Inquire about a date [→ /inquire]

### Route `/occasions/partnerships`  `(src/pages/occasions/partnerships.html)`

- **<title>:** Partnerships — Occasions — Otoro Club
- **meta description:** Preferred-vendor relationships with hotels, clubs, and event spaces, and collaborations with resident chefs.

Otoro Club [→ /]/ Occasions [→ /occasions]/Partnerships

Partnerships

# A ceremony your calendar can rely on.

For venues, hotels, clubs, and resident chefs: a recurring live bluefin
engagement that gives your programming a night guests remember.

Venues & hotels &middot; Preferred vendor

## Programming, not just catering.

As a preferred vendor, Otoro Club brings a repeatable centerpiece to
your event calendar — one your team can offer hosts without building
it from scratch each time. We handle the fish, the ceremony, and
load-out; your room and your team stay yours.

Resident chefs

## A collaboration at the board.

The breakdown as one movement inside a larger menu.

We collaborate with resident and guest chefs on recurring dates — the
live cut and the tasting alongside a kitchen’s own courses. The
format is planned together so the ceremony sits inside the evening
rather than beside it.

Start a conversation [→ /inquire]

## Build a partnership.

Tell us about your venue or your program, and we will find the right recurring shape.

Inquire [→ /inquire]

### Route `/occasions/private-events`  `(src/pages/occasions/private-events.html)`

- **<title>:** Private Events — Occasions — Otoro Club
- **meta description:** Milestone dinners, donor evenings, and private-home hosting, with the full live bluefin ceremony brought to your room.

Otoro Club [→ /]/ Occasions [→ /occasions]/Private events

Private events

# The ceremony, in your room.

Milestone dinners, private-home hosting, and donor evenings. We bring
the whole engagement to a venue you have already chosen and run it end
to end.

Milestone dinners

## A night people remember by the fish.

A birthday, an anniversary, a homecoming, a private celebration. The
breakdown gives the evening a center, and the tasting gives it a
shape — guests move from the arrival to the cut to the courses
together. Everything that touches the fish and the floor is ours; the
host provides the room and the guest list.

Design your journey [→ /journey]

## Host the evening.

Send the venue, the date, and a rough headcount, and we will come back with the format.

Inquire about a date [→ /inquire]

### Route `/occasions/weddings`  `(src/pages/occasions/weddings.html)`

- **<title>:** Weddings — Occasions — Otoro Club
- **meta description:** A live bluefin breakdown as the cocktail-hour centerpiece, or a reception course cut to order while the room is standing.

Otoro Club [→ /]/ Occasions [→ /occasions]/Weddings

Weddings

# The cocktail hour, remembered.

A live breakdown as the centerpiece of the cocktail hour, or a reception
course cut to order. The ceremony holds a standing room and gives guests
a moment to gather around.

Cocktail hour &middot; Reception

## A course guests talk about.

The whole fish arrives before service and the breakdown opens the
hour — sashimi and hand rolls cut to order, passed while the room
mingles. It sits alongside your caterer and bar rather than replacing
them, and the pacing is set with your planner and itamae.

Design your journey [→ /journey]

## Plan the hour.

Send the venue, the date, and a rough headcount, and we will shape it with your planner.

Inquire about a date [→ /inquire]

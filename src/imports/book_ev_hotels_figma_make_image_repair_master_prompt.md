# BOOK EV HOTELS — IMAGE REPAIR, FULL UX/UI REDESIGN & PRODUCTION-READY FIGMA MAKE MASTER PROMPT

## ROLE
Work inside the EXISTING Book EV Hotels project as a senior product designer, UX architect, visual designer, brand designer, UX writer and frontend engineer.

Do NOT create a generic hotel website from scratch. Inspect the existing application first, preserve useful routing/data/component architecture, then repair and redesign it.

Current project context: React + TypeScript + Vite + Tailwind + React Router with routes for Home, Search, Hotel Detail, Booking, Destinations/State/City, Guides, Report, FAQ, About, List Your Hotel, Auth, Account, Legal and 404.

The supplied screenshots show a critical current defect: several hotel/destination images fail to load, leaving blank/faded areas, dark-green blocks and visible alt text. The current experience also needs stronger hierarchy, storytelling, visual consistency and booking clarity.

The mission is:
1. Fix the image system completely.
2. Remove blank/faded/broken image states.
3. Redesign the entire product coherently.
4. Simplify the booking/search experience.
5. Make every route genuinely responsive, accessible and production-ready.

---

# 01 — NON-NEGOTIABLES

- Do not start from a blank project.
- Inspect the existing codebase before changing it.
- Preserve useful existing architecture.
- Do not merely repaint the existing UI.
- Do not create a generic AI-generated travel template.
- ZERO visible broken-image states in the final product.
- ZERO visible browser broken-image icons.
- ZERO exposed alt text caused by failed image rendering.
- Do not fabricate hotel counts, charger specs, ratings, testimonials, availability, pricing, verification dates or contacts.
- Do not expose developer/prototype notes to customers.
- Everything must be responsive.
- Everything interactive must have proper states.
- Target WCAG 2.2 AA.

---

# 02 — FIRST TASK: AUDIT EVERY IMAGE REFERENCE

Before visual redesign, inspect the entire project for:

- `<img>` elements
- `src=` values
- `srcSet`
- `images.unsplash.com`
- `photo-` identifiers
- CSS `background-image`
- image URL arrays
- hero images
- hotel images
- room images
- destination images
- guide images
- report imagery
- avatars/logos/decorative imagery

Create an internal image inventory with:

- file/component using it
- asset path/URL
- whether it resolves
- content relevance
- duplicate usage
- fallback behavior

Do not assume a URL is valid because the string looks correct.

---

# 03 — FIX THE ROOT CAUSE, NOT THE SYMPTOM

The current project relies heavily on remote Unsplash photo identifiers. The screenshots show that some sources load and some fail.

Do NOT solve this by adding a darker overlay or a green background.

Actually replace invalid/unreliable sources and build robust fallbacks.

---

# 04 — CENTRALIZE THE IMAGE SYSTEM

Create a single image registry, for example:

`src/data/images.ts`

or an equivalent maintainable structure.

Centralize:

- hero images
- hotel images
- room images
- destination images
- guide images
- report images
- fallback assets

Avoid scattering raw image URLs across JSX.

---

# 05 — PREFER LOCAL ASSETS FOR PRODUCTION

For production reliability, prefer assets committed to the repository:

`public/images/...`

or

`src/assets/images/...`

Use descriptive names, for example:

- hero-ev-road.jpg
- destination-jaipur.jpg
- destination-manali.jpg
- destination-coorg.jpg
- destination-udaipur.jpg
- hotel-jaipur.jpg
- hotel-manali.jpg
- room-deluxe.jpg
- room-suite.jpg
- guide-road-trip.jpg

Reuse existing valid local assets when available.

If the Figma Make environment requires importing new visual assets, create/import them correctly. NEVER reference imaginary file paths.

---

# 06 — DO NOT BLINDLY KEEP CURRENT UNSPLASH IDS

If an external image is retained temporarily:

- use a complete verified URL
- verify it resolves
- provide a fallback
- keep it out of critical product paths where possible

Core hero, hotel, room and destination imagery should not depend on an unverified external identifier.

---

# 07 — CREATE A SAFE IMAGE COMPONENT

Create a reusable component such as:

`SafeImage` or `ResponsiveImage`

Responsibilities:

- primary image
- loading skeleton
- fixed aspect ratio
- `onError` handling
- known-good fallback source
- designed final placeholder if fallback fails
- lazy/eager loading depending on context
- async decoding where appropriate
- responsive sizing
- accessible alt text

Behavior:

1. Load primary image.
2. If it fails, switch to a known-good fallback.
3. If fallback fails, render an intentional contextual placeholder.
4. Never leave a broken `<img>` visual on screen.

Keep meaningful alt text for accessibility, but do not let browser failure UI expose it.

---

# 08 — FALLBACK DESIGN SYSTEM

Use contextual fallbacks.

Hero:
Dark neutral + subtle travel/EV visual.

Hotel card:
Neutral warm surface + hotel/EV icon.

Room:
Neutral interior/hotel visual.

Destination:
Subtle road/destination illustration.

Guide:
Editorial neutral visual.

Do not use pure black.
Do not use an empty white rectangle.
Do not use the same huge generic placeholder everywhere.

---

# 09 — FIX THE EXACT SCREENSHOT PROBLEM

The supplied screenshots show:

- The Fern Residency Jaipur card with a blank image region and visible alt text.
- Jaipur/Udaipur destination tiles as dark blank blocks with alt text.
- Some destination imagery loads correctly while other tiles fail.
- Dark overlays make missing images look like intentional dark-green tiles.

All such states must disappear.

The final screen must show either the intended image or a designed fallback.

---

# 10 — IMAGE WRAPPER RULES

Every image-bearing component must use an aspect-ratio wrapper.

Hotel cards:
4:3 or 3:2

Destination cards:
1:1 or deliberate editorial ratio

Guide cards:
16:9

Hero:
wide 16:9-ish ratio

Rooms:
4:3

Avoid layout shifts while images load.

---

# 11 — IMAGE CROPPING

Use `object-fit: cover` and deliberate `object-position`.

Do not accidentally crop:

- faces
- hotel entrances
- charger hardware
- important buildings
- landscapes that define the destination

Mobile crops must be reviewed separately from desktop crops.

---

# 12 — IMAGE PERFORMANCE

Above-the-fold hero image:
prioritize loading.

Below-the-fold images:
lazy-load when appropriate.

Avoid loading giant source images into small cards unnecessarily.

Use responsive dimensions and stable wrappers.

---

# 13 — IMAGE CONTENT QUALITY

Do not use the exact same generic hotel/room photo for every property merely to fill space.

When unique imagery is unavailable, use an intentional generic fallback instead of pretending a photo represents that hotel.

Do not present generated/fake property photography as authentic hotel photography.

---

# 14 — HOMEPAGE HERO

Improve the current hero.

Eyebrow:
VERIFIED EV STAYS ACROSS INDIA

H1:
Charge your car.
Then enjoy your stay.

Supporting copy:
Find hotels where the EV charging setup is verified before you book — so your road trip does not end with a charging surprise.

Primary interaction:
Unified hotel search.

Secondary:
How verification works →

Hero imagery must load reliably.
Do not drown it in a heavy black overlay.

---

# 15 — HOMEPAGE SEARCH: REBUILD IT

The current search bar is overloaded and visually misaligned.

Replace the permanent fields:

Where to?
Check-in
Check-out
Rooms
Adults
Children
Search

with a unified four-part desktop structure:

[ Where are you going? ] [ Dates ] [ Guests ] [ Search hotels ]

Guests opens a popover:

Adults      − 2 +
Children    − 0 +
Rooms       − 1 +

Dates opens a date-range picker.

Do NOT keep Adults, Children and Rooms as three always-visible bottom-row controls.

---

# 16 — SEARCH BAR ALIGNMENT

The entire search bar must feel like one object.

All controls must share:

- height
- vertical centering
- padding
- baseline
- border treatment
- icon alignment

Remove:

- awkward second rows
- isolated people icon columns
- oversized empty areas
- misaligned search button

---

# 17 — DATE PICKER

Use a real date-range interaction.

Requirements:

- past dates disabled
- checkout after checkin only
- clear start/end states
- highlighted range
- desktop two-month option where useful
- mobile one-month option
- keyboard accessible
- touch-friendly

Never hard-code historical prototype dates.

---

# 18 — DESTINATION AUTOCOMPLETE

Use only destinations actually supported by available data.

Do not show fabricated counts.

Focus state:

Popular EV destinations

Bengaluru
Goa
Jaipur
Udaipur
Coorg
Manali

Selected value should be clear.

---

# 19 — GLOBAL DESIGN SYSTEM

The brand should combine:

EV mobility
Indian travel
hospitality
trust
clarity

Primary brand color:
EV/forest green

Supporting:
light green
warm off-white
white
charcoal
slate
neutral grays

Semantic:
Success green
Warning amber
Error red
Info blue

Do not make every component green.

---

# 20 — TYPOGRAPHY

Use a modern, readable sans-serif system.

H1:
48–64 desktop
36–42 mobile

H2:
32–40 desktop
28–32 mobile

H3:
22–26

Body:
16–18

Small:
13–14

Labels:
12–13

Avoid excessive 11px typography.

---

# 21 — SPACING

Use a consistent 4px-based scale:

4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96

Avoid arbitrary spacing values across the UI.

---

# 22 — LAYOUT GRID

Desktop:
12 columns

Tablet:
8 columns

Mobile:
4-column conceptual structure

Max content width:
approximately 1200–1280px

Keep page edges and content alignment consistent.

---

# 23 — HOTEL CARD

Structure:

Image
Save
Verified EV badge
Hotel name
Stars
Guest rating
Location
EV summary
Price
Cancellation
CTA

Example:

✓ Verified EV Charger
22 kW AC · Type 2
Guest Only · Free

From ₹X / night

[ View hotel ]

Do not show fake urgency such as “Only 2 left”.
Do not claim free cancellation unless supported by the relevant room/rate.

---

# 24 — HOTEL DETAIL GALLERY

Implement:

desktop = main image + thumbnails
mobile = swipe gallery

Add:
View all photos

Clicking opens a lightbox.

All images use SafeImage.

---

# 25 — HOTEL DETAIL INFORMATION HIERARCHY

The page should answer:

1. Can I stay here?
2. Can I charge here?
3. What exactly is available?
4. Which room can I book?
5. What will it cost?

Order:

Hotel hero
EV charging summary
Dates + availability
Rooms
Amenities
Location
Policies
Reviews if actual data exists
Booking CTA

---

# 26 — EV CHARGING SUMMARY

Make this a core brand component.

Example:

YOUR EV CAN CHARGE HERE

✓ Verified charging

22 kW AC
Type 2
2 charging points

Guest Only
Free

Fields:

Access
Power
AC/DC
Connector
Points
Fee
App required
Notes

Missing information:
Not confirmed

Never invent missing charger data.

---

# 27 — SEARCH RESULTS

Desktop structure:

Filters | Results | Optional Map

Header:
12 verified EV stays in Bengaluru

Context:
Bengaluru
15 Oct – 17 Oct
2 guests · 1 room

Every hotel result must display a working image or an intentional fallback.

---

# 28 — SEARCH FILTERS

Useful filters:

Verification/access:
Verified
Public
Guest Only

Charger:
AC
DC
Type 2
CCS2

Power:
7.4 kW+
22 kW+
50 kW+

Charging terms:
Free
Paid
App required

Hotel:
5 star
4 star
Price
Parking
Pool
Spa

Do not create excessive filtering complexity.

---

# 29 — MOBILE SEARCH RESULTS

Use:

[ Filters ] [ Sort ] [ Map ]

Filter sheet should be full-screen or bottom-sheet.

Use sticky:
[ Show X stays ]

Never allow result images to distort layout.

---

# 30 — DESTINATIONS INDEX

Editorial travel discovery.

H1:
Go farther.
Stay charged.

Cards:
working image/fallback
city
state
EV verification signal

No fabricated counts.
No dark blank tiles.

---

# 31 — STATE PAGE

Real state template with:

breadcrumb
hero
intro
city links
verified hotel count from available data
public charging count when supported
highest confirmed power when supported
hotel cards

If empty:
clear honest empty state.

---

# 32 — CITY PAGE

Create:

EV-friendly hotels in [City]

Then:

story/introduction
search CTA
charging overview
hotel results
travel guidance
FAQ

Do not use fallback fake numbers.

---

# 33 — GUIDES INDEX

Editorial experience.

H1:
Know more. Drive further.

Each card:
working image
category
title
description
reading time
updated date

Category filters must actually work.

---

# 34 — GUIDE ARTICLE

Every guide slug must render its corresponding article.

Hero image via SafeImage.

Use real section anchors.

Do not reuse one unrelated image for every article.

---

# 35 — REPORT

Do not make fictional metrics look authoritative.

If prototype data is being shown:
label it.

Charts/data cards should degrade gracefully when no visual asset is available.

---

# 36 — ABOUT

Tell the story:

EV travel should feel freeing, not uncertain.

The problem:
travellers need confidence that charging exists at the hotel.

The solution:
make charging details visible and verifiable before booking.

Use authentic travel imagery or intentional fallback visuals.

---

# 37 — LIST YOUR HOTEL

Headline:
Bring EV travellers to your hotel.

Flow:

Property details
→ EV details
→ Photos
→ Contact
→ Review
→ Submit

Image upload previews must support:
loading
success
error
replace
remove

---

# 38 — AUTH

Login/signup should be visually calm and image-light.

Use a brand image only if it genuinely helps.
Avoid unnecessary remote-image dependencies.

---

# 39 — ACCOUNT

Prioritize:

Bookings
Saved stays
Profile
Booking detail

Saved hotel images must use SafeImage.

---

# 40 — LEGAL + 404

Legal pages should be clean and readable.

Do not expose prototype/legal-placeholder notes.

404 message:
Looks like this road doesn't exist.

CTA:
Find EV hotels

---

# 41 — HEADER

Desktop:

Book EV Hotels
Explore EV Hotels
Destinations
Travel Guides
EV Hotel Report
About

Actions:
List Your Hotel
Saved
Account
Search Hotels

Homepage:
transparent over hero

After scroll:
white + border

Mobile:
logo + search + menu

Do not overload navigation.

---

# 42 — FOOTER

Group:

Explore
For travellers
For hotels
Company
Legal

Use SVG icons for social icons rather than fragile image assets.
Only show real links.

---

# 43 — RESPONSIVE REQUIREMENTS

Explicitly inspect:

1440
1280
1024
768
600
480
390
375
320

No:

- horizontal scroll
- clipped images
- clipped typography
- overlapping controls
- stretched cards
- broken mobile galleries
- blank image rectangles
- navigation collisions

---

# 44 — ACCESSIBILITY

Target WCAG 2.2 AA.

All images:
meaningful alt text

Decorative images:
empty alt where appropriate

Gallery:
keyboard accessible

Date picker:
keyboard accessible

Inputs:
visible labels

Focus:
clear visible indicator

Never rely on color alone.

---

# 45 — IMAGE FAILURE MUST NOT BECOME UX FAILURE

If an image cannot be loaded:

- card dimensions stay stable
- title remains visible
- CTA remains usable
- fallback is intentional
- content hierarchy remains intact

The user must still be able to understand and use the component.

---

# 46 — OVERLAY RULES

Use image overlays only to improve text contrast.

Preferred:
transparent-to-dark gradient concentrated near text.

Do not apply a heavy full-surface dark overlay.

Do not use green as a substitute for missing imagery.

---

# 47 — BOOKING ARCHITECTURE

Flow:

Hotel
→ Dates
→ Room
→ Guest details
→ Review
→ Payment
→ Confirmation

Use centralized booking state.

Preserve state across steps and back navigation.

Never hard-code old dates or “2 nights”.

---

# 48 — PRICE CALCULATION

Dynamic:
room price × nights
+
taxes × nights
=
total

Always derive nights from selected dates.

---

# 49 — PAYMENT

Remove developer/prototype wording.

States:

idle
loading
failure
retry
success

Do not falsely state a live payment occurred if no payment backend exists.

---

# 50 — CONFIRMATION

Headline:
You’re booked.

Show:

hotel
dates
room
guest count
total
booking ID
EV charging plan
address
directions/contact actions

Make the charging plan prominent.

---

# 51 — HUMAN UX WRITING

Tone:

helpful
warm
practical
confident
Indian-English

Avoid:

“seamlessly unlock”
“revolutionary”
“next-generation”
“elevate your journey”
“powered by innovation”

Prefer:

“Know where you’ll charge before you book.”

“Find a stay that works for both you and your car.”

“Long drive ahead? Start with a hotel you can trust.”

“Your room is booked. Your charging plan is clear.”

---

# 52 — ANTI-AI DESIGN DIRECTION

Avoid:

- excessive pill shapes
- excessive rounded cards
- heavy gradients
- glassmorphism
- neon glow
- abstract blobs
- unnecessary floating UI
- repetitive three-card blocks
- excessive shadows
- generic technology imagery

Use:

- editorial travel layouts
- authentic imagery
- strong typography
- restrained borders
- deliberate asymmetry
- generous whitespace
- clear information hierarchy

---

# 53 — COMPLETE ROUTE INVENTORY

Redesign and verify all existing routes:

/
/search
/hotels/:slug
/booking/:slug/rooms
/booking/:slug/guest
/booking/:slug/review
/booking/:slug/payment
/booking/:slug/confirmation
/destinations
/destinations/:state
/destinations/:state/:city
/guides
/guides/:slug
/india-ev-hotel-report
/faqs
/about
/list-your-hotel
/list-your-hotel/success
/login
/signup
/account
/account/bookings
/account/bookings/:id
/account/saved
/privacy
/terms
/cookies
404

---

# 54 — GLOBAL IMAGE QA

For EVERY route verify:

1. Every intended image loads.
2. Every failed source has a fallback.
3. No broken-image icon.
4. No exposed broken alt text.
5. Correct aspect ratio.
6. Correct crop.
7. Correct overlay.
8. Mobile crop is intentional.
9. Loading does not shift layout.
10. Lazy loading is appropriate.

---

# 55 — INTERACTION QA

Test:

search
destination autocomplete
date picker
guest selector
filters
sort
map/list
save hotel
gallery
room selection
booking steps
payment retry
confirmation
account navigation
mobile menu
FAQ accordions
forms

No dead controls.

---

# 56 — DATA QA

Do not fabricate:

hotel counts
reviews
ratings
charger specs
availability
pricing
verification claims
contacts
security claims
customer stories

Use:

Not confirmed

or omit the metric when unsupported.

---

# 57 — IMPLEMENTATION ORDER

PHASE 1 — Audit code and routes

PHASE 2 — Audit and repair ALL images

PHASE 3 — Build centralized image registry + SafeImage

PHASE 4 — Design tokens

PHASE 5 — Header/global shell

PHASE 6 — Homepage + new search component

PHASE 7 — Search/results

PHASE 8 — Hotel detail/gallery

PHASE 9 — Booking flow

PHASE 10 — Destinations

PHASE 11 — Guides/report

PHASE 12 — List Your Hotel

PHASE 13 — Auth/account

PHASE 14 — Legal/404

PHASE 15 — Responsive QA

PHASE 16 — Accessibility QA

PHASE 17 — Full image regression

PHASE 18 — Final visual polish

---

# 58 — FINAL IMAGE REGRESSION

Before completion, search the full codebase for:

- `images.unsplash.com`
- `photo-`
- empty `src`
- broken asset paths
- dead CSS background images
- unresolved image variables
- placeholder URLs

Any external image that remains must be verified or protected by SafeImage.

Then inspect every major route visually.

ZERO visible broken images are allowed.

---

# 59 — FINAL VISUAL REGRESSION

Check:

1440×900
1280×800
1024×768
768×1024
390×844
375×812
320×720

Verify:

- no broken images
- no faded image blocks
- no accidental green image backgrounds
- no exposed alt text
- no misaligned search fields
- no overflow
- no clipped text
- no dead CTA
- no inconsistent card sizing
- no broken responsive behavior

---

# 60 — FINAL QUALITY BAR

The finished Book EV Hotels website must feel:

TRUSTWORTHY
HUMAN
PREMIUM
CLEAR
PRACTICAL
EV-FIRST
INDIA-RELEVANT
RESPONSIVE
ACCESSIBLE
PRODUCTION-READY

A first-time visitor must understand:

What this product is.
Why the charging information matters.
How the verification concept works.
How to search.
How to understand charging details.
How to choose a room.
How the booking works.
What happens after booking.

And no missing image should ever make the product look broken.

---

# START NOW

Inspect the existing project first.

Fix the image system before polishing the visual design.

Then redesign the product route-by-route.

Start with the broken image system and homepage search experience, then continue through every route.

Do not stop after fixing the first few cards.

Do not leave placeholder/faded sections unresolved.

Build the final experience around:

“Know your stay.
Know your charger.
Enjoy the drive.”

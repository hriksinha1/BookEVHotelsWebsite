# BOOK EV HOTELS — REPAIR, COMPLETION AND REDESIGN MASTER PROMPT FOR FIGMA MAKE AI

**You are working on an existing Figma Make project: the Book EV Hotels website (React 19 + TypeScript + Vite + Tailwind CSS 4 + React Router 7 + Lucide, Rubik font, ~4,400 lines across 15 page files and 5 shared components, 8 mock hotels). Do not start from scratch and do not merely repaint it. First inspect the current project, keep the useful architecture (routes, typed hotel dataset, EVBadge semantics, verified-first card hierarchy, colour tokens), then repair every defect listed below, redesign the storytelling and UX page by page, and build every page and state in the route matrix. Deliver one coherent, production-quality, fully responsive, frontend-only product that feels handcrafted by an experienced product and design team, not generated.**

Implementation target: React + TypeScript + Vite + Tailwind CSS 4 + React Router + Lucide, structured so Aceternity UI–style patterns can be layered in later (used sparingly) and an Appwrite backend and Vercel deployment can follow. Use mock data only. Do not integrate real payments, inventory, maps, auth or partner APIs.

**Non-negotiables**
1. The EV verification proposition is the primary differentiator and stays visually ownable on every page.
2. Every page belongs to one design system (tokens below). No page-specific styling drift.
3. The product must not look AI-generated (see Anti-AI rules).
4. No fabricated numbers, awards, ratings, guarantees, customer counts or press. Unknown data is shown as unknown.
5. No developer or prototype language ever appears in customer-facing UI.

---

## 1. PRODUCT

**Book EV Hotels** is an EV-first hotel discovery and booking experience for India. Differentiator: **EV charger verification + charger transparency + hotel discovery + stay booking.**
Journey: plan a trip → enter destination → choose dates → find a verified EV hotel → review the charging setup → choose a room → book → arrive with confidence.
Desired reaction: *"Finally, a travel product that understands why charging matters."*

**What "Verified" means (must be stated consistently everywhere):** the charger was confirmed with the property by phone, at a point in time, after the hotel submitted charger details and exactly two charger photos. Minimum qualifying charger: 7.4 kW AC; a domestic 15A/16A socket does not qualify. Verified does **not** mean real-time uptime, guaranteed availability or guaranteed vehicle compatibility. Approved phrasing: "Verified with the hotel", "Verified by phone", "Last verified: {date}", "Verified EV charger available", "Charging available for guests". Never use "EV Charging Included", "guaranteed", or "working right now".

**Charger access:** *Public* = available to non-guests too (never implies free). *Guest Only* = reserved for staying guests. Fee is Free / Paid / Not confirmed. Unknown values always read: "Power not confirmed", "Connector not confirmed", "Fee not confirmed", "App requirement not confirmed" (and the full line "Verified charger — detailed power information unavailable"). Never show unknown values as 0 or invent them.

**Two booking models, always visibly different**
- *Direct:* "Book on Book EV Hotels" → in-platform room selection, guest details, review, payment, confirmation.
- *Partner:* "Check availability" with "You'll complete your reservation on our booking partner." (Agoda). Present the partner path with equal dignity, never as a lesser experience, and never blur it with direct booking.
- *Future, optional:* "Reserve your charging slot" (date, time, duration, charger type, estimated fee), shown only when a property supports it and always separate from room booking.

## 2. USERS

EV road-tripper; family EV traveller; business EV traveller; EV-curious guest; hotel owner/manager. On mobile the first screen must answer: where can I stay, can I charge, who can use the charger, what kind is it, can I book it.

## 3. AUDIT — WHAT EXISTS TODAY AND WHAT MUST BE FIXED

Inspect the project and fix all of the following. This list comes from reading the repository and is not exhaustive; look for more of the same kind.

### 3.1 Broken routes and structure
- **`/destinations/:state` has no state page.** It renders the City template with an undefined city, producing the heading "EV-Friendly Hotels in " (empty). Build a real State template.
- **`/account/bookings/:id` has no route.** "View details" on a booking card lands on the 404 page. Build Booking Detail.
- **`/guides/:slug` ignores the slug.** All six guide cards open the same single article (also with a hard-coded "Updated September 2025"). Build a guide article template driven by slug, with at least the featured article fully written and other slugs handled honestly (see Guides).
- **Booking sub-routes (`/rooms`, `/review`, `/confirmation`) all mount one component that keeps the step in local state.** The URL never changes, refresh loses everything, the browser Back button leaves the flow, and the `?room=` chosen on the hotel page is ignored. Design three genuinely distinct route-level steps (rooms → guest → review/payment → confirmation) with persisted state.
- **`/list-your-hotel/success` renders the whole form**, not a success page.
- Login, Signup and the 404 page are inconsistent (Login/Signup omit the shared header/footer pattern; both auth forms just navigate to the account with no validation).
- `robots: { index: false }` is set in the site configuration and no route sets its own page title or description. Design for production: indexable public pages with unique titles and descriptions per route (patterns are in section 12).

### 3.2 Header and global search
- The Header attaches a **new window scroll listener on every render** instead of a stable lifecycle effect. Preserve the behaviour (transparent over hero, solid after ~40px, sticky elsewhere) with a clean, conceptually reusable pattern (mount once, cleanup on unmount).
- The compact search bar shows "Check-in | Check-out" as **plain text spans, not fields**, so users cannot choose dates once on the results page, and guests are not represented at all. The full search has guests only (no rooms or children), no past-date prevention, no check-out-after-check-in validation, and is not shared with the hotel or booking pages.
- **Unify search into one component family** (Default, Compact, Mobile sheet) sharing one persisted search state (destination, check-in, check-out, rooms, adults, children) that appears identically on Home, Search, Hotel detail and Booking.

### 3.3 Search results
- The Search page shows **all hotels regardless of destination, filters or sort**. Filters, sort, the destination in the URL and the result count are cosmetic.
- Filters store strings in one array (the "Free charging" and "50 kW+" options exist in the UI with no matching behaviour), the filter panel is a flat checkbox grid, "Distance" and "Near me" are absent, the Map/List toggle switches a state that renders nothing different, and the loading delay is a fixed 800 ms on first load only.
- Specify believable behaviour: URL-driven state; destination matches city, state or hotel name; every filter (verified, Public, Guest Only, AC, DC, Type 2, CCS2, 7.4/22/50 kW+, Free, Paid, App required, stars, price, amenities) really filters; sort really reorders; the count updates; each active filter shows as a removable chip; "Clear all" resets; loading appears whenever the query changes; an accurate no-results state offers specific next steps.

### 3.4 Hotel cards
- "Free cancellation available" is hard-coded on **every** card even when the hotel's rooms are non-refundable (e.g. the Kabini lodge has only a non-refundable room). Derive it from room data.
- Card price shows "priceFrom" with no date context; "Only 2 left" is hard-coded for every "limited" room.
- Saved state is local to each card, so saving a hotel does not appear in Saved. Design a shared saved-hotels state.
- Missing variants: selected, saved, sold out, limited availability, direct vs partner.

### 3.5 Hotel detail
- No date selector, guest selector or rooms selector on the page (the brief requires dates to be first-class); the sticky panel **assumes "2 nights"** everywhere.
- "Book now" navigates with `?room=` that the booking flow ignores.
- The gallery images are not interactive (no lightbox); Share does nothing; the map is a grey box reading "Map placeholder"; "Contact hotel" has no number; the Agoda CTA links to the generic agoda.com.
- The sticky panel says **"EV Charging Included"** for direct bookings although charging is Paid at several properties. Remove that claim.
- "Last verified" prints a raw ISO string (`2025-03-12`).
- Cancellation and breakfast are shown but there is no policy detail; the page reads like a generic hotel template. Reframe it around: *Can I comfortably stay here and charge my EV?*

### 3.6 Booking
- Review, Payment and Confirmation hard-code **2 nights** and the Review page hard-codes **"15 Oct 2025 → 17 Oct 2025"**; the header summary hard-codes "Check-in 15 Oct · 2 nights"; the Confirmation prints "15 Oct → 17 Oct". The booking ignores the dates the traveller chose.
- The booking ID is generated with `Math.random()` **during render**, so it changes on every re-render; the same happens to the hotel-application reference.
- The payment error state exists in the UI but the `error` flag can never become true (there is no failure path), and there is no retry, expired-hold or unavailable-date state.
- A visible amber box says **"Developer note: This is a prototype payment screen."** Remove it. Payment offers UPI, card and net banking in name only (no fields).
- Partner hotels (the Goa resort) can still be pushed through the direct flow if the URL is typed.
- The step indicator is decorative, the hotel-not-found state is a bare `<div>`, and "Your payment is secure and encrypted" is an unsupported claim (rephrase to something true and modest).
- Room selection appears both on the hotel page and again as step 1; make one the source of truth.

### 3.7 Destinations, state and city
- Destination cards show counts (e.g. Bengaluru 42, Goa 31) that **contradict the dataset** (Bengaluru has 2 listings) and each other across Home, Destinations, Search suggestions and Report.
- The City page **falls back to invented values** ("12" hotels, "9" public, "3" guest only, "60 kW") when data is absent, and its FAQ says "12 hotels" for cities with none. The FAQ also claims "fastest verified charger is 60 kW DC" for every city.
- City copy exists for six cities only; the rest show no description.
- Rule: every count, split, power figure and FAQ answer must be **derived from the dataset**; if a value cannot be derived, show an explicit unavailable state or omit the module. Never silently fabricate.

### 3.8 Account and auth
- Account uses hard-coded profile ("Aarav Singh"), two hard-coded bookings dated **Oct and Nov 2025**, internal tab state that ignores the route after mount, and "Saved" is simply the first three hotels.
- Booking cards link to a route that does not exist (see 3.1). There is no cancel/modify, no charger info, no directions or contact on the booking.
- Login has no validation, forgot-password, error or Google state; Signup has no labels bound to inputs and no validation.

### 3.9 Content pages
- **Report:** numbers contradict the live product and each other (Karnataka 68, "80% public / 150+ guest only", "Last updated: September 2025"), the "top cities" ranking is out of order (#3 Hyderabad 28, #4 Mumbai 29, #7 Jaipur 24 after Gurugram 22), star split is "~" approximations with fabricated percentages, and "Avg power" per state is unsupported.
- **Guides:** category filter buttons do nothing; the "Updated" dates are in 2025; the article's table of contents links to `href="#"` with no anchors; unsupported factual claims ("A Tata Nexon EV charges 20%→100% in about 8 hours") need a caveat or removal.
- **About:** repeats homepage stats and reads as stacked sections.
- **Legal:** shows "This is placeholder legal text for prototype purposes" to customers and dates of 1 September 2025.
- **FAQ:** works but questions read like documentation; no related links or contact CTA.
- **List Your Hotel:** validation silently does nothing (buttons just don't advance); photos can be skipped even though the page says exactly two are required; the payment step shows a grey box instead of payment guidance; the one-giant-form feel remains; the application reference regenerates each render.

### 3.10 Data and copy honesty
- Mock `verifiedAt` dates (Nov 2024–Apr 2025) are ~18 months old relative to today (30 September 2026). Use dates relative to a `{today}` token and mark sample data clearly in developer notes only.
- Scale figures ("750+", "250+", "30+", "600+") are repeated as literals in at least six files. Centralise them as tokens (`{verifiedHotelCount}` etc.).
- The rooms in every hotel reuse the same two room photographs; the same six photographs recur across pages; hotels and rooms share stock imagery with no narrative purpose.
- Footer Instagram and Google Play links point to generic homepages; the footer's darkest text (`neutral-600` on `neutral-950`) fails contrast.
- Small type violates the type system in ~100 places (11–12 px used for chips, eyebrows and body captions). Raise to ≥ 12 px where allowed, ≥ 14 px for meaningful text.
- Accessibility gaps: almost no ARIA (6 attributes in the whole project), bypass links disabled, labels not bound to inputs on several forms, date inputs without validation, map toggle not exposed as a control, colour-only selected states in places.

## 4. DESIGN SYSTEM (authoritative — the repo already contains these tokens; keep and extend them)

Green is the core brand family, used selectively. Do **not** introduce other brand colours or another green. Semantic tokens only; no arbitrary hex in components.

**Brand green:** 50 #ECFDF5 · 100 #D1FAE5 · 200 #A7F3D0 · 300 #6EE7B7 · 400 #34D399 (inverse accent on dark only) · 500 #10B981 (graphics only) · 600 #059669 (icons/graphics) · **700 #047857 primary action/verified/link** · 800 #065F46 hover/strong text · 900 #064E3B pressed · 950 #022C22 deepest surfaces. White on 700/800/900 approved; never white on 500/600/400/300; never light green text on white.

**Neutrals:** 0 #FFFFFF · 25 #FCFDFC · 50 #F7FAF8 canvas · 100 #F1F5F2 subtle surface · 200 #E6ECE8 decorative divider/skeleton · 300 #D6E0DA · 400 #B9C5BF · **500 #7B8A82 control border (3.62:1)** · 600 #5A6A62 muted text/placeholder · 700 #4C5D55 secondary text · 800 #34473F · 900 #1E332A · **950 #0D1F17 primary text / inverse surface**. Text on `neutral-950`: use white or `#D6E0DA`; never neutral-500/600 for text there.

**Status:** Success #F0FDF4 / #15803D / #166534 · Warning #FFFBEB / #B45309 / #92400E · Error #FEF2F2 / #B91C1C / #991B1B · Info #EFF6FF / #1D4ED8 / #1E40AF · Rating #A16207 (stars only).
**Semantics (fixed across pages):** green = brand, EV, verification, primary action, available, confirmed, selected · blue = information, Guest Only, directions, map info · amber = caution, pending, limited, confirmation required · red = error, failure, unavailable, destructive · grey = neutral, unknown, cancelled, inactive. Never colour alone: pair with icon and text.

**Signature recipes:** Verified badge #ECFDF5 bg / #065F46 text / #047857 icon / #A7F3D0 border ("✓ Verified EV Charger"). Public chip #ECFDF5/#065F46 + plug icon + "Public". Guest Only chip #EFF6FF/#1E40AF + hotel icon + "Guest Only". Primary button #047857 → #065F46 → #064E3B, disabled #E6ECE8 / #7B8A82 (no opacity). Secondary: white, #065F46 text, #047857 border. Inputs: white, #7B8A82 border, focus #047857 + ring. Prices #0D1F17 (never green). Focus ring #0D1F17 on light, #FFFFFF on dark, dual ring on green controls, 2 px minimum. Dark sections #0D1F17/#022C22 with CTA #34D399 bg / #0D1F17 text. Image overlays: dark-green scrim rgba(13,31,23,.72–.82). Map markers: Verified+Public #047857, Verified+Guest Only #1D4ED8, Limited #B45309, Unavailable #B91C1C, Unknown #5A6A62 — always with icon/label/selected state. Skeletons neutral (#E6ECE8/#F1F5F2), never green. Colour proportion ≈ 70–80% neutral, 10–15% green, 5–10% status/accent.

**Typography — Rubik only** (400/500/600/700/800; never 300/900). Sentence case; uppercase only for tiny eyebrows (12/18/600, +0.035em). Desktop scale (size/line/weight): Display M 48/56/700 (homepage hero, article title) · Display L 56/64 · **H1 40/48/700** · H2 32/40/700 · H3 28/36/700 · H4 24/32/600 · H5 20/28/600 (hotel names on cards) · H6 18/26/600 · Body XL 20/32 · Body L 18/28 · **Body M 16/24** · Body S 14/22 · Helper 13/20 · Caption 12/18 · Label 14/20/600 · Label Small 12/18/600 · UI 15/22/500 · Button L 16/24/600, M 15/22/600, S 14/20/600 · Statistic XL 48/52/700 · Price 24/32/700, Price Large 32/40/700 · Breadcrumb 14/20/500. Tabular numerals for prices, kW, counts, dates. Article body 18/30, 60–75 characters per line; inputs ≥ 16 px; never justify; hotel names wrap to two lines (never shrink for length); state and city names wrap. Tablet/mobile: Display M 36/44, H1 32/40, H2 28/36, H3 24/32; body unchanged. Text must survive 200% zoom and WCAG text-spacing overrides (no fixed-height text boxes).

**Shape and layout:** 12-col desktop grid, max width ≈ 1280 (7xl), 8-col tablet, 4-col mobile with 16 px padding; radii 10 (controls) / 16 (cards) / 20–24 (containers and image crops); subtle elevation only; touch targets ≥ 44 px. Mix full-bleed imagery, editorial splits, asymmetric layouts, data panels, rails, sticky summaries. Do not make everything a rounded card.

## 5. ART DIRECTION

**Human first, specifications second.** Human photography is mandatory on every major page: believable Indian EV owners, couples, families, solo and business travellers, hotel managers and staff, people plugging in, arrival and check-in, relaxing while the car charges, leaving in the morning. Candid, documentary, warm daylight, real Indian roads/hotels/hill stations. No posed stock smiles, no synthetic faces, no image without a narrative purpose. Vary image treatment; retire the repeated six-photo set and give every hotel its own gallery and every room type its own photo. Use clearly labelled art-direction placeholders where photography is not available. Reference EV models without implying affiliation.
EV iconography: plug, EV, battery, connector, access, verified check, pin, road; avoid overusing lightning bolts.
Inspiration (principles only, never copy): Rivian (cinematic, spacious, confident), Zoox (bold editorial moments), Flighty (status-style clarity), Booking.com (search-first, filters, list/map), Airbnb (destination discovery, property presentation).

## 6. WRITING

Warm, direct, grounded, practical, human. Avoid: seamless, revolutionising, next-generation, unlock, elevate, "experience luxury", "perfect blend", "unforgettable", "nestled in". Prefer concrete, useful lines: "Know before you arrive." "See the charger details before you book." "This hotel has public charging." "Your charger is guest-only." Vary CTA wording by context; do not repeat one tagline everywhere. Apply the storytelling arc where relevant: traveller → journey → uncertainty → proof → choice → reassurance. Hotel copy example: "A practical base for a Bengaluru work trip, with public DC charging on-site." / "Stay overnight and wake up ready for the next leg." / "The hotel confirmed this charger during verification."
Sample testimonials must be plainly marked as sample content and stay modest (clarity, confidence, convenience), no five-star gimmicks or "saved my life" claims.

## 7. NAVIGATION

**Desktop header:** logo · Explore EV Hotels · Destinations · Travel Guides · EV Hotel Report · About · right: List Your Hotel (secondary) · Saved · Account · **Search Hotels (primary)**. Only the active item and the primary CTA are green. Add FAQs to the mobile drawer and footer only (already present). **Mobile:** logo, search icon, menu/account; slide-out drawer with all links, Saved, Sign in, List your hotel, Get the Android app. Header is transparent over photographic heroes only when contrast passes, becomes solid on scroll, and is sticky on search, hotel and booking pages. Footer: dark #0D1F17, brand statement, Explore / Company / Legal / Contact columns, real Instagram and Google Play destinations (placeholders labelled), optional low-key newsletter, affiliate disclosure ("Hotel bookings are facilitated via partner affiliate links."), dynamic year.

## 8. PAGE-BY-PAGE REQUIREMENTS

### 8.1 Home — rebuild the story
Order and copy direction (write your own variations; keep the intent):
1. **Hero:** cinematic Indian EV road-trip photo with scrim. H1: **"Your next stop should work for your EV too."** Support: "Find verified EV-friendly hotels across India, see the charger before you book, and plan your stay around your journey." Unified Search (destination, check-in, check-out, rooms & guests, Search) + secondary "Explore nearby". Trust line: "Every listed charger is verified with the hotel."
2. **Emotional problem:** "A hotel room is only half the stop." (human traveller/charging image).
3. **Verification story:** "We don't take 'EV charging' at face value." Four steps (hotel submits details → sends charger photos → we speak with the property → listing goes live after verification), shown with real evidence UI (verified by phone, connector, power, access, fee).
4. **Destinations:** "Go farther. Stay smarter." Editorial composition of varied sizes (not eight identical squares); counts derived from data.
5. **Featured stays:** "Stays worth the drive." 3–6 hotels: image → hotel → location → EV status → charger summary → price → action.
6. **Charger knowledge:** "Know what the charger means for your trip." 7.4 kW AC, 22 kW AC (onboard charger may limit AC speed), 50+ kW DC, Type 2, CCS2, Public vs Guest Only. Avoid unsupported per-model charge-time claims.
7. **Human story:** large image + quote (marked sample): "I wasn't worried about finding the hotel. I was worried about finding one where my car could sleep too."
8. **Road-trip inspiration:** Delhi → Jaipur → Udaipur, Mumbai → Goa, Bengaluru → Coorg, Delhi → Manali; show route length, stay count (derived), mood and a contextual CTA that searches along that route's destinations (not a generic /search).
9. **Hotel partners:** "Your charger can bring guests through the door." (hotel manager photo; discovery, verified credibility, EV audience, booking opportunities.)
10. **Final CTA:** "Plan the stay. Keep the road open." → "Find a verified EV hotel."
Scale band uses tokens (`{verifiedHotelCount}` etc., rendered "750+ / 250+ / 30+ / 600+" as rounded live-directory figures with no false precision). Only one primary CTA per section.

### 8.2 Search (`/search`) — a core product surface
Desktop: sticky compact search (real fields) → left filter column → centre results → optional right map, synchronised with the list (hover/select highlights card and pin, clustered pins, concise pin preview). Mobile: search summary bar, Filters and Sort buttons, single-column cards, full-screen Map toggle with a swipeable bottom sheet, filter bottom sheet with applied chips and "Clear all". All persisted values (destination, dates, rooms, guests) show in the summary. Card hierarchy: image → property → location/rating → Verified EV → charger specs → price → CTA. Example card: *The Fern Residency Jaipur · Jaipur, Rajasthan · Verified EV Charger · 60 kW DC · CCS2 · Public · Paid · 2 chargers · ₹6,200 / night · Free cancellation · View stay.* Provide states: loading skeletons on every query change, filtered, no results ("Nothing verified matches that trip yet." with specific actions), filter drawer, map view, error with retry, destination not found.
Sort: Recommended (neutral prototype label) · Price low to high · Price high to low · Rating · Charger power · Distance (when location is available). Never invent ranking claims.

### 8.3 Destinations, state and city
- **Destinations:** "Wherever the road takes you, know where you can stay charged." Visual India exploration, state navigation, popular cities, route inspiration, editorial variety, plus a respectful "no verified listings yet" section (Arunachal Pradesh, Manipur, Mizoram, Nagaland, Andaman and Nicobar Islands, Ladakh, Lakshadweep).
- **State template (new):** hero, state context, hotel count, city count, Public/Guest Only split, star mix, power range (all derived), destination cards, filterable hotel grid, map, FAQ, related destinations.
- **City template:** "Verified EV hotels in {City}" with a human intro ("Bengaluru is often the start of the road trip, not the end. Find a place where you can park, sleep and start tomorrow charged."), actual inventory stats, Public vs Guest Only, charger power summary, results plus map, travel tips, data-driven FAQs, nearby cities. Zero-inventory cities say "We don't currently have a verified hotel listing in this city." with alternatives (never "no chargers exist"). Never use fallback numbers.
Breadcrumbs everywhere: India → Destinations → State → City → Hotel. Normalise duplicate place names (Bangalore→Bengaluru, Kerala/Keralam, Kumbalgarh/Kumbhalgarh) through aliases.

### 8.4 Hotel detail — "Can I comfortably stay here and charge my EV?"
Header (breadcrumb, name at 40/48, location, rating, verified, Save, Share with a real share sheet), real gallery with lightbox, an emotional line ("Arrive, plug in, and settle down for the night."), then the **first-class EV section: "Your EV setup here — Verified with the hotel"** showing access, AC/DC, kW, connector, count, fee, app requirement, "Verified by phone" and "Last verified: {formatted date}", per-charger rows (value / unit / type / access separated), charger photo, notes, a "How we verify" explainer and the travel-day caution. Below: room selection with the page's own date, guest and rooms controls, room cards (image, occupancy, bed, breakfast, cancellation, price, taxes, availability), sticky booking summary (dates, guests, room, price, taxes, total, cancellation, EV summary, CTA — desktop sticky panel, mobile bottom bar with safe-area padding), hotel information, location with a **designed map** (pins, address, nearby landmarks, distances, Open in Maps, Get directions), guest reviews (small clearly synthetic set), "More verified stays nearby". States: default, direct vs partner CTA, selected room, limited availability, sold out, unavailable dates, no charger detail, gallery modal, charger detail sheet.

### 8.5 Booking — real routes, date-aware, no prototype artefacts
`/booking/:slug/rooms` → `/guest` → `/review` → `/payment` → `/confirmation`, each a distinct URL. Persist search + selection (dates, nights, rooms, guests, room type) and derive **every** date, night count, price and total from that state (nights = check-out − check-in; totals = nights × (rate + taxes)). A persistent step indicator and summary rail (hotel, dates, guests, room, EV summary, running total) appear on every step. Guest step: first/last name, email, mobile (India), special requests, optional GST invoice details, useful validation text. Review: hotel, dates, nights, guests, room, EV details, cancellation, guest, full price breakdown. Payment (frontend-only, realistic): UPI, card, net banking with real field layouts, selected, processing, **failed and retry**, hold-expired, unavailable-date and generic recoverable error states; no developer notes; no unsupported claims. Confirmation: **"You're booked. The room is yours."** with a booking ID created once when the booking is made (never at render), hotel, dates, room, guest, total, EV summary, actions (View booking, Get directions, Contact hotel, Add to calendar, Save confirmation) and the reassurance: "Your hotel's charger was verified with the property. For critical travel-day charging, we recommend confirming availability with the hotel before arrival." Partner hotels never enter this flow; they get the "Check availability" path.

### 8.6 List Your Hotel
Hero: **"Make your hotel part of the EV road-trip network."** Support: "Get your charger verified and put your property in front of travelers who are already deciding where to stop, stay and charge." CTA: Start hotel verification (hotel manager image). Benefits: Get discovered · Build trust · Turn charging into a reason to stay. Criteria (7.4 kW AC minimum, charger details and two photos, verification call, domestic socket does not qualify). A **multi-step wizard, never one giant form**: Property → Charger → Photos → Business/billing → Payment → Submitted, with a progress indicator, per-field validation messages (nothing silently blocked), step persistence, and Back/Continue. Photos: "Upload two clear photos of the charger and parking area." exactly two required (JPG/PNG ≤ 5 MB), preview, remove/replace, upload and error states. Payment (₹5,000 + 18% GST = ₹5,900, a token): UPI or bank transfer with a transaction reference; no real bank details. Success at `/list-your-hotel/success`: **"You're in the verification queue."** with a stable reference created once, then: 1 We review · 2 We call · 3 We verify · 4 Your listing can go live if verification succeeds. Never promise unconditional publication; refund wording follows policy ("if it does not qualify, the fee is refunded in full and we tell you what's needed").

### 8.7 Guides
Hero: "The smarter way to travel electric." Featured story, supporting stories, working category rail (filters actually filter), practical guides, destination stories, believable authorship, correct current dates. **Article:** open with a scenario ("You've found the perfect hotel. It's affordable, close to the highway and looks great. Then you notice: 'EV charging available.' But what does that actually mean?"), key takeaways, pull quotes, charger comparison, working table-of-contents anchors with scroll-spy, related hotels and destinations, contextual CTA. Slug-driven; non-written slugs show an honest "Coming soon" state rather than a copy of another article. Remove or caveat unsupported vehicle-specific claims.

### 8.8 FAQ, About, Report
- **FAQ:** grouped accessible accordions (About, Charging, Booking, Hotels) with search, human questions ("Can I use a Guest Only charger if I'm not staying there?", "Will my car actually charge at 22 kW?", "What happens if the charger isn't working when I arrive?"), related links and a contact CTA.
- **About:** do not repeat the homepage. Hero: "Electric road trips should feel exciting—not uncertain." Then why the company exists, the user problem, verification philosophy, mission, future vision, real human photography.
- **Report:** credible industry intelligence: update date, methodology, dynamic totals, Public vs Guest Only, charger distribution, state table, city table (correctly sorted), star split with exact counts from the dataset, states without listings, and a "data limitations" note. If precision is uncertain, say so. No invented per-state averages.

### 8.9 Auth and Account
Auth is travel-focused: Login (email, password, forgot password, Google placeholder, validation, error state, human imagery on desktop); Signup (only essentials; benefit line "Save stays and keep your bookings in one place."). Account information architecture (real routes, not tab state): Overview · Upcoming trips · Past bookings · Saved hotels · Booking detail (`/account/bookings/:id`: confirmation, itinerary, hotel contact, EV charger details, directions, cancel/modify). Saved hotels reflect the shared saved state, with an empty state ("Your saved stays will appear here.") and recovery links. Booking data uses future-relative dates. No analytics-dashboard feel.

### 8.10 Legal and system
Privacy, Terms, Cookies: plain-language layout, section navigation, contact, no customer-facing "placeholder" text (keep approved-copy placeholders as developer notes only), no fake legal guarantees. System: 404 ("Looks like this road doesn't lead anywhere."), generic error ("We couldn't complete that."), network/loading, booking expired, unavailable date, sold out, empty states, session expiry.

## 9. COMPONENT LIBRARY

Build and reuse: Header, Footer, SearchBar (Default/Compact/Mobile sheet), LocationAutocomplete, DatePicker (accessible, past-date prevention, range validation), GuestSelector (rooms/adults/children), HotelCard (default, compact, selected, saved, sold out, limited, direct, partner), EVBadge, ChargerSpec, ChargerSummaryCard, RoomCard, BookingSummary, PriceBreakdown, FilterChip, FilterDrawer, SortDropdown, MapPin, Map/List toggle, Breadcrumb, Rating, Review, Testimonial, DestinationCard, GuideCard, UploadField, ProgressIndicator/StepIndicator, Modal, BottomSheet, Toast, Alert, Accordion, Tabs, Skeleton, EmptyState, ErrorState, Confirmation, Gallery/Lightbox, Save, Share. Every interactive component defines default, hover, focus, pressed, disabled, loading and error/success. Search component also covers empty, selected, invalid date, destination-not-found and keyboard states. Consistent spacing, radii, type, borders, icon sizes (16–20 px beside 14–16 px text), buttons, chips and input states across all pages.

## 10. STATE AND DATA MODEL (frontend prototype)

Shared, persisted (URL-first, in-memory or session storage) state: `search {destination, checkIn, checkOut, rooms, adults, children, filters, sort}`, `savedHotels`, `bookingDraft {hotelSlug, roomId, dates, guests, guest, status}`, `bookings[]`, `user`. Hotel model keeps the existing fields (chargers[] with access, acDc, powerKw|null, connector, guns|null, fee, appRequired|null, notes; roomTypes[] with availability; bookingType direct|partner; verifiedAt) and adds: coordinates-driven map, per-hotel gallery, phone, policy text, `verifiedAt` relative to `{today}`. **Expand the sample dataset to about 20–24 hotels across 8+ cities** (including one unknown-power charger, one sold-out property, one partner hotel, several Guest Only) so every destination card, split, FAQ and report figure is derived rather than typed. Central `siteStats` and `siteConfig` tokens; no repeated literals. Booking and application IDs are created once at action time.

## 11. RESPONSIVE (design and verify at 1440, 1280, 1024, 834, 768, 430, 393, 375, 320)

Not a shrunken desktop. Explicitly redesign navigation, search (sheets: destination → dates → guests → EV preferences), filter drawers, map/list, hotel cards (compact horizontal on mobile lists), gallery (swipe), booking (sticky bottom bar), forms, account and editorial layouts. At 393 px: 16 px padding, comfortable controls, no clipping, no horizontal page overflow (tables scroll inside their own container). Required mobile screens: Home, location modal, date picker, guest selector, results, filters, map, hotel detail, room selection, guest details, review, payment, confirmation, account, list-your-hotel steps.

## 12. ACCESSIBILITY, SEO, MOTION, PERFORMANCE

- **WCAG 2.2 AA:** contrast per section 4; visible focus; semantic headings (one H1 per page); labels bound to every input; accessible dialogs, accordions, date picker and map/list toggle; enable skip/bypass links; ≥ 44 px targets; text usable at 200% zoom; never colour alone for verified, Public/Guest Only, selected, success or error; map data always mirrored as a list; announce loading and result-count changes.
- **SEO:** allow indexing for production; unique `<title>`/description per route (Home "Book EV Hotels | Verified EV-Friendly Hotels in India"; State "EV-Friendly Hotels in {State} | Book EV Hotels"; City "{N} EV Hotels in {City} | Verified EV Charging Hotels"; Hotel "{Hotel}, {City} | EV Charging Details"); contextual internal links (hotel → city → state; guide → destination and hotel; report → destination; about → verification); no keyword stuffing.
- **Motion:** subtle only: card image zoom, chip transitions, date selection, map pin selection, sticky panel, accordion, skeletons, save pulse, success confirmation. Aceternity-style effects only where they help (subtle spotlight, restrained reveal, one moving border on a special CTA); never on booking or form surfaces; respect reduced motion; no perpetual background animation.
- **Performance:** component variants over one-offs, lazy images with explicit dimensions, no autoplay video, map as progressive enhancement, paginate long lists.

## 13. ROUTE / STATE MATRIX — BUILD ALL

1 Home · 2 Search · 3 Search loading · 4 Search no-results · 5 Search filtered · 6 Search map · 7 Search filter drawer · 8 Destinations · 9 State · 10 City · 11 Hotel detail · 12 Hotel gallery · 13 Hotel charger details · 14 Hotel sold out · 15 Hotel unavailable dates · 16 Room selection · 17 Guest details · 18 Booking review · 19 Payment · 20 Payment processing · 21 Payment failure · 22 Confirmation · 23 Login · 24 Signup · 25 Account overview · 26 My bookings · 27 Booking detail · 28 Saved hotels · 29 Saved empty · 30 Guides · 31 Guide article · 32 EV Hotel Report · 33 FAQ · 34 About · 35 List Your Hotel · 36 Property step · 37 Charger step · 38 Photo step · 39 Billing step · 40 Payment step · 41 Application success · 42 Privacy · 43 Terms · 44 Cookies · 45 404 · 46 Generic error. Provide desktop and mobile for each.

## 14. PROTOTYPE FLOWS (clickable, with correct URLs)

- **Consumer booking:** Home → Search → Results → Hotel → Dates → Room → Guest → Review → Payment → Confirmation.
- **Destination:** Home → Destinations → State → City → Hotel → Booking.
- **Guide conversion:** Home → Guide → Article → Search → Hotel.
- **Partner:** Home → List Your Hotel → Verification info → Form → Payment → Success.
- **Saved hotel:** Search → Save → Auth → Account → Saved.
Also demonstrate: filter changes, date changes with refreshed availability, payment failure and retry, hold expiry.

## 15. FIGMA FILE ORGANISATION

Sections: Cover · Brand Principles · Design Tokens · Components · Homepage · Search · Destinations · Hotel Details · Booking · Account · Guides · Report · About / FAQ · List Your Hotel · Legal / System · Mobile Responsive · Prototype Flows. Name components for React (`Header/Desktop`, `SearchBar/Compact`, `HotelCard/Selected`, `EVBadge/Verified`, `ChargerSpec/GuestOnly`, `RoomCard/Default`, `BookingSummary/Sticky`, `FilterDrawer/Mobile`, `MapPin/Selected`).

## 16. ANTI-AI VISUAL QA — VERIFY BEFORE FINISHING

No repeated generic section pattern · no excessive cards or uniform grids · no random gradients or glassmorphism · no fake data, claims, IDs or dates · no unexplained icons · no giant empty sections · consistent margins · no one-off typography · no repeated CTA language or multiple competing CTAs in a section · no "developer note", "prototype" or "placeholder" text visible to customers · no grey "map placeholder" boxes · no lorem ipsum · no synthetic-looking people · no mobile clipping · one consistent button hierarchy · no broken booking state · no false certainty about EV charging · every count and total traceable to data.

## 17. FINAL DELIVERABLES

A repaired, extended, coherent Book EV Hotels site in this project: the design system and tokens; the full component library with states; all pages and states in section 13 at desktop and mobile; working route-level booking, search, filtering, saved and account state; the five prototype flows; and a short list, in developer notes only, of what is mock (payments, inventory, map provider, auth, partner links). Reply with one or two sentences summarising what changed and which assumptions you made.

**Begin now: inspect the current project, fix the structural and honesty defects in section 3 first (routes, search state, booking state, data derivation), then apply the design system and storytelling across every page.**

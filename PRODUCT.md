# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: existing Thai devotees and community members who already know Bhaktivedanta Book Trust (BBT) titles and are looking for a specific scripture, volume, language, or edition. They arrive knowing what they want and need to reach the catalog quickly.

Secondary: international and expatriate buyers ordering BBT editions for delivery outside Thailand.

Also served, but not the priority for design decisions: Thai newcomers to bhakti who need an accessible starting point.

Version one serves individual retail customers only. Wholesale is out of scope.

## Product Purpose

An independent online bookstore selling physical Bhaktivedanta Book Trust books, based in Thailand and shipping worldwide. It exists to make BBT titles — Thai editions first — easy to find, trust, and buy. Success is a visitor understanding within seconds that this is a genuine BBT bookstore with Thai books, then reaching the Thai catalog and ordering.

## Positioning

An independent reseller specializing in BBT titles, with Thai editions given the strongest visibility while English, Nepali, Hindi, and Russian editions stay easy to reach. This is not the official BBT Thailand organization, and the site must never imply that it is. Permission to use the BBT name and the supplied logo is confirmed. The logo is used recolored to the Thai flag palette rather than in its supplied yellow; permission for that specific alteration has not been separately confirmed and should be.

## Operating Context

- Storefront interface language at launch: English. Book titles may appear in Thai script.
- Currency: Thai baht (THB / ฿).
- Catalog covers every physical book currently available across Thai, English, Nepali, Hindi, and Russian.
- Each language edition is a separate product, linked to its other-language editions.
- Multi-volume works (Śrīmad-Bhāgavatam, Śrī Caitanya-caritāmṛta, Śrīla Prabhupāda-līlāmṛta) sell as individual volumes and as complete sets.
- Intended visitor journey: understand the store → trust it → browse Thai books → get beginner guidance → explore other languages and topics → learn about BBT → shop.
- Reference material lives in `docs/BBT-Thailand-Website-Idea.md` and `docs/BBT-Landing-Page-Structure.md`.

## Capabilities and Constraints

Confirmed:

- Physical books only. No ebooks, audio, or digital formats.
- Worldwide delivery.
- "Coming soon" products are purchasable by pre-order and must carry a clear, distinct pre-order label.
- Shop filters: language, title or series, availability, price.
- Thai titles sort first by default without making other languages hard to find.
- No VedaBase reading links on product pages.
- No customer reviews or star ratings.
- No wishlist, no back-in-stock alerts, no recently-viewed module.
- Topic-based browsing is included.
- About BBT gets its own dedicated page.
- Primarily a bookstore: no articles, blog, or event publishing planned.

Terminology: use simplified English spellings such as "Krishna" in interface copy; use diacritics only where an official book title uses them.

Explicitly undecided (do not invent):

- Public store name.
- Payment methods and gateway; checkout currencies.
- Shipping origin details, carriers, zones, rates, delivery times.
- Guest checkout and account rules.
- Out-of-stock behavior; pre-order charging and mixed-order fulfillment.
- Returns, cancellations, damaged-book handling, refunds.
- Order notifications and support ownership.
- Contact channels.
- Launch date.
- Formats and audience/reading-level filter values.

## Brand Commitments

- The site's color identity is the Thailand flag: Thai Red `#a51931`, Thai Navy `#2d2a4a`, Thai White `#f4f5f8`, over the existing Warm Paper `#fbf7ed` and Deep Ink `#11110f` base. Thai Red is the single accent that carries interface meaning; Thai Navy carries inverted surfaces. This signals a Thailand-based store at a glance and must not drift back toward the former yellow. The full rules live in `DESIGN.md`.
- Every color in `css/hero.css` is defined as a token in the `:root` block. No color literal may appear anywhere else in the stylesheet, so a palette change stays a one-file edit.
- The two hero book-cover gradients (`--jacket-*`) are artwork depicting printed book jackets, not brand color. They are exempt from the palette and must never be reused for interface elements.
- The BBT logo is recolored to the Thai flag palette: `assets/brand/logo.png` (495 × 159 PNG), mark in Thai Red `#a51931`, wordmark in Thai Navy `#2d2a4a`. The monogram stays a transparent cutout, so it reads as Warm Paper on the page. A larger or vector version is still outstanding.
  - The untouched supplied asset is kept at `assets/brand/logo-original-yellow.png` (yellow mark `#facb26`, graphite wordmark `#333333`) in case the recolor needs to be reverted.
  - Note: `docs/BBT-Thailand-Website-Idea.md` §10 describes the mark as red, which the recolor now matches.
- The stepped color-band motif (horizontal steps rising left to right, Thai navy → navy mid → Thai red → red mid → rose) is an approved brand element. It must anchor the bottom of the homepage hero and may be reused sparingly elsewhere.
- The site must not reproduce the reference site's logo, wording, community avatars, or brand assets.

## Evidence on Hand

- 27 BBT reference titles listed in `docs/BBT-Thailand-Website-Idea.md` §7. This is a title reference, not the confirmed sales catalog.
- Initial Thai catalog with 10 products and prices in §3 of the same doc. Titles, editions, formats, dimensions, weights, ISBNs, and stock counts are unconfirmed.
- Book cover images in `assets/books/` are English editions (`en-*.jpeg`). They may be used as temporary design assets but must never be labeled as Thai editions.
- Approved Bhagavad-gītā 12.12 excerpt: "By such renunciation one can attain peace of mind." Source: https://vedabase.io/en/library/bg/12/12/
- Not available and must not be fabricated: Thai cover images, customer testimonials, ratings, sales or reader numbers, shipping promises, carrier names, delivery-time claims, payment-provider names, catalog counts per language, trademark and reseller legal wording, approved About BBT copy.
- "Encrypted checkout" may only be claimed once the payment provider is confirmed. Until then use "Tracked orders."

## Product Principles

1. Thai editions lead. Every browsing surface puts Thai first without hiding the other four languages.
2. Trust before persuasion. Authenticity, origin, and delivery are stated as plain fact, never as promotion.
3. Serve the returning devotee's speed first, the newcomer's guidance second.
4. Claim only what is confirmed. Unconfirmed operational facts stay off the site rather than being softened into vague promises.
5. The books carry the spiritual character. Covers, language, and composition do the work; decorative religious clichés do not.

## Accessibility & Inclusion

No product-specific accessibility requirement has been confirmed. Normal good practice applies.

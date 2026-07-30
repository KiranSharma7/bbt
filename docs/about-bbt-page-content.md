# About BBT — Page Content

Written: 2026-07-30
Status: **draft copy, not yet approved.** No sentence below is invented. Every
factual claim carries a source. Get BBT sign-off before launch.

Target file (not built yet): `about.html`
Replaces the dead nav links at `index.html:63` and `index.html:606`.

---

## Source facts used

Every claim on this page traces to one of these. Nothing else may be added
without a new source.

| # | Fact | Source |
| --- | --- | --- |
| F1 | Founded 1972 by His Divine Grace A. C. Bhaktivedanta Swami Prabhupada | https://bbt.org/about |
| F2 | "the world's largest publisher of ancient and classic Vaishnava texts, epics, and contemporary works" | https://bbt.org/about |
| F3 | Works "currently translated into 87 languages, with more languages being added regularly" | https://bbt.org/about |
| F4 | Publishes original scriptural works plus books that discuss and explain those texts | https://bbt.org/about |
| F5 | Prabhupada intended the BBT to publish his writings "with the highest editorial standards possible" | https://bbt.org/about |
| F6 | Book sales provide funds for temple construction and renovation | https://bbt.org/about |
| F7 | A. C. Bhaktivedanta Swami Prabhupada, 1896–1977 | https://bbt.org/founder |
| F8 | Age sixty-nine, forty rupees and a trunk of his Bhagavatam commentaries; steamship from Calcutta to New York City, 1965 | https://bbt.org/founder |
| F9 | Translated and commented on over eighty volumes of sacred bhakti texts, including the Bhagavad-gita and the multi-volume Srimad-Bhagavatam | https://bbt.org/founder |
| F10 | Copyright holder is "The Bhaktivedanta Book Trust International, Inc." | https://bbt.org |
| F11 | Permission to use the BBT name and the supplied logo is confirmed. This store is not the official BBT Thailand organization. | `PRODUCT.md:25` |
| F12 | Independent online bookstore, based in Thailand, ships worldwide, physical books only | `PRODUCT.md:21`, `PRODUCT.md:42` |
| F13 | Section heading "Timeless Knowledge, Published for the World" | `docs/BBT-Landing-Page-Structure.md:239` |

### Known conflict in the source

`bbt.org/founder` says "The BBT was founded in 1970" in one sentence and
"established in 1972" in the next. `bbt.org/about` says 1972. **This page uses
1972.** Do not change it without checking with BBT.

### Deliberately absent

No reader counts, no copies-printed figures, no sales numbers, no testimonials,
no delivery promises, no launch date. None of these are confirmed
(`PRODUCT.md:85`). Do not soften them into vague claims either — leave them out.

### Terminology

Simplified English spellings in prose: "Krishna", "Bhagavad-gita",
"Srimad-Bhagavatam". Diacritics only where an official book title uses them
(`PRODUCT.md:53`).

---

## Section 1 — Hero

Quiet opening. No image. Text only, wide left-aligned measure.

**Eyebrow**

> The Publisher

**Heading** (F13)

> Timeless Knowledge, Published for the World

**Paragraph** (F2, F3)

> The Bhaktivedanta Book Trust is the world's largest publisher of classic
> Vaishnava texts. Its editions carry the same translations and commentary in
> 87 languages — including the Thai books on this site.

---

## Section 2 — The Publisher

**Heading**

> A Trust Founded to Publish

**Body** (F1, F4, F5)

> The Bhaktivedanta Book Trust was founded in 1972 by His Divine Grace
> A. C. Bhaktivedanta Swami Prabhupada. He established it for a single
> purpose: to publish his writings to the highest editorial standard possible.
>
> The Trust publishes the original scriptural works alongside the books that
> explain them — from short introductions to multi-volume translations with
> full commentary.

**Fact row** — three plain figures, no icons, no cards inside cards.

| Figure | Label | Source |
| --- | --- | --- |
| 1972 | Founded | F1 |
| 87 | Languages in print | F3 |
| 80+ | Volumes translated | F9 |

Note for build: these are typographic figures, not "stat cards". Large numeral,
small label beneath, thin rule between. Nothing else.

---

## Section 3 — The Founder

**Heading**

> The Man Who Carried the Books West

**Body** (F7, F8, F9)

> A. C. Bhaktivedanta Swami Prabhupada (1896–1977) was sixty-nine years old
> when he boarded a steamship from Calcutta to New York City in 1965. He
> carried forty rupees and a trunk of his own Bhagavatam commentaries — the
> first ever written in English.
>
> In the twelve years that followed he translated and wrote commentary on more
> than eighty volumes of the tradition's most important bhakti texts, including
> the Bhagavad-gita and the multi-volume Srimad-Bhagavatam. Those translations
> are the books sold on this site.

Note for build: this is the one human moment on the page. Give it room. No
portrait image — none is confirmed as cleared for use.

---

## Section 4 — Where the Money Goes

**Heading**

> Books That Build

**Body** (F6)

> Srila Prabhupada gave the Trust a second purpose beyond publishing. Proceeds
> from the printing and sale of his books provide funds for temple construction
> and renovation.

Keep this short. One paragraph. It is a statement of fact about the publisher,
not a donation appeal, and it must not read as one. Do not add a "support us"
button.

---

## Section 5 — This Store

**The most important section on the page.** Sections 1–4 borrow BBT's
authority. This section states plainly what this store is. It must be a full,
readable section — never a footnote, never small print.

**Heading**

> About This Store

**Body** (F11, F12) — blunt version, pending approval

> We are an independent bookstore. We are not the Bhaktivedanta Book Trust, and
> we are not its official organization in Thailand.
>
> What we do is sell BBT's printed editions. We have permission to use the BBT
> name and logo. Everything we ship is a genuine BBT book — physical print
> only, no ebooks or audio.
>
> We are based in Thailand. Thai editions come first here, and we ship
> worldwide.

**Open decision:** the public store name is undecided (`PRODUCT.md:57`). Until
it is chosen this section says "we" and "this store". When the name is decided,
the first sentence becomes: "_[Name]_ is an independent bookstore."

**Why blunt:** stating the limit outright is what makes the rest of the page
believable. Hedged wording ("affiliated with", "in association with") would
imply the opposite of the truth and breaks `PRODUCT.md:25`.

---

## Section 6 — Closing action

**Heading**

> Start with the Thai editions

**Button**

> Shop Thai Books →

Links to `shop.html` filtered to Thai. Single action only. No newsletter
signup, no second button.

---

## Related fix this page exposes

The current footer claims the site **is** BBT, which contradicts
`PRODUCT.md:25` and everything in Section 5:

- `index.html:630` — `© 2026 The Bhaktivedanta Book Trust. All rights reserved.`
- `index.html:585` — footer identity shows "Bhaktivedanta Book Trust" as the
  site's own name

Correct pattern, using F10 and F11:

> © 2026 _[store name]_. Independent bookstore.
> BBT titles, cover art, and text © The Bhaktivedanta Book Trust
> International, Inc. Used with permission.

This appears on all six existing pages (`index`, `shop`, `product`, `cart`,
`checkout`, `thank-you`), so it is a six-file edit. Blocked on the store name
for the first line; the second line can be corrected now.

---

## Build checklist

- [ ] Store name decided, or ship with "this store" wording
- [ ] BBT sign-off on Sections 1–4
- [ ] Section 5 wording approved by store owner
- [ ] `about.html` built
- [ ] Nav links wired: `index.html:63`, `index.html:606`, plus the other five pages
- [ ] Footer copyright corrected across all pages
- [ ] `docs/TODO.md` updated — About BBT and About the Store merged into one page

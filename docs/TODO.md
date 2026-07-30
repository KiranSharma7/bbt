# BBT Site — What Is Left To Build

Last checked: 2026-07-30

Built so far: `index.html`, `shop.html`, `product.html`, `cart.html`,
`checkout.html`, `thank-you.html`, `about.html`.

Sources compared: `docs/BBT-Thailand-Website-Idea.md` (§4 store structure),
`docs/BBT-Landing-Page-Structure.md` (§4–§14), `PRODUCT.md`.

---

## 1. Pages not built yet

| Page | Why it is needed | Blocked by |
| --- | --- | --- |
| ~~About the Store~~ | **Merged into About BBT** as its "About This Store" section. One page, not two — a visitor asking "who am I buying from" should not have to visit two pages. | Store name undecided; page ships with "this store" wording. |
| ~~Languages~~ | **Dropped.** `shop.html:74` already shows all five languages in its first viewport with Thai pre-selected. A Languages page would only forward visitors to that same rack. The idea doc listed it (§4) before `shop.html` existed. | Nav link still needs pointing at `shop.html#shop-lang`. |
| New to Bhakti | Beginner guide. Homepage has only a short intro block. | — |
| Collections / Series | Multi-volume sets: Srimad-Bhagavatam, Caitanya-caritamrta, Prabhupada-lilamrta. Sold as single volumes and as full sets. | — |
| ~~Contact / Help~~ | **Built** as `contact.html` (card-catalogue design). | **Ships with placeholder contact details on the owner's instruction.** `hello@example.com` and `+66 2 000 0000` are stand-ins, set in one place at the top of `js/contact.js` and repeated in `contact.html`'s channel list. Both must be replaced before launch. The form itself still has no backend and says so plainly on submit. |
| ~~Search results~~ | **Done.** No separate page — `shop.html` is the results page. `js/finder.js` already had the search engine; it just had no input. | — |
| Shipping policy | Linked from footer and checkout. | Carriers, zones, rates, times undecided. |
| Returns / refunds | Same. | Returns and refund rules undecided. |
| Privacy + Terms | Standard store pages. | Legal reseller wording not available. |

## 2. Homepage sections in the structure doc but missing

- **Announcement bar** (structure doc §4).
- **Trust strip** (§7). Only a small `trust-badge` exists inside the hero
  (`index.html:104`).
- **About BBT section** (§10).

## 3. Header and navigation

- `about.html` has a compact mobile navigation row. The other six pages still
  remove the desktop nav below 980px without a replacement.
- Logo links to `#` instead of `index.html` (`index.html:55`).
- The `Languages` item still needs to point at `shop.html#shop-lang` across
  the existing pages. About BBT now links to `about.html`.
- ~~Search control is decorative~~ — **fixed.** All six header search controls
  now point at `shop.html#search`, and the input focuses on arrival.

## 4. Catalog data

- `js/catalog.js` has 42 rows. Only the 7 Thai rows are real (prices and
  availability from idea doc §3).
- Every non-Thai row has `price: null` and `status: 'pending'`. Needs real
  titles, prices, and stock.
- All covers point at English scans in `assets/books/`. Thai cover images do
  not exist yet and English scans must never be labelled as Thai editions.
- Edition cross-links are not wired. Each language edition should link to its
  sibling editions of the same work.
- Multi-volume set products do not exist as catalog entries.

## 5. Backend

- No payment gateway. Checkout is a front-end mock only.
- No order storage, no order confirmation email, no stock tracking.
- Pre-order charging rules and mixed-order fulfilment undecided.
- Guest checkout vs account rules undecided.
- Keep using "Tracked orders". Do not claim "Encrypted checkout" until the
  payment provider is confirmed (`PRODUCT.md`).

## 6. Brand assets

- Larger or vector version of the logo is still outstanding.
- Permission for the Thai-palette recolour of the logo is not separately
  confirmed. Should be confirmed.

---

## Suggested order

1. Fix navigation: mobile menu, home link, dead nav links.
2. Build the pages that need no undecided facts: New to Bhakti,
   Collections / Series.
3. Add the three missing homepage sections.
4. Get the real catalog data and Thai covers, then wire edition cross-links
   and multi-volume sets.
5. Get BBT sign-off on the copy now implemented in `about.html`.
6. Replace the two placeholder contact details on `contact.html` with the real
   email and phone (one edit at the top of `js/contact.js`, one in the channel
   list), and point the header and footer of the other seven pages at
   `contact.html`.
7. Decide the remaining operational facts in `PRODUCT.md` (payment, shipping,
   returns, store name), then build the policy pages, and correct the footer
   copyright on all pages.
8. Connect a real backend and payment gateway last.

**Note:** many missing pages depend on facts marked "explicitly undecided" in
`PRODUCT.md`. Decide those first, or the pages will be empty shells. Do not
invent them.

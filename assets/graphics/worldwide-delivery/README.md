# Worldwide Delivery asset pack

These files recreate the selected engraved-atlas composition while keeping all
interface text, controls, and layout semantic in HTML/CSS.

## Layers

1. `engraved-world-map-ink.webp` — production background artwork. The linework
   sits on transparency in a single warm ink, so the plate has no cream edge
   against the page paper. Weight is dialled with CSS `opacity`.
2. `routes-overlay.svg` — three delivery arcs and the Thailand origin marker.
3. The three transparent book mockups:
   - `book-light-of-bhagavata.png`
   - `book-self-realization.png`
   - `book-perfect-questions.png`
4. `delivery-mark.svg` — the small four-diamond label mark.
5. `palette-swatches.svg` — the lower-right palette signature.

`engraved-world-map.png` is the lossless source. `engraved-world-map.webp` is
the opaque variant, kept for compositing work; the page uses the `-ink` build.

## Composition notes

- Map and route overlay share a 1774 × 887 coordinate system and can occupy the
  same absolutely positioned wrapper.
- The origin marker sits on Thailand at `1270, 505` in that grid. Each arc ends
  underneath one book, so book positions and arc endpoints move together:
  `600, 560` (Americas), `960, 396` (Europe), `1398, 588` (Pacific).
- Keep route and marker artwork below the book mockups.
- The book mockups already include transparent padding and warm shadows.
- Render the headline, delivery label, copy, and CTA as HTML rather than images.
- Use the existing project tokens for paper, ink, Thai red, and Thai navy.

## Source covers

The mockups preserve the existing project files without redrawing their artwork:

- `assets/books/en-lob.jpeg`
- `assets/books/en-ssr.jpeg`
- `assets/books/en-pqpa.jpeg`

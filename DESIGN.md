---
name: BBT Thailand Bookstore
description: A bright ivory reading room where hairline rules, tilted covers, and one stepped color ladder carry the whole brand.
colors:
  th-red: "#a51931"
  th-navy: "#2d2a4a"
  th-white: "#f4f5f8"
  ink: "#11110f"
  rule-ink: "#24231f"
  paper: "#fbf7ed"
  band-rose: "#e9b9c1"
  band-red-mid: "#d2536b"
  band-red: "#a51931"
  band-navy-mid: "#5a557f"
  band-navy: "#2d2a4a"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "clamp(46px, 5vw, 74px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "clamp(38px, 3.1vw, 58px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontSize: "clamp(18px, 1.28vw, 23px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontSize: "clamp(16px, 1.25vw, 18px)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontSize: "9px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0.14em"
rounded:
  none: "0"
  pill: "50%"
spacing:
  xs: "6px"
  sm: "11px"
  md: "18px"
  lg: "26px"
  xl: "48px"
  section: "clamp(48px, 5.5vw, 92px)"
  shell: "min(100% - clamp(40px, 9vw, 180px), 1180px)"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.th-red}"
    textColor: "{colors.th-white}"
  link-underline:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 0 3px"
  icon-control:
    backgroundColor: "{colors.th-navy}"
    textColor: "{colors.th-white}"
    rounded: "{rounded.pill}"
    width: "42px"
    height: "42px"
  card-book:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "15px clamp(20px, 2.4vw, 40px) 18px"
  badge-count:
    backgroundColor: "{colors.th-red}"
    textColor: "{colors.th-white}"
    rounded: "{rounded.pill}"
    width: "17px"
    height: "17px"
---

# Design System: BBT Thailand Bookstore

## Overview

**Creative North Star: "The Bright Reading Room"**

A sunlit independent bookshop, mid-morning. Warm ivory paper everywhere, hairline ink rules dividing the space into calm compartments, and books tilted as if a person just set them down. Nothing on the page pretends to be a card, a panel, or a dashboard. The page is paper; the books are objects resting on it. That single distinction governs every visual decision in the system.

The system is deliberately quiet so that two things can be loud: the book covers, and the stepped color ladder. Covers are the largest elements on any screen and the only source of photographic color. The ladder — five bars climbing from deep Thai navy up to a pale rose — is the one place the brand raises its voice, and it is rationed to the bottom of the hero and a single corner anchor per major section. Everything between them is ivory, ink, and thin lines.

Type carries the cultured, editorial register: a high-contrast serif for display, a workhorse text serif for everything readable. There is no sans-serif in the system, no uppercase headline, and no decorative religious ornament. The spiritual character comes from the books themselves, from generous air, and from restraint. The confirmed anti-references are: generic corporate publisher, crowded marketplace, luxury or exclusive boutique, and anything old-fashioned.

**Key Characteristics:**

- Warm ivory ground (`#fbf7ed`) with a fine multiply-blended paper grain over the whole viewport
- Hairline ink rules (1px `#24231f`) as the only structural divider — no card backgrounds, no borders on containers
- Zero corner radius on every rectangle; circles reserved exclusively for icon controls
- Book covers tilted 2–7°, straightening on hover
- The stepped navy-to-rose ladder as the single signature graphic
- Two serifs, no sans-serif, no uppercase headlines
- Asymmetry inside a strict grid

## Colors

An ivory-and-ink base carrying the two Thailand flag colors, plus a five-step ladder that is used as a graphic object rather than as a palette.

### Primary

- **Thai Red** (`#a51931`): The Thailand flag red. The only accent color permitted for interface meaning — hover fills, cart count, status labels, small emphasis marks. It is never a background for large areas and never used for body text. Because it is dark, anything sitting on it uses Thai White, never ink.
- **Thai Navy** (`#2d2a4a`): The Thailand flag blue. Carries inverted surfaces — the cart circle, CTA arrows, CTA borders, and vertical rules. It replaces the old near-black `#111` so inverted chips read as brand, not as default black.
- **Thai White** (`#f4f5f8`): The flag white. Used only as foreground on Thai Red or Thai Navy. It is not a page background — the page stays Warm Paper.

### Secondary

The **Stepped Ladder** is a fixed five-color sequence, always used together in order, never split into individual UI colors. It now climbs from Thai Navy up through the reds to a pale rose:

- **Ladder Rose** (`#e9b9c1`): Top step, shortest bar.
- **Ladder Red Mid** (`#d2536b`): Second step.
- **Ladder Red** (`#a51931`): Middle step — the true flag red.
- **Ladder Navy Mid** (`#5a557f`): Fourth step.
- **Ladder Navy** (`#2d2a4a`): Bottom step, longest bar — the true flag navy.

### Neutral

- **Warm Paper** (`#fbf7ed`): The page. Every section sits on it; no section introduces a competing background.
- **Deep Ink** (`#11110f`): All body and heading text, and running copy. Icon control fills and the CTA border now use Thai Navy.
- **Rule Ink** (`#24231f`): The 1px hairlines that divide the book grid and section edges. Marginally warmer and softer than text ink so rules recede behind words.

### Named Rules

**The Ladder-Is-One-Object Rule.** The five ladder colors are a single graphic, not a palette. Never pull one step out to color a button, a heading, a link, or an icon. If a design needs the ladder, it uses all five bars in sequence.

**The One Accent Rule.** Thai Red is the only color that may carry interface meaning, and it appears on well under 10% of any screen. Its rarity is what makes it read as the brand.

**The Token Rule.** No color literal may appear outside the `:root` block in `css/hero.css`. Every rule references a token. A grep for `#` or `rgb(` past the `:root` block must return nothing.

**The Jacket Exception.** The hero book covers (`--jacket-gold-*`, `--jacket-indigo-*`) depict real printed book jackets. They are artwork, not brand color, and are exempt from the palette. Never reuse a jacket token for UI.

**The Paper-Only Rule.** There is exactly one background color in the system. A section that wants separation earns it with a rule, whitespace, or the ladder — never with a tinted panel.

## Typography

**Display Font:** Playfair Display (with Georgia, Times New Roman, serif)
**Body Font:** Source Serif 4 (with Georgia, Times New Roman, serif), optical sizing enabled

**Character:** A high-contrast editorial serif over a warm, low-contrast text serif. Playfair supplies the bookshop-window confidence in headlines; Source Serif keeps long copy, prices, and titles quietly readable at any size. The pairing is literary rather than devotional — cultured, not ceremonial.

### Hierarchy

- **Display** (Playfair, 400, `clamp(46px, 5vw, 74px)`, line-height 1.04, tracking -0.02em): Hero headline only. Set as stacked block lines that hold on one line at desktop and are released to wrap below 580px. A single italic 500-weight word may be emphasized with a hand-drawn Thai Red underline.
- **Headline** (Playfair, 400, `clamp(38px, 3.1vw, 58px)`, line-height 1.04, tracking -0.04em): Section titles. Tighter tracking than the hero so section heads read as a rank below it, not a repeat of it.
- **Dek** (Source Serif, 400, `clamp(17px, 1.25vw, 21px)`, line-height 1.2): The one-line supporting sentence under a section headline. Sits 9px below its headline, deliberately tight, so headline and dek read as one unit.
- **Title** (Source Serif, 400, `clamp(18px, 1.28vw, 23px)`, line-height 1.15, tracking -0.02em): Book titles in product cards. Serif, not display — the cover is the star, the title is information.
- **Body** (Source Serif, 400, `clamp(16px, 1.25vw, 18px)`, line-height 1.7, 72% ink opacity, max 54ch): Lead paragraphs and running copy. The generous line-height is what makes the page feel like a reading room.
- **Label** (Source Serif, 600–700, 9–14px, tracking 0.08–0.14em, uppercase): Small credibility and status text only — cover captions, badge text, the "5 Languages" detail. This is the only place uppercase is allowed.

### Named Rules

**The No-Sans Rule.** There is no sans-serif in this system. If something feels like it needs a sans, it needs a smaller serif at a wider tracking.

**The Headline-Stays-Cased Rule.** Display and Headline are always sentence case. Uppercase belongs to the Label role and nowhere else.

**The Numeral-As-Image Rule.** Large standalone figures (the "5" in the language detail, 82px Playfair) are set in the display serif at a size where they read as a graphic element, paired with an uppercase label behind a 1px vertical rule.

## Layout

A centered shell of `min(100% - clamp(40px, 9vw, 180px), 1180px)` governs every section. Its side gutter is fluid, so the page breathes wider on large screens instead of pinning to a fixed margin.

**Density.** Deliberately low. Major sections run to `100svh` minimum. Section padding is `clamp(48px, 5.5vw, 92px)`; the gap between a section heading and its content is the same clamp. Whitespace is the primary tool for separating ideas.

**Asymmetry inside a grid.** The hero is a two-column grid weighted toward the imagery side (`minmax(420px, .95fr) / minmax(480px, 1.05fr)`), with the book composition absolutely positioned inside a fixed `600/700` aspect box so the tilt and overlap stay identical at every width. Section headings are a `1fr auto` grid with the title left and its action bottom-right.

**The book grid** is a true ruled table: 4 columns × 2 rows on desktop, cells divided by 1px rules with the outer edges left open. Rows have a `minmax(390px, 1fr)` floor so covers of different proportions still align.

**Responsive behavior.**

- **≤1400px:** book cell padding tightens to 24px.
- **≤980px:** shell becomes `min(100% - 48px, 720px)`. Primary nav is hidden (mobile menu takes over). Hero collapses to a single block with the book composition centered beneath the copy. Book grid becomes 2 columns; every cell regains its bottom rule and the right rule is dropped on even cells.
- **≤580px:** shell becomes `min(100% - 40px, 680px)`. Hero headline releases from `nowrap`. Book grid becomes a single stacked column with covers enlarged to 340px — cover size is preserved even as the layout simplifies. The ladder anchor shrinks to 196×130px.

**The Reduce-Decoration-First Rule.** When width runs out, decorative elements shrink or leave before product information does. Covers, titles, prices, and availability are the last things to change.

## Elevation & Depth

The page is flat; only objects lift. There are no card shadows, no panel elevation, and no surface layering anywhere in this system. Depth comes from exactly two sources: a fixed paper-grain overlay across the viewport (two repeating radial gradients at 13% opacity, `mix-blend-mode: multiply`), and drop shadows that belong to book covers because books are physical things sitting on paper.

### Shadow Vocabulary

- **Shelf Rest** (`box-shadow: 9px 11px 12px rgb(47 35 16 / 22%)`): A book cover at rest in the grid. Offset down and to the right, warm-brown rather than black, as if lit from upper-left.
- **Shelf Lift** (`box-shadow: 11px 16px 18px rgb(47 35 16 / 26%)`): The same cover on hover, paired with `translateY(-5px)` and rotation returning to 0.
- **Hero Slab** (`box-shadow: 0 18px 32px rgb(36 25 14 / 17%)`): The larger, softer shadow under the two oversized hero covers.
- **Inner Board** (`box-shadow: 0 15px 20px rgb(36 25 14 / 27%)`): The printed cover image sitting inside its hero book-board, which gives the hero books a real front-board thickness.

### Named Rules

**The Flat-Page Rule.** Shadows attach to books only. A shadow on a button, a card, a header, a badge, or a section is a defect in this system.

**The Warm-Shadow Rule.** Shadows are warm brown (`rgb(47 35 16 / …)`), never neutral black. Black shadows on ivory read as dirt.

## Shapes

Sharp and printed. Every rectangle in the system has zero corner radius — buttons, book cards, ladder bars, cover boards, and the CTA all end in hard corners. The only curves are full circles (`50%`), reserved exclusively for the icon controls in the header and the cart count badge.

Structure is drawn with 1px hairlines rather than filled shapes. The book grid's dividers, the CTA's outline, the vertical stroke beside the language numeral, and the small 16px horizontal tick between a price and its availability are all the same idea at different scales: a thin ink line doing the work a box would do elsewhere.

Two shapes break the geometry on purpose and must stay rare: the trust badge's 30-point starburst (`clip-path` polygon, rotated -6°), and the hand-drawn underline beneath an emphasized hero word (a `50%`-radius Thai Red sliver rotated -2°, so it reads as a pen stroke rather than a border-bottom).

**The Zero-Radius Rule.** Rectangles never round. If a shape wants softening, it becomes a circle or it stays sharp.

## Components

### Buttons

- **Shape:** Hard corners (`0` radius), split into a text cell and a fixed 46px action cell.
- **Primary CTA:** A 1px ink outline (`#11110f`) over a 38%-white wash on the ivory ground, with the trailing arrow cell filled solid ink and reversed to white. Text is 13.5px, weight 600. Text cell padding is 26px inline, minimum height 46px.
- **Hover / Focus:** Only the arrow cell changes — its fill goes to Thai Red and its glyph to Thai White, over 0.2s ease. The button never moves, scales, or casts a shadow.
- **Secondary:** There is no filled secondary button. The secondary action in this system is the underlined text link below.

### Links

- **Section action link** ("View All Thai Books →"): Text with a 1px bottom rule and an 11px gap to its arrow. On hover the gap expands to 17px over 0.2s — the arrow visibly steps away from the words. Color shift on hover uses Thai Red's role, not a second accent.
- **Nav link:** A 1px underline scaled from 0 on the x-axis, growing to full width over 0.25s on hover and focus. The featured nav item ("Thai Books") is weight 700 and holds its underline permanently — that is how emphasis is shown in the nav, not with color.
- **Book title link:** An underline drawn with a `background-size` transition from `0 1px` to `100% 1px` over 0.25s, so the rule wipes in from the left rather than fading.

### Cards / Containers

- **Corner Style:** None. Book cards are grid cells, not cards.
- **Background:** Paper. Cards never introduce their own fill.
- **Shadow Strategy:** The cell has none; only the cover image inside it does (see Elevation).
- **Border:** 1px `#24231f` on the right and bottom edges, dropped on the last column and last row so the grid has no outer frame.
- **Internal Padding:** `15px clamp(20px, 2.4vw, 40px) 18px`, with the cover area given a `-10px` x-offset so tilted covers stay optically centered.
- **Content order:** cover, then title, then a single line holding price, a 16px tick rule, and availability.

### Navigation

Header is a 3-column grid (`250px 1fr 250px`) 116px tall, absolutely positioned over the hero so the ivory reads as continuous. Logo left at `clamp(174px, 15vw, 214px)`, links centered at 15px/weight 500 with `clamp(26px, 3.2vw, 50px)` gaps, controls right.

- **Search control:** A 40px circle, transparent at rest, drawn entirely from a bordered circle and a rotated 1.7px stroke. Hover fills with 7% ink.
- **Cart control:** A 42px solid ink circle with a 21px white stroked SVG, carrying a 17px Thai Red count badge with a 2px white ring at the top-right.
- **Below 980px:** The link row is removed entirely; the header becomes logo plus controls.

### Book Cover (signature component)

The recurring object of the whole system. In the grid it is a bare image at `clamp(240px, 26vh, 306px)` tall, `object-fit: contain`, rotated -2.2° or +1.8° in alternation, carrying Shelf Rest shadow. On hover it straightens to 0°, rises 5px, and deepens to Shelf Lift over 0.28s.

In the hero the same idea is built up into a physical book-board: a tinted rectangle with a 1px 18%-ink outer edge and a 1px 26%-white inset frame 10px in, holding the cover image at 78% height and 72% max-width, with an uppercase 9px caption in the corner. Boards are rotated 5.8° and 7° in opposite visual weight and overlapped so one sits in front of the other.

### The Stepped Ladder (signature component)

Five bars in the fixed plum-to-gold sequence. Two sanctioned expressions:

- **Hero anchor:** Full-bleed across the bottom of the hero, `clamp(120px, 17vh, 168px)` tall, each bar 20% height, right-aligned with left edges stepping in at 50%, 36%, 22%, 8%, 0% — so the bars grow longer as the color deepens.
- **Section anchor:** A small 282×192px stair in the bottom-left corner, bars 39px tall, widths stepping 42 → 86 → 130 → 178 → 224px. Shrinks to 196×130px below 580px.

Both are `aria-hidden` and non-interactive. The ladder is decoration with brand meaning, never a control.

### Motion

Every transition in the system is 0.2–0.28s, `ease`, and affects at most two properties. There are no entrance animations, no scroll effects, and no looping motion. A full `prefers-reduced-motion` block collapses all transitions to 0.01ms.

## Do's and Don'ts

### Do:

- **Do** put every section on the same ivory paper (`#fbf7ed`) and separate them with rules and whitespace.
- **Do** draw structure with 1px hairlines in Rule Ink (`#24231f`), leaving the outer edges of a grid open.
- **Do** keep every rectangle at zero radius; use `50%` circles only for icon controls.
- **Do** tilt book covers 2–7° at rest and straighten them on hover with a 5px lift.
- **Do** use warm brown shadows (`rgb(47 35 16 / …)`) and attach them only to books.
- **Do** reserve uppercase for the Label role at 0.08–0.14em tracking.
- **Do** hold transitions to 0.2–0.28s ease on at most two properties.
- **Do** let the Dek sit tight (9px) under its headline so the pair reads as one unit.
- **Do** shrink or drop decoration before touching product information on small screens.

### Don't:

- **Don't** introduce a second background color, a tinted panel, or a filled card.
- **Don't** put a shadow on anything that is not a book.
- **Don't** pull a single step out of the ladder to color a button, link, heading, or icon.
- **Don't** add a sans-serif, or set a Display or Headline in uppercase.
- **Don't** round a rectangle's corners.
- **Don't** add entrance animations, parallax, or scroll-triggered motion.
- **Don't** add decorative religious ornament — lotuses, mandalas, om marks, halos. The books carry the spiritual character.
- **Don't** label the English cover assets in `assets/books/` as Thai editions.

### Known drift to reconcile

None. The Thai flag palette pass reconciled all previous drift: `--gold` is gone, the
off-system magentas on `.preorder` and `.view-all:hover` now use the Thai Red accent
token, the ladder SVG matches the documented five steps, and the one black shadow is
now warm. Every color in `css/hero.css` lives in `:root`.

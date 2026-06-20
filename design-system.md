# Student Volunteer Army (SVA) — Design System

> Reverse-engineered design system for **https://www.sva.org.nz**
> Prepared as a professional, build-ready specification for recreating the site from scratch.

---

## About this document

This is a reverse-engineered design system reconstructed from analysis of the live SVA website (home, About, and Service Award pages) and the brand's visual language. The site is a **Next.js (App Router) front end** served from a **Strapi CMS** (`next/image` optimisation, `backend:1337` media), and its styling is consistent with a **Tailwind CSS + utility-token** architecture.

**Fidelity note.** Exact hex values, font names, and pixel measurements could not be read directly from the production CSS in this environment. Where a value is not directly observable it has been **inferred** from the brand's signature orange-and-dark geometric identity, the rendered layouts, and modern Tailwind conventions. Inferred values are marked _(inferred)_ and are internally consistent so the system can be implemented immediately and then fine-tuned against the live site with browser dev tools. Treat every token as the single source of truth; adjust the raw hex/px once verified, and the rest of the system stays coherent.

---

# Design System

## 1. Brand Identity

### Brand personality
SVA presents as **energetic, optimistic, grounded, and community-first**. It is a youth-led New Zealand charity (born from the 2010–2011 Canterbury earthquake response) that has matured into national infrastructure for student volunteering. The personality blends **grassroots warmth** with **institutional credibility** — friendly enough to motivate a 13-year-old, trustworthy enough for a school principal, a corporate partner, or a funder.

Personality keywords: *purposeful, inclusive, action-oriented, hopeful, proud, dependable, youthful but not childish.*

### Visual style
- **Bold, photo-led, editorial.** Large full-bleed photography of real students and communities anchors nearly every section.
- **High-contrast brand colour:** a vivid SVA orange used decisively against deep dark (navy/charcoal) and clean white.
- **Geometric brand motifs:** chevron / diamond / arrow "pattern" SVGs (`chevron-pattern.svg`, `diamond-pattern.svg`, `logo-pattern.svg`) derived from the angular SVA mark, used as subtle overlays, dividers, and texture (`bg-texture.png`).
- **Generous whitespace** and large type create a confident, modern, mission-driven feel.
- **Rounded but restrained** corners; cards and buttons feel approachable, not bubbly.

### Tone and mood
Warm, sincere, and motivating. Copy is plain-spoken and values-driven ("Supporting Students to Show Up & Help", "Volunteering is time freely given, without expectation of reward"). Uses **te reo Māori** naturally (*mahi, whānau, rangatahi, manaakitanga, Aotearoa, Ōtautahi*), signalling cultural grounding and inclusion. Mood is uplifting and earnest rather than slick or corporate.

### Target audience
A deliberately multi-audience site:
1. **Students / rangatahi (Year 7–13 and tertiary)** — the primary volunteers; need motivation and an easy path to log hours / join a club.
2. **Schools & teachers** — adopt the SVA Service Award; need credibility, low-admin reassurance, registration.
3. **Partners & community organisations** — collaborate on impact; need proof and contact.
4. **Donors / funders / supporters** — fund the work; need impact metrics and a "Support us" path.

### Key design principles
1. **Show real people.** Authentic documentary photography over illustration or stock.
2. **Lead with purpose, prove with numbers.** Emotive headline → human story → hard impact stats.
3. **One clear action per surface.** Every section funnels toward a single primary CTA ("Support us", "Register Your School", "Log your hours").
4. **Inclusive by default.** Plain language, equitable framing ("one volunteer hour equals one volunteer hour"), accessible contrast.
5. **Consistent geometric brand system.** Chevron/diamond motifs + orange + dark create instant recognition across pages.
6. **Calm structure, energetic accents.** Neutral canvas, disciplined spacing, with orange reserved for emphasis and action.

---

## 2. Color Palette

The palette is **monochromatic-warm + neutral**: one dominant brand orange, a deep dark for grounding/contrast sections, and a clean neutral scale for surfaces and text. Values are approximate/inferred and tuned for WCAG-aware contrast.

```css
:root {
  /* ---- Brand ---- */
  --primary:            #F26522; /* SVA Orange — primary brand, CTAs, accents */
  --primary-hover:      #D9531A; /* darker orange for hover/active */
  --primary-pressed:    #B8430F; /* pressed / deep accent */
  --primary-tint:       #FDEDE3; /* 10% orange wash, soft backgrounds */
  --secondary:          #122A3F; /* Deep Navy/Ink — dark sections, headings */
  --secondary-hover:    #0C1E2E;

  /* ---- Accent ---- */
  --accent:             #FFB081; /* light orange — highlights, pattern fills */
  --accent-warm:        #FFF4EC; /* warm paper background */
  --accent-success:     #2E9E5B; /* positive/confirm (inferred) */
  --accent-info:        #2B6CB0; /* links/info (inferred) */

  /* ---- Background ---- */
  --bg-base:            #FFFFFF; /* default page background */
  --bg-subtle:          #F7F6F4; /* off-white alternating sections */
  --bg-warm:            #FFF7F1; /* warm tinted section background */
  --bg-dark:            #122A3F; /* dark feature/stat/CTA sections */
  --bg-dark-alt:        #0E2233; /* deepest panel */

  /* ---- Surface (cards) ---- */
  --surface:            #FFFFFF; /* card surface on light bg */
  --surface-muted:      #F2F1EE; /* muted card / image placeholder */
  --surface-dark:       #1B3B54; /* card surface on dark bg */
  --surface-overlay:    rgba(18, 42, 63, 0.55); /* image scrim */

  /* ---- Text ---- */
  --text-primary:       #1A2430; /* near-black ink, body + headings on light */
  --text-secondary:     #4A5763; /* secondary/supporting copy */
  --text-muted:         #7B8794; /* captions, meta (read time, date) */
  --text-on-dark:       #FFFFFF; /* text on dark/photo backgrounds */
  --text-on-dark-muted: #C7D2DC; /* secondary text on dark */
  --text-on-primary:    #FFFFFF; /* text on orange */
  --text-link:          #D9531A; /* inline links */

  /* ---- Border / divider ---- */
  --border:             #E5E2DD; /* hairline dividers, card borders */
  --border-strong:      #CBC8C2; /* inputs, stronger separation */
  --border-on-dark:     rgba(255,255,255,0.16);
  --border-focus:       #F26522; /* focus ring (brand orange) */

  /* ---- States ---- */
  --hover-overlay:      rgba(0,0,0,0.04);   /* subtle hover on light surfaces */
  --hover-overlay-dark: rgba(255,255,255,0.08);
  --error:              #D64545;
  --warning:            #E6A100;
  --success:            #2E9E5B;
  --disabled-bg:        #ECEAE6;
  --disabled-text:      #A7AEB5;
}
```

### Gradient definitions
Gradients are used sparingly — mostly as **image scrims** to keep headline text legible over photos, plus an optional warm brand gradient for emphasis.

```css
/* Hero / card photo legibility scrim (bottom-up dark) */
--gradient-image-scrim: linear-gradient(
  180deg,
  rgba(18,42,63,0) 0%,
  rgba(18,42,63,0.15) 45%,
  rgba(18,42,63,0.75) 100%
);

/* Left-to-right scrim for split hero text over imagery */
--gradient-hero-side: linear-gradient(
  90deg,
  rgba(18,42,63,0.78) 0%,
  rgba(18,42,63,0.35) 50%,
  rgba(18,42,63,0) 100%
);

/* Brand emphasis gradient (buttons / highlights, optional) */
--gradient-brand: linear-gradient(135deg, #F47B36 0%, #F26522 55%, #D9531A 100%);

/* Warm section wash */
--gradient-warm: linear-gradient(180deg, #FFFFFF 0%, #FFF7F1 100%);
```

### Hover states (summary)
| Element | Rest | Hover | Active/Pressed |
|---|---|---|---|
| Primary button | `--primary` #F26522 | `--primary-hover` #D9531A | `--primary-pressed` #B8430F |
| Secondary/outline button | transparent + orange border | `--primary-tint` fill | orange fill |
| Ghost / nav link | `--text-primary` | `--primary` text | `--primary-pressed` |
| Card | `--surface` + shadow-sm | lift: shadow-md + translateY(-4px) | — |
| Link | `--text-link` | underline + `--primary-pressed` | — |

---

## 3. Typography

### Type families
The site uses a **friendly geometric/grotesque sans** for headings and a **neutral humanist sans** for body — a common, defensible pairing for youth-focused civic brands. Exact families are inferred; swap to the verified webfont once confirmed.

```css
--font-heading: "Poppins", "Sofia Pro", "Aktiv Grotesk", "Helvetica Neue", Arial, sans-serif; /* inferred geometric sans */
--font-body:    "Inter", "Roboto", "Helvetica Neue", Arial, system-ui, sans-serif;            /* inferred neutral sans */
--font-mono:    "SFMono-Regular", "JetBrains Mono", ui-monospace, monospace;                  /* rare, code/meta */
```

Headings are weighty (600–800) and tight; body is comfortable at 400–500. The big impact statistics (e.g. **3,490,000+**) use an extra-bold display weight.

### Type scale
A modular scale (~1.2 mobile / ~1.25 desktop). Sizes shown desktop → mobile.

| Token | Use | Size (desktop → mobile) | Weight | Line-height | Letter-spacing | Case |
|---|---|---|---|---|---|---|
| `display` | Big stat numbers (3.49M+) | 72px → 44px | 800 | 1.0 | -0.02em | — |
| `h1` / hero | Hero headline | 56px → 34px | 700–800 | 1.05 | -0.02em | Sentence |
| `h2` | Section headings | 40px → 28px | 700 | 1.15 | -0.01em | Sentence |
| `h3` | Card titles / subsection | 24px → 20px | 600 | 1.25 | -0.005em | Sentence |
| `h4` | Sub-card / pillar titles | 20px → 18px | 600 | 1.3 | 0 | Sentence |
| `eyebrow` | Kicker label ("Who we are") | 14px → 13px | 600 | 1.2 | 0.08em | UPPERCASE |
| `lead` | Intro paragraph under H1/H2 | 20px → 18px | 400 | 1.55 | 0 | Sentence |
| `body` | Default paragraph | 16–17px → 16px | 400 | 1.65 | 0 | Sentence |
| `body-sm` | Dense / secondary copy | 14px | 400 | 1.6 | 0 | Sentence |
| `caption` | Meta: "5 min read · Jan 13, 2026" | 13px | 500 | 1.4 | 0.01em | Sentence |
| `button` | Button label | 15–16px | 600 | 1 | 0.01em | Sentence |
| `nav` | Header nav link | 15–16px | 500 | 1 | 0.005em | Sentence |
| `quote` | Testimonial quote | 24px → 20px | 500 | 1.5 | -0.005em | Sentence (italic optional) |

### Per-style specification

**Hero headings (`h1`)**
`font-heading`, 56px desktop / 34px mobile, weight 700–800, line-height 1.05, letter-spacing -0.02em. Used full-width over photography or on light backgrounds. Often paired with a small uppercase eyebrow above and a `lead` paragraph below.

**Page headings**
Same as `h1` but typically with no background image (interior page heroes like "The national framework for student volunteering"). Max width ~14–16ch for headlines to keep ragged, readable line lengths.

**Section headings (`h2`)**
`font-heading`, 40px → 28px, weight 700, line-height 1.15. Examples: "Why youth volunteering matters", "Creating Real Change in the Places We Call Home", "How would you like to get involved?".

**Subheadings (`h3`/`h4`)**
Card and pillar titles ("From Service to Career", "Recognition", "Community Action"). 24px → 20px, weight 600.

**Body text**
`font-body`, 16–17px, weight 400, line-height 1.6–1.65, color `--text-secondary`/`--text-primary`. Measure capped ~60–72ch.

**Captions / meta**
13px, weight 500, color `--text-muted`. Story meta uses a dot/space separator: "5 min read · Jan 13, 2026".

**Buttons**
`font-heading` or `font-body` semibold, 15–16px, weight 600, letter-spacing 0.01em, no uppercase.

**Navigation**
`font-body`, 15–16px, weight 500, color `--text-primary`; hover → `--primary`.

---

## 4. Layout System

```css
--container-max:      1200px;  /* primary content max-width (inferred ~1140–1280) */
--container-wide:     1440px;  /* wide/feature sections */
--container-narrow:   760px;   /* long-form reading column */
--gutter:             24px;    /* horizontal page padding (desktop) */
--gutter-mobile:      20px;
--grid-columns:       12;
--grid-gap:           24px;    /* desktop column gap */
--grid-gap-mobile:    16px;
```

### Max content width & containers
- **Standard container:** `max-width: 1200px`, centered, with `padding-inline: 24px` (desktop) / `20px` (mobile). _(inferred)_
- **Full-bleed sections** (hero photos, dark stat band, photo collage) span 100% viewport width with inner content constrained to the container.
- **Reading column** (story/about prose): ~720–760px.

### Grid & column system
A **12-column** flex/grid system with a 24px gutter.
- **Benefit cards** ("Why youth volunteering matters"): 4-up on desktop (each spans 3 cols), 2-up tablet, 1-up mobile — presented as a horizontal scroll/carousel on smaller screens.
- **Stats:** 3-up equal columns on desktop, stacked on mobile.
- **Stories:** 3-up card grid → 1-up carousel on mobile.
- **Get-involved:** asymmetric — one large "Support Us" feature card + a 3-up row (Students / Schools / Partners).
- **Pillars (Service Award):** 4-up grid → 2-up → 1-up.
- **Footer:** logo/newsletter block + two link columns + social row (≈ 4–5 columns collapsing to stacked).

### Spacing system
8px base unit. Spacing scale (px): `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120`.

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 24px;  --space-6: 32px;  --space-7: 40px;  --space-8: 48px;
--space-9: 64px;  --space-10: 80px; --space-11: 96px; --space-12: 120px;
```

- **Section vertical padding (`section-y`):** 96–120px desktop, 64px tablet, 48px mobile.
- **Card padding:** 24–32px.
- **Element gap inside cards:** 12–16px.
- **Heading → body gap:** 16–24px.
- **Button padding:** 14px vertical / 28px horizontal (primary).

### Margin / padding standards
- Consistent `--gutter` page inset everywhere; never let content touch the viewport edge except full-bleed media.
- Vertical rhythm in multiples of 8; major section breaks at 96/120.
- Cards use uniform internal padding; image-topped cards have edge-to-edge media with padded text body.

### Responsive breakpoints (Tailwind-aligned)
```css
--bp-sm:  640px;   /* large phone */
--bp-md:  768px;   /* tablet portrait */
--bp-lg:  1024px;  /* tablet landscape / small laptop */
--bp-xl:  1280px;  /* desktop */
--bp-2xl: 1536px;  /* large desktop */
```

---

## 5. Navigation Design

### Header structure
A **sticky top header** with the SVA logo at the left and a grouped link cluster + two action buttons at the right.

- **Left:** SVA logo (`logo.svg`) — on some pages paired with the angular `logo-pattern.svg` mark. Links to home.
- **Center/Right primary links:** *About us · Service Award · Clubs · Partners*.
- **Secondary links** (slightly de-emphasised second tier or grouped): *Impact · News/Shop · Stories*. (Link set varies subtly per page — e.g. home shows "News", About/Service Award show "Shop".)
- **Right actions (buttons):**
  - *Volunteer Login* → `volunteer.sva.org.nz` (secondary/ghost style).
  - *Support us* → external Raisely donation site (primary orange button).

### Navbar layout
Single horizontal bar, ~72–88px tall, white background, content constrained to container. Logo left; links center-right with comfortable 24–32px spacing; CTA buttons far right. Likely a light hairline or shadow appears on scroll.

### Dropdown behavior
The top-level IA is mostly flat (no deep mega-menus observed). If sub-navigation exists it would be a simple **hover/focus dropdown** under a parent item; recommended pattern: 200ms fade+slide, white panel, `shadow-md`, 8px radius, 12–16px padding, left-aligned links with orange hover.

### Mobile navigation
Below `lg` (1024px): collapse links into a **hamburger toggle** opening a **full-screen or slide-in panel**.
- Logo left, hamburger right.
- Panel: white (or dark) full-height overlay, large stacked links (`h3`-scale), the two CTAs pinned as full-width buttons at the bottom.
- Body scroll locks while open; close via X or backdrop tap; slide/fade in ~250–300ms.

### Sticky behavior
Header is **fixed/sticky** at top (`position: sticky; top: 0; z-index: 50`). On scroll it gains a subtle shadow and/or solidifies background for legibility over photo heroes. Hero content offsets for header height.

### Hover interactions
- Nav links: text color → `--primary` with an optional 2px underline/indicator animating in (150–200ms).
- "Support us" button: darkens to `--primary-hover`, subtle scale 1.02 / shadow.
- Logo: no transform, just pointer.

---

## 6. Component Library

### Buttons

Shared button base:
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font: 600 16px/1 var(--font-heading);
  padding: 14px 28px;
  border-radius: 9999px;            /* pill — SVA buttons read as fully rounded (inferred) */
  border: 1.5px solid transparent;
  transition: background-color .18s ease, color .18s ease, transform .18s ease, box-shadow .18s ease;
  cursor: pointer;
}
.btn:focus-visible { outline: 3px solid var(--border-focus); outline-offset: 2px; }
```

**Primary button** ("Support us", "Register Your School")
```css
.btn-primary { background: var(--primary); color: var(--text-on-primary); }
.btn-primary:hover { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(242,101,34,.30); }
.btn-primary:active { background: var(--primary-pressed); transform: translateY(0); }
```

**Secondary button** ("Support SVA", outline)
```css
.btn-secondary { background: transparent; color: var(--primary); border-color: var(--primary); }
.btn-secondary:hover { background: var(--primary-tint); }
.btn-secondary:active { background: var(--primary); color: #fff; }
```

**Ghost button** (header "Volunteer Login", low-emphasis)
```css
.btn-ghost { background: transparent; color: var(--text-primary); border-color: transparent; }
.btn-ghost:hover { color: var(--primary); background: var(--hover-overlay); }
```

**CTA button (on dark)** — primary orange on dark backgrounds, or inverse white:
```css
.btn-on-dark { background: #fff; color: var(--secondary); }
.btn-on-dark:hover { background: var(--accent-warm); }
```

| State | Primary | Secondary | Ghost |
|---|---|---|---|
| Rest | orange fill | orange outline | transparent |
| Hover | darker orange + lift + shadow | tint fill | orange text + faint bg |
| Active | deep orange | orange fill, white text | deep orange text |
| Focus | 3px orange ring, offset 2px | same | same |
| Disabled | `--disabled-bg` / `--disabled-text`, no shadow | muted outline | muted text |

Sizes: **sm** 10px/20px · **md (default)** 14px/28px · **lg** 16px/34px.

### Cards

**Service / feature cards** ("From Service to Career", "Empowered Youth…")
- Structure: full-width image top (4:3 or 3:2), optional **diamond-pattern** overlay in a corner, padded body with `h3` title + optional supporting paragraph.
- `border-radius: 16px`, `overflow: hidden`, `--surface`, `box-shadow: var(--shadow-sm)`.
- Hover: lift `translateY(-4px)` + `--shadow-md`; image subtle `scale(1.04)` (350ms ease).

**Testimonial cards**
- Quote-led: large `quote` text, then small circular **avatar** + name + role ("Ian Naguiat — Pest Plant Advisor at Pest Free Kaipatiki").
- Often on a tinted/dark panel; optional oversized quotation mark or brand chevron accent.
- Padding 32–40px, radius 16–20px.

**Product cards** (Shop)
- Image, product name, price, add/CTA. Same radius/shadow language; price in `--text-primary` semibold, name in `body`. _(inferred — shop not fully crawled)_

**Team cards** (e.g. founder "Sam Johnson")
- Portrait image, name (`h4`), role/caption (`caption`, muted). Minimal, centered or left-aligned; circular or rounded-rect portrait.

**Story cards** ("Faces of Service: Alex")
- Image top, `h3` title, meta row `caption`: "5 min read · Jan 13, 2026". Entire card is a link; hover lifts + title turns orange.

```css
.card {
  background: var(--surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform .25s ease, box-shadow .25s ease;
}
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.card__media { aspect-ratio: 3 / 2; object-fit: cover; width: 100%; }
.card__body { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
```

### Forms

Used in the newsletter subscribe (footer), "Log an Activity", and contact/registration flows.

**Input styling**
```css
.input {
  width: 100%;
  font: 400 16px/1.4 var(--font-body);
  color: var(--text-primary);
  background: #fff;
  border: 1.5px solid var(--border-strong);
  border-radius: 10px;            /* inputs slightly less round than pill buttons */
  padding: 12px 16px;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.input::placeholder { color: var(--text-muted); }
.input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(242,101,34,.18); }
```

**Labels**
`body-sm`/14px, weight 600, color `--text-primary`, 6–8px below-gap to field. Required marked with orange asterisk.

**Validation states**
```css
.input--error   { border-color: var(--error); box-shadow: 0 0 0 3px rgba(214,69,69,.15); }
.input--success { border-color: var(--success); }
.field__message { font: 500 13px/1.4 var(--font-body); margin-top: 6px; }
.field__message--error   { color: var(--error); }
.field__message--success { color: var(--success); }
```

**Submit buttons** — use `.btn-primary`; newsletter often an inline pill (input + orange "Subscribe" button) or stacked on mobile.

### Badges
Small status/category labels (e.g. "Testimonial", "Disaster Response" kicker chips).
```css
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  font: 600 12px/1 var(--font-heading); letter-spacing: .04em; text-transform: uppercase;
  padding: 6px 12px; border-radius: 9999px;
  background: var(--primary-tint); color: var(--primary-pressed);
}
.badge--dark { background: rgba(255,255,255,.12); color: #fff; }
```

### Tags
Lightweight, lower-emphasis than badges (cause/topic tags on stories):
```css
.tag {
  font: 500 13px/1 var(--font-body);
  padding: 5px 10px; border-radius: 8px;
  background: var(--surface-muted); color: var(--text-secondary);
}
```

### Icons
- **Style:** simple line/solid hybrid; brand uses custom geometric vector glyphs (the impact stats use bespoke `Vector_*.png` / `Icon_Group.png` marks).
- **Recommended set for rebuild:** [Lucide](https://lucide.dev) (stroke 1.75–2px) for UI; keep bespoke SVGs for brand/stat icons.
- **Sizes:** 16 / 20 / 24 / 32; stat/feature icons 40–56.
- **Color:** inherit `currentColor`; orange for emphasis, ink for default, white on dark.

### Avatars
```css
.avatar { width: 48px; height: 48px; border-radius: 9999px; object-fit: cover; }
.avatar--lg { width: 64px; height: 64px; }
.avatar--bordered { border: 2px solid #fff; box-shadow: var(--shadow-sm); }
```
Used in testimonials (circular). Image collages use rounded-rect (`radius 12–16px`) rather than circular.

### Modals
Not prominently observed; specify for completeness (mobile nav, video lightbox, newsletter):
```css
.modal__backdrop { position: fixed; inset: 0; background: rgba(18,42,63,.6); backdrop-filter: blur(2px); }
.modal { background: #fff; border-radius: 20px; max-width: 560px; width: calc(100% - 40px);
  padding: 32px; box-shadow: var(--shadow-lg); }
```
Enter: backdrop fade 200ms + panel scale 0.96→1 / fade 220ms. Close on backdrop, X, Esc. Focus-trap inside.

### Accordions
Likely on FAQ page. Pattern:
```css
.accordion__item { border-bottom: 1px solid var(--border); }
.accordion__trigger { display:flex; justify-content:space-between; align-items:center;
  width:100%; padding:20px 0; font:600 18px/1.4 var(--font-heading); color:var(--text-primary); }
.accordion__icon { transition: transform .25s ease; }      /* chevron rotates 180° when open */
.accordion__panel { overflow:hidden; transition: height .28s ease; }
```
Chevron (brand motif) rotates on expand; panel height animates; one-open-at-a-time optional.

### Tabs
Used in "Responding Together to Support Aotearoa" (SVA Service Award / Disaster Response / SVA Clubs / Partnerships switch with an associated testimonial/content panel).
```css
.tabs__list { display:flex; gap:8px; border-bottom:1px solid var(--border); }
.tab { padding:12px 18px; font:600 15px/1 var(--font-heading); color:var(--text-secondary);
  border-bottom:2px solid transparent; transition: color .15s, border-color .15s; }
.tab[aria-selected="true"] { color: var(--primary); border-color: var(--primary); }
.tab:hover { color: var(--text-primary); }
.tabpanel { padding-top: 32px; }
```
On mobile, tabs become a horizontal scroll row or stacked cards.

---

## 7. Section Breakdown

### Hero Section (home)
- **Layout:** full-bleed background photograph (`slide_01.jpg`) with an overlaid headline block; content constrained to container, text left/lower-aligned.
- **Content hierarchy:** (optional eyebrow) → `h1` "Supporting Students to Show Up & Help" → `lead` subcopy "We support students with the skills and tools to volunteer or lead volunteers and make a difference." → primary CTA(s).
- **Alignment:** left-aligned text, vertically centered/lower-third.
- **Visual treatment:** dark side/bottom gradient scrim (`--gradient-hero-side` / `--gradient-image-scrim`) for legibility; white text.
- **Background treatment:** high-quality documentary photo, possibly a slideshow (`slide_01…`). Subtle Ken-Burns zoom optional.
- **Responsive:** headline scales 56→34px; CTAs stack full-width on mobile; image focal point preserved via `object-position`.

### About Section
- Eyebrow "Who we are" → large statement `h2` → supporting paragraph → image. Alternating text/image blocks ("What we believe", "How We Work" 4-pillar grid, "Our Role", "Our History"). Founder attribution (Sam Johnson) as a mini team/quote block. Generous whitespace, single reading column for prose, full-width images between.

### Services Section ("Responding Together to Support Aotearoa")
- **Tabbed feature set:** SVA Service Award, Disaster Response, SVA Clubs, Partnerships — each with title, description, "Learn More" link to its page, paired with a **testimonial** card.
- **Structure:** tab list + content panel (image/text + CTA) + testimonial.
- **Hierarchy:** section `h2` → tabs → active panel (`h3` + body + link) → testimonial quote.
- **Spacing:** 96–120px section padding; 32–40px between tab row and panel.
- **Animation:** crossfade/slide between panels (250ms); active tab indicator slides.
- **Responsive:** tabs → stacked cards / horizontal scroll.

Also includes the **"How would you like to get involved?"** conversion section: warm textured background (`bg-texture.png` + `chevron-pattern.svg`), a large **"Support Us"** feature card plus a 3-up row — *Students / Schools / Partners* — each a titled link card.

### Testimonials Section
- Quote-led card(s): large `quote`, avatar, name, role. Single rotating testimonial or within the services tabs. Brand chevron/quotation accent; can sit on tint or dark panel.
- Responsive: full-width single column on mobile; controls (if carousel) become dots/arrows.

### Products Section (Shop)
- Grid of product cards (image, name, price, CTA). Standard card grid 3–4 up. _(inferred — shop linked in nav/footer.)_

### Stats / Impact band ("Creating Real Change in the Places We Call Home")
- **Layout:** intro `h2` + lead paragraph, then **3 large stat blocks** (3,490,000+ Volunteer Hours · 80,000+ Students Involved · 250+ Schools Onboarded), each with a bespoke icon and a one-line descriptor.
- **Visual treatment:** likely a contrasting band (dark navy or warm tint) to make numbers pop; `display`-weight numerals in orange or white.
- **Animation:** count-up on scroll into view.
- **Responsive:** 3-up → stacked; numbers scale down.

### Stories Section ("Showing up makes a difference")
- 3-up **story card** grid (image, title, "5 min read · date"). Carousel on mobile. Hover lift + orange title. Likely a "View all" → /stories.

### CTA Sections
- Recurring conversion blocks: the hero CTAs, "Support us" (header + get-involved + footer), "Register Your School" / "Support SVA" (Service Award hero). Pattern: bold short heading + one primary + optional secondary button, often on orange or dark or textured background for emphasis.

### "Volunteering is for everyone" / "Together…" collage
- Inclusion statement + large group photo, then a **masonry/asymmetric photo collage** (`img-1…img-7`) expressing community breadth. Images rounded (12–16px), varied sizes, subtle stagger-in on scroll.

### Footer
- **Structure:** vertical SVA logo (`logo-vertical.svg`) + newsletter subscribe prompt; two link columns — **Menu** (Our Story, Schools, Students, SVA Service Award, Impact, Research & Impact, Login) and **Support** (Support Us, News, Contact, Stories, Shop, FAQ's, Privacy); social row (Instagram, Facebook, LinkedIn).
- **Visual hierarchy:** logo + newsletter most prominent, then columns, then legal/social.
- **Treatment:** likely dark navy or off-white panel with a faint **chevron-pattern** overlay along an edge.
- **Spacing:** 64–96px top padding, 32–40px bottom; columns gap 48–64px.
- **Responsive:** columns stack; logo/newsletter on top; social row centered.

---

## 8. Imagery & Media

- **Photography style:** authentic, candid documentary photography of real students, volunteers, and communities across Aotearoa — outdoors, in schools, at clean-ups, in groups. Natural light, genuine emotion, hi-vis vests, action over posing. Diverse, inclusive casting.
- **Image treatment:** full-bleed and edge-to-edge in cards; consistent crops via `object-fit: cover`; rounded corners (12–16px) on contained images, square on full-bleed. Served responsively via `next/image` (`w=3840&q=75` etc.).
- **Overlay usage:** dark gradient scrims on hero and text-over-photo cards for legibility; brand **diamond/chevron pattern** SVG overlays as decorative accents on select feature cards.
- **Video usage:** none confirmed on crawled pages; if used (hero/story), pattern = muted autoplay loop background or click-to-play lightbox with poster image and the same scrim.
- **Background media strategy:** large optimized photos for emotional anchoring; lightweight SVG **patterns** (`chevron-pattern.svg`, `diamond-pattern.svg`, `logo-pattern.svg`) and `bg-texture.png` for texture; warm tint or dark navy panels separate photo-heavy sections so the page breathes.

---

## 9. Animation System

Motion is **purposeful and restrained** — content reveals and gentle hover feedback, nothing flashy.

- **Scroll animations:** sections and cards **fade + rise** (`opacity 0→1`, `translateY 24→0`) as they enter the viewport; staggered children (cards, collage images) by ~60–80ms. Stat numbers **count up** on first view.
- **Hover effects:** card lift (`translateY(-4px)` + shadow), image zoom (`scale(1.04)`), button darken + lift + shadow, nav link color + underline indicator.
- **Entrance animations:** hero text rises/fades on load (staggered eyebrow → headline → lead → CTA); optional hero image Ken-Burns.
- **Transition durations:** micro-interactions **150–200ms**; card/image **250–350ms**; section reveals **400–600ms**; mobile nav **250–300ms**.
- **Easing functions:**
  - UI/standard: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out).
  - Entrances: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for a confident settle.
  - Hover lifts: `ease-out`.
- **Motion principles:** subtle, consistent direction (content rises), no parallax overload, respect `prefers-reduced-motion` (disable transforms, keep opacity or show instantly).

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: .01ms !important; }
}
```

---

## 10. Responsive Design

### Desktop (≥1024px)
- Full multi-column layouts: 4-up cards, 3-up stats/stories, asymmetric get-involved, multi-column footer.
- Horizontal header with all links + 2 CTAs visible.
- Section padding 96–120px; container 1200px.

### Tablet (640–1023px)
- Cards reduce to 2-up; stats may stay 3-up or wrap; collage simplifies.
- Header likely collapses to hamburger at `<1024px` (`lg`).
- Section padding ~64px; type steps down one notch.

### Mobile (<640px)
- Single-column stacking throughout; cards become full-width; card rows become **horizontal swipe carousels** (benefit cards, stories).
- Hamburger → full-screen/slide-in menu; CTAs full-width pinned.
- Hero headline 34px; section padding ~48px; container padding 20px.

### What changes across breakpoints
- **Layout:** column counts collapse 4→2→1; asymmetric grids linearize; collage → simple stack/scroll.
- **Navigation:** inline links → hamburger overlay; CTAs → stacked full-width.
- **Typography scaling:** ~0.6–0.65× hero, ~0.7× H2 from desktop to mobile (see scale table).
- **Spacing scaling:** section Y 120→64→48; gutters 24→20; card padding 32→24.
- **Media:** fixed aspect ratios maintained; `object-position` keeps focal subjects; `next/image` serves smaller sources.

---

## 11. UI Patterns

- **CTA placement:** a primary action is always reachable — header "Support us", repeated mid-page get-involved block, contextual page CTAs (Register Your School), and footer. One dominant orange CTA per surface; secondary actions use outline/ghost.
- **Content hierarchy:** consistent **eyebrow → heading → lead → supporting → action** rhythm. Emotional hook first, evidence (stats/stories) second, action third.
- **Card layouts:** image-topped cards with padded text body are the workhorse pattern (benefits, stories, services, products) — uniform radius, shadow, and hover lift.
- **Conversion elements:** impact stats (3.49M+ hours), social proof (testimonials, partner logo row), multiple low-friction entry points (Students/Schools/Partners), free-of-charge reassurance, prominent donate path.
- **Trust signals:** founding story (2010 Canterbury earthquake), national scale numbers, named real testimonials with role/organisation, partner logos (Idea Services, school partners), cultural grounding (te reo Māori), charity framing, recognisable founder (Sam Johnson).
- **Repeating brand devices:** chevron/diamond geometric motifs as section accents and dividers; warm-tint and dark navy bands alternating to segment the page.

---

## 12. Accessibility

- **Color contrast:** white-on-orange `#FFFFFF/#F26522` ≈ 3.3:1 — passes WCAG AA for **large text/UI only**; for body-size labels on orange, prefer `--text-primary` ink or darken the orange to `--primary-hover` (#D9531A ≈ 4.7:1). Ink `#1A2430` on white ≈ 15:1 (AAA). Always overlay scrims on photos behind text to maintain ≥4.5:1.
- **Typography readability:** body ≥16px, line-height ≥1.6, measure ≤72ch, left-aligned long-form; avoid light weights on photos.
- **Interactive element sizing:** touch targets ≥44×44px; buttons 44–48px tall; spacing between tap targets ≥8px.
- **Keyboard accessibility:** visible focus ring (`3px solid --border-focus`, 2px offset) on all interactives; logical tab order; skip-to-content link; mobile menu focus-trapped; tabs/accordions follow WAI-ARIA patterns (arrow-key tab nav, `aria-selected`, `aria-expanded`).
- **Semantic structure:** one `<h1>` per page, ordered headings; `<nav>`, `<main>`, `<section>` with `aria-labelledby`, `<footer>`; alt text on meaningful images, `alt=""` on decorative patterns; `aria-live` for count-up stats kept non-essential; forms with associated `<label>`s and inline error messaging via `aria-describedby`.
- **Motion:** honor `prefers-reduced-motion`; never convey meaning by color/motion alone.

---

## 13. Recreation Notes

### HTML structure
Semantic, section-based document:
```html
<header class="site-header"> … logo + nav + CTAs … </header>
<main>
  <section class="hero"> … </section>
  <section class="benefits"> … cards … </section>
  <section class="impact-stats"> … </section>
  <section class="stories"> … </section>
  <section class="services-tabs"> … </section>
  <section class="get-involved"> … </section>
  <section class="inclusion"> … collage … </section>
</main>
<footer class="site-footer"> … </footer>
```

### CSS architecture
- **Tailwind CSS** with a **custom theme** mapping the tokens below (colors, spacing, fontFamily, borderRadius, boxShadow, screens). Use CSS variables for runtime theming + Tailwind `theme.extend` referencing them.
- Component classes via `@layer components` (`.btn`, `.card`, `.badge`, `.input`) or React component wrappers.
- Container utility: `max-w-[1200px] mx-auto px-5 md:px-6`.
- Section rhythm utility: `py-12 md:py-20 lg:py-28`.

### Tailwind classes (representative)
```html
<!-- Primary button -->
<a class="inline-flex items-center gap-2 rounded-full bg-[#F26522] px-7 py-3.5
          text-base font-semibold text-white transition
          hover:-translate-y-0.5 hover:bg-[#D9531A] hover:shadow-lg
          focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F26522]">
  Support us
</a>

<!-- Section heading -->
<h2 class="font-heading text-3xl md:text-4xl font-bold tracking-tight text-[#1A2430]">
  Why youth volunteering matters
</h2>

<!-- Story card -->
<article class="group overflow-hidden rounded-2xl bg-white shadow-sm transition
                hover:-translate-y-1 hover:shadow-md">
  <img class="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-105" …>
  <div class="flex flex-col gap-3 p-6">
    <h3 class="font-heading text-xl font-semibold transition group-hover:text-[#F26522]">Faces of Service: Alex</h3>
    <p class="text-[13px] font-medium text-[#7B8794]">5 min read · Jan 13, 2026</p>
  </div>
</article>

<!-- Impact stat -->
<div class="text-center">
  <div class="font-heading text-5xl md:text-6xl font-extrabold text-[#F26522]">3,490,000+</div>
  <div class="mt-2 font-heading text-lg font-semibold">Volunteer Hours</div>
  <p class="mt-1 text-sm text-[#C7D2DC]">Hours given to support communities in Aotearoa.</p>
</div>
```

### React components
Suggested component inventory (TypeScript + functional + composable):
`<SiteHeader/>`, `<NavLink/>`, `<Button variant="primary|secondary|ghost|onDark" size="sm|md|lg"/>`, `<Container/>`, `<Section/>`, `<Hero/>`, `<BenefitCard/>`, `<CardCarousel/>`, `<StatCounter/>` (IntersectionObserver count-up), `<StoryCard/>`, `<ServicesTabs/>` (+ `<Tab/>`, `<TabPanel/>`), `<Testimonial/>`, `<GetInvolved/>`, `<PhotoCollage/>`, `<NewsletterForm/>`, `<SiteFooter/>`, `<Accordion/>` (FAQ).
- Pull content from CMS (Strapi) as the live site does; keep props content-driven.
- Use `next/image` with `fill`/responsive `sizes`, `priority` on hero.

### Framer Motion animations
```tsx
// Scroll reveal (rise + fade), staggered
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] } }),
};
// usage
<motion.div variants={reveal} initial="hidden" whileInView="show"
  viewport={{ once: true, amount: 0.3 }} custom={index} />

// Card hover
<motion.article whileHover={{ y: -4 }} transition={{ duration: 0.25, ease: "easeOut" }} />

// Count-up: useInView + useMotionValue/animate from 0 → target on enter
```
Respect reduced motion via `useReducedMotion()` → skip `y` offset.

---

## 14. Design Tokens

```json
{
  "colors": {
    "primary": "#F26522",
    "primaryHover": "#D9531A",
    "primaryPressed": "#B8430F",
    "primaryTint": "#FDEDE3",
    "secondary": "#122A3F",
    "secondaryHover": "#0C1E2E",
    "accent": "#FFB081",
    "accentWarm": "#FFF4EC",
    "bg": {
      "base": "#FFFFFF",
      "subtle": "#F7F6F4",
      "warm": "#FFF7F1",
      "dark": "#122A3F",
      "darkAlt": "#0E2233"
    },
    "surface": {
      "default": "#FFFFFF",
      "muted": "#F2F1EE",
      "dark": "#1B3B54",
      "overlay": "rgba(18,42,63,0.55)"
    },
    "text": {
      "primary": "#1A2430",
      "secondary": "#4A5763",
      "muted": "#7B8794",
      "onDark": "#FFFFFF",
      "onDarkMuted": "#C7D2DC",
      "onPrimary": "#FFFFFF",
      "link": "#D9531A"
    },
    "border": {
      "default": "#E5E2DD",
      "strong": "#CBC8C2",
      "onDark": "rgba(255,255,255,0.16)",
      "focus": "#F26522"
    },
    "state": {
      "success": "#2E9E5B",
      "info": "#2B6CB0",
      "warning": "#E6A100",
      "error": "#D64545",
      "disabledBg": "#ECEAE6",
      "disabledText": "#A7AEB5"
    }
  },
  "spacing": {
    "0": "0px", "1": "4px", "2": "8px", "3": "12px", "4": "16px",
    "5": "24px", "6": "32px", "7": "40px", "8": "48px",
    "9": "64px", "10": "80px", "11": "96px", "12": "120px",
    "sectionY": "clamp(48px, 8vw, 120px)",
    "gutter": "24px",
    "gutterMobile": "20px"
  },
  "typography": {
    "fontFamily": {
      "heading": "Poppins, 'Sofia Pro', 'Aktiv Grotesk', 'Helvetica Neue', Arial, sans-serif",
      "body": "Inter, Roboto, 'Helvetica Neue', Arial, system-ui, sans-serif"
    },
    "fontWeight": { "regular": 400, "medium": 500, "semibold": 600, "bold": 700, "extrabold": 800 },
    "fontSize": {
      "display": { "size": "72px", "mobile": "44px", "lineHeight": 1.0, "letterSpacing": "-0.02em", "weight": 800 },
      "h1":      { "size": "56px", "mobile": "34px", "lineHeight": 1.05, "letterSpacing": "-0.02em", "weight": 800 },
      "h2":      { "size": "40px", "mobile": "28px", "lineHeight": 1.15, "letterSpacing": "-0.01em", "weight": 700 },
      "h3":      { "size": "24px", "mobile": "20px", "lineHeight": 1.25, "letterSpacing": "-0.005em", "weight": 600 },
      "h4":      { "size": "20px", "mobile": "18px", "lineHeight": 1.3, "letterSpacing": "0em", "weight": 600 },
      "eyebrow": { "size": "14px", "mobile": "13px", "lineHeight": 1.2, "letterSpacing": "0.08em", "weight": 600, "transform": "uppercase" },
      "lead":    { "size": "20px", "mobile": "18px", "lineHeight": 1.55, "weight": 400 },
      "body":    { "size": "17px", "mobile": "16px", "lineHeight": 1.65, "weight": 400 },
      "bodySm":  { "size": "14px", "lineHeight": 1.6, "weight": 400 },
      "caption": { "size": "13px", "lineHeight": 1.4, "letterSpacing": "0.01em", "weight": 500 },
      "button":  { "size": "16px", "lineHeight": 1.0, "letterSpacing": "0.01em", "weight": 600 },
      "quote":   { "size": "24px", "mobile": "20px", "lineHeight": 1.5, "weight": 500 }
    }
  },
  "radius": {
    "none": "0px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "20px",
    "2xl": "24px",
    "pill": "9999px",
    "input": "10px",
    "card": "16px",
    "button": "9999px"
  },
  "shadows": {
    "xs": "0 1px 2px rgba(18,42,63,0.06)",
    "sm": "0 2px 8px rgba(18,42,63,0.08)",
    "md": "0 8px 24px rgba(18,42,63,0.12)",
    "lg": "0 16px 40px rgba(18,42,63,0.18)",
    "focus": "0 0 0 3px rgba(242,101,34,0.35)",
    "buttonPrimary": "0 8px 20px rgba(242,101,34,0.30)"
  },
  "animations": {
    "duration": { "fast": "150ms", "base": "200ms", "card": "300ms", "reveal": "500ms", "slow": "600ms" },
    "easing": {
      "standard": "cubic-bezier(0.4, 0, 0.2, 1)",
      "out": "cubic-bezier(0.0, 0, 0.2, 1)",
      "in": "cubic-bezier(0.4, 0, 1, 1)",
      "expoOut": "cubic-bezier(0.16, 1, 0.3, 1)"
    },
    "reveal": { "from": { "opacity": 0, "y": 24 }, "to": { "opacity": 1, "y": 0 }, "stagger": "70ms" },
    "hoverLift": { "translateY": "-4px" },
    "imageZoom": { "scale": 1.04 }
  },
  "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px" },
  "layout": {
    "containerMax": "1200px",
    "containerWide": "1440px",
    "containerNarrow": "760px",
    "gridColumns": 12,
    "gridGap": "24px"
  }
}
```

### Tailwind config mapping (drop-in)
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#F26522", hover: "#D9531A", pressed: "#B8430F", tint: "#FDEDE3" },
        ink: { DEFAULT: "#1A2430", soft: "#4A5763", muted: "#7B8794" },
        navy: { DEFAULT: "#122A3F", deep: "#0E2233", surface: "#1B3B54" },
        warm: "#FFF7F1",
      },
      fontFamily: {
        heading: ["Poppins", "Sofia Pro", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "16px", pill: "9999px", input: "10px" },
      boxShadow: {
        sm: "0 2px 8px rgba(18,42,63,0.08)",
        md: "0 8px 24px rgba(18,42,63,0.12)",
        lg: "0 16px 40px rgba(18,42,63,0.18)",
      },
      maxWidth: { container: "1200px" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" },
    },
  },
};
```

---

## Appendix — Observed site facts (anchors for verification)

- **Stack:** Next.js (App Router) + Strapi CMS (`backend:1337`), `next/image` optimization (`q=75`, widths to 3840).
- **Nav (primary):** About us · Service Award · Clubs · Partners · Impact · News/Shop · Stories. **CTAs:** Volunteer Login (→ volunteer.sva.org.nz), Support us (→ Raisely donation).
- **Brand assets:** `logo.svg`, `logo-vertical.svg`, `logo-pattern.svg`, `chevron-pattern.svg`, `diamond-pattern.svg`, `bg-texture.png`.
- **Impact metrics:** 3,490,000+ volunteer hours · 80,000+ students · 250+ schools.
- **Home sections:** Hero → Why youth volunteering matters (4 benefit cards) → Impact stats → Stories (Faces of Service) → Responding Together (services tabs + testimonial) → How would you like to get involved (Support Us + Students/Schools/Partners) → Volunteering is for everyone → Together photo collage → Footer.
- **Voice:** values-driven, te reo Māori integrated, founding story = 2010 Canterbury earthquake / Sam Johnson.
- **Verification to-do (with browser dev tools):** confirm exact brand orange hex, dark/navy section hex, the production webfont families/weights, container max-width, button radius (pill vs. rounded), and section padding scale. All tokens above are structured so only the raw values need updating.

---

*End of design system.*

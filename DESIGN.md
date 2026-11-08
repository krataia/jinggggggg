# DESIGN.md: a portfolio brief inspired by the Genshin Impact official site

Research date: 2026-11-08. Everything here was observed on genshin.hoyoverse.com with headless Chromium (Playwright): screenshots at 1440×900 and 390×844, `getComputedStyle` dumps, and the page's own CSS (inline `<style>` and the CSSOM). Source tags look like this: **[css `.selector`]** means a rule copied from the site's stylesheet, **[computed …]** means a value read from the live DOM, **[shot file.png]** means a screenshot in the scratchpad dir (paths in §9), and **[px file.png]** means a pixel sampled from a screenshot. **UNVERIFIED** marks anything I could not confirm.

---

## 1. Overview

- **The root URL is a campaign page.** `/en/` serves a full-bleed key-art landing page for the current version ("Hour of Ruin"), built on a separate "puzzle" CMS (`act.hoyoverse.com/puzzle/...`) [shot home-1440.png]. The permanent site lives at `/en/home`, `/en/news`, `/en/character/<region>`, `/en/game`, `/en/map` [nav hrefs, computed].
- **Feel:** a cinematic, image-first dark site. Each section is one large painted or video backdrop with a thin dark-glass UI on top. Display text is mostly *baked into images* (logo, character names, region names on the campaign page). The UI text itself is plain system sans. The ornaments are gold filigree lines, diamond/rhombus markers, and a few warm "parchment" accents [shots home-montage.png, char-montage.png].
- **Palette logic:** near-black `#111` chrome, white text at stepped opacities, one warm gold family (`#ffd49f` / `#f4d8a8` / `#cca574`) for "active" states, a saturated yellow for the single primary CTA, and a cyan glow `#69e0ff` used only as a nav hover/focus halo [css, see §2].
- **Motion:** restrained and mostly 0.2–0.5 s ease-out fades and slides. There is one theatrical moment: a WebGL intro story (`.hk4e-concept-site` canvas) that you click through, preceded by a loader that lights up element glyphs [shots intro-*.png, home-t1.png].

---

## 2. Design tokens

### 2.1 Colour

| Hex / value | Where it is used | Source |
|---|---|---|
| `#111111` | `body`/`.root` background, footer, header base | [css `body`, `.root`, `.footer`] |
| `rgba(17,17,17,.75)` → `.85` | Fixed header at rest, then `.header--scroll` | [css `.header`, `.header--scroll`] |
| `#272626` / `#3b3a3a` | Nav dropdown panel / dropdown item hover | [css `.header__navitem__sublist`] |
| `#ffffff` | Primary text on dark, active nav item | [computed `.header__navitem` active, 1440] |
| `#cccccc` | Idle nav text, login text | [css `.header__navitem`, `.login__btn`] |
| `#999999` / `#666666` | Footer links / footer copyright | [css `.footer a`, `.footer__bottom`] |
| `rgba(255,255,255,.35)` | Dates in the home news list | [css `.home .news__date`] |
| `rgba(255,255,255,.08)` / `.1` | Row divider 2px / tab-strip baseline 3px | [css `.news__item`, `.news__tab__list`] |
| `#69e0ff` | Nav hover/focus **glow**: `text-shadow 0 0 10/20/40px` | [css `.header__navitem:hover`] |
| `#ffd49f` | Active news tab text + 3px underline, social hover text | [css `.news__tab__item--active`, `.social__list ...:hover`] |
| `rgba(255,212,159,.06)` | News row hover fill | [css `.home .news__item:hover`] |
| `#f4d8a8` on `#393b40` | Active category pill on the /news page | [css `.category__item--active`] |
| `#cca574` / `#dbb17d` | Character voice-actor bar / slide dot | [css `.character__cv`, `.character__sbtn`] |
| `#ffcf0d` | Header "Download" block (an image) | [px intro-wait.png 1300,55] |
| `#e8bd06` | "Download Now" / website buttons | [css `.button-wrap__website`; px mhome-0.png] |
| `#fddd00` | 4px top bar that slides in on CTA hover | [css `.header__subscribe::after`, `.button-wrap__website::after`] |
| `#f3c50d` → `#ffcc00` | Poster CTA, then its hover | [css `.home .poster__link`] |
| `rgba(38,18,12,.62)` | Warm translucent brown behind the news carousel/list | [css `.home .news__swiper`] |
| `#654f42` / `#78604b` | Parchment-card title / body text (About Game features) | [css `.guide-intro__title`, `__desc`] |
| `#fafafa`, `#393b40` | Light news-list cards, their text (/news page is light) | [css `.news_index .body .news__item`] |
| Category set | `#69e0ff #ffc000 #bc80ff #99cc33 #cc7a6d #6b94cc #66ccae #cc5992` used as label colours + card left border | [css `.news__cate-1…8`, `.news__tag-1…8`] |
| `#fcf9fe` | Loader / intro canvas backdrop (very pale lilac) | [css `.home .poster #bgWrap`; shot home-t1.png] |

### 2.2 Typography

| Role | Family | Size / weight / tracking | Source |
|---|---|---|---|
| Root stack | `"Microsoft YaHei", 微软雅黑, …` on `html`; `14px` root; `word-spacing:1px`; antialiased | | [css `html`] |
| UI text as rendered | `Helvetica` (most text nodes), `system-ui` for the cookie bar | | [computed fontFamily tally, /en/home + /en/news] |
| Web fonts loaded | **Only `icomoon`** (an icon font). No display web font. | | [`document.fonts`, all pages] |
| Display type (logo, "JEAN", region names, "Hour of Ruin") | **Images**, not text | | [`.character__name` is `<img>`; shots] |
| Nav item | 14px / 400 / `letter-spacing:0` / UPPERCASE copy / `line-height:66px` | | [css `.header__navbar .header__navitem`] |
| Section title (home "NEWS") | 50px / 400, centred, flanked by ornaments | | [css `.home .news h3`] |
| Section title (About Game) | 48px / bold | | [css `.guide__title`] |
| Region band label | 36px / white / `text-shadow 0 2px 6px rgba(0,0,0,.2)` | | [css `.home .city__list-item p`] |
| Hero subline | 30px, warm glow `0 0 10px rgba(114,71,21,.68)` | | [css `.home .poster__sub`] |
| News tab | 18px | | [css `.home .news__tab__item`] |
| List row / date | 16px / 14px | | [css `.home .news__item`, `.news__date`] |
| /news card title | 24px / 400 | | [css `.news__info h3`] |
| Character VA bar / intro | 24px / 16px | | [css `.character__cv`, `.character__intro`] |
| Footer | 16px, `#999` | | [css `.footer__top`] |

Takeaway: the type scale is **14 / 16 / 18 / 24 / 30 / 36 / 48–50 px**, all at weight 400 except the bold section titles. Tracking is never widened in CSS; all the "fantasy" flavour comes from imagery.

### 2.3 Spacing and sizes

| Token | Value | Source |
|---|---|---|
| Header height | 66px desktop | [css `.header`] |
| Desktop canvas | `.root{min-width:1400px}`, content blocks 1200–1280px fixed | [css `.root`, `.guide-intro__item`, `.footer__top`] |
| Section top/bottom rhythm | 183px above and 60px below the home NEWS title; 72px under About Game titles | [css `.home .news h3`, `.guide__title`] |
| Title-to-ornament gap | 32–36px; ornament line 322–385px × 14–15px | [css `.news h3::before`, `.guide__title::before`] |
| Content widths | News carousel 640px + list panel 640px (list 592px) | [css `.home .news__swiper`, `.news__list`] |
| Region band | 260px tall, full-bleed | [css `.home .city__list-item`] |
| Feature card | 1200×400, 97px between cards, alternating left/right | [css `.guide-intro__item`] |
| Row height | 50px news rows; 63px dropdown rows; 54px region rows | [css] |

### 2.4 Radii, borders, shadows, layers

| Kind | Values | Source |
|---|---|---|
| Radius | Mostly **0**. 4px on cards, pills and the back-to-top button; 1px on the dropdown; 50% on dots and the play button; 6px on the login popover | [css `.news__item`, `.category__item`, `.backTop`, `.swiper-pagination-bullet`] |
| Borders | 2–3px hairlines at 8–15% white/ink; a **6px solid white frame** on hovered region bands; a 2px white frame on video slides | [css `.city__list-char`, `.guide-video__swiper .swiper-slide`] |
| Hover ring | `::before` inset −3px with a 3px `rgba(57,59,64,.15)` border, opacity 0→1 | [css `.news_index .news__item::before`] |
| Shadows | Header `0 3px 7px rgba(0,0,0,.35)`; dots `0 0 12px rgba(17,17,17,.3)`; CTA `0 10px 8px rgba(110,68,19,.3)` (warm brown, not grey) | [css] |
| z-index | Footer 998 · header / social rail / back-to-top 999 · audio toggle and video modal 10000 · intro overlay 10001 | [css `.footer`, `.header`, `.social`, `.backTop`, `.audio-controller`, `.concept-wrap`] |

---

## 3. Layout and navigation

- **Header:** `position:fixed`, full width, 66px, **always translucent dark** (`.75` alpha), and it gets darker (`.85`) once you scroll (`.header--scroll`). It is never fully transparent [css; computed at y=0 vs y=600]. It also fades in after the intro (opacity read 0.44 mid-transition) [computed home step1].
- **Header layout:** logo (left, 317×105, it hangs below the bar) · UPPERCASE text links · a small caret dropdown "EXPLORE" (ABOUT GAME / TEYVAT / ITINERARY / MANGA) · "Log In" + avatar on the right · a **200px solid-yellow Download block flush to the right edge, full header height** [css `.header__download`; shot news-1440.png].
- **Active nav:** white text with a cyan halo (the same as hover, via `--focus`) [css `.header__navitem--focus`].
- **Audio toggle:** a 30px icon fixed at top-left (18px, 70px), visible on every page [css `.audio-controller`].
- **Page structure (home):** each section is full-bleed and stacked. Hero poster (video + platform buttons) → NEWS (full-bleed painted bg, 910px tall, a centred 1280px two-panel module) → regions (stacked 260px full-bleed bands) → footer [shot home-montage.png; css `.home .news`].
- **Scrolling:** normal document scroll on /en/home; the wheel moved `scrollY` in 600px steps [tour log]. The **character page is a locked 100vh stage** (`.character{height:100vh;overflow:hidden}`) where content swaps in place [css].
- **Side rails:** a white "Follow us" social rail fixed at the right edge, folded with a 30×52 tab [css `.social`, `.social--fold`]; a 60×60 white back-to-top square on /news [css `.backTop`].
- **Footer:** `#111`, 1px `#323232` top rule, a newsletter row, a centred logo stack, a small link row, and the rating box [css `.footer-crm`; shot char-montage.png].

---

## 4. Signature components

| Component | What it does | Hover / active | Source |
|---|---|---|---|
| **Hero poster** | Full-bleed looping muted video (`bg.mp4`, `loop`, `muted`). Centred round **48px white play button** inside an ornamental frame. A 30px headline with a warm glow. Platform store badges, a QR code, and a rating box. A 3-chevron "scroll" cue at the bottom | Play button: white → transparent bg in 0.2s linear; store badges 0.8 → 1 opacity | [computed `videos`; css `.poster__video`, `.poster__download>li`; shot intro-wait.png] |
| **Scroll cue** | 3 stacked chevrons, each blinking `@keyframes arrow{50%{opacity:0}}` at 1.5s linear, staggered by 0 / .5 / 1s | | [css `.home .poster__arrow-1..3`] |
| **Section title** | Centred word with a mirrored gold filigree line on each side (one image, flipped with `rotateY(180deg)`/`rotate(180deg)`) | | [css `.home .news h3::before/::after`, `.guide__title`] |
| **News module** | Left: a 640×400 image carousel with **ring dots** (18px, 2px white border at 30% alpha; the active dot is filled white). Right: tabs + 5 rows + "More" | Tab: active gold `#ffd49f` with a 3px underline over a 3px 10%-white baseline. Row: faint gold wash. "More": white 75% → gold | [css `.home .news__*`; shot home-montage.png] |
| **News index (/news)** | A blurred hero carousel of 3 cards, then a **light** list: pill filters (155×36, r4) and white cards (r4) with a colour-coded category label | Pill: grey 18% → `#393b40`/`#f4d8a8`. Card: `#fafafa → #fff` plus a 3px ring that fades in over 0.2s | [css `.news_index .body .*`; shot news-1440.png] |
| **Region switcher (home)** | Full-width 260px bands, one per region, each with a 40% black veil and a centred label over a faint diamond emblem | Hover: veil 40% → 20%, bg `scale(1.05)` over .4s ease-out, a character cut-out + **6px white inset frame** fade in over .2s, and a small ornament appears under the label | [css `.home .city__list-*`; shot home-4.png shows Liyue hovered] |
| **Character showcase** | A fixed stage with a vertical **region list on the left** (54px rows, diamond bullet; the active row gets a larger emblem). Name image, a gold VA bar with a voice ▶ button, a translucent intro box (`rgba(1,1,1,.5)`) with a diamond glyph, a short italic quote in corner brackets, and a **thumbnail strip** (110×150 cards, 106px portrait) with big ornate ‹ › arrows | Thumb hover/active: the card's sprite shifts to a light plate and the label turns dark `#121212`. Slide: the portrait enters from `translateX(500px)`, quote fades in 1s after a .3s delay | [css `.character__*`; shot char-0.png] |
| **Diamond pager** | Carousel bullets on About Game are 20px **diamond images**, not circles | | [css `.guide-video__swiper ... .swiper-pagination-bullet`; shot game-2.png] |
| **Parchment feature card** | A 1200×400 art panel with an overlapping cream "paper" card offset −14px; brown text; a bold CTA plate | | [css `.guide-intro__*`; shot game-2.png] |
| **CTA button** | A flat yellow block, square corners, dark-brown text (`#815a34`) | Hover: a 4px `#fddd00` bar **slides in from the left** (`translateX(-100%→0)` .3s ease-in-out) or the bg brightens | [css `.header__subscribe::after`, `.poster__link`] |
| **Dropdown** | A `#272626` panel, 214×63 rows, opacity 0 → .96 | Row hover `#3b3a3a` | [css `.header__navitem__sublist*`] |

**Recurring ornament motifs:** the rhombus/diamond (bullets, region list markers, pager), gold filigree rules, corner brackets around quotes, chevron triples, and an 8-point star flourish on the campaign CTA [shots]. Exact vector shapes are images and were not inspected.

---

## 5. Motion

| Pattern | Duration / easing | Source |
|---|---|---|
| Default UI transitions | `all .2s ease-in` / `.2s ease` / `.2s linear` | [computed transition tally, /en/home, /en/news] |
| Larger reveals | `.4s ease-out` (region zoom), `.5s ease-out` (social rail, intro overlay fade) | [css `.city__list-bg`, `.social`, `.concept-wrap`] |
| Character slide-in | `.3s cubic-bezier(.215,.61,.355,1)` (easeOutCubic) from `translateX(500px)` | [css `.character__person`] |
| Quote reveal | `opacity 1s cubic-bezier(.215,.61,.355,1) .3s` + `scale(1.2)` | [css `.character__sen`] |
| Ambient bg | `breath` 80s linear infinite (scale 1→1.2→1); `bg-change` 15s cross-fade between two bgs | [css `.character__bg1/2`, `@keyframes breath`] |
| VA name marquee | `rowup` 10s linear infinite, starts after 2s | [css `.character__cv__rowup`] |
| Mobile drawer | `transform .4s cubic-bezier(.23,1,.32,1) .2s` (easeOutQuint) + overlay `opacity .2s linear` | [computed `.menu`, `.header__menu`, 390px] |
| CTA hover bar | `.3s ease-in-out` | [css `.header__subscribe::after`] |
| Lightbox | `333ms cubic-bezier(.4,0,.22,1)` (PhotoSwipe) | [css `.pswp__*`] |
| Drop-in keyframe | `translateY(-18%) → 10% → 0`, opacity 0 → .9 → 1 (a small overshoot) | [css `@keyframes _3Ujv2jSG`] |
| Loading | A pale `#fcf9fe` screen with a row of seven elemental glyphs that light up, then the WebGL story canvas (click to advance), then a cross-fade to the site | [shots home-t1.png, intro-click1.png, intro-wait.png] |
| Scroll-triggered entrance | None observed on /en/home: sections were already static when scrolled into view | [tour screenshots home-1..5] (IntersectionObserver use **UNVERIFIED**) |

`animate.css` keyframes (`fadeInUp`, `bounceIn`…) are bundled but I did not see them in use **[css; usage UNVERIFIED]**.

---

## 6. Responsive behaviour (390px)

- **A separate mobile component set** (`m__header`, `m-news__*`, `m-city__*`, `character-m__*`) [computed, 390px], not a fluid reflow of the desktop. Desktop is fixed-width (`min-width:1400px`).
- **rem-based scaling:** the root font-size computes to 52px at 390px wide (= viewport/7.5, a 750px design grid). Sizes come out as rem fractions (18.72px, 16.64px, 12.48px) [computed].
- **Header:** logo, a small yellow "Download" pill (94×31), and a hamburger. The menu is a **white right-side drawer**, 312px wide, over a 50% black overlay, with rows 58px tall in `#393b40` [computed `.menu`, `.menu__item`].
- **Hero:** stacked as logo → video play button → one big yellow "Download Now" (`#e8bd06`) [shot mhome-0.png].
- **News:** carousel on top, then centred tabs, then rows, then a full-width outline "More" button (`1px rgba(255,212,159,.7)`, 10% gold fill, r≈2px) [computed `.m-news__more`].
- **Regions:** bands shrink to 115px tall [computed `.m-city__list-item`].
- **Character page:** the portrait fills the screen, the thumbnail strip sits at the bottom, and the region list collapses into a bottom bar "Mondstadt ▲" [shot mchar-0.png].
- **Social rail:** becomes an inline full-width list with chevrons [shot mhome-3.png].

---

## 7. Apply to this portfolio

Goal: borrow the **cinematic dark stage, the gold-on-charcoal accent, the diamond ornaments, and the calm 0.2–0.4s motion**, and keep the owner's clean, monochrome-leaning terminal identity. No green, no scanlines, no "====" rules.

### 7.1 Priorities

1. **Tokens first (low effort, high impact).** Replace the pure-grey palette with charcoal `#111` plus one warm gold accent. Keep white as the main text colour and use stepped white opacities (100 / 80 / 60 / 35%) as Genshin does, instead of many named greys.
2. **Header (`Header.astro`).** Make it a fixed 56–64px bar on `rgba(17,17,17,.75)` with `backdrop-filter: blur(12px)` (my addition; Genshin does not blur), going to `.85` past ~80px of scroll. Use UPPERCASE 13–14px links in a white-70% colour; hover and the current section get white text plus a soft glow, using **gold** instead of cyan (`text-shadow:0 0 10px #ffd49f66`). Optional: a solid gold "Contact" block flush right as the one CTA (the Download-block pattern).
3. **Section titles (`SectionHeading.astro`).** Swap the `00 / label / [tag]` row for a centred title flanked by two thin 1px lines that end in a small rotated-square ◆, drawn in CSS with `::before/::after` and `rotate(45deg)` (no images). The `[tag]` can stay as a small mono caption under it, which keeps the terminal flavour.
4. **Hero (`Hero.astro`).** Keep the braille cicada. Treat it as the "key art": centre it on the stage, add a slow `breath`-style ambient scale (1 → 1.03 over 20–30s, `prefers-reduced-motion` off), and add the 3-chevron staggered scroll cue (1.5s linear, delays 0/.5/1s) at the bottom. Replace the blinking cursor with a tiny ◆. The name stays large and plain (Genshin also keeps UI type plain and puts the drama in the art).
5. **Work (`Project.astro`, 7 certificates).** Two options, pick one:
   - *News-module pattern:* the left panel is a large preview of the selected cert (r0, 2px white frame) and the right panel is a tabbed list (tabs by issuer or year, active tab gold with a 3px underline over a 3px 10% baseline) of 50px rows with a 35%-white date and a faint gold row hover.
   - *Region-band pattern:* full-width 160–200px bands, each with the cert image veiled at 40% black. On hover the veil drops to 20%, the image `scale(1.05)` over .4s ease-out, and a white inset frame fades in over .2s. This is very "Genshin" and still clean.
6. **About.** Use the parchment-card idea *in monochrome*: an image or ASCII panel with an offset text card (−14px overlap), and text in white 80%. Skip the cream colour, which would fight the dark theme.
7. **Contact.** Rows in the social-rail style: icon, label, chevron. On hover, the row bg goes to `rgba(255,212,159,.06)` and the label turns gold.
8. **Music bar (`MusicBar.astro`). Keep it.** It already plays the role of Genshin's fixed audio toggle. Align it with the new tokens: glass stays, progress fill uses the gold accent, and radius stays pill-shaped (it is the one deliberately rounded element, like the round play button).
9. **Pixel cicada (`PixelCicada.astro`). Keep it.** It is the "Paimon": an ambient companion. Give it the drop-in keyframe (−18% → +10% → 0) when it lands on a letter, and let it perch on the new ◆ ornaments too.
10. **Loader (optional).** A short (<800ms) loader that lights up a row of seven small glyphs (for example ⠁⠃⠇⡇⣇⣧⣿ braille steps) on `#111`, then fades out over .5s ease-out. Skip it if the page is already fast.
11. **Mobile.** Don't fork components; let Tailwind breakpoints do it. Copy the *behaviours* instead: the hamburger opens a right drawer (`.4s cubic-bezier(.23,1,.32,1)` + 50% overlay), bands shrink to about 45% height, and the "More" button becomes a full-width gold outline.

### 7.2 `@theme` tokens (drop into `src/styles/global.css`)

| Token | Value | Maps from |
|---|---|---|
| `--color-bg` | `#111111` | `body` bg |
| `--color-panel` | `#1a1a1a` | (derived) card/panel |
| `--color-chrome` | `rgb(17 17 17 / .75)` | header |
| `--color-chrome-strong` | `rgb(17 17 17 / .85)` | header on scroll |
| `--color-fg` | `#ffffff` | primary text |
| `--color-muted` | `#cccccc` | idle nav |
| `--color-dim` | `rgb(255 255 255 / .35)` | dates/meta |
| `--color-line` | `rgb(255 255 255 / .08)` | row dividers |
| `--color-accent` | `#ffd49f` | active tab / hover |
| `--color-accent-soft` | `rgb(255 212 159 / .06)` | row hover |
| `--color-cta` | `#e8bd06` | single primary button |
| `--ease-out-cubic` | `cubic-bezier(.215,.61,.355,1)` | character slide |
| `--ease-drawer` | `cubic-bezier(.23,1,.32,1)` | mobile menu |
| `--radius-card` | `4px` | cards/pills |

```css
@theme {
	--font-display: 'Cinzel', 'Times New Roman', serif;
	--font-sans: 'Noto Sans', system-ui, Helvetica, Arial, sans-serif;
	--font-mono: 'JetBrains Mono', ui-monospace, monospace; /* keep for meta/labels */
	--font-pixel: 'Departure Mono', ui-monospace, monospace;

	--color-bg: #111111;
	--color-panel: #1a1a1a;
	--color-chrome: rgb(17 17 17 / 0.75);
	--color-chrome-strong: rgb(17 17 17 / 0.85);
	--color-fg: #ffffff;
	--color-muted: #cccccc;
	--color-dim: rgb(255 255 255 / 0.35);
	--color-line: rgb(255 255 255 / 0.08);
	--color-accent: #ffd49f;
	--color-accent-soft: rgb(255 212 159 / 0.06);
	--color-cta: #e8bd06;

	--radius-card: 4px;
	--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
	--ease-drawer: cubic-bezier(0.23, 1, 0.32, 1);
	--animate-breath: breath 24s linear infinite;
	--animate-cue: cue 1.5s linear infinite;
}
@keyframes breath { 50% { transform: scale(1.03); } }
@keyframes cue { 50% { opacity: 0; } }
```

If the owner wants zero colour, set `--color-accent: #ffffff` and `--color-cta: #ffffff` and the layout still works. The gold is optional, not structural.

### 7.3 Fonts (free, Google Fonts)

The site loads no display web font: titles are images and UI text is Helvetica/YaHei [§2.2]. The in-game typeface (commonly cited as HYWenHei) is proprietary and was **not** observed on the site, so treat that as **UNVERIFIED**. Close-in-feel free options:

| Role | Suggestion | Why |
|---|---|---|
| Display titles (name, section titles) | **Cinzel** (or **Cormorant SC**) | Roman-inscription caps, matching the serif "JEAN" / "Available on Multiple Platforms" images [shot char-0.png, game-0.png] |
| UI / body | **Noto Sans** or **Nunito Sans** | Neutral humanist sans, standing in for the Helvetica/YaHei stack |
| Meta / labels | Keep **JetBrains Mono** / **Departure Mono** | Preserves the owner's terminal identity |

Use the display font sparingly: H1 plus section titles, weight 400–600, `letter-spacing: .04em`.

---

## 8. Legal / originality note

- Borrow **only** layout, motion timing, and general visual principles (dark stage, warm accent, diamond ornaments, band hover).
- Do **not** use HoYoverse or Genshin logos, characters, key art, region art, screenshots, videos, music, voice lines, icon fonts (`icomoon`), elemental glyphs, or any proprietary fonts. Do not hotlink `webstatic.hoyoverse.com` assets.
- Draw all ornaments in CSS/SVG from scratch. Avoid the exact filigree shapes, the Vision emblem, and the 8-point star CTA frame.
- Don't use a solid yellow Download block plus "EXPLORE ▾" nav that reads as an official page. Keep the cicada/terminal identity front and centre, and don't use words like "Teyvat" or "Traveler".

---

## 9. Sources

**URLs (first-party):** `https://genshin.hoyoverse.com/en/` (campaign page) · `/en/home` · `/en/news` · `/en/character/mondstadt` · `/en/game`. Nav-only, not opened: `/en/map`, `/en/town`, `/en/manga`.

**Screenshots** (all in `/private/tmp/claude-501/-Users-kittipong-Desktop-cicada3301/c075dc33-afa5-4f54-aa88-fec9de4beaad/scratchpad/`):
- 1440px: `home-1440.png` (campaign), `home-t1.png` (loader), `intro-click1.png`, `intro-wait.png` (hero after intro), `home-1.png`…`home-5.png` + `home-montage.png` (scroll tour, region hover), `news-1440.png`, `char-0.png`…`char-2.png`, `game-0.png`…`game-2.png`, `char-montage.png`
- 390px: `mhome-0.png`…`mhome-5.png`, `mchar-0.png`, `mnews-0.png`, `m-montage.png`

**Computed / CSS dumps (same dir):** `main-1440.json`, `news-1440.json` (font/colour/radius/transition tallies, fixed elements, video attributes); `home-tour.json`, `mhome-tour.json`, `mchar-tour.json` (per-element computed styles while scrolling); `char.css`, `game.css` (full CSSOM); `main-1440.html`, `news-1440.html` (inline `<style>` rules quoted above). Pixel samples were taken with `px.mjs`.

**Not verified:** the HYWenHei font claim; whether `animate.css` keyframes are used; scroll-triggered entrance animations; `/en/map` (the interactive map) and `/en/town`, `/en/manga` (not opened); the exact ornament SVG/PNG shapes (inspected only as rendered images); `/en/` campaign styles (it changes every version).

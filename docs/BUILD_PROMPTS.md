# Lumen & Lot: build prompts

One phase per session. Start each in plan mode, approve the plan, let it build, then /clear.
Phases 7 and 8 don't depend on 4–6, so after phase 3 they can run in a second session in a
separate git worktree.

---

## Phase 0: Setup

Read CLAUDE.md first. In this folder, scaffold the project:
- Next.js App Router with TypeScript strict, Tailwind CSS v4, ESLint, the @/* alias, no src/ folder.
  Keep CLAUDE.md and docs/ where they are.
- Install: motion, lenis, zod, suncalc (+ types), @react-pdf/renderer, MDX support for
  the App Router (pick the simplest option and tell me why), vitest,
  @playwright/test, @axe-core/playwright
- Add npm scripts: typecheck, test, test:e2e
- Load Instrument Serif, Inter Tight and Geist Mono with next/font
- Create app/styles/tokens.css with every token in CLAUDE.md and map them into Tailwind's theme
- Make a bare home page: "Lumen & Lot" in the display font on the paper colour
- git init and commit
Then give me the exact steps to create the GitHub repo and connect it to Vercel.

---

## Phase 1: Design system

Read CLAUDE.md. Build the design system before any pages.
1. Type: a fluid type scale (display-xl down to caption) with clamp(), plus a Label
   component for the mono uppercase labels.
2. Primitives in components/ui: Container, Grid (12 columns), Section (with a numbered
   label like "01 — RESIDENCES"), Rule, Button (solid, outline, text link with an
   animated underline), RevealImage (clip-path wipe on first view, slow scale on hover),
   Marquee (pauses off-screen and on hover), Drawer, Toggle (segmented control).
3. Motion: put durations and easing in lib/motion.ts; every animation respects
   prefers-reduced-motion.
4. Smooth scroll with Lenis, disabled for reduced motion.
5. Build /system: a beautiful living style guide showing colour tokens with contrast
   ratios, the type scale, every primitive with its states, and the motion tokens.
   Make it feel like a page from an architecture monograph.
Follow the definition of done in CLAUDE.md.

---

## Phase 2: Content layer

Read CLAUDE.md. Build the content layer in content/ with zod schemas.
- Residence: slug, name, city, country, lat, lng, status (available/reserved/sold),
  bedrooms, bathrooms, areaM2, priceLocal + currency, energy label (use the local
  system's name per country), short story, gallery, three palettes (name, swatches,
  materials list, image per room), and a floor plan: rooms as polygons in metres,
  windows as wall segments with sill and head heights, north rotation in degrees.
- Project: slug, name, city, year, type, story sections, drawings, before/after pair.
- Lookbook: palette, image, hotspots (x/y in %, item name, maker, material,
  dimensions, price).
- Rates: fixed USD/CAD/EUR/GBP rates with an asOf date.
Seed 6 residences (2 Toronto, 1 Hudson Valley NY, 2 Copenhagen, 1 Lisbon) with real
city coordinates and believable, simple floor plans, 4 projects and 3 lookbooks.
Use placeholder images (solid tones) until I add real ones.
Write lib/units.ts and lib/currency.ts with unit tests.

---

## Phase 3: Shell and Home

Read CLAUDE.md. Build the shell and the home page.
- Header: transparent over the hero, solid with a hairline rule after scrolling.
  Residences opens a mega menu showing the newest residence with its image.
  Mobile: full-screen drawer menu.
- Global toggles in the header: m²/ft² and currency, saved in localStorage.
- Footer: newsletter (UI only), sitemap, and the concept line from CLAUDE.md.
- Home, in order: full-bleed hero with a split serif headline; city marquee;
  featured residence (image + text); editorial project collage with mixed ratios;
  Shop the Room teaser; three journal cards; studio statement.
- Page transitions with the View Transitions API.
Make it feel like a fashion editorial (think the Shopify Stiletto theme's confidence)
but calmer and architectural. Follow the definition of done.

---

## Phase 4: Residences and the Daylight Explorer

Read CLAUDE.md. Build /residences, /residences/[slug] and the Daylight Explorer.

Residences index: filter by city, bedrooms and status; grid/list toggle; prices and
areas follow the global toggles.

Daylight Explorer (components/features/daylight, logic in lib/sun.ts):
1. Draw the floor plan as SVG from the residence data, rotated to true north, with a
   compass.
2. For a chosen date and time, get sun azimuth and altitude with suncalc at the
   residence's lat/lng.
3. When the sun is up and in front of a window (angle between the window's outward
   normal and the sun's azimuth under 90°), draw a patch of light entering the room
   along the sun's direction. Its depth comes from the window head height and the
   sun's altitude. Clip it to the room. Make it warm (clay) and soft.
4. Controls: a time slider from sunrise to sunset, date presets (winter solstice,
   equinox, summer solstice, today) and a play button that animates the day.
5. Per room, compute hours of direct sun by sampling every 15 minutes; show them in a
   table, which is also the text alternative for the plan.
6. Unit tests for lib/sun.ts, including a sanity check: the sun's altitude at solar
   noon in Toronto on the June solstice is about 70°.
Residence page: gallery, explorer, specs, energy card, "Add to compare".
This is the hero feature: make it beautiful and smooth. Follow the definition of done.

---

## Phase 5: Palettes and Shop the Room

Read CLAUDE.md. Build the Palette Switcher and Shop the Room.
- Palette Switcher on residence pages: three swatches as a radio group; images
  cross-fade and the finishes list updates; the choice shows in the URL.
- /interiors: a lookbook per palette. Shop the Room hotspots are buttons positioned on
  the image; each opens a small card (item, maker, material, dimensions, indicative
  price). Keyboard: Tab between hotspots, Escape closes. Also list all items below the
  image for screen readers and mobile.
Follow the definition of done.

---

## Phase 6: Compare and Brief

Read CLAUDE.md. Build Compare and the Brief builder.
- Compare: "Add to compare" on residences; a sticky tray at the bottom shows up to 3
  homes; /compare shows them side by side (area, bedrooms, sun hours in the main
  living room on the equinox, energy label, indicative price) in the chosen units
  and currency. The URL holds the slugs so it can be shared.
- /brief: 6 steps (project type, city, size, budget range, timeline, style palette),
  a progress indicator, back/next, validation with zod. The last step shows a summary
  and downloads a beautifully typeset one-page PDF brief with @react-pdf/renderer.
  Nothing is sent anywhere. Say so on the page.
Follow the definition of done.

---

## Phase 7: Projects

Read CLAUDE.md. Build /projects and /projects/[slug].
- Index: an editorial list (number, name, city, year, type) where hovering a row shows
  the project image following the cursor; plus a lookbook grid view; a toggle
  between the two. On touch devices, show thumbnails instead of the hover image.
- Case study template: big title, facts grid, story sections alternating image and
  text, drawings, an accessible before/after slider (keyboard arrows work),
  credits, next project.
Follow the definition of done.

---

## Phase 8: Journal, Studio, Colophon, 404

Read CLAUDE.md. Build:
- /journal and /journal/[slug] with MDX, a beautiful article layout (drop cap, pull
  quotes, wide images, reading time). Draft three articles: "Designing for daylight",
  "How to read an energy certificate", "Buying a new home from abroad". Keep facts
  general and flag anything I should verify.
- /studio: philosophy, a 5-step process, team (illustrated or initials, no fake
  photos), awards strip clearly part of the concept.
- /colophon: the concept statement, stack, fonts, image credits, link to my portfolio.
- A designed 404 page.
Follow the definition of done.

---

## Phase 9: Polish and launch

Read CLAUDE.md. Get the site launch-ready.
1. Use a subagent to audit every page for accessibility (axe + manual keyboard pass)
   and fix everything it finds.
2. Use a second subagent to audit performance: image sizes and formats, fonts, client
   JS per route, anything animating off-screen. Fix it.
3. Motion pass: make transitions feel consistent and calm; check reduced motion.
4. SEO: metadata per page, Open Graph images (generated with next/og in the site's
   style), sitemap, robots, structured data.
5. Run Lighthouse on mobile for Home, a Residence and a Project. Report the scores and
   fix anything under 95.
6. Write a short README with screenshots, the stack and the design decisions.

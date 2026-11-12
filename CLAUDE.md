# Lumen & Lot: project rules

## What this is
The website for Lumen & Lot, a fictional design-build studio that designs, builds and
furnishes small residential developments in Toronto, the Hudson Valley (NY), Copenhagen
and Lisbon. Editorial, calm, architectural: a printed monograph, not a store.
It is a portfolio concept by Emmanuel Onugwu (emmanuelonugwu.com).

The full build plan is in docs/BUILD_PROMPTS.md, one phase at a time.

Signature features:
1. Daylight Explorer: sunlight moves across an SVG floor plan for a chosen date and time,
   calculated with suncalc from each residence's real coordinates.
2. Palette Switcher: three interior palettes swap room images and the finishes list.
3. Shop the Room: accessible hotspots on interior photos.
4. Compare (up to 3 homes, shareable URL) and Brief builder (6 steps, PDF download).

## Honesty rules (never break)
- Every page footer says: "Lumen & Lot is a concept studio, designed and built by
  Emmanuel Onugwu." with a link to emmanuelonugwu.com.
- No testimonials or reviews from invented people presented as real.
- Prices are labelled "Indicative". Forms never claim to reach a sales team.
- The brief downloads as a PDF in the browser. Nothing is sent to a server.

## Stack
- Next.js (latest, App Router), React, TypeScript strict
- Tailwind CSS v4 with design tokens as CSS variables in app/styles/tokens.css
- motion (motion/react), lenis, View Transitions API for page transitions
- zod for content schemas; MDX for the journal
- suncalc for sun position; @react-pdf/renderer for the brief PDF
- Vitest for logic, Playwright + @axe-core/playwright for pages
- Deployed on Vercel

## Commands
- npm run dev / build / lint / typecheck / test / test:e2e

## Folder structure
- app/                  routes (server components by default)
- components/ui/        primitives (Button, Label, Rule, Section, RevealImage, Marquee, Drawer)
- components/features/  daylight/, palette/, shop-the-room/, compare/, brief/
- content/              typed data: residences.ts, projects.ts, lookbooks.ts, rates.ts
- content/journal/      MDX articles
- lib/                  pure logic: sun.ts, units.ts, currency.ts (unit tested)
- public/images/        AVIF/WebP images
- tests/                vitest + playwright
- docs/                 the build plan

## Design tokens (only use tokens, never raw hex or px in components)
Colour: paper #F4F1EA, ink #161513, muted #6B675E, clay #B4532A, moss #4B5A3C,
        rule #D9D4C8
Fonts (next/font/google): Instrument Serif (display), Inter Tight (text/UI),
        Geist Mono (labels: uppercase, 0.08em tracking, small)
Type scale: fluid with clamp(); display up to ~9rem with tight leading
Layout: 12-column grid, wide margins, hairline 1px rules instead of cards/shadows,
        radius 0 (2px max on inputs), numbered section labels ("01 — RESIDENCES")
Motion: durations 200/400/800ms, ease cubic-bezier(0.22, 1, 0.36, 1)

## Code rules
- Server components by default; add "use client" only where interaction needs it
- No `any`. Validate all content with zod at build time
- Small components, one job each. Logic lives in lib/ and is unit tested
- next/image for every image, with width, height and sizes; hero images get priority
- Units: store metric; show m² or ft² (1 m² = 10.7639 ft²) via a global toggle
- Currency: fixed rates in content/rates.ts with an asOf date shown in the UI
- Persist toggles and the compare list in localStorage, wrapped in try/catch

## Accessibility (WCAG 2.2 AA)
- Semantic HTML, one h1 per page, landmarks, skip link
- Every interactive thing works with keyboard and has a visible focus style
- Hotspots are buttons with accessible names; the floor plan has a text alternative
  (a table of rooms with their sun hours)
- Never split headings into letters/words without keeping the full sentence for
  screen readers (aria-label on the wrapper, aria-hidden on the pieces)
- Respect prefers-reduced-motion: no smooth scroll, no reveals, instant states
- Contrast checked: muted text is #6B675E on paper, nothing lighter for body text

## Performance
- Lighthouse 95+ on mobile in every category; LCP < 2.5s; CLS < 0.1
- Animations run once and stop; pause videos and marquees when off-screen
- No heavy libraries without asking first

## Definition of done (every task)
1. npm run typecheck, lint and test all pass
2. Run the dev server, take Playwright screenshots at 375, 768 and 1440px,
   look at them and fix anything off
3. axe finds no violations on the pages touched
4. Commit with a clear message

## Copy style
US English. Calm, plain, confident. Short sentences. No buzzwords, no exclamation marks.

## Decisions
Settled during the build. Add to this list at the end of each phase.

Platform
- Next.js 16.4 with Cache Components, Partial Prefetching, React Compiler and typed routes.
  Its docs ship in node_modules/next/dist/docs/: read the relevant guide before using a Next API.
- Tailwind 4 through @tailwindcss/turbopack. Every token is declared once, in the @theme block of
  app/styles/tokens.css, which makes it both a CSS variable and a utility. Tailwind's default
  colors, radii and shadows are reset, so only tokens exist.
- Raw hex and px values live only in app/styles/. ESLint blocks them in app/ and components/.
- MDX through @next/mdx. Articles live in content/journal/*.mdx and export `metadata`, typed as
  unknown and validated with zod.
- suncalc 2: angles in degrees, azimuth clockwise from north, altitude includes refraction.
- Next 16 replaced the image `priority` prop with `preload`. Hero images use `preload`.
- Playwright runs the app on port 3100 so tests never hit another local server. Screenshots run
  with reduced motion, eager images and the Next dev badge hidden, and also capture the open
  residences menu, the open phone menu and the scrolled header.
- Playwright reuses any server already listening on 3100, so stop a stale next dev before e2e.
- A setup project requests every page once, in order, before the suites run in parallel, because
  concurrent first compiles of a dynamic route in next dev can fail with a 500. Each Playwright
  project writes to its own folder in test-results/, so an e2e run keeps the screenshots.
- Page transitions use React's <ViewTransition> in app/template.tsx. app/styles/transitions.css
  styles the page-enter and page-exit classes and turns them off for reduced motion.
- Partial Prefetching wants route params read inside Suspense, so [slug] pages wrap their content
  in Suspense with PageFallback as the instant shell.
- An e2e suite fails any page that logs a console error, which includes hydration mismatches.

Code
- No code comments. Names and structure carry the meaning.
- Kebab-case file names, named exports (Next route files excepted), `@/` imports across folders.
- React hooks live in hooks/. lib/ stays pure and unit tested.
- Components expose variants and tones as props instead of accepting conflicting class overrides,
  so there is no class-merging library. `cx` in lib/cx.ts joins class names.
- Components outside ui/ are grouped by domain: shell/, preferences/, residences/, markets/, and
  features/ for the signature features. Page sections stay private to their route, in app/_home/
  and app/residences/[slug]/_sections/.
- Node and the browser can disagree in the last digits of trig results, so SVG coordinates go
  through svgNumber/svgPoints (lib/svg.ts), rounded to the millimeter, before they render.
- Source holds no invisible characters. A no-break space is written as \u00a0 or &nbsp;.
- Client components import only types from content/. Content values reach them as props, which
  keeps zod and the schemas out of client bundles.
- hooks/use-dismiss.ts closes anything open on Escape or a click outside. The header menu and
  Shop the Room share it.

Design system
- Primitives live in components/ui. Button renders a <button>, ButtonLink renders next/link with a
  typed Route: links navigate, buttons act. ButtonLink is generic over Route<T>, so template
  literal hrefs are checked too.
- app/styles/utilities.css adds link-underline (the animated text link), link-reveal (the
  navigation underline: drawn on hover, also when an enclosing link is hovered, and kept for
  aria-current and aria-expanded), focus-ring and duration-fast/base/slow on top of the tokens.
- lib/motion.ts mirrors the CSS motion tokens for JavaScript, and a unit test keeps them equal.
- Lenis (components/shell/smooth-scroll.tsx) runs only without reduced motion and pauses itself
  when a modal dialog sets overflow hidden on the page.
- Drawer is a native <dialog> with CSS @starting-style transitions, in panel or full size. It
  closes itself when Activity hides its route.
- RevealImage animates only images that start below the fold, so it never delays LCP.
- Toggle is native radio inputs in a radiogroup, in ink or paper tone, with its label inline or
  stacked. Label has muted, ink and paper tones. Marquee pauses on hover, off screen and from its
  button, and its duplicate copy is aria-hidden and inert.
- Select wraps a native select, Slider a native range input (the slider utility), TextField an
  input or textarea and ChoiceCards a radio group, so each keeps
  the browser's keyboard and screen reader behavior. FieldError links an error to its field.
  All of them are on the /system Fields plate.
- /system reads tokens.css at build time. Every color and type step needs a description there or
  the build fails.

Shell
- The header is transparent over the home hero and turns solid paper with a hairline after
  scrolling or while the residences menu is open. heroRoutes in site-header.tsx lists the pages
  that open on a full-bleed hero.
- The residences menu is a disclosure (a button with aria-expanded), not an ARIA menu. Escape, a
  click outside or following a link closes it, and Escape returns focus to the trigger. Below xl,
  a full-screen Drawer holds the navigation and the toggles.
- Area unit and display currency are declared once in lib/preferences.ts. A head script copies the
  saved choices onto <html> before first paint, server components render every variant, and
  generated CSS shows only the chosen one, so nothing flashes on load. usePreference
  (useSyncExternalStore) keeps open tabs in sync.
- Pages that are not built yet render PageInProgress with their real title, so every link in the
  shell resolves.

Residences
- The grid or list view is a third preference (data-residence-view) on the same no-flash
  mechanism: the server renders both views and CSS shows the saved one.
- Filters (city, minimum bedrooms, status) are client state and stay out of the URL, so the list
  prerenders. lib/residence-filters.ts holds the matching rule.
- The compare store is lib/compare.ts with hooks/use-compare-list.ts: up to 3 slugs, comma
  separated, in localStorage, kept in memory when storage refuses a write. "Add to compare" is on
  the residence page. The tray and /compare come in Phase 6.
- The energy card shows each label on its own system's scale. Letter scales are stepped bars, the
  most efficient first.
- The chosen palette lives in ?palette=. The residence page resolves searchParams inside its own
  Suspense boundary, with the first palette as the fallback, so the page stays prerendered and
  only the finishes stream. Choosing a palette updates the URL with history.replaceState, without
  a server request. Photos for every palette are stacked and cross-fade; the hidden ones are
  aria-hidden with empty alt text.

Compare and brief
- The compare tray (components/features/compare) sits at the bottom of every page except
  /compare, with a spacer so it never covers the footer. Index cards add homes with a checkbox.
- /compare reads ?homes= inside Suspense. Removing a home updates the store and the URL; an empty
  URL picks up the saved list. Living room sun uses the March equinox from the explorer's days.
- The brief validates each step with its own zod schema (lib/brief.ts), so a step never trips on
  later fields. It is the one client feature that ships zod. describeBrief feeds both the review
  and the PDF.
- The PDF loads @react-pdf/renderer only on download and uses the PDF standard fonts (Times,
  Helvetica, Courier) with lib/colors.ts, which mirrors the color tokens under a unit test.
- html has scroll-padding-top for the fixed header. Absolutely positioned content inside a scroll
  container needs a positioned scroller. An e2e test fails any page that scrolls sideways at 375.

Interiors
- Each lookbook section takes its palette id as an anchor (#limewash). The home teaser and the
  residence finishes link to it.
- Hotspots are buttons named after the piece, with aria-expanded and aria-controls. From md the
  card opens beside its marker, on the side with more room; on phones it sits below the photo.
  Escape and a click outside close it, and Escape returns focus to the marker.
- Every piece is also listed below its photo. The page says the makers and prices are invented.
- The m²/ft² preference also switches furniture sizes between centimeters and inches.

Daylight Explorer
- lib/sun.ts is the model. A day's sunrise and sunset come from suncalc at an instant near local
  solar noon (12:00 UTC minus longitude ÷ 15 hours), so no time zone math is needed. Times show in
  the residence's own zone through Intl, with the space before AM or PM normalized.
- A window's outward normal comes from probing just outside its wall in the room polygon, and
  bearings map onto the plan through northRotation.
- A window lets sun in when the sun is up, less than 90° off its outward normal, and not fully
  shaded by a 30 cm reveal, which darkens depth × tan(angle) of the opening at the end nearest the
  sun. The same rule drives the drawn patches, "in sun now" and the sun hours.
- Sun hours sample every 15 minutes from sunrise to sunset and report each room's sunny periods.
- Dates are the 2026 winter solstice, March equinox and summer solstice, plus today in the
  residence's zone. The explorer opens on the equinox at the middle of the living room's longest
  sunny period. Play runs a day in 14 seconds, in hourly steps under reduced motion.
- The plan is drawn in meters inside a group rotated so north is up, with light clipped to each
  room. Room names are HTML overlays sized in cqw and shown only where they fit
  (lib/plan-frame.ts). The sun hours table is the text alternative.

Content and data
- content/schemas/ holds one zod schema per domain. Every collection parses when its module loads,
  so invalid content fails the build and the unit tests. Collections export their validated list
  and small finders (findResidence, newestResidence, nextResidence, findProject, nextProject,
  findLookbook).
- Markets (content/markets.ts) carry the city name, country, IANA time zone, currency and energy
  label system. Residences and projects store a market id, and the schema resolves it to the
  market. Prices must be in the market's currency, labels in its system.
- Copenhagen prices are stored in DKK. Currency toggle: Local (default), USD, CAD, EUR, GBP.
- Rates are the ECB euro reference rates for 2026-11-10, stored as published. Conversions go
  through the euro, and converted prices round to three significant figures.
- The three studio palettes (Limewash, Umber, Slate) are shared. Each residence supplies a photo of
  the same rooms in every palette, and there is one lookbook per palette.
- Floor plans are in meters with the origin at the top left, x to the right and y down, like SVG.
  northRotation is the angle in degrees, clockwise, from the top of the plan to true north. One
  level per plan, exactly one living room, and windows sit on their room's outside walls.
  Bedroom and bathroom counts must match the rooms on the plan.
- Energy labels stay in each country's own system (EnerGuide, HERS Index, Energimærke,
  Certificado Energético). Compare never ranks across systems.
- Neighborhood-level locations only, no street addresses. Shop the Room makers and prices are
  invented. Project credits name only the studio and say the photos are placeholders.
- Images use four formats from content/media.ts: portrait 1600×2000, landscape 2400×1600,
  square 1800×1800, wide 2400×1350. `npm run images` (tsx, sharp) draws a flat-tone placeholder for
  every image the content references and never overwrites an existing file. To use a real photo,
  save it at the same path in the same format, or update its width and height. A unit test checks
  every image exists at its stated size.

Design and accessibility
- Clay (4.4:1 on paper) is for display type, graphics and sunlight only, never small text or
  button labels. Muted text sits only on paper. Control borders use muted or ink, never rule.
- Daylight patches span sill ÷ tan(altitude) to head ÷ tan(altitude). The page says it shows
  direct sun on an unobstructed site.
- The marquee has a visible pause button. The newsletter form says that nothing was sent.
- Home shows journal stubs until Phase 8.
- On the home page, text and image sit side by side from lg and stack below it. The project
  collage staggers tiles with grid row spans, never negative margins, so tiles cannot overlap
  whatever their image ratios.
- City lists wrap only between cities, so a separator never starts a line.

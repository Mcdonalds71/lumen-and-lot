# Lumen & Lot

The website for Lumen & Lot, a design-build studio that designs, builds and furnishes small homes
in Toronto, the Hudson Valley, Copenhagen, Lisbon and London. It reads like a printed monograph,
not a store.

Designed and built by [Emmanuel Onugwu](https://emmanuelonugwu.com). The homes, prices and people
are sample content; the sun positions, exchange rates and energy label systems are real. Want a
website like this one? [Get in touch](https://emmanuelonugwu.com).

![The home page: a full-bleed dusk scene under the line "Homes built for the light we have"](docs/screenshots/home.webp)

## What is in it

- **Residences.** Seven homes across five cities, in a grid or a list, with filters. Each home has
  a gallery, a floor plan, finishes, specifications and an energy label on its own country's
  scale.
- **Projects.** Five case studies with an editorial index, alternating story chapters, drawings
  and a before and after slider.
- **Interiors.** One lookbook per studio palette, with the pieces in each room.
- **Journal.** Three MDX articles with a drop cap, pull quotes, wide figures and a reading time
  worked out at compile time.
- **Studio and colophon.** How the studio works, and how the site was made.

### Signature features

**Daylight Explorer.** Sunlight moves across each floor plan for a chosen date and hour,
calculated with SunCalc from the home's real coordinates. Light enters only through windows that
face the sun, minus the shade of the window reveal. A table of rooms and their sun hours is the
text alternative.

![The Daylight Explorer on a residence page](docs/screenshots/daylight-explorer.webp)

**Palette Switcher.** Three interior palettes swap the room photos and the finishes list. The
choice lives in the URL, so it can be shared.

**Shop the Room.** Hotspots on interior photos are real buttons, named after the piece, that work
with a keyboard and a screen reader. Every piece is also listed below its photo.

![Shop the Room with a piece open beside its marker](docs/screenshots/shop-the-room.webp)

**Compare and brief.** Up to three homes side by side, with a link to share. A six-step brief
validates each step and downloads as a PDF made in the browser. Nothing is sent anywhere.

![Three homes compared side by side](docs/screenshots/comparison.webp)

<p>
  <img src="docs/screenshots/phone-home.webp" alt="The home page on a phone" width="320">
  <img src="docs/screenshots/phone-residence.webp" alt="A residence page on a phone" width="320">
</p>

## Stack

- **Next.js 16** with the App Router, Cache Components, Partial Prefetching, the React Compiler
  and typed routes. Server components by default.
- **React 19** and **TypeScript** in strict mode.
- **Tailwind CSS 4**, with every design token declared once in `app/styles/tokens.css`.
- **Zod** validates all content when it loads, so bad content fails the build.
- **MDX** for the journal, with a small remark plugin for reading time.
- **SunCalc** for sun positions, **React-pdf** for the brief, and **Lenis** for smooth scrolling.
- **Vitest** for logic, and **Playwright** with **axe** for pages.
- Hosted on **Vercel**.

## Design decisions

- **Tokens only.** Six colors, three typefaces, a fluid type scale and three motion durations.
  Raw hex and pixel values are blocked by ESLint outside `app/styles/`.
- **No flash on load.** Area unit, currency and view choices are copied onto `<html>` by a tiny
  head script before first paint. The server renders every variant and CSS shows the chosen one.
- **Light, modeled honestly.** A window lets sun in only when the sun is up, faces it and is not
  fully shaded by its reveal. The page says it shows direct sun on an open site.
- **Honest by design.** Every footer credits the website and says the homes, prices and people
  are sample content. Prices are labelled indicative and
  converted at stated ECB rates. Energy labels stay in their own systems and are never ranked
  against each other. Forms say that nothing was sent.
- **Accessible first.** WCAG 2.2 AA: semantic landmarks, a skip link, native form controls,
  visible focus, text alternatives for the floor plans, and no motion when the system asks for
  less.
- **Calm motion.** Transitions are 200, 400 or 800 ms on one ease-out curve. Page changes use
  view transitions. Images reveal only below the fold, so they never delay the first paint.

The full list of decisions, phase by phase, is in [CLAUDE.md](CLAUDE.md).

## Quality

- **Tests.** Over 300 Vitest unit tests cover the sun model, units, currency, the brief, content
  validation and the SEO helpers. More than 140 Playwright tests run axe, check for console
  errors and sideways scrolling on every page, and walk through each feature by keyboard.
- **PageSpeed Insights.** The live site on Vercel, tested on November 17, 2026:

  | Page                    | Device  | Performance | Accessibility | Best practices | SEO | LCP   | CLS |
  | ----------------------- | ------- | ----------- | ------------- | -------------- | --- | ----- | --- |
  | Home                    | Mobile  | 98          | 100           | 100            | 100 | 0.9 s | 0   |
  | Home                    | Desktop | 100         | 100           | 100            | 100 | 0.3 s | 0   |
  | Residence (Harbor Room) | Mobile  | 100         | 100           | 100            | 100 | 0.9 s | 0   |
  | Residence (Harbor Room) | Desktop | 100         | 100           | 100            | 100 | 0.6 s | 0   |
  | Project (Stair House)   | Mobile  | 100         | 100           | 100            | 100 | 0.9 s | 0   |
  | Project (Stair House)   | Desktop | 99          | 100           | 100            | 100 | 0.7 s | 0   |

  Each photo reaches a phone as 14 to 26 KB. The home page's Speed Index is its one slower metric,
  because the city marquee and the rising headline keep the screen moving by design.

## Getting started

Requires Node.js 24.

```bash
npm install
npx playwright install chromium
npm run dev
```

Set `SITE_URL` to the public origin in production. On Vercel the production domain is used
automatically.

## Scripts

| Command               | Purpose                                                       |
| --------------------- | ------------------------------------------------------------- |
| `npm run dev`         | Start the development server on port 3000                     |
| `npm run build`       | Build for production                                          |
| `npm run lint`        | Lint with ESLint                                              |
| `npm run typecheck`   | Generate route types and type-check                           |
| `npm test`            | Run unit tests with Vitest                                    |
| `npm run test:e2e`    | Run page, accessibility and layout tests with Playwright, axe |
| `npm run screenshots` | Capture every page at 375, 768 and 1440 pixels wide           |
| `npm run photos`      | Download and crop the photographs listed in content/photos.ts |
| `npm run drawings`    | Draw the project plans and sections                           |
| `npm run images`      | Draw a placeholder for any image that is missing              |
| `npm run format`      | Format with Prettier                                          |

## Project structure

```text
app/                  routes, server components by default
  _seo/               metadata, Open Graph cards and structured data
components/ui/        primitives: Button, Label, Rule, Section, Drawer, Toggle…
components/features/  daylight, palette, shop-the-room, compare, brief
content/              typed, validated data: residences, projects, lookbooks, rates
content/journal/      MDX articles
lib/                  pure logic, unit tested: sun, units, currency, brief…
scripts/              photo import, drawings and placeholders
tests/                Vitest units and Playwright suites
docs/                 the build plan and the journal fact check
```

## Credits

Type: Instrument Serif by Instrument, Inter Tight by Rasmus Andersson and Geist Mono by Vercel,
all under the SIL Open Font License.

Photographs: from Unsplash, under the Unsplash License. Each photographer is credited by name on
the colophon page, and `content/photos.ts` lists every photo with its source. The palette rooms,
the lookbooks and the before-and-after views are generated with Figma AI. The plans and sections
are drawn in code.

The Unsplash License does not allow the photos to be sold as they are. If you take this site on
for your own studio, replace them with your own photographs at the same paths and sizes.

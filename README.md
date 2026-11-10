# Lumen & Lot

The website for Lumen & Lot, a fictional design-build studio that designs, builds and furnishes small residential developments in Toronto, the Hudson Valley, Copenhagen and Lisbon.

Lumen & Lot is a concept studio, designed and built by [Emmanuel Onugwu](https://emmanuelonugwu.com).

## Stack

Next.js 16 (App Router, Cache Components, React Compiler) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lenis · Zod · MDX · SunCalc · React PDF · Vitest · Playwright with axe

## Getting started

Requires Node.js 24.

```bash
npm install
npx playwright install chromium
npm run dev
```

## Scripts

| Command               | Purpose                                                |
| --------------------- | ------------------------------------------------------ |
| `npm run dev`         | Start the development server on port 3000              |
| `npm run build`       | Build for production                                   |
| `npm run lint`        | Lint with ESLint                                       |
| `npm run typecheck`   | Generate route types and type-check                    |
| `npm test`            | Run unit tests with Vitest                             |
| `npm run test:e2e`    | Run page and accessibility tests with Playwright + axe |
| `npm run screenshots` | Capture every page at 375, 768 and 1440 pixels wide    |
| `npm run format`      | Format with Prettier                                   |

import { type Colophon, colophonSchema } from "./schemas/colophon";

export const colophon: Colophon = colophonSchema.parse({
  fonts: [
    {
      name: "Instrument Serif",
      face: "display",
      use: "Headings and large type",
      designer: "Instrument",
    },
    {
      name: "Inter Tight",
      face: "sans",
      use: "Text and interface",
      designer: "Rasmus Andersson",
    },
    {
      name: "Geist Mono",
      face: "mono",
      use: "Labels and numbers",
      designer: "Vercel",
    },
  ],
  tools: [
    { name: "Next.js", role: "Framework", package: "next" },
    { name: "React", role: "Interface", package: "react" },
    { name: "TypeScript", role: "Language", package: "typescript" },
    { name: "Tailwind CSS", role: "Styling", package: "tailwindcss" },
    { name: "MDX", role: "Journal articles", package: "@next/mdx" },
    { name: "Zod", role: "Content validation", package: "zod" },
    { name: "SunCalc", role: "Sun positions", package: "suncalc" },
    { name: "Lenis", role: "Smooth scrolling", package: "lenis" },
    {
      name: "React-pdf",
      role: "The brief as a PDF",
      package: "@react-pdf/renderer",
    },
    { name: "sharp", role: "Placeholder images", package: "sharp" },
    { name: "Vitest", role: "Unit tests", package: "vitest" },
    { name: "Playwright", role: "Browser tests", package: "@playwright/test" },
    {
      name: "axe-core",
      role: "Accessibility checks",
      package: "@axe-core/playwright",
    },
  ],
});

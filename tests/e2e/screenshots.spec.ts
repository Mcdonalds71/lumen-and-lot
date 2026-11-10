import { test } from "@playwright/test";

import { pages } from "./pages";

const viewports = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
] as const;

for (const { name, path } of pages) {
  for (const viewport of viewports) {
    test(`${name} at ${viewport.width}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(path);
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      await page.screenshot({
        path: `test-results/screenshots/${name}-${viewport.width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}

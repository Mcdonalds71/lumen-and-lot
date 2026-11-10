import { type Page, test } from "@playwright/test";

import { pages } from "./pages";

const viewports = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
] as const;

async function settle(page: Page) {
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await page.evaluate(async () => {
    const images = [...document.images];
    for (const image of images) image.loading = "eager";
    await Promise.all(images.map((image) => image.decode().catch(() => {})));
    await document.fonts.ready;
  });
}

for (const { name, path } of pages) {
  for (const viewport of viewports) {
    test(`${name} at ${viewport.width}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(path);
      await settle(page);
      await page.screenshot({
        path: `test-results/screenshots/${name}-${viewport.width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}

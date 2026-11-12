import { expect, test } from "@playwright/test";

import { pages } from "./pages";

test.describe("on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const { name, path } of pages) {
    test(`${name} page never scrolls sideways`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

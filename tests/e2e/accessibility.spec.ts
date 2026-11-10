import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { pages } from "./pages";

for (const { name, path } of pages) {
  test.describe(`${name} page`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
    });

    test("has no axe violations", async ({ page }) => {
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations).toEqual([]);
    });

    test("has one h1 inside a single main landmark", async ({ page }) => {
      await expect(page.getByRole("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  });
}

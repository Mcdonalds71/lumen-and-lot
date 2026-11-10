import { expect, test } from "@playwright/test";

import { pages } from "./pages";

for (const { name, path } of pages) {
  test(`${name} page credits the concept in its footer`, async ({ page }) => {
    await page.goto(path);
    const footer = page.getByRole("contentinfo");

    await expect(footer).toContainText(
      "Lumen & Lot is a concept studio, designed and built by Emmanuel Onugwu.",
    );
    await expect(
      footer.getByRole("link", { name: "Emmanuel Onugwu" }),
    ).toHaveAttribute("href", "https://emmanuelonugwu.com");
  });
}

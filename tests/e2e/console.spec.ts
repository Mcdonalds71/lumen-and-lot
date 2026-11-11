import { expect, test } from "@playwright/test";

import { pages } from "./pages";

for (const { name, path } of pages) {
  test(`${name} page loads without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(path, { waitUntil: "networkidle" });
    expect(errors).toEqual([]);
  });
}

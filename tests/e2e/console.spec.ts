import { expect, test } from "@playwright/test";

import { pages } from "./pages";

for (const { name, path, status = 200 } of pages) {
  test(`${name} page loads without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() !== "error") return;
      const expectedStatus =
        status !== 200 && message.location().url.endsWith(path);
      if (!expectedStatus) errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(path, { waitUntil: "networkidle" });
    expect(errors).toEqual([]);
  });
}

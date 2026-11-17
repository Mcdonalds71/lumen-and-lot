import { expect, test } from "@playwright/test";

import { pages } from "./pages";

for (const { name, path } of pages) {
  test(`${name} page credits the website and its sample content`, async ({
    page,
  }) => {
    await page.goto(path);
    const footer = page.getByRole("contentinfo");

    await expect(footer).toContainText("Website by Emmanuel Onugwu.");
    await expect(footer).toContainText(
      "Homes, prices and people shown are sample content.",
    );
    for (const name of ["Emmanuel Onugwu", "Want a site like this?"]) {
      await expect(footer.getByRole("link", { name })).toHaveAttribute(
        "href",
        "https://emmanuelonugwu.com",
      );
    }
  });
}

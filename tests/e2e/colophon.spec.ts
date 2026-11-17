import { expect, test } from "@playwright/test";

test.describe("colophon", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/colophon");
  });

  test("credits the website and links to its maker", async ({ page }) => {
    const website = page.getByRole("region", { name: "01 — Website" });
    await expect(website).toContainText(
      "Designed and built by Emmanuel Onugwu",
    );
    await expect(website).toContainText("sample content");
    await expect(
      website.getByRole("link", { name: "emmanuelonugwu.com" }),
    ).toHaveAttribute("href", "https://emmanuelonugwu.com");
  });

  test("credits the type and the tools", async ({ page }) => {
    await expect(page.getByRole("region", { name: "02 — Type" })).toContainText(
      "Instrument Serif",
    );
    await expect(
      page.getByRole("region", { name: "03 — Stack" }).getByRole("term"),
    ).toContainText(["Next.js", "React"]);
  });
});

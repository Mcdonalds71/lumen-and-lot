import { expect, test } from "@playwright/test";

test.describe("colophon", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/colophon");
  });

  test("states the concept and links to the portfolio", async ({ page }) => {
    const concept = page.getByRole("region", { name: "01 — Concept" });
    await expect(concept).toContainText("concept studio");
    await expect(
      concept.getByRole("link", { name: "emmanuelonugwu.com" }),
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

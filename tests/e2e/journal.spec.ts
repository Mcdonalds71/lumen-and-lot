import { expect, test } from "@playwright/test";

const readingTime = /\d+\smin read/;

test.describe("journal", () => {
  test("lists the articles newest first, with their reading time", async ({
    page,
  }) => {
    await page.goto("/journal");
    const titles = page.getByRole("main").getByRole("heading", { level: 2 });
    await expect(titles).toHaveText([
      "Designing for daylight",
      "How to read an energy certificate",
      "Buying a new home from abroad",
    ]);
    await expect(page.getByRole("article").first()).toContainText(readingTime);
  });

  test("opens an article from its card", async ({ page }) => {
    await page.goto("/journal");
    await page
      .getByRole("link", { name: "How to read an energy certificate" })
      .click();
    await expect(page).toHaveURL(
      /\/journal\/how-to-read-an-energy-certificate$/,
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "How to read an energy certificate",
      }),
    ).toBeVisible();
  });
});

test.describe("article", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/journal/designing-for-daylight");
  });

  test("shows its reading time under the title", async ({ page }) => {
    await expect(page.getByRole("article").locator("header")).toContainText(
      readingTime,
    );
  });

  test("opens with a drop cap", async ({ page }) => {
    const color = await page
      .locator(".article-flow > p")
      .first()
      .evaluate((paragraph) =>
        getComputedStyle(paragraph, "::first-letter").getPropertyValue("color"),
      );
    expect(color).toBe("rgb(180, 83, 42)");
  });

  test("keeps pull quotes out of the reading order", async ({ page }) => {
    const quote = page.locator(".article-flow > p[aria-hidden='true']");
    await expect(quote).toHaveCount(1);
    await expect(quote).toContainText("A low winter sun");
  });

  test("leads on to the next article", async ({ page }) => {
    await page
      .getByRole("navigation", { name: "Next article" })
      .getByRole("link", { name: "How to read an energy certificate" })
      .click();
    await expect(page).toHaveURL(
      /\/journal\/how-to-read-an-energy-certificate$/,
    );
  });
});

test("articles with practical advice say they are not professional advice", async ({
  page,
}) => {
  for (const slug of [
    "how-to-read-an-energy-certificate",
    "buying-a-new-home-from-abroad",
  ]) {
    await page.goto(`/journal/${slug}`);
    await expect(
      page.getByRole("complementary", { name: "Note" }),
    ).toContainText("general information");
  }
});

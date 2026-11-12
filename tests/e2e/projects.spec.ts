import { expect, test } from "@playwright/test";

test.describe("projects index", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("lists every project with its number, city, year and type", async ({
    page,
  }) => {
    const rows = page.getByRole("main").getByRole("listitem");
    await expect(rows).toHaveCount(4);
    await expect(rows.first()).toContainText("01");
    await expect(rows.first()).toContainText("Laneway House");
    await expect(rows.first()).toContainText("2021");
    await expect(rows.first()).toContainText("New build");
  });

  test("shows the project's image beside the cursor", async ({ page }) => {
    await page.getByRole("link", { name: "Stair House" }).hover();
    await expect(page.locator("[data-preview]")).toHaveAttribute(
      "data-preview",
      "stair-house",
    );
    await page.mouse.move(5, 5);
    await expect(page.locator("[data-preview]")).toHaveAttribute(
      "data-preview",
      "",
    );
  });

  test("shows the image for keyboard focus too", async ({ page }) => {
    await page.getByRole("link", { name: "Mill Apartments" }).focus();
    await expect(page.locator("[data-preview]")).toHaveAttribute(
      "data-preview",
      "mill-apartments",
    );
  });

  test("remembers the lookbook view", async ({ page }) => {
    await page
      .getByRole("radiogroup", { name: "View" })
      .locator("label", { hasText: "Lookbook" })
      .click();
    await expect(page.getByRole("article")).toHaveCount(4);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute(
      "data-project-view",
      "grid",
    );
    await expect(page.getByRole("article")).toHaveCount(4);
  });
});

test.describe("projects index on a touch screen", () => {
  test.use({
    viewport: { width: 412, height: 915 },
    hasTouch: true,
    isMobile: true,
  });

  test("shows thumbnails in the list instead of a hover image", async ({
    page,
  }) => {
    await page.goto("/projects");
    const firstRow = page.getByRole("main").getByRole("listitem").first();
    await expect(firstRow.locator("img")).toBeVisible();
    await expect(page.locator("[data-preview]")).toBeHidden();
  });
});

test.describe("case study", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects/stair-house");
  });

  test("tells the story in order", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Stair House" }),
    ).toBeVisible();
    const chapters = page.getByRole("heading", { level: 2 });
    await expect(chapters.first()).toHaveText("A tall, thin house");
    await expect(
      page.getByRole("heading", { level: 2, name: "Drawn to measure" }),
    ).toBeVisible();
    await expect(page.getByRole("main")).toContainText("Placeholder images");
  });

  test("compares before and after with the arrow keys", async ({ page }) => {
    const slider = page.getByRole("slider", { name: "Before and after" });
    await slider.focus();
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await expect(slider).toHaveAttribute(
      "aria-valuetext",
      "48 percent before, 52 percent after",
    );
    await page.keyboard.press("End");
    await expect(slider).toHaveValue("100");
  });

  test("leads on to the next project", async ({ page }) => {
    await page
      .getByRole("navigation", { name: "Next project" })
      .getByRole("link", { name: "Laneway House" })
      .click();
    await expect(page).toHaveURL(/\/projects\/laneway-house$/);
  });
});

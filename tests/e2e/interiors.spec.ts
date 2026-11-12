import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Shop the Room", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/interiors");
  });

  test("a hotspot opens a card with the piece's details", async ({ page }) => {
    const sofa = page.getByRole("button", { name: "Three-seat sofa" });
    await expect(sofa).toHaveAttribute("aria-expanded", "false");
    await sofa.click();
    await expect(sofa).toHaveAttribute("aria-expanded", "true");

    const card = page.getByRole("group", { name: "Three-seat sofa" });
    await expect(card).toContainText("Lowfield Upholstery");
    await expect(card).toContainText("Undyed linen over an oak frame");
    await expect(card).toContainText("W 228 × D 95 × H 74 cm");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });

  test("Escape closes the card and gives focus back", async ({ page }) => {
    const sofa = page.getByRole("button", { name: "Three-seat sofa" });
    await sofa.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("group", { name: "Three-seat sofa" }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("group", { name: "Three-seat sofa" }),
    ).toBeHidden();
    await expect(sofa).toBeFocused();
  });

  test("an open card follows its hotspot and closes when focus moves on", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Three-seat sofa" }).click();
    const card = page.getByRole("group", { name: "Three-seat sofa" });
    await page.keyboard.press("Tab");
    await expect(card.getByRole("button", { name: "Close" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Low table" })).toBeFocused();
    await expect(card).toBeHidden();
  });

  test("Tab moves from one hotspot to the next", async ({ page }) => {
    await page.getByRole("button", { name: "Three-seat sofa" }).focus();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Low table" })).toBeFocused();
  });

  test("lists every piece below each photograph", async ({ page }) => {
    for (const palette of ["limewash", "umber", "slate"]) {
      await expect(page.locator(`#${palette} ol > li`)).toHaveCount(5);
    }
  });

  test("gives sizes in inches with the imperial preference", async ({
    page,
  }) => {
    const pieces = page.locator("#limewash ol");
    await expect(pieces).toContainText("W 228 × D 95 × H 74 cm", {
      useInnerText: true,
    });
    await page
      .getByRole("radiogroup", { name: "Area" })
      .locator("label", { hasText: "ft²" })
      .click();
    await expect(pieces).toContainText("W 89.8 × D 37.4 × H 29.1 in", {
      useInnerText: true,
    });
  });
});

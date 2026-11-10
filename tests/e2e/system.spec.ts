import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("system page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/system");
  });

  test("toggle selection follows the arrow keys", async ({ page }) => {
    const area = page.getByRole("radiogroup", { name: "Area" });
    await area.getByRole("radio", { name: "m²" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(area.getByRole("radio", { name: "ft²" })).toBeChecked();
  });

  test("drawer opens as a dialog and gives focus back on Escape", async ({
    page,
  }) => {
    const trigger = page.getByRole("button", {
      name: "Open the finishes drawer",
    });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Finishes" });
    await expect(dialog).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).include("dialog").analyze()).violations,
    ).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("marquee pauses and plays from its button", async ({ page }) => {
    await page.getByRole("button", { name: "Pause cities" }).click();
    await page.getByRole("button", { name: "Play cities" }).click();
    await expect(
      page.getByRole("button", { name: "Pause cities" }),
    ).toBeVisible();
  });

  test("smooth scrolling is on", async ({ page }) => {
    await expect(page.locator("html")).toHaveClass(/\blenis\b/);
  });
});

test.describe("system page with reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("stays still: no smooth scroll and no marquee control", async ({
    page,
  }) => {
    await page.goto("/system");
    await expect(page.locator("html")).not.toHaveClass(/\blenis\b/);
    await expect(
      page.getByRole("button", { name: "Pause cities" }),
    ).toBeHidden();
  });
});

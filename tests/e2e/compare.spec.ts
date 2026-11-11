import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const tray = "Homes to compare";

test.describe("compare", () => {
  test("collects homes in the tray and opens them side by side", async ({
    page,
  }) => {
    await page.goto("/residences");
    await page.getByRole("checkbox", { name: /Compare Harbor Room/ }).check();
    await page.getByRole("checkbox", { name: /Compare High Terrace/ }).check();

    const bar = page.getByRole("complementary", { name: tray });
    await expect(bar).toContainText("Compare · 2 of 3");
    await bar.getByRole("link", { name: "Compare" }).click();

    await expect(page).toHaveURL(/\/compare\?homes=harbor-room,high-terrace$/);
    const table = page.getByRole("table", { name: "Homes side by side" });
    await expect(table.getByRole("columnheader")).toHaveCount(2);
    await expect(
      table.getByRole("row", { name: /Living room sun on the March equinox/ }),
    ).toContainText("12 h");
    await expect(page.getByRole("complementary", { name: tray })).toBeHidden();
  });

  test("holds three homes at most", async ({ page }) => {
    await page.goto("/residences");
    for (const name of ["Garden Floor", "North Light", "Orchard House"]) {
      await page
        .getByRole("checkbox", { name: new RegExp(`Compare ${name}`) })
        .check();
    }
    await expect(
      page.getByRole("checkbox", { name: /Compare Harbor Room/ }),
    ).toBeDisabled();
  });

  test("shows a shared link in the reader's currency", async ({ page }) => {
    await page.goto("/compare?homes=orchard-house,north-light");
    const table = page.getByRole("table", { name: "Homes side by side" });
    await expect(table).toContainText("Orchard House");
    await expect(table).toContainText("North Light");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

    await page
      .getByRole("radiogroup", { name: "Currency" })
      .locator("label", { hasText: "EUR" })
      .click();
    await expect(
      table.getByRole("row", { name: /Indicative price/ }),
    ).toContainText("€");
  });

  test("updates the address when a home is removed", async ({ page }) => {
    await page.goto("/compare?homes=harbor-room,high-terrace");
    await page.getByRole("button", { name: "Remove Harbor Room" }).click();
    await expect(page).toHaveURL(/\/compare\?homes=high-terrace$/);
    await expect(
      page.getByRole("table", { name: "Homes side by side" }),
    ).not.toContainText("Harbor Room");
  });

  test("picks up saved homes when the address has none", async ({ page }) => {
    await page.goto("/residences");
    await page.evaluate(() =>
      localStorage.setItem(
        "lumen-and-lot:compare",
        "garden-floor,high-terrace",
      ),
    );
    await page.goto("/compare");
    await expect(page).toHaveURL(/\/compare\?homes=garden-floor,high-terrace$/);
  });
});

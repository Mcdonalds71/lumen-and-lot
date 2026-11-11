import { expect, type Page, test } from "@playwright/test";

const text = { useInnerText: true };

function results(page: Page) {
  return page.getByRole("main").getByRole("status");
}

test.describe("residences index", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/residences");
  });

  test("filters by city, bedrooms and status", async ({ page }) => {
    await expect(results(page)).toHaveText("Showing all 6 homes.");

    await page
      .getByRole("combobox", { name: "City" })
      .selectOption("copenhagen");
    await expect(results(page)).toHaveText("Showing 2 of 6 homes.");
    await expect(page.getByRole("article")).toHaveCount(2);

    await page.getByRole("combobox", { name: "Bedrooms" }).selectOption("3");
    await expect(page.getByRole("article")).toHaveCount(1);
    await expect(page.getByRole("article")).toContainText("Courtyard Rooms");

    await page
      .getByRole("combobox", { name: "Status" })
      .selectOption("available");
    await expect(page.getByText("No homes match these filters.")).toBeVisible();

    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(page.getByRole("article")).toHaveCount(6);
  });

  test("remembers the list view", async ({ page }) => {
    await page
      .getByRole("radiogroup", { name: "View" })
      .locator("label", { hasText: "List" })
      .click();
    const table = page.getByRole("table", { name: "Residences" });
    await expect(table).toBeVisible();
    await expect(page.getByRole("article")).toHaveCount(0);

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute(
      "data-residence-view",
      "list",
    );
    await expect(table.getByRole("row")).toHaveCount(7);
  });

  test("shows prices in the chosen currency", async ({ page }) => {
    const harborRoom = page.getByRole("article").filter({
      hasText: "Harbor Room",
    });
    await expect(harborRoom).toContainText("DKK 7,950,000", text);
    await page
      .getByRole("radiogroup", { name: "Currency" })
      .locator("label", { hasText: "EUR" })
      .click();
    await expect(harborRoom).toContainText("€1,060,000", text);
  });
});

test.describe("residence page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/residences/harbor-room");
  });

  test("draws the plan with a table of sun hours as its text alternative", async ({
    page,
  }) => {
    await expect(
      page.getByRole("img", { name: /^Floor plan of Harbor Room at/ }),
    ).toBeVisible();
    const table = page.getByRole("table", {
      name: /Direct sun by room on March 20/,
    });
    await expect(table.getByRole("row")).toHaveCount(6);
    await expect(
      table.getByRole("row", { name: /Living and kitchen/ }),
    ).toContainText("12 h", text);
  });

  test("moves through the day from the time slider", async ({ page }) => {
    const slider = page.getByRole("slider", { name: "Time of day" });
    const sunrise = await page.getByText(/^Sunrise /).innerText();
    await slider.focus();
    await page.keyboard.press("Home");
    await expect(slider).toHaveAttribute(
      "aria-valuetext",
      new RegExp(`^${sunrise.replace("Sunrise ", "")}`),
    );
  });

  test("switches between the solstices and the equinox", async ({ page }) => {
    await page
      .getByRole("radiogroup", { name: "Date" })
      .locator("label", { hasText: "Winter" })
      .click();
    await expect(
      page.getByRole("table", { name: /Direct sun by room on December 21/ }),
    ).toBeVisible();
    await expect(page.getByText("Winter solstice · December 21")).toBeVisible();
  });

  test("plays the day and pauses", async ({ page }) => {
    const slider = page.getByRole("slider", { name: "Time of day" });
    const before = await slider.inputValue();
    await page.getByRole("button", { name: "Play the day" }).click();
    await expect(slider).not.toHaveValue(before);
    await page.getByRole("button", { name: "Pause" }).click();
    await expect(
      page.getByRole("button", { name: "Play the day" }),
    ).toBeVisible();
  });

  test("switches palettes and keeps the choice in the URL", async ({
    page,
  }) => {
    const picker = page.getByRole("radiogroup", { name: "Palette" });
    const finishes = page.getByRole("region", { name: /Finishes/ });
    await expect(picker.getByRole("radio", { name: "Limewash" })).toBeChecked();

    await picker.locator("label", { hasText: "Umber" }).click();
    await expect(page).toHaveURL(/[?&]palette=umber/);
    await expect(finishes).toContainText("Clay plaster");

    await page.reload();
    await expect(picker.getByRole("radio", { name: "Umber" })).toBeChecked();
    await expect(finishes).toContainText("Smoked oak");
  });

  test("moves between palettes with the arrow keys", async ({ page }) => {
    const picker = page.getByRole("radiogroup", { name: "Palette" });
    await picker.getByRole("radio", { name: "Limewash" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(picker.getByRole("radio", { name: "Umber" })).toBeChecked();
    await expect(page).toHaveURL(/[?&]palette=umber/);
  });

  test("adds the home to compare and remembers it", async ({ page }) => {
    await page.getByRole("button", { name: "Add to compare" }).click();
    await expect(
      page.getByRole("link", { name: "View compare (1 of 3)" }),
    ).toBeVisible();

    await page.reload();
    const remove = page.getByRole("button", { name: "Remove from compare" });
    await expect(remove).toBeVisible();
    await remove.click();
    await expect(
      page.getByRole("button", { name: "Add to compare" }),
    ).toBeVisible();
  });

  test("stops at three homes", async ({ page }) => {
    await page.evaluate(() =>
      localStorage.setItem(
        "lumen-and-lot:compare",
        "garden-floor,north-light,orchard-house",
      ),
    );
    await page.reload();
    await expect(
      page.getByRole("button", { name: "Add to compare" }),
    ).toBeDisabled();
    await expect(page.getByText("Compare holds 3 homes.")).toBeVisible();
  });
});

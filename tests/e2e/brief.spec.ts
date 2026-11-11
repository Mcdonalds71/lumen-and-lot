import { readFile } from "node:fs/promises";

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { choose, fillBrief, next } from "./support/brief";

test.describe("brief", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/brief");
  });

  test("says that nothing is sent anywhere", async ({ page }) => {
    await expect(page.getByRole("main")).toContainText(
      "Nothing is sent anywhere.",
    );
  });

  test("asks for an answer before moving on", async ({ page }) => {
    await next(page);
    await expect(page.getByText("Choose the kind of project.")).toBeVisible();
    await expect(page.getByText("Step 1 of 6", { exact: true })).toBeVisible();
  });

  test("checks the budget range", async ({ page }) => {
    await choose(page, "A renovation of a home you own");
    await next(page);
    await choose(page, "Lisbon");
    await next(page);
    await choose(page, "3 bedrooms");
    await choose(page, "Over 150");
    await next(page);

    await expect(page.getByText("Step 4 of 6", { exact: true })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Currency" })).toHaveValue(
      "EUR",
    );
    await page.getByRole("textbox", { name: "From" }).fill("900,000");
    await page.getByRole("textbox", { name: "To" }).fill("700,000");
    await next(page);
    await expect(
      page.getByText("The upper amount should be at least the lower one."),
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: "To" })).toBeFocused();
  });

  test("ends in a review and a PDF made in the browser", async ({ page }) => {
    await fillBrief(page);
    const review = page.getByRole("main");
    await expect(review).toContainText("A new home on your own land");
    await expect(review).toContainText("DKK 6,000,000 to DKK 8,000,000");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

    await page.getByRole("textbox", { name: "Name on the brief" }).fill("Ada");
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download the brief" }).click();
    const file = await download;
    expect(file.suggestedFilename()).toBe("lumen-and-lot-brief.pdf");
    const bytes = await readFile(await file.path());
    expect(bytes.subarray(0, 4).toString()).toBe("%PDF");
    await expect(page.getByRole("main").getByRole("status")).toContainText(
      "Nothing was sent anywhere.",
    );
  });

  test("changes an answer from the review and comes back", async ({ page }) => {
    await fillBrief(page);
    await page.getByRole("button", { name: "Change Timeline" }).click();
    await choose(page, "No date yet, just looking");
    await page.getByRole("button", { name: "Back to the review" }).click();
    await expect(page.getByRole("main")).toContainText(
      "No date yet, just looking",
    );
  });
});

import { expect, type Page } from "@playwright/test";

export async function choose(page: Page, text: string) {
  await page.locator("label", { hasText: text }).first().click();
}

export async function next(page: Page) {
  await page.getByRole("button", { name: /^(Next|Review the brief)$/ }).click();
}

export async function fillBrief(page: Page) {
  await choose(page, "A new home on your own land");
  await next(page);
  await choose(page, "Copenhagen");
  await next(page);
  await choose(page, "2 bedrooms");
  await choose(page, "75–110");
  await next(page);
  await page.getByRole("textbox", { name: "From" }).fill("6,000,000");
  await page.getByRole("textbox", { name: "To" }).fill("8,000,000");
  await next(page);
  await choose(page, "Within a year");
  await next(page);
  await choose(page, "Umber");
  await next(page);
  await expect(
    page.getByRole("heading", { name: /A new home in Copenhagen/ }),
  ).toBeVisible();
}

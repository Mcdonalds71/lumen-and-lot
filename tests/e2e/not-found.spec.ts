import { expect, test } from "@playwright/test";

test.describe("missing pages", () => {
  test("answer with a 404 and a way back", async ({ page }) => {
    const response = await page.goto("/no-such-room");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "This room is not on the plan",
      }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Ways back" })
      .getByRole("link", { name: "Journal" })
      .click();
    await expect(page).toHaveURL(/\/journal$/);
  });
});

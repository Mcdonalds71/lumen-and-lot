import { expect, test } from "@playwright/test";

test.describe("studio", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/studio");
  });

  test("lays out the process in five steps", async ({ page }) => {
    const steps = page
      .getByRole("region", { name: "02 — Process" })
      .getByRole("listitem");
    await expect(steps).toHaveCount(5);
    await expect(steps.first()).toContainText("Site and brief");
    await expect(steps.last()).toContainText("Furnish and hand over");
  });

  test("shows the team as initials across the five cities", async ({
    page,
  }) => {
    const team = page.getByRole("region", { name: "03 — Team" });
    await expect(team.getByRole("heading", { level: 3 })).toHaveCount(6);
    await expect(team.locator("img")).toHaveCount(0);
    await expect(team).toContainText("Interiors, London");
  });
});

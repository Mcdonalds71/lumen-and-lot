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

  test("says the team is part of the concept", async ({ page }) => {
    const team = page.getByRole("region", { name: "03 — Team" });
    await expect(team).toContainText("The studio is a concept");
    await expect(team.getByRole("heading", { level: 3 })).toHaveCount(6);
    await expect(team.locator("img")).toHaveCount(0);
  });

  test("says the awards are invented and links them to projects", async ({
    page,
  }) => {
    const awards = page.getByRole("region", { name: "04 — Recognition" });
    await expect(awards).toContainText("invented for this concept");
    await expect(
      awards.getByRole("link", { name: "Stair House" }),
    ).toHaveAttribute("href", "/projects/stair-house");
  });
});

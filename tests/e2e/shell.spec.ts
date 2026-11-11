import { expect, test } from "@playwright/test";

test.describe("header", () => {
  test("sits over the hero, then turns solid after scrolling", async ({
    page,
  }) => {
    await page.goto("/");
    const header = page.locator("body > header");
    await expect(header).toHaveAttribute("data-over-hero", "true");
    await page.mouse.wheel(0, 800);
    await expect(header).toHaveAttribute("data-over-hero", "false");
  });

  test("opens the residences menu and closes it with Escape", async ({
    page,
  }) => {
    await page.goto("/system");
    const trigger = page.getByRole("button", {
      name: "Residences",
      exact: true,
    });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("link", { name: "High Terrace" }).first(),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("marks Residences as current on a residence page", async ({ page }) => {
    await page.goto("/residences/harbor-room");
    await expect(
      page.getByRole("button", { name: "Residences", exact: true }),
    ).toHaveAttribute("aria-current", "page");
  });
});

test("the skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/system");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("area and currency choices survive a reload", async ({ page }) => {
  await page.goto("/");
  const featured = page.getByRole("region", { name: /Featured residence/ });
  const text = { useInnerText: true };
  await expect(featured).toContainText("101", text);

  await page
    .getByRole("radiogroup", { name: "Area" })
    .locator("label", { hasText: "ft²" })
    .click();
  await page
    .getByRole("radiogroup", { name: "Currency" })
    .locator("label", { hasText: "EUR" })
    .click();
  await expect(featured).toContainText("1,087", text);
  await expect(featured).toContainText("€1,060,000", text);

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-area", "ft2");
  await expect(page.locator("html")).toHaveAttribute("data-currency", "EUR");
  await expect(featured).toContainText("1,087", text);
});

test("the newsletter says that nothing was sent", async ({ page }) => {
  await page.goto("/system");
  const footer = page.getByRole("contentinfo");
  await footer.getByLabel("Email address").fill("reader@example.com");
  await footer.getByRole("button", { name: "Sign up" }).click();
  await expect(footer.getByRole("status")).toHaveText(/nothing was sent/);
});

test("navigating between pages runs a view transition", async ({ page }) => {
  await page.goto("/system");
  await page.evaluate(() => {
    const root = document.documentElement;
    const start = document.startViewTransition.bind(document);
    root.dataset.transitions = "0";
    document.startViewTransition = (...args: Parameters<typeof start>) => {
      root.dataset.transitions = String(Number(root.dataset.transitions) + 1);
      return start(...args);
    };
  });
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-transitions",
    "0",
  );
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("the menu opens full screen and closes after navigating", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();

    await menu.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(menu).toBeHidden();
  });
});

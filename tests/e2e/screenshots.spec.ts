import { join } from "node:path";

import { expect, type Page, test } from "@playwright/test";

import { pages } from "./pages";
import { fillBrief } from "./support/brief";

const viewports = {
  phone: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
} as const;

type State = {
  name: string;
  path: string;
  viewport: (typeof viewports)[keyof typeof viewports];
  enter: (page: Page) => Promise<void>;
};

const states: readonly State[] = [
  {
    name: "home-residences-menu",
    path: "/",
    viewport: viewports.desktop,
    async enter(page) {
      const trigger = page.getByRole("button", {
        name: "Residences",
        exact: true,
      });
      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
    },
  },
  {
    name: "home-mobile-menu",
    path: "/",
    viewport: viewports.phone,
    async enter(page) {
      await page.getByRole("button", { name: "Menu" }).click();
      await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    },
  },
  {
    name: "home-scrolled-header",
    path: "/",
    viewport: viewports.desktop,
    async enter(page) {
      await page.mouse.wheel(0, 1200);
      await expect(page.locator("body > header")).toHaveAttribute(
        "data-over-hero",
        "false",
      );
    },
  },
  {
    name: "residences-list",
    path: "/residences",
    viewport: viewports.phone,
    async enter(page) {
      await page
        .getByRole("radiogroup", { name: "View" })
        .locator("label", { hasText: "List" })
        .click();
      await expect(
        page.getByRole("table", { name: "Residences" }),
      ).toBeVisible();
    },
  },
  {
    name: "projects-hover",
    path: "/projects",
    viewport: viewports.desktop,
    async enter(page) {
      await page.getByRole("link", { name: "Courtyard Block" }).hover();
      await expect(page.locator("[data-preview]")).toHaveAttribute(
        "data-preview",
        "courtyard-block",
      );
    },
  },
  {
    name: "projects-lookbook",
    path: "/projects",
    viewport: viewports.desktop,
    async enter(page) {
      await page
        .getByRole("radiogroup", { name: "View" })
        .locator("label", { hasText: "Lookbook" })
        .click();
      await expect(page.getByRole("article").first()).toBeVisible();
    },
  },
  ...[viewports.desktop, viewports.phone].map((viewport) => ({
    name: "compare-tray",
    path: "/residences",
    viewport,
    async enter(page: Page) {
      await page.getByRole("checkbox", { name: /Compare Harbor Room/ }).check();
      await page
        .getByRole("checkbox", { name: /Compare High Terrace/ })
        .check();
      await expect(
        page.getByRole("complementary", { name: "Homes to compare" }),
      ).toBeVisible();
    },
  })),
  ...[viewports.desktop, viewports.phone].map((viewport) => ({
    name: "brief-review",
    path: "/brief",
    viewport,
    enter: fillBrief,
  })),
  ...[viewports.desktop, viewports.phone].map((viewport) => ({
    name: "interiors-hotspot",
    path: "/interiors",
    viewport,
    async enter(page: Page) {
      await page.getByRole("button", { name: "Lounge chair" }).click();
      await expect(
        page.getByRole("group", { name: "Lounge chair" }),
      ).toBeVisible();
    },
  })),
];

async function settle(page: Page) {
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await page.evaluate(async () => {
    const images = [...document.images];
    for (const image of images) image.loading = "eager";
    await Promise.all(images.map((image) => image.decode().catch(() => {})));
    await document.fonts.ready;
  });
}

function capture(page: Page, file: string, { fullPage = false } = {}) {
  return page.screenshot({
    path: join(test.info().project.outputDir, `${file}.png`),
    fullPage,
    animations: "disabled",
  });
}

for (const { name, path } of pages.filter((page) => page.screenshot)) {
  for (const viewport of Object.values(viewports)) {
    test(`${name} at ${viewport.width}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(path);
      await settle(page);
      await capture(page, `${name}-${viewport.width}`, { fullPage: true });
    });
  }
}

for (const { name, path, viewport, enter } of states) {
  test(`${name} at ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(path);
    await settle(page);
    await enter(page);
    await capture(page, `${name}-${viewport.width}`);
  });
}

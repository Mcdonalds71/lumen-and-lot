import { expect, test } from "@playwright/test";

test("robots point to a sitemap that lists every page", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Sitemap: \S+\/sitemap\.xml/);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of [
    "/studio",
    "/residences/harbor-room",
    "/projects/stair-house",
    "/journal/designing-for-daylight",
  ]) {
    expect(sitemap).toContain(`${path}</loc>`);
  }
});

test("an article has a canonical URL, its own card and structured data", async ({
  page,
  request,
}) => {
  await page.goto("/journal/designing-for-daylight");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/journal\/designing-for-daylight$/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Designing for daylight",
  );

  const card = new URL(
    (await page.locator('meta[property="og:image"]').getAttribute("content")) ??
      "",
  );
  const image = await request.get(`${card.pathname}${card.search}`);
  expect(image.headers()["content-type"]).toBe("image/png");

  const types = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent ?? "{}")["@type"]),
    );
  expect(types).toEqual(["Article", "BreadcrumbList"]);
});

test("an unknown home answers with a 404", async ({ page }) => {
  const response = await page.goto("/residences/no-such-home");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "This room is not on the plan",
    }),
  ).toBeVisible();
});

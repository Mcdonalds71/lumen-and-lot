import { describe, expect, it } from "vitest";

import { pageMetadata } from "@/app/_seo/page-metadata";
import {
  articleData,
  breadcrumbData,
  serializeJsonLd,
  websiteData,
} from "@/app/_seo/structured-data";

const author = { name: "Emmanuel Onugwu", url: "https://emmanuelonugwu.com" };

describe("pageMetadata", () => {
  it("gives every page its own canonical URL and Open Graph title", () => {
    expect(
      pageMetadata({
        title: "Journal",
        description: "Notes.",
        path: "/journal",
      }),
    ).toMatchObject({
      title: "Journal",
      description: "Notes.",
      alternates: { canonical: "/journal" },
      openGraph: { title: "Journal", url: "/journal", type: "website" },
      twitter: { card: "summary_large_image" },
    });
  });

  it("leaves the title to the layout on the home page", () => {
    const metadata = pageMetadata({ description: "Home.", path: "/" });
    expect(metadata).not.toHaveProperty("title");
    expect(metadata.openGraph?.title).toBe("Lumen & Lot");
  });
});

describe("structured data", () => {
  it("credits the real author of the site", () => {
    expect(
      websiteData({
        name: "Lumen & Lot",
        description: "A concept studio.",
        url: "https://example.com/",
        author,
      }),
    ).toMatchObject({
      "@type": "WebSite",
      creator: { "@type": "Person", name: "Emmanuel Onugwu" },
    });
  });

  it("numbers breadcrumbs from one", () => {
    const crumbs = breadcrumbData([
      { name: "Journal", url: "https://example.com/journal" },
      { name: "Daylight", url: "https://example.com/journal/daylight" },
    ]);
    expect(crumbs.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Journal",
        item: "https://example.com/journal",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Daylight",
        item: "https://example.com/journal/daylight",
      },
    ]);
  });

  it("describes an article with its date and author", () => {
    expect(
      articleData({
        headline: "Designing for daylight",
        description: "How we place windows.",
        url: "https://example.com/journal/daylight",
        image: "https://example.com/cover.webp",
        datePublished: "2026-10-27",
        author,
      }),
    ).toMatchObject({
      "@type": "Article",
      datePublished: "2026-10-27",
      author: { "@type": "Person", name: "Emmanuel Onugwu" },
      publisher: { "@type": "Person", name: "Emmanuel Onugwu" },
    });
  });

  it("escapes markup so the script tag cannot be closed early", () => {
    const serialized = serializeJsonLd({ name: "</script><b>" });
    expect(serialized).not.toContain("</script>");
    expect(JSON.parse(serialized)).toEqual({ name: "</script><b>" });
  });
});

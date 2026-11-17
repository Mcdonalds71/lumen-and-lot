import { describe, expect, it } from "vitest";

import { photoCredits, photos } from "@/content/photos";
import { photoSchema } from "@/content/schemas/photo";
import { downloadUrl, profileUrl, sourceWidth } from "@/lib/photo-sources";

describe("photo sources", () => {
  it("downloads an Unsplash photo from its CDN at the given width", () => {
    expect(
      downloadUrl(
        { site: "Unsplash", id: "photo-1-abc", handle: "someone" },
        3000,
      ),
    ).toBe("https://images.unsplash.com/photo-1-abc?w=3000&q=90&fm=jpg");
  });

  it("downloads a Pexels photo from its CDN at the given width", () => {
    expect(
      downloadUrl({ site: "Pexels", id: 123, handle: "someone" }, 2400),
    ).toBe("https://images.pexels.com/photos/123/pexels-photo-123.jpeg?w=2400");
  });

  it("links each photographer to their profile", () => {
    expect(profileUrl({ site: "Unsplash", id: "x", handle: "ana" })).toBe(
      "https://unsplash.com/@ana",
    );
    expect(profileUrl({ site: "Pexels", id: 1, handle: "ana" })).toBe(
      "https://www.pexels.com/@ana/",
    );
  });

  it("asks for enough width to crop a 3:2 photo to the target", () => {
    expect(sourceWidth({ width: 1600, height: 2000 })).toBe(3000);
    expect(sourceWidth({ width: 1800, height: 1800 })).toBe(2700);
    expect(sourceWidth({ width: 2400, height: 1600 })).toBe(2400);
    expect(sourceWidth({ width: 2400, height: 1350 })).toBe(2400);
  });
});

describe("photo schema", () => {
  const photo = {
    src: "/images/home/hero.webp",
    source: {
      site: "Unsplash",
      id: "photo-1610286986642-057ece0c3656",
      photographer: { name: "Ana", handle: "ana" },
    },
  };

  it("crops around the center unless told otherwise", () => {
    expect(photoSchema.parse(photo).focus).toEqual([0.5, 0.5]);
  });

  it("rejects an Unsplash page slug in place of the photo id", () => {
    expect(
      photoSchema.safeParse({
        ...photo,
        source: { ...photo.source, id: "a-brick-house-AbC123" },
      }).success,
    ).toBe(false);
  });

  it("rejects a focus outside the photo", () => {
    expect(photoSchema.safeParse({ ...photo, focus: [1.2, 0.5] }).success).toBe(
      false,
    );
  });
});

describe("photos", () => {
  it("takes each size from the content image it replaces", () => {
    const hero = photos.find(({ src }) => src === "/images/home/hero.webp");
    expect(hero).toMatchObject({ width: 2400, height: 1350 });
  });

  it("credits each photographer once, by name", () => {
    const urls = photoCredits.map((credit) => credit.url);
    expect(new Set(urls).size).toBe(urls.length);
    const names = photoCredits.map((credit) => credit.name);
    expect(names).toEqual(names.toSorted((a, b) => a.localeCompare(b)));
  });
});

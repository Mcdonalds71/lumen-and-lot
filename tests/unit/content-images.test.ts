import { fileURLToPath } from "node:url";

import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { contentImages as images } from "@/content/images";

const publicDirectory = new URL("../../public/", import.meta.url);

describe("content images", () => {
  it("gives every image slot its own file", () => {
    const sources = images.map((image) => image.src);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it.each(images.map((image) => [image.src, image] as const))(
    "%s exists at the size the content states",
    async (_, image) => {
      const file = fileURLToPath(new URL(`.${image.src}`, publicDirectory));
      const { width, height } = await sharp(file).metadata();
      expect({ width, height }).toEqual({
        width: image.width,
        height: image.height,
      });
    },
  );
});

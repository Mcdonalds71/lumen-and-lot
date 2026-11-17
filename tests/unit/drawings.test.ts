import { describe, expect, it } from "vitest";

import { daylightMedia } from "@/content/journal/media";
import { projects } from "@/content/projects";
import { plates } from "@/scripts/drawings/plates";

const drawingSlots = [
  ...projects.flatMap((project) =>
    project.drawings.map((drawing) => drawing.image),
  ),
  daylightMedia.section,
];

describe("drawings", () => {
  it("draws every drawing the content uses, and nothing else", () => {
    expect(Object.keys(plates).toSorted()).toEqual(
      drawingSlots.map((image) => image.src).toSorted(),
    );
  });

  it.each(drawingSlots.map((image) => [image.src, image] as const))(
    "%s keeps the proportions of its slot",
    (src, image) => {
      const plate = plates[src];
      expect(plate).toBeDefined();
      expect((plate?.width ?? 0) / (plate?.height ?? 1)).toBeCloseTo(
        image.width / image.height,
        2,
      );
    },
  );
});

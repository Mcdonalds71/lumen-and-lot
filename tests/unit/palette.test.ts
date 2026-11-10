import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { contrastRatio, minimumContrast } from "@/lib/contrast";

const tokens = readFileSync(
  new URL("../../app/styles/tokens.css", import.meta.url),
  "utf8",
);

function color(name: string): string {
  const match = new RegExp(`--color-${name}:\\s*(#[\\da-f]{6});`, "i").exec(
    tokens,
  );
  if (!match?.[1]) throw new Error(`Missing color token --color-${name}`);
  return match[1];
}

describe("palette", () => {
  it.each(["ink", "muted", "moss"])(
    "%s on paper is readable as body text",
    (name) => {
      expect(contrastRatio(color(name), color("paper"))).toBeGreaterThanOrEqual(
        minimumContrast.text,
      );
    },
  );

  it.each([
    ["clay", "paper"],
    ["clay", "ink"],
  ])(
    "%s on %s holds up for large text, focus rings and graphics",
    (foreground, background) => {
      expect(
        contrastRatio(color(foreground), color(background)),
      ).toBeGreaterThanOrEqual(minimumContrast.nonText);
    },
  );
});

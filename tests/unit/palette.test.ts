import { describe, expect, it } from "vitest";

import { contrastRatio, minimumContrast } from "@/lib/contrast";
import { requireToken } from "@/lib/design-tokens";

import { tokens } from "./support/tokens";

const color = (name: string) => requireToken(tokens, `color-${name}`);

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

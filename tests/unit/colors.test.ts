import { describe, expect, it } from "vitest";

import { colors } from "@/lib/colors";
import { requireToken } from "@/lib/design-tokens";

import { tokens } from "./support/tokens";

describe("color tokens for JavaScript", () => {
  it.each(Object.entries(colors))("%s matches its CSS token", (name, hex) => {
    expect(requireToken(tokens, `color-${name}`)).toBe(hex);
  });
});

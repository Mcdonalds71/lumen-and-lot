import { describe, expect, it } from "vitest";

import { requireToken } from "@/lib/design-tokens";
import { durations, easeOut } from "@/lib/motion";

import { tokens } from "./support/tokens";

describe("motion tokens", () => {
  it.each(Object.entries(durations))(
    "%s matches its CSS duration",
    (name, seconds) => {
      expect(requireToken(tokens, `duration-${name}`)).toBe(
        `${Math.round(seconds * 1000)}ms`,
      );
    },
  );

  it("uses the same easing curve as CSS", () => {
    expect(requireToken(tokens, "ease-out")).toBe(
      `cubic-bezier(${easeOut.join(", ")})`,
    );
  });
});

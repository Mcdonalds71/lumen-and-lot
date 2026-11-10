import { describe, expect, it } from "vitest";

import {
  colorTokens,
  parseClamp,
  parseRem,
  parseTokens,
  remToPx,
  requireToken,
  typeScale,
} from "@/lib/design-tokens";

import { tokens as siteTokens } from "./support/tokens";

const css = `
@theme static {
  --color-*: initial;
  --color-paper: #f4f1ea;
  --color-ink: #161513;

  --text-*: initial;
  --text-body: clamp(1rem, 0.978rem + 0.0939vw, 1.0625rem);
  --text-body--line-height: 1.6;
  --text-label: clamp(0.75rem, 0.728rem + 0.0939vw, 0.8125rem);
  --text-label--line-height: 1.3;
  --text-label--letter-spacing: 0.08em;
}
`;

const tokens = parseTokens(css);

describe("parseTokens", () => {
  it("reads custom property declarations", () => {
    expect(tokens.get("color-paper")).toBe("#f4f1ea");
    expect(tokens.get("text-label--letter-spacing")).toBe("0.08em");
  });

  it("skips namespace resets", () => {
    expect([...tokens.keys()].some((name) => name.includes("*"))).toBe(false);
  });
});

describe("requireToken", () => {
  it("throws for a missing token", () => {
    expect(() => requireToken(tokens, "color-clay")).toThrow(
      "Missing design token --color-clay.",
    );
  });
});

describe("parseClamp", () => {
  it("returns the minimum and maximum in rem", () => {
    expect(parseClamp("clamp(1.25rem, 5.5vw, 5rem)")).toEqual({
      min: 1.25,
      max: 5,
    });
  });

  it("rejects values that are not a rem clamp", () => {
    expect(() => parseClamp("1rem")).toThrow(RangeError);
  });
});

describe("parseRem", () => {
  it("reads a rem length", () => {
    expect(parseRem("110rem")).toBe(110);
  });

  it("rejects other units", () => {
    expect(() => parseRem("2px")).toThrow(RangeError);
  });
});

describe("remToPx", () => {
  it("converts at a 16px root", () => {
    expect(remToPx(3.5)).toBe(56);
  });
});

describe("colorTokens", () => {
  it("lists colors in declaration order", () => {
    expect(colorTokens(tokens)).toEqual([
      { name: "paper", value: "#f4f1ea" },
      { name: "ink", value: "#161513" },
    ]);
  });
});

describe("typeScale", () => {
  it("collects each step with its line height and tracking", () => {
    expect(typeScale(tokens)).toEqual([
      {
        name: "body",
        size: { min: 1, max: 1.0625 },
        lineHeight: 1.6,
        letterSpacing: "0",
      },
      {
        name: "label",
        size: { min: 0.75, max: 0.8125 },
        lineHeight: 1.3,
        letterSpacing: "0.08em",
      },
    ]);
  });

  it("parses every step in the site tokens with a size that grows", () => {
    const steps = typeScale(siteTokens);
    expect(steps.length).toBeGreaterThan(0);
    for (const { size } of steps) {
      expect(size.max).toBeGreaterThan(size.min);
    }
  });
});

import { describe, expect, it } from "vitest";

import {
  areaPreference,
  currencyPreference,
  preferenceDefaults,
  preferences,
  preferenceScript,
  preferenceStyles,
} from "@/lib/preferences";

type Storage = Record<string, string>;

function runScript(storage: Storage | "blocked") {
  const attributes: Record<string, string> = {};
  const document = {
    documentElement: {
      setAttribute: (name: string, value: string) => {
        attributes[name] = value;
      },
    },
  };
  const localStorage = {
    getItem: (key: string) => {
      if (storage === "blocked") throw new Error("Storage is blocked");
      return storage[key] ?? null;
    },
  };
  new Function("document", "localStorage", preferenceScript(preferences))(
    document,
    localStorage,
  );
  return attributes;
}

describe("parse", () => {
  it("accepts known values and falls back otherwise", () => {
    expect(areaPreference.parse("ft2")).toBe("ft2");
    expect(areaPreference.parse("acres")).toBe("m2");
    expect(currencyPreference.parse(null)).toBe("local");
    expect(currencyPreference.parse("GBP")).toBe("GBP");
  });
});

describe("preferenceDefaults", () => {
  it("maps each attribute to its fallback", () => {
    expect(preferenceDefaults(preferences)).toEqual({
      "data-area": "m2",
      "data-currency": "local",
      "data-residence-view": "grid",
    });
  });
});

describe("preferenceScript", () => {
  it("copies stored preferences onto the root element", () => {
    expect(
      runScript({
        "lumen-and-lot:area": "ft2",
        "lumen-and-lot:currency": "EUR",
        "lumen-and-lot:residence-view": "list",
      }),
    ).toEqual({
      "data-area": "ft2",
      "data-currency": "EUR",
      "data-residence-view": "list",
    });
  });

  it("ignores values it does not know", () => {
    expect(runScript({ "lumen-and-lot:currency": "BTC" })).toEqual({});
  });

  it("does nothing when storage is unavailable", () => {
    expect(runScript("blocked")).toEqual({});
  });
});

describe("preferenceStyles", () => {
  it("hides every option that does not match its preference", () => {
    const css = preferenceStyles(preferences);
    for (const { attribute, optionAttribute, values } of preferences) {
      for (const value of values) {
        expect(css).toContain(
          `:root:not([${attribute}="${value}"]) [${optionAttribute}="${value}"]`,
        );
      }
    }
    expect(css.endsWith("{display:none}")).toBe(true);
  });
});

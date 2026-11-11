import { describe, expect, it } from "vitest";

import {
  convert,
  displayPrice,
  type ExchangeRates,
  formatMoney,
  roundToSignificant,
} from "@/lib/currency";

const rates: ExchangeRates = {
  source: "Test rates",
  asOf: "2026-11-10",
  base: "EUR",
  perBase: { EUR: 1, USD: 1.1214, CAD: 1.5852, GBP: 0.83545, DKK: 7.4754 },
};

describe("convert", () => {
  it("returns the same money when the currency already matches", () => {
    const price = { amount: 1_250_000, currency: "EUR" } as const;
    expect(convert(price, "EUR", rates)).toBe(price);
  });

  it("converts from the base currency", () => {
    const { amount, currency } = convert(
      { amount: 1000, currency: "EUR" },
      "USD",
      rates,
    );
    expect(currency).toBe("USD");
    expect(amount).toBeCloseTo(1121.4, 6);
  });

  it("converts between two other currencies through the base", () => {
    const { amount } = convert(
      { amount: 7475.4, currency: "DKK" },
      "CAD",
      rates,
    );
    expect(amount).toBeCloseTo(1585.2, 6);
  });
});

describe("roundToSignificant", () => {
  it.each([
    [1_334_567, 1_330_000],
    [987_654, 988_000],
    [1_895_000, 1_900_000],
    [0, 0],
  ])("rounds %i to %i", (value, expected) => {
    expect(roundToSignificant(value)).toBe(expected);
  });
});

describe("formatMoney", () => {
  it.each([
    [{ amount: 1_330_000, currency: "USD" }, "$1,330,000"],
    [{ amount: 1_395_000, currency: "CAD" }, "CA$1,395,000"],
    [{ amount: 1_250_000, currency: "EUR" }, "€1,250,000"],
    [{ amount: 980, currency: "GBP" }, "£980"],
    [{ amount: 7_950_000, currency: "DKK" }, "DKK 7,950,000"],
  ] as const)("formats %o as %s", (money, expected) => {
    expect(formatMoney(money)).toBe(expected);
  });
});

describe("displayPrice", () => {
  const price = { amount: 7_950_000, currency: "DKK" } as const;

  it("keeps the local price", () => {
    expect(displayPrice(price, "local", rates)).toEqual({
      money: price,
      converted: false,
    });
  });

  it("converts and rounds to three significant figures", () => {
    expect(displayPrice(price, "USD", rates)).toEqual({
      money: { amount: 1_190_000, currency: "USD" },
      converted: true,
    });
  });

  it("does not mark a price as converted when it is already in that currency", () => {
    const euros = { amount: 1_250_000, currency: "EUR" } as const;
    expect(displayPrice(euros, "EUR", rates).converted).toBe(false);
  });
});

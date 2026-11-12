import { numberFormat } from "./number-format";

export const currencies = ["CAD", "DKK", "EUR", "GBP", "USD"] as const;

export type Currency = (typeof currencies)[number];

export const displayCurrencies = ["USD", "CAD", "EUR", "GBP"] as const;

export type CurrencyPreference = "local" | (typeof displayCurrencies)[number];

export type Money = { amount: number; currency: Currency };

export type ExchangeRates = {
  source: string;
  asOf: string;
  base: Currency;
  perBase: Readonly<Record<Currency, number>>;
};

export type DisplayPrice = { money: Money; converted: boolean };

export function convert(
  money: Money,
  to: Currency,
  rates: ExchangeRates,
): Money {
  if (money.currency === to) return money;
  const inBase = money.amount / rates.perBase[money.currency];
  return { amount: inBase * rates.perBase[to], currency: to };
}

export function roundToSignificant(value: number, digits = 3): number {
  if (value === 0) return 0;
  const step = 10 ** (Math.floor(Math.log10(Math.abs(value))) - digits + 1);
  return Math.round(value / step) * step;
}

export function displayPrice(
  price: Money,
  preference: CurrencyPreference,
  rates: ExchangeRates,
): DisplayPrice {
  if (preference === "local" || preference === price.currency) {
    return { money: price, converted: false };
  }
  const converted = convert(price, preference, rates);
  return {
    money: { ...converted, amount: roundToSignificant(converted.amount) },
    converted: true,
  };
}

export function formatMoney({ amount, currency }: Money): string {
  return numberFormat({
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

import type { ExchangeRates } from "@/lib/currency";

import { ratesSchema } from "./schemas/rates";

export const rates: ExchangeRates = ratesSchema.parse({
  source: "European Central Bank euro reference rates",
  asOf: "2026-11-10",
  base: "EUR",
  perBase: {
    EUR: 1,
    USD: 1.1214,
    CAD: 1.5852,
    GBP: 0.83545,
    DKK: 7.4754,
  },
});

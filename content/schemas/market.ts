import { z } from "zod";

import { currencies } from "@/lib/currency";

import { energySystems } from "./energy-label";

export const marketIds = [
  "toronto",
  "hudson-valley",
  "copenhagen",
  "lisbon",
] as const;

export type MarketId = (typeof marketIds)[number];

function isTimeZone(zone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: zone });
    return true;
  } catch {
    return false;
  }
}

const marketSchema = z.object({
  name: z.string().min(1),
  region: z.string().min(1).optional(),
  country: z.string().min(1),
  timeZone: z.string().refine(isTimeZone, "Use an IANA time zone."),
  currency: z.enum(currencies),
  energySystem: z.enum(energySystems),
});

export const marketsSchema = z.record(z.enum(marketIds), marketSchema);

export type Market = z.infer<typeof marketSchema> & { id: MarketId };

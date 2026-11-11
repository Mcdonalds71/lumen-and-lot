import { type Market, marketIds, marketsSchema } from "./schemas/market";

export const markets = marketsSchema.parse({
  toronto: {
    name: "Toronto",
    region: "Ontario",
    country: "Canada",
    timeZone: "America/Toronto",
    currency: "CAD",
    energySystem: "EnerGuide",
  },
  "hudson-valley": {
    name: "Hudson Valley",
    region: "New York",
    country: "United States",
    timeZone: "America/New_York",
    currency: "USD",
    energySystem: "HERS Index",
  },
  copenhagen: {
    name: "Copenhagen",
    country: "Denmark",
    timeZone: "Europe/Copenhagen",
    currency: "DKK",
    energySystem: "Energimærke",
  },
  lisbon: {
    name: "Lisbon",
    country: "Portugal",
    timeZone: "Europe/Lisbon",
    currency: "EUR",
    energySystem: "Certificado Energético",
  },
});

export const marketList: readonly Market[] = marketIds.map((id) => ({
  id,
  ...markets[id],
}));

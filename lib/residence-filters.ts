export type ResidenceFilters = {
  market?: string;
  minBedrooms?: number;
  status?: string;
};

type FilterableHome = { market: string; bedrooms: number; status: string };

export function matchesFilters(
  home: FilterableHome,
  { market, minBedrooms, status }: ResidenceFilters,
): boolean {
  return (
    (market === undefined || home.market === market) &&
    (minBedrooms === undefined || home.bedrooms >= minBedrooms) &&
    (status === undefined || home.status === status)
  );
}

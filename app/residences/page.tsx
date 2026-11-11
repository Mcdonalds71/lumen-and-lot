import type { Metadata } from "next";

import { RatesNote } from "@/components/preferences/rates-note";
import { ResidenceBrowser } from "@/components/residences/residence-browser";
import { ResidenceCard } from "@/components/residences/residence-card";
import { ResidenceRow } from "@/components/residences/residence-row";
import { statusLabels } from "@/components/residences/residence-status";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { marketList } from "@/content/markets";
import { residences } from "@/content/residences";
import { statuses } from "@/content/schemas/residence";

export const metadata: Metadata = {
  title: "Residences",
  description:
    "Homes for sale in Toronto, the Hudson Valley, Copenhagen and Lisbon.",
};

export default function ResidencesPage() {
  const entries = residences.map((residence) => ({
    slug: residence.slug,
    market: residence.market.id,
    bedrooms: residence.bedrooms,
    status: residence.status,
    card: <ResidenceCard residence={residence} />,
    row: <ResidenceRow residence={residence} />,
  }));

  return (
    <Container className="pt-16 md:pt-24">
      <Label as="p">Residences</Label>
      <Grid className="mt-6 gap-y-8">
        <h1 className="col-span-12 font-display text-display-xl lg:col-span-8">
          Homes in four cities
        </h1>
        <p className="col-span-12 text-lead md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          Small homes in Toronto, the Hudson Valley, Copenhagen and Lisbon, each
          designed, built and furnished by the studio.
        </p>
      </Grid>
      <div className="mt-16 md:mt-24">
        <ResidenceBrowser
          entries={entries}
          cities={marketList.map((market) => ({
            value: market.id,
            label: market.name,
          }))}
          statuses={statuses.map((status) => ({
            value: status,
            label: statusLabels[status],
          }))}
        />
      </div>
      <RatesNote className="mt-16 max-w-xl" />
    </Container>
  );
}

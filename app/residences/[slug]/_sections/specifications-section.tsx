import { Area } from "@/components/preferences/area";
import { Price } from "@/components/preferences/price";
import { EnergyCard } from "@/components/residences/energy-card";
import { ResidenceStatus } from "@/components/residences/residence-status";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import type { Residence } from "@/content/schemas/residence";
import { windowDirections } from "@/lib/sun";
import { formatLongDate } from "@/lib/time";

export function SpecificationsSection({ residence }: { residence: Residence }) {
  const { floorPlan } = residence;
  const living = floorPlan.rooms.find((room) => room.kind === "living");
  const livingFaces = living
    ? windowDirections(living, floorPlan.northRotation)
    : [];
  const specifications = [
    { term: "Bedrooms", detail: residence.bedrooms },
    { term: "Bathrooms", detail: residence.bathrooms },
    { term: "Interior area", detail: <Area squareMeters={residence.areaM2} /> },
    { term: "Rooms on the plan", detail: floorPlan.rooms.length },
    {
      term: "Living room faces",
      detail: livingFaces.length > 0 ? livingFaces.join(" and ") : "No windows",
    },
    {
      term: "Neighborhood",
      detail: `${residence.locality}, ${residence.market.name}`,
    },
    { term: "Country", detail: residence.market.country },
    { term: "Listed", detail: formatLongDate(residence.listedOn) },
    { term: "Status", detail: <ResidenceStatus status={residence.status} /> },
    { term: "Indicative price", detail: <Price price={residence.price} /> },
  ];

  return (
    <Section index={3} label="Specifications">
      <Grid className="mt-10 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <h2 className="font-display text-display-lg">The details</h2>
          <dl className="mt-10 grid sm:grid-cols-2 sm:gap-x-10">
            {specifications.map(({ term, detail }) => (
              <div
                key={term}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
              >
                <dt className="text-small text-muted">{term}</dt>
                <dd className="text-right first-letter:uppercase">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9">
          <EnergyCard label={residence.energyLabel} />
        </div>
      </Grid>
    </Section>
  );
}

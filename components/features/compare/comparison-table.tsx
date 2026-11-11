import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { marchEquinox } from "@/components/features/daylight/days";
import { Area } from "@/components/preferences/area";
import { Price } from "@/components/preferences/price";
import { describeEnergyLabel } from "@/components/residences/energy-card";
import { ResidenceStatus } from "@/components/residences/residence-status";
import { Label } from "@/components/ui/label";
import { coverImage, livingRoomSunlight } from "@/content/residences";
import type { Residence } from "@/content/schemas/residence";
import { windowDirections } from "@/lib/sun";
import { formatDuration } from "@/lib/time";

import { RemoveHomeButton } from "./remove-home-button";

type Row = { label: string; cell: (residence: Residence) => ReactNode };

function LivingRoomSun({ residence }: { residence: Residence }) {
  const sunlight = livingRoomSunlight(residence, marchEquinox);
  const living = residence.floorPlan.rooms.find(
    (room) => room.kind === "living",
  );
  const faces = living
    ? windowDirections(living, residence.floorPlan.northRotation)
    : [];
  return (
    <>
      {sunlight && sunlight.minutes > 0
        ? formatDuration(sunlight.minutes)
        : "None"}
      {faces.length > 0 && (
        <span className="block text-small text-muted">
          Windows face {faces.join(" and ")}
        </span>
      )}
    </>
  );
}

const rows: readonly Row[] = [
  {
    label: "Location",
    cell: (residence) => `${residence.locality}, ${residence.market.name}`,
  },
  {
    label: "Status",
    cell: (residence) => <ResidenceStatus status={residence.status} />,
  },
  {
    label: "Area",
    cell: (residence) => <Area squareMeters={residence.areaM2} />,
  },
  { label: "Bedrooms", cell: (residence) => residence.bedrooms },
  { label: "Bathrooms", cell: (residence) => residence.bathrooms },
  {
    label: "Living room sun on the March equinox",
    cell: (residence) => <LivingRoomSun residence={residence} />,
  },
  {
    label: "Energy label",
    cell: (residence) => (
      <>
        {describeEnergyLabel(residence.energyLabel).value}
        <span className="block text-small text-muted">
          {residence.energyLabel.system}
        </span>
      </>
    ),
  },
  {
    label: "Indicative price",
    cell: (residence) => <Price price={residence.price} />,
  },
];

export function ComparisonTable({
  residences,
}: {
  residences: readonly Residence[];
}) {
  const slugs = residences.map((residence) => residence.slug);

  return (
    <div
      role="region"
      aria-label="Homes side by side"
      tabIndex={0}
      className="relative overflow-x-auto"
    >
      <table className="w-full min-w-[42rem] table-fixed text-left">
        <caption className="sr-only">Homes side by side</caption>
        <thead>
          <tr>
            <td className="w-40 md:w-56" />
            {residences.map((residence) => {
              const image = coverImage(residence);
              return (
                <th
                  key={residence.slug}
                  scope="col"
                  className="px-gutter pb-6 align-top font-normal"
                >
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt=""
                    sizes="(min-width: 64rem) 25vw, 15rem"
                    className="h-auto w-full"
                  />
                  <Link
                    href={`/residences/${residence.slug}`}
                    className="mt-4 inline-block link-reveal font-display text-title"
                  >
                    {residence.name}
                  </Link>
                  <div className="mt-2">
                    <RemoveHomeButton
                      slug={residence.slug}
                      name={residence.name}
                      slugs={slugs}
                    />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, cell }) => (
            <tr key={label} className="border-t border-rule align-top">
              <th
                scope="row"
                className="sticky left-0 bg-paper py-4 pr-4 font-normal"
              >
                <Label>{label}</Label>
              </th>
              {residences.map((residence) => (
                <td key={residence.slug} className="px-gutter py-4">
                  {cell(residence)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

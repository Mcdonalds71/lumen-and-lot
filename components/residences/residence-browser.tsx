"use client";

import { Fragment, type ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Select, type SelectOption } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import type { Status } from "@/content/schemas/residence";
import { usePreference } from "@/hooks/use-preference";
import { cx } from "@/lib/cx";
import { formatCount } from "@/lib/format";
import { residenceViewPreference } from "@/lib/preferences";
import { matchesFilters } from "@/lib/residence-filters";

import { residenceColumns } from "./residence-row";

export type ResidenceEntry = {
  slug: string;
  market: string;
  bedrooms: number;
  status: Status;
  card: ReactNode;
  row: ReactNode;
};

const any = "any";

const bedroomOptions: SelectOption<string>[] = [
  { value: any, label: "Any" },
  ...[1, 2, 3].map((count) => ({ value: String(count), label: `${count}+` })),
];

const viewOptions = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
] as const;

const unfiltered = { city: any, bedrooms: any, status: any };

const optionAttribute = residenceViewPreference.optionAttribute;

type ResidenceBrowserProps = {
  entries: readonly ResidenceEntry[];
  cities: readonly SelectOption<string>[];
  statuses: readonly SelectOption<string>[];
};

export function ResidenceBrowser({
  entries,
  cities,
  statuses,
}: ResidenceBrowserProps) {
  const cityOptions = [{ value: any, label: "All cities" }, ...cities];
  const statusOptions = [{ value: any, label: "Any" }, ...statuses];
  const [choice, setChoice] = useState(unfiltered);
  const [view, setView] = usePreference(residenceViewPreference);
  const shown = entries.filter((entry) =>
    matchesFilters(entry, {
      market: choice.city === any ? undefined : choice.city,
      minBedrooms:
        choice.bedrooms === any ? undefined : Number(choice.bedrooms),
      status: choice.status === any ? undefined : choice.status,
    }),
  );
  const filtered = shown.length < entries.length;

  return (
    <div>
      <div className="grid grid-cols-2 items-start gap-x-gutter gap-y-6 border-y border-rule py-6 md:grid-cols-4 lg:flex lg:gap-x-8">
        <Select
          label="City"
          options={cityOptions}
          value={choice.city}
          onChange={(city) => setChoice({ ...choice, city })}
          className="col-span-2 md:col-span-1 lg:w-52"
        />
        <Select
          label="Bedrooms"
          options={bedroomOptions}
          value={choice.bedrooms}
          onChange={(bedrooms) => setChoice({ ...choice, bedrooms })}
          className="lg:w-36"
        />
        <Select
          label="Status"
          options={statusOptions}
          value={choice.status}
          onChange={(status) => setChoice({ ...choice, status })}
          className="lg:w-40"
        />
        <Toggle
          label="View"
          layout="stacked"
          options={viewOptions}
          value={view}
          onChange={setView}
          className="col-span-2 md:col-span-1 lg:ml-auto"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
        <p role="status" className="text-small text-muted">
          {filtered
            ? `Showing ${shown.length} of ${formatCount(entries.length, "home")}.`
            : `Showing all ${formatCount(entries.length, "home")}.`}
        </p>
        {filtered && (
          <Button variant="text" onClick={() => setChoice(unfiltered)}>
            Clear filters
          </Button>
        )}
      </div>

      {shown.length === 0 ? (
        <p className="mt-16 max-w-xl font-display text-display-sm">
          No homes match these filters. Try another city or fewer bedrooms.
        </p>
      ) : (
        <>
          <ul
            {...{ [optionAttribute]: "grid" }}
            className="mt-12 grid gap-x-gutter gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {shown.map((entry) => (
              <li key={entry.slug}>{entry.card}</li>
            ))}
          </ul>
          <table
            {...{ [optionAttribute]: "list" }}
            className="mt-12 w-full text-left"
          >
            <caption className="sr-only">Residences</caption>
            <thead>
              <tr className="border-b border-ink">
                {Object.values(residenceColumns).map(
                  ({ heading, className }) => (
                    <th
                      key={heading}
                      scope="col"
                      className={cx(
                        "pb-3 font-mono text-label font-normal text-muted uppercase",
                        className,
                      )}
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {shown.map((entry) => (
                <Fragment key={entry.slug}>{entry.row}</Fragment>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

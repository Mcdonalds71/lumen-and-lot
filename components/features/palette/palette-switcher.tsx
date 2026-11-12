"use client";

import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import type { PaletteRoom } from "@/content/residences";
import type { Palette, PaletteId } from "@/content/schemas/palette";
import { useSearchParam } from "@/hooks/use-search-param";

import { PaletteFigure } from "./palette-figure";
import { PalettePicker } from "./palette-picker";

type PaletteSwitcherProps = {
  palettes: readonly Palette[];
  rooms: readonly PaletteRoom[];
  initialPalette: PaletteId;
};

export function PaletteSwitcher({
  palettes,
  rooms,
  initialPalette,
}: PaletteSwitcherProps) {
  const requested = useSearchParam("palette");
  const [chosen, setChosen] = useState<PaletteId | null>(null);
  const selected =
    chosen ??
    palettes.find((candidate) => candidate.id === requested)?.id ??
    initialPalette;
  const [loadAll, setLoadAll] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const palette = palettes.find((candidate) => candidate.id === selected);
  if (!palette) return null;

  const choose = (id: PaletteId) => {
    setChosen(id);
    setAnnouncement(
      `Showing the ${palettes.find((candidate) => candidate.id === id)?.name} palette.`,
    );
    const url = new URL(window.location.href);
    url.searchParams.set("palette", id);
    window.history.replaceState(null, "", url);
  };

  return (
    <Grid className="mt-10 gap-y-12 lg:gap-y-10">
      <h2 className="col-span-12 font-display text-display-lg lg:col-span-7">
        Finishes
      </h2>
      <p className="col-span-12 text-lead md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
        One home in three palettes. Choose one to see the rooms and the finishes
        that come with it.
      </p>

      <div
        onPointerEnter={() => setLoadAll(true)}
        onFocus={() => setLoadAll(true)}
        className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-6"
      >
        <PalettePicker palettes={palettes} value={selected} onChange={choose} />
      </div>

      <div className="col-span-12 grid grid-cols-2 gap-gutter lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:mt-6">
        {rooms.map((room) => (
          <PaletteFigure
            key={room.id}
            room={room}
            palette={selected}
            paletteName={palette.name}
            loadAll={loadAll}
          />
        ))}
      </div>

      <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:row-start-3">
        <p className="text-small">{palette.summary}</p>
        <dl className="mt-6 border-t border-rule">
          {palette.materials.map(({ use, name }) => (
            <div
              key={use}
              className="flex items-baseline justify-between gap-6 border-b border-rule py-3"
            >
              <dt className="text-small text-muted">{use}</dt>
              <dd className="text-right">{name}</dd>
            </div>
          ))}
        </dl>
        <ButtonLink
          href={`/interiors#${palette.id}`}
          variant="text"
          className="mt-8"
        >
          See the {palette.name} lookbook
        </ButtonLink>
        <p role="status" className="sr-only">
          {announcement}
        </p>
      </div>
    </Grid>
  );
}

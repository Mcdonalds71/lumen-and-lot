import { ItemDetails } from "@/components/features/shop-the-room/item-details";
import { LookbookItems } from "@/components/features/shop-the-room/lookbook-items";
import { ShopTheRoom } from "@/components/features/shop-the-room/shop-the-room";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { findPalette } from "@/content/palettes";
import type { Lookbook } from "@/content/schemas/lookbook";

type LookbookSectionProps = { index: number; lookbook: Lookbook };

export function LookbookSection({ index, lookbook }: LookbookSectionProps) {
  const palette = findPalette(lookbook.palette);
  const items = lookbook.hotspots.map((hotspot) => ({
    id: hotspot.id,
    name: hotspot.item,
    x: hotspot.x,
    y: hotspot.y,
    details: <ItemDetails item={hotspot} />,
  }));

  return (
    <Section
      id={lookbook.palette}
      index={index}
      label={lookbook.room}
      className="scroll-mt-header"
    >
      <Grid className="mt-10 gap-y-8">
        <h2 className="col-span-12 font-display text-display-lg lg:col-span-6">
          {lookbook.title}
        </h2>
        <div className="col-span-12 md:col-span-8 lg:col-span-5 lg:col-start-8">
          <p className="text-lead">{lookbook.intro}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-gutter gap-y-3">
            {palette.swatches.map((swatch) => (
              <li
                key={swatch.role}
                className="flex items-center gap-3 text-small"
              >
                <span
                  aria-hidden
                  className="size-5 shrink-0 border border-ink/15"
                  style={{ backgroundColor: swatch.color }}
                />
                {swatch.name}
              </li>
            ))}
          </ul>
        </div>
      </Grid>
      <div className="mt-12">
        <ShopTheRoom image={lookbook.image} items={items} />
      </div>
      <div className="mt-12">
        <LookbookItems room={lookbook.room} items={lookbook.hotspots} />
      </div>
    </Section>
  );
}

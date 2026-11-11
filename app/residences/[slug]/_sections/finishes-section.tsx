import { PaletteSwitcher } from "@/components/features/palette/palette-switcher";
import { Section } from "@/components/ui/section";
import { palettes } from "@/content/palettes";
import { paletteRooms } from "@/content/residences";
import type { PaletteId } from "@/content/schemas/palette";
import type { Residence } from "@/content/schemas/residence";

type FinishesSectionProps = { residence: Residence; palette: PaletteId };

export function FinishesSection({ residence, palette }: FinishesSectionProps) {
  return (
    <Section index={2} label="Finishes">
      <PaletteSwitcher
        palettes={palettes}
        rooms={paletteRooms(residence)}
        initialPalette={palette}
      />
    </Section>
  );
}

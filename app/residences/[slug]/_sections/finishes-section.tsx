import { PaletteSwitcher } from "@/components/features/palette/palette-switcher";
import { Section } from "@/components/ui/section";
import { defaultPaletteId, palettes } from "@/content/palettes";
import { paletteRooms } from "@/content/residences";
import type { Residence } from "@/content/schemas/residence";

export function FinishesSection({ residence }: { residence: Residence }) {
  return (
    <Section index={2} label="Finishes">
      <PaletteSwitcher
        palettes={palettes}
        rooms={paletteRooms(residence)}
        initialPalette={defaultPaletteId}
      />
    </Section>
  );
}

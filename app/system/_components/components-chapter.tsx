import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Marquee } from "@/components/ui/marquee";
import { RevealImage } from "@/components/ui/reveal-image";
import { Rule } from "@/components/ui/rule";
import courtyard from "@/public/images/placeholders/courtyard.webp";
import northLight from "@/public/images/placeholders/north-light.webp";

import { Chapter, type ChapterProps } from "./chapter";
import { DrawerDemo } from "./drawer-demo";
import { InputsDemo } from "./inputs-demo";
import { Plate } from "./plate";
import { ToggleDemo } from "./toggle-demo";

const cities = ["Toronto", "Hudson Valley", "Copenhagen", "Lisbon"] as const;

const buttons = [
  { variant: "solid", label: "View residences" },
  { variant: "outline", label: "Compare homes" },
  { variant: "text", label: "Read the journal" },
] as const;

export function ComponentsChapter({ meta }: ChapterProps) {
  return (
    <Chapter
      meta={meta}
      title="The parts"
      intro="The primitives every page is assembled from. Each one works with a keyboard and respects reduced motion."
    >
      <div className="space-y-24">
        <Plate
          number={1}
          title="Buttons"
          caption="Solid, outline and text. Hover for each state, press Tab to see focus. The second row is disabled."
        >
          <div className="space-y-8">
            {[false, true].map((disabled) => (
              <div
                key={String(disabled)}
                className="flex flex-wrap items-center gap-x-8 gap-y-5"
              >
                {buttons.map(({ variant, label }) => (
                  <Button key={variant} variant={variant} disabled={disabled}>
                    {label}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </Plate>

        <Plate
          number={2}
          title="Toggles"
          caption="A segmented control built on native radio buttons, with its label inline or stacked. Arrow keys move the selection."
        >
          <ToggleDemo />
        </Plate>

        <Plate
          number={3}
          title="Select, slider"
          caption="A native select and a native range input, styled with hairlines. Both keep the browser's own keyboard and screen reader behavior."
        >
          <InputsDemo />
        </Plate>

        <Plate
          number={4}
          title="Labels, rules"
          caption="Mono labels in muted and ink, with hairline rules in rule and ink."
        >
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-6">
              <Label>Muted label</Label>
              <Rule orientation="vertical" />
              <Label tone="ink">Ink label</Label>
              <Rule orientation="vertical" />
              <Label>01 — Residences</Label>
            </div>
            <Rule />
            <Rule tone="ink" />
          </div>
        </Plate>

        <Plate
          number={5}
          title="Marquee"
          caption="Pauses on hover, when it leaves the screen, or with its button. It stands still when reduced motion is on."
        >
          <Marquee label="cities">
            {cities.map((city) => (
              <span
                key={city}
                className="flex items-center gap-10 pr-10 font-display text-display-md"
              >
                {city}
                <span aria-hidden className="size-3 bg-clay" />
              </span>
            ))}
          </Marquee>
        </Plate>

        <Plate
          number={6}
          title="Images"
          caption="Each image is wiped in once as it enters the view, then scales slowly on hover. Both are placeholders until photography arrives."
        >
          <div className="grid grid-cols-12 items-end gap-x-gutter gap-y-10">
            <RevealImage
              src={northLight}
              alt="Placeholder: a tall window above an oak floor, with a patch of sun"
              sizes="(min-width: 64rem) 28vw, (min-width: 40rem) 45vw, 100vw"
              className="col-span-12 sm:col-span-5"
            />
            <RevealImage
              src={courtyard}
              alt="Placeholder: a shaded courtyard wall beside a dark doorway"
              sizes="(min-width: 64rem) 40vw, (min-width: 40rem) 60vw, 100vw"
              className="col-span-12 sm:col-span-7"
            />
          </div>
        </Plate>

        <Plate
          number={7}
          title="Drawer"
          caption="A native dialog. Escape or a click outside closes it, and focus returns to the button."
        >
          <DrawerDemo />
        </Plate>
      </div>
    </Chapter>
  );
}

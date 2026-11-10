import { Label } from "@/components/ui/label";
import { cx } from "@/lib/cx";
import { typeScale } from "@/lib/design-tokens";

import { Chapter, type ChapterProps } from "./chapter";
import { formatPixelRange } from "../_lib/format";
import { specimenRow } from "../_lib/layout";

type Specimen = { className: string; text: string };

const specimens: Readonly<Record<string, Specimen>> = {
  "display-xl": {
    className: "font-display text-display-xl",
    text: "Lumen & Lot",
  },
  "display-lg": {
    className: "font-display text-display-lg",
    text: "Rooms that follow the sun",
  },
  "display-md": {
    className: "font-display text-display-md",
    text: "Built for the light we have",
  },
  "display-sm": {
    className: "font-display text-display-sm",
    text: "A small house in Nordhavn",
  },
  title: {
    className: "text-title font-medium",
    text: "Daylight, measured room by room",
  },
  lead: {
    className: "text-lead",
    text: "Small residential developments in Toronto, the Hudson Valley, Copenhagen and Lisbon.",
  },
  body: {
    className: "max-w-prose text-body",
    text: "Every home is planned around its windows. We trace the path of the sun through each room before we draw a wall.",
  },
  small: {
    className: "text-small",
    text: "Indicative price, converted at fixed rates.",
  },
  caption: {
    className: "text-caption text-muted",
    text: "Fig. 3 — North light in a Vesterbro kitchen.",
  },
  label: {
    className: "font-mono text-label text-muted uppercase",
    text: "01 — Residences",
  },
};

function specimenOf(name: string): Specimen {
  const specimen = specimens[name];
  if (!specimen) {
    throw new Error(`Add a specimen for --text-${name} on the system page.`);
  }
  return specimen;
}

export function TypeChapter({ meta, tokens }: ChapterProps) {
  return (
    <Chapter
      meta={meta}
      title="Three typefaces, ten sizes"
      intro="Instrument Serif for display, Inter Tight for reading and Geist Mono for labels. Every size scales smoothly between a phone and a wide screen."
    >
      <ol className="border-t border-rule">
        {typeScale(tokens).map((step) => {
          const specimen = specimenOf(step.name);
          return (
            <li
              key={step.name}
              className={cx(specimenRow, "border-b border-rule py-8")}
            >
              <div>
                <Label as="p" tone="ink">
                  {step.name}
                </Label>
                <p className="mt-2 text-caption text-muted">
                  {formatPixelRange(step.size)} px · Leading {step.lineHeight} ·
                  Tracking {step.letterSpacing}
                </p>
              </div>
              <p className={specimen.className}>{specimen.text}</p>
            </li>
          );
        })}
      </ol>
    </Chapter>
  );
}

import { Grid } from "@/components/ui/grid";
import {
  parseClamp,
  parseRem,
  remToPx,
  requireToken,
} from "@/lib/design-tokens";

import { Chapter, type ChapterProps } from "./chapter";
import { formatPixelRange } from "../_lib/format";

export function LayoutChapter({ meta, tokens }: ChapterProps) {
  const margin = parseClamp(requireToken(tokens, "spacing-margin"));
  const gutter = parseClamp(requireToken(tokens, "spacing-gutter"));
  const pageWidth = remToPx(parseRem(requireToken(tokens, "container-page")));

  const specs = [
    { term: "Columns", detail: "12 at every width" },
    { term: "Margin", detail: `${formatPixelRange(margin)} px` },
    { term: "Gutter", detail: `${formatPixelRange(gutter)} px` },
    { term: "Page width", detail: `Up to ${pageWidth} px` },
    {
      term: "Rules",
      detail: `${requireToken(tokens, "hairline")} hairlines, never shadows`,
    },
    {
      term: "Corners",
      detail: `Square, ${requireToken(tokens, "radius-input")} on inputs`,
    },
  ];

  return (
    <Chapter
      meta={meta}
      title="Twelve columns, wide margins"
      intro="A 12-column grid with margins that widen with the screen. Hairline rules separate things, so there are no cards and no shadows."
    >
      <Grid aria-hidden className="h-44 md:h-56">
        {Array.from({ length: 12 }, (_, column) => (
          <div
            key={column}
            className="flex items-end bg-clay/10 p-2 font-mono text-label text-ink"
          >
            {column + 1}
          </div>
        ))}
      </Grid>
      <dl className="mt-12 grid gap-x-gutter border-t border-rule sm:grid-cols-2">
        {specs.map(({ term, detail }) => (
          <div
            key={term}
            className="flex justify-between gap-6 border-b border-rule py-3 text-small"
          >
            <dt className="text-muted">{term}</dt>
            <dd className="text-right">{detail}</dd>
          </div>
        ))}
      </dl>
    </Chapter>
  );
}

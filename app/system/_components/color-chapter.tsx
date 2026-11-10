import { Label } from "@/components/ui/label";
import {
  type ContrastLevel,
  contrastLevel,
  contrastRatio,
} from "@/lib/contrast";
import { colorTokens, requireToken } from "@/lib/design-tokens";

import { Chapter, type ChapterProps } from "./chapter";

const roles: Readonly<Record<string, string>> = {
  paper: "The page itself. Every surface starts here.",
  ink: "Text, headings and solid buttons.",
  muted: "Secondary text and control borders, on paper only.",
  clay: "Sunlight, large type and graphics. Never small text.",
  moss: "Hover states and quiet accents.",
  rule: "Hairlines between things. Decoration only.",
};

const levels: Record<ContrastLevel, string> = {
  text: "Body text",
  "large-text": "Large text, graphics",
  decorative: "Decoration only",
};

const grounds = ["paper", "ink"] as const;

function roleOf(name: string): string {
  const role = roles[name];
  if (!role) {
    throw new Error(`Describe --color-${name} on the system page.`);
  }
  return role;
}

export function ColorChapter({ meta, tokens }: ChapterProps) {
  return (
    <Chapter
      meta={meta}
      title="Six colors, one paper"
      intro="A warm paper, an ink that is nearly black, and four colors taken from building materials. Every ratio is measured against paper and ink."
    >
      <ul className="grid grid-cols-1 gap-x-gutter gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
        {colorTokens(tokens).map(({ name, value }) => (
          <li key={name}>
            <div
              aria-hidden
              className="aspect-4/5 border border-rule"
              style={{ backgroundColor: `var(--color-${name})` }}
            />
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="text-title font-medium capitalize">{name}</h3>
              <Label>{value}</Label>
            </div>
            <p className="mt-2 text-small text-muted">{roleOf(name)}</p>
            <dl className="mt-5 border-t border-rule text-caption">
              {grounds
                .filter((ground) => ground !== name)
                .map((ground) => {
                  const ratio = contrastRatio(
                    value,
                    requireToken(tokens, `color-${ground}`),
                  );
                  return (
                    <div
                      key={ground}
                      className="flex justify-between gap-4 border-b border-rule py-2"
                    >
                      <dt className="text-muted">On {ground}</dt>
                      <dd className="tabular-nums">
                        {ratio.toFixed(1)}:1 · {levels[contrastLevel(ratio)]}
                      </dd>
                    </div>
                  );
                })}
            </dl>
          </li>
        ))}
      </ul>
    </Chapter>
  );
}

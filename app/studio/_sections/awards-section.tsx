import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import type { Studio } from "@/content/schemas/studio";

type AwardsSectionProps = { index: number; awards: Studio["awards"] };

export function AwardsSection({ index, awards }: AwardsSectionProps) {
  return (
    <Section index={index} label="Recognition">
      <h2 className="mt-10 font-display text-display-lg">Awards, imagined</h2>
      <p className="mt-6 max-w-2xl text-lead">
        Like the studio, these awards are invented for this concept. None of
        them exists, and no real prize is claimed.
      </p>
      <ul className="mt-12 grid divide-y divide-rule border-y border-ink md:mt-16 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {awards.map((award) => (
          <li
            key={award.name}
            className="flex flex-col gap-3 py-6 lg:px-6 lg:py-8 lg:first:pl-0 lg:last:pr-0"
          >
            <Label as="p">
              {award.year} · {award.result}
            </Label>
            <p className="font-display text-display-sm">{award.name}</p>
            <Link
              href={`/projects/${award.project.slug}`}
              className="self-start link-underline text-small"
            >
              {award.project.name}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

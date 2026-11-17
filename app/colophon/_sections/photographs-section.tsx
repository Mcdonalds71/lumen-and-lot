import { Section } from "@/components/ui/section";
import type { PhotoCredit } from "@/content/photos";

type PhotographsSectionProps = {
  index: number;
  credits: readonly PhotoCredit[];
};

export function PhotographsSection({
  index,
  credits,
}: PhotographsSectionProps) {
  const sites = [...new Set(credits.map((credit) => credit.site))].join(
    " and ",
  );

  return (
    <Section index={index} label="Photographs">
      <h2 className="mt-10 font-display text-display-lg">With thanks to</h2>
      <p className="mt-6 max-w-2xl text-lead">
        The photographs come from {sites}, under each site&rsquo;s free license,
        and a script crops each one to this site&rsquo;s formats. The palette
        rooms, the lookbooks and the before-and-after views are generated with
        Figma AI.
      </p>
      <ul className="mt-12 grid border-t border-rule md:mt-16 md:grid-cols-2 md:gap-x-gutter lg:grid-cols-3">
        {credits.map((credit) => (
          <li
            key={credit.url}
            className="flex items-baseline justify-between gap-4 border-b border-rule py-4"
          >
            <a href={credit.url} className="link-underline">
              {credit.name}
            </a>
            <span className="text-small text-muted">{credit.site}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

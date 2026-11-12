import { Section } from "@/components/ui/section";
import type { Studio } from "@/content/schemas/studio";
import { cx } from "@/lib/cx";
import { initials } from "@/lib/format";

const tiles = ["bg-ink", "bg-moss", "bg-clay"] as const;

type TeamSectionProps = { index: number; team: Studio["team"] };

export function TeamSection({ index, team }: TeamSectionProps) {
  return (
    <Section index={index} label="Team">
      <h2 className="mt-10 font-display text-display-lg">The people</h2>
      <p className="mt-6 max-w-2xl text-lead">
        The studio is a concept, and so are its people. Their initials stand in
        for portraits.
      </p>
      <ul className="mt-12 grid grid-cols-2 gap-x-gutter gap-y-12 md:mt-16 md:grid-cols-3 xl:grid-cols-6">
        {team.map((person, position) => (
          <li key={person.name}>
            <div
              aria-hidden
              className={cx(
                "grid aspect-square place-items-center font-display text-display-md text-paper",
                tiles[position % tiles.length],
              )}
            >
              {initials(person.name)}
            </div>
            <h3 className="mt-5 text-title">{person.name}</h3>
            <p className="mt-1 text-small text-muted">
              {person.role}, {person.city}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

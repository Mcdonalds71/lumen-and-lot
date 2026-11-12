import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import type { Studio } from "@/content/schemas/studio";
import { formatIndex } from "@/lib/format";

type PhilosophySectionProps = {
  index: number;
  statement: string;
  principles: Studio["principles"];
};

export function PhilosophySection({
  index,
  statement,
  principles,
}: PhilosophySectionProps) {
  return (
    <Section index={index} label="Philosophy">
      <h2 className="mt-10 max-w-5xl font-display text-display-md text-pretty">
        {statement}
      </h2>
      <ul className="mt-16 grid gap-x-gutter gap-y-12 md:mt-24 md:grid-cols-3">
        {principles.map((principle, position) => (
          <li key={principle.title} className="border-t border-ink pt-5">
            <Label as="p">{formatIndex(position + 1)}</Label>
            <h3 className="mt-6 font-display text-display-sm">
              {principle.title}
            </h3>
            <p className="mt-4 max-w-sm text-muted">{principle.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

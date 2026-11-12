import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import type { Studio } from "@/content/schemas/studio";
import { formatIndex } from "@/lib/format";

type ProcessSectionProps = { index: number; steps: Studio["process"] };

export function ProcessSection({ index, steps }: ProcessSectionProps) {
  return (
    <Section index={index} label="Process">
      <h2 className="mt-10 font-display text-display-lg">From site to shelf</h2>
      <p className="mt-6 max-w-2xl text-lead">
        Five steps, one team. The times are typical for a building of four to
        twelve homes.
      </p>
      <ol className="mt-12 border-b border-rule md:mt-16">
        {steps.map((step, position) => (
          <li
            key={step.title}
            className="grid grid-cols-12 gap-x-gutter gap-y-3 border-t border-rule py-8 md:py-10"
          >
            <Label as="p" className="col-span-12 md:col-span-1">
              {formatIndex(position + 1)}
            </Label>
            <h3 className="col-span-12 font-display text-display-sm md:col-span-5 lg:col-span-4">
              {step.title}
            </h3>
            <p className="col-span-12 max-w-xl md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-6">
              {step.body}
            </p>
            <Label
              as="p"
              className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-2 lg:col-start-11 lg:text-right"
            >
              {step.duration}
            </Label>
          </li>
        ))}
      </ol>
    </Section>
  );
}

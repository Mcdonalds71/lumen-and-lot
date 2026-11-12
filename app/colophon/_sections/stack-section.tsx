import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import type { Colophon } from "@/content/schemas/colophon";

type StackSectionProps = { index: number; tools: Colophon["tools"] };

export function StackSection({ index, tools }: StackSectionProps) {
  return (
    <Section index={index} label="Stack">
      <h2 className="mt-10 font-display text-display-lg">Built with</h2>
      <p className="mt-6 max-w-2xl text-lead">
        Open-source tools, each with the version this site runs on. It is hosted
        on Vercel.
      </p>
      <dl className="mt-12 grid border-t border-rule md:mt-16 md:grid-cols-2 md:gap-x-gutter lg:grid-cols-3">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex items-baseline justify-between gap-4 border-b border-rule py-4"
          >
            <dt className="flex items-baseline gap-3">
              {tool.name}
              <Label>{tool.version}</Label>
            </dt>
            <dd className="text-right text-small text-muted">{tool.role}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

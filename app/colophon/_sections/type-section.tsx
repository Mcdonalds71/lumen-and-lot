import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import type { Colophon } from "@/content/schemas/colophon";
import { cx } from "@/lib/cx";

const faces = {
  display: "font-display text-display-lg",
  sans: "font-sans text-display-md tracking-tight",
  mono: "font-mono text-display-sm uppercase",
} as const;

type TypeSectionProps = { index: number; fonts: Colophon["fonts"] };

export function TypeSection({ index, fonts }: TypeSectionProps) {
  return (
    <Section index={index} label="Type">
      <h2 className="mt-10 font-display text-display-lg">Three typefaces</h2>
      <p className="mt-6 max-w-2xl text-lead">
        All three are free under the SIL Open Font License and served from this
        site through next/font.
      </p>
      <ul className="mt-12 border-b border-rule md:mt-16">
        {fonts.map((font) => (
          <li
            key={font.name}
            className="grid grid-cols-12 items-baseline gap-x-gutter gap-y-3 border-t border-rule py-8"
          >
            <p
              className={cx(
                "col-span-12 leading-none md:col-span-7",
                faces[font.face],
              )}
            >
              {font.name}
            </p>
            <p className="col-span-12 md:col-span-3">{font.use}</p>
            <Label as="p" className="col-span-12 md:col-span-2 md:text-right">
              {font.designer}
            </Label>
          </li>
        ))}
      </ul>
    </Section>
  );
}

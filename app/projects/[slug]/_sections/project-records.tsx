import { BeforeAfter } from "@/components/projects/before-after";
import { Label } from "@/components/ui/label";
import { RevealImage } from "@/components/ui/reveal-image";
import { Section } from "@/components/ui/section";
import type { Project } from "@/content/schemas/project";

type RecordProps = { index: number; project: Project };

export function DrawingsSection({ index, project }: RecordProps) {
  return (
    <Section index={index} label="Drawings">
      <h2 className="mt-10 font-display text-display-md">Drawn to measure</h2>
      <div className="mt-12 grid gap-x-gutter gap-y-12 md:grid-cols-2">
        {project.drawings.map(({ title, image }) => (
          <figure key={title}>
            <RevealImage
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="(min-width: 48rem) 45vw, 100vw"
              className="border border-rule"
            />
            <figcaption className="mt-3">
              <Label>{title}</Label>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function BeforeAfterSection({ index, project }: RecordProps) {
  const { before, after, caption } = project.beforeAfter;
  return (
    <Section index={index} label="Before and after">
      <h2 className="mt-10 font-display text-display-md">Before and after</h2>
      <figure className="mt-12">
        <BeforeAfter before={before} after={after} />
        <figcaption className="mt-4 max-w-xl text-small text-muted">
          {caption} Drag the handle, or use the arrow keys, to compare.
        </figcaption>
      </figure>
    </Section>
  );
}

export function CreditsSection({ index, project }: RecordProps) {
  return (
    <Section index={index} label="Credits">
      <h2 className="mt-10 font-display text-display-md">Credits</h2>
      <dl className="mt-10 grid border-t border-rule md:grid-cols-2 md:gap-x-10">
        {project.credits.map(({ role, name }) => (
          <div
            key={role}
            className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
          >
            <dt className="text-small text-muted">{role}</dt>
            <dd className="text-right">{name}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

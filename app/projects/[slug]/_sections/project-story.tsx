import { useId } from "react";

import { Label } from "@/components/ui/label";
import { RevealImage } from "@/components/ui/reveal-image";
import type { Project } from "@/content/schemas/project";
import { cx } from "@/lib/cx";
import { formatIndex } from "@/lib/format";

type StorySection = Project["sections"][number];

const placements = {
  imageFirst: {
    wide: "lg:col-span-7",
    square: "lg:col-span-6",
    tall: "lg:col-span-5",
    text: "md:col-span-8 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9",
  },
  textFirst: {
    wide: "lg:col-span-7 lg:col-start-6 lg:row-start-1",
    square: "lg:col-span-6 lg:col-start-7 lg:row-start-1",
    tall: "lg:col-span-5 lg:col-start-8 lg:row-start-1",
    text: "md:col-span-8 lg:col-span-5 lg:col-start-1 lg:row-start-1 xl:col-span-4",
  },
} as const;

function StoryChapter({
  section,
  index,
}: {
  section: StorySection;
  index: number;
}) {
  const headingId = useId();
  const layout = index % 2 === 0 ? placements.imageFirst : placements.textFirst;
  const { image } = section;
  const shape =
    image.height > image.width
      ? "tall"
      : image.height === image.width
        ? "square"
        : "wide";

  return (
    <section
      aria-labelledby={headingId}
      className="grid grid-cols-12 items-center gap-x-gutter gap-y-8"
    >
      <RevealImage
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="(min-width: 64rem) 55vw, 100vw"
        className={cx("col-span-12", layout[shape])}
      />
      <div className={cx("col-span-12", layout.text)}>
        <Label as="p">{formatIndex(index + 1)}</Label>
        <h2 id={headingId} className="mt-4 font-display text-display-md">
          {section.title}
        </h2>
        {section.body.map((paragraph) => (
          <p key={paragraph} className="mt-6 text-lead">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ProjectStory({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-24 md:gap-40">
      {project.sections.map((section, index) => (
        <StoryChapter key={section.title} section={section} index={index} />
      ))}
    </div>
  );
}

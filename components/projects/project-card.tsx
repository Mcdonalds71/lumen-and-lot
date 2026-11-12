import Link from "next/link";

import { Label } from "@/components/ui/label";
import { RevealImage } from "@/components/ui/reveal-image";
import type { Project } from "@/content/schemas/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative">
      <RevealImage
        src={project.cover.src}
        width={project.cover.width}
        height={project.cover.height}
        alt=""
        sizes="(min-width: 48rem) 45vw, 100vw"
      />
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="font-display text-display-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="link-reveal after:absolute after:inset-0"
          >
            {project.name}
          </Link>
        </h2>
        <Label>{project.type}</Label>
      </div>
      <Label as="p" className="mt-2">
        {project.locality}, {project.market.name} · {project.year}
      </Label>
    </article>
  );
}

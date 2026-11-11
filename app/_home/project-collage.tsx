import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { RevealImage } from "@/components/ui/reveal-image";
import { Section } from "@/components/ui/section";
import { projects } from "@/content/projects";
import type { ImageAsset } from "@/content/schemas/common";
import type { Project } from "@/content/schemas/project";
import { cx } from "@/lib/cx";

type Tile = {
  placement: string;
  sizes: string;
  image: (project: Project) => ImageAsset;
};

function sectionImage(project: Project, index: number): ImageAsset {
  return project.sections[index]?.image ?? project.cover;
}

const tiles: readonly Tile[] = [
  {
    placement: "md:col-span-7 md:col-start-1 md:row-start-1",
    sizes: "(min-width: 48rem) 58vw, 100vw",
    image: (project) => project.cover,
  },
  {
    placement: "md:col-span-4 md:col-start-9 md:row-start-2",
    sizes: "(min-width: 48rem) 33vw, 100vw",
    image: (project) => sectionImage(project, 1),
  },
  {
    placement: "md:col-span-4 md:col-start-2 md:row-start-3",
    sizes: "(min-width: 48rem) 33vw, 100vw",
    image: (project) => sectionImage(project, 2),
  },
  {
    placement: "md:col-span-6 md:col-start-7 md:row-start-4",
    sizes: "(min-width: 48rem) 50vw, 100vw",
    image: (project) => sectionImage(project, 0),
  },
];

export function ProjectCollage() {
  return (
    <Section index={2} label="Projects">
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-display-lg">Selected work</h2>
        <ButtonLink href="/projects" variant="text">
          All projects
        </ButtonLink>
      </div>
      <Grid as="ul" className="mt-16 gap-y-16">
        {tiles.map((tile, index) => {
          const project = projects[index];
          return (
            project && (
              <CollageTile key={project.slug} project={project} tile={tile} />
            )
          );
        })}
      </Grid>
    </Section>
  );
}

function CollageTile({ project, tile }: { project: Project; tile: Tile }) {
  const image = tile.image(project);

  return (
    <li className={cx("col-span-12 md:row-span-2", tile.placement)}>
      <Link href={`/projects/${project.slug}`} className="block">
        <RevealImage
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          sizes={tile.sizes}
        />
        <span className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="link-reveal font-display text-display-sm">
            {project.name}
          </span>
          <Label>
            {project.market.name} · {project.year}
          </Label>
        </span>
      </Link>
    </li>
  );
}

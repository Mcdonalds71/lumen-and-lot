import Image from "next/image";

import { Area } from "@/components/preferences/area";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import type { Project } from "@/content/schemas/project";
import { formatCount } from "@/lib/format";

export function ProjectIntro({ project }: { project: Project }) {
  const facts = [
    { term: "Location", detail: `${project.locality}, ${project.market.name}` },
    { term: "Completed", detail: project.year },
    { term: "Type", detail: project.type },
    { term: "Homes", detail: formatCount(project.homes, "home") },
    { term: "Area", detail: <Area squareMeters={project.areaM2} /> },
  ];

  return (
    <>
      <Container className="pt-16 md:pt-24">
        <Breadcrumb
          parent={{ href: "/projects", label: "Projects" }}
          current={project.name}
        />
        <Label as="p" className="mt-10 md:mt-16">
          {project.type} · {project.year}
        </Label>
        <h1 className="mt-4 font-display text-display-xl">{project.name}</h1>
        <Grid className="mt-10 gap-y-10 md:mt-16">
          <p className="col-span-12 text-lead md:col-span-8 lg:col-span-6">
            {project.summary}
          </p>
          <dl className="col-span-12 grid grid-cols-2 border-t border-rule sm:grid-cols-3 lg:col-span-5 lg:col-start-8">
            {facts.map(({ term, detail }) => (
              <div key={term} className="border-b border-rule py-4 pr-4">
                <dt className="text-caption text-muted">{term}</dt>
                <dd className="mt-1">{detail}</dd>
              </div>
            ))}
          </dl>
        </Grid>
      </Container>
      <Container className="mt-16 md:mt-24">
        <Image
          src={project.cover.src}
          width={project.cover.width}
          height={project.cover.height}
          alt={project.cover.alt}
          sizes="100vw"
          preload
          className="h-auto w-full"
        />
      </Container>
    </>
  );
}

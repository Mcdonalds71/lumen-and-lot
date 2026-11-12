import type { Metadata } from "next";

import { pageMetadata } from "@/app/_seo/page-metadata";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectViewToggle } from "@/components/projects/project-view-toggle";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { projects } from "@/content/projects";
import { formatCount, formatIndex } from "@/lib/format";
import { projectViewPreference } from "@/lib/preferences";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Case studies of homes we have designed, built and furnished.",
  path: "/projects",
});

const optionAttribute = projectViewPreference.optionAttribute;

export default function ProjectsPage() {
  return (
    <Container className="pt-16 md:pt-24">
      <Label as="p">Projects</Label>
      <Grid className="mt-6 gap-y-8">
        <h1 className="col-span-12 font-display text-display-xl lg:col-span-8">
          Selected work
        </h1>
        <p className="col-span-12 text-lead md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          Small buildings we have designed, built and furnished, from a laneway
          house in Toronto to a stair house in Lisbon.
        </p>
      </Grid>

      <div className="mt-16 flex flex-wrap items-end justify-between gap-6 md:mt-24">
        <Label as="p">{formatCount(projects.length, "project")}</Label>
        <ProjectViewToggle />
      </div>

      <div {...{ [optionAttribute]: "list" }} className="mt-8">
        <ProjectList
          rows={projects.map((project, index) => ({
            slug: project.slug,
            number: formatIndex(index + 1),
            name: project.name,
            place: `${project.locality}, ${project.market.name}`,
            year: project.year,
            type: project.type,
            image: project.cover,
          }))}
        />
      </div>

      <ul
        {...{ [optionAttribute]: "grid" }}
        className="mt-8 grid gap-x-gutter gap-y-16 border-t border-ink pt-10 md:grid-cols-2"
      >
        {projects.map((project) => (
          <li key={project.slug} className="md:even:mt-32">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

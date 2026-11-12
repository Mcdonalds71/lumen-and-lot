import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/app/_seo/json-ld";
import { pageMetadata } from "@/app/_seo/page-metadata";
import { absoluteUrl } from "@/app/_seo/site-url";
import { breadcrumbData } from "@/app/_seo/structured-data";
import { NextUp } from "@/components/shell/next-up";
import { Container } from "@/components/ui/container";
import { findProject, nextProject, projects } from "@/content/projects";

import { ProjectIntro } from "./_sections/project-intro";
import {
  BeforeAfterSection,
  CreditsSection,
  DrawingsSection,
} from "./_sections/project-records";
import { ProjectStory } from "./_sections/project-story";

export const instant = false;

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project
    ? pageMetadata({
        title: project.name,
        description: project.summary,
        path: `/projects/${project.slug}`,
      })
    : {};
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  const next = nextProject(project.slug);
  const chapters = project.sections.length;

  return (
    <>
      <JsonLd
        data={breadcrumbData([
          { name: "Projects", url: absoluteUrl("/projects") },
          {
            name: project.name,
            url: absoluteUrl(`/projects/${project.slug}`),
          },
        ])}
      />
      <ProjectIntro project={project} />
      <Container className="flex flex-col gap-32 pt-32 md:gap-48 md:pt-40">
        <ProjectStory project={project} />
        <DrawingsSection index={chapters + 1} project={project} />
        <BeforeAfterSection index={chapters + 2} project={project} />
        <CreditsSection index={chapters + 3} project={project} />
        {next && next.slug !== project.slug && (
          <NextUp
            label="Next project"
            title={next.name}
            detail={`${next.locality}, ${next.market.name} · ${next.year}`}
            href={`/projects/${next.slug}`}
            all={{ href: "/projects", label: "All projects" }}
          />
        )}
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageFallback } from "@/components/shell/page-fallback";
import { PageInProgress } from "@/components/shell/page-in-progress";
import { findProject, projects } from "@/content/projects";

type Params = PageProps<"/projects/[slug]">["params"];

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project ? { title: project.name, description: project.summary } : {};
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Params }) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  return (
    <PageInProgress
      label={`${project.locality}, ${project.market.name} · ${project.year}`}
      title={project.name}
      summary={project.summary}
    />
  );
}

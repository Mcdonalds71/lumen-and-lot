import type { Metadata } from "next";

import { PageInProgress } from "@/components/shell/page-in-progress";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of homes we have designed, built and furnished.",
};

export default function ProjectsPage() {
  return (
    <PageInProgress
      label="Projects"
      title="Selected work"
      summary={`${projects.length} case studies from Toronto, the Hudson Valley, Copenhagen and Lisbon.`}
    />
  );
}

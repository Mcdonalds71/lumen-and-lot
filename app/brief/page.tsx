import type { Metadata } from "next";

import { PageInProgress } from "@/components/shell/page-in-progress";

export const metadata: Metadata = {
  title: "Start a brief",
  description:
    "Six short steps that end in a PDF you keep. Nothing is sent anywhere.",
};

export default function BriefPage() {
  return (
    <PageInProgress
      label="Brief"
      title="Start a brief"
      summary="Six short steps that end in a PDF you keep. Nothing is sent anywhere."
    />
  );
}

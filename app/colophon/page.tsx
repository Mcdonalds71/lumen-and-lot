import type { Metadata } from "next";

import { PageInProgress } from "@/components/shell/page-in-progress";

export const metadata: Metadata = {
  title: "Colophon",
  description: "The type, tools and images behind this site.",
};

export default function ColophonPage() {
  return (
    <PageInProgress
      label="Colophon"
      title="How this site was made"
      summary="The type, tools and images behind this site."
    />
  );
}

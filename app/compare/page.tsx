import type { Metadata } from "next";

import { PageInProgress } from "@/components/shell/page-in-progress";

export const metadata: Metadata = {
  title: "Compare homes",
  description: "Up to three homes side by side, with a link you can share.",
};

export default function ComparePage() {
  return (
    <PageInProgress
      label="Compare"
      title="Compare homes"
      summary="Up to three homes side by side, with a link you can share."
    />
  );
}

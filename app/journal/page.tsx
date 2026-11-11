import type { Metadata } from "next";

import { PageInProgress } from "@/components/shell/page-in-progress";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on daylight, energy labels and buying a home abroad.",
};

export default function JournalPage() {
  return (
    <PageInProgress
      label="Journal"
      title="Notes on light, energy and buying a home"
      summary="Three articles are being written."
    />
  );
}

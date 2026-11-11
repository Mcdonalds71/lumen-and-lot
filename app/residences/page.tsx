import type { Metadata } from "next";

import { PageInProgress } from "@/components/shell/page-in-progress";
import { residences } from "@/content/residences";

export const metadata: Metadata = {
  title: "Residences",
  description:
    "Homes for sale in Toronto, the Hudson Valley, Copenhagen and Lisbon.",
};

export default function ResidencesPage() {
  return (
    <PageInProgress
      label="Residences"
      title="Homes in four cities"
      summary={`${residences.length} homes in Toronto, the Hudson Valley, Copenhagen and Lisbon.`}
    />
  );
}

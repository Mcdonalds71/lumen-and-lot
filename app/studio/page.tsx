import type { Metadata } from "next";

import { PageInProgress } from "@/components/shell/page-in-progress";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "How Lumen & Lot works, from the first sketch to the last shelf.",
};

export default function StudioPage() {
  return (
    <PageInProgress
      label="Studio"
      title="A small studio in four cities"
      summary="How we work, from the first sketch to the last shelf."
    />
  );
}

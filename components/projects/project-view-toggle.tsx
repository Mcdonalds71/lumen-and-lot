"use client";

import { Toggle } from "@/components/ui/toggle";
import { usePreference } from "@/hooks/use-preference";
import { projectViewPreference } from "@/lib/preferences";

const views = [
  { value: "list", label: "List" },
  { value: "grid", label: "Lookbook" },
] as const;

export function ProjectViewToggle() {
  const [view, setView] = usePreference(projectViewPreference);
  return (
    <Toggle label="View" options={views} value={view} onChange={setView} />
  );
}

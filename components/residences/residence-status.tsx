import { Label } from "@/components/ui/label";
import type { Status } from "@/content/schemas/residence";

export const statusLabels: Record<Status, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

export function ResidenceStatus({ status }: { status: Status }) {
  return (
    <Label tone={status === "available" ? "ink" : "muted"}>
      {statusLabels[status]}
    </Label>
  );
}

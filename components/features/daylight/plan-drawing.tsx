import { useId } from "react";

import { Label } from "@/components/ui/label";
import type { FloorPlan as FloorPlanData } from "@/content/schemas/floor-plan";
import { labelScale, planFrame, roomLabel, viewBox } from "@/lib/plan-frame";
import type { SunPosition } from "@/lib/sun";

import { Compass, CompassLetters, type SunPath } from "./compass";
import { FloorPlan } from "./floor-plan";

type PlanDrawingProps = {
  plan: FloorPlanData;
  sun: SunPosition;
  sunPath: SunPath;
  description: string;
};

const labelSize = `${labelScale * 100}cqw`;

export function PlanDrawing({
  plan,
  sun,
  sunPath,
  description,
}: PlanDrawingProps) {
  const idPrefix = useId();
  const frame = planFrame(plan);
  const labels = plan.rooms.flatMap((room) => {
    const label = roomLabel(frame, room.name, room.polygon);
    return label ? [{ id: room.id, name: room.name, ...label }] : [];
  });

  return (
    <div
      role="img"
      aria-label={description}
      className="@container relative aspect-square"
    >
      <svg
        viewBox={viewBox(frame)}
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <Compass frame={frame} sun={sun} sunPath={sunPath} />
        <FloorPlan plan={plan} frame={frame} sun={sun} idPrefix={idPrefix} />
      </svg>
      <CompassLetters frame={frame} />
      {labels.map(({ id, name, left, top, maxWidth }) => (
        <Label
          key={id}
          tone="ink"
          className="absolute hidden w-max -translate-1/2 text-center sm:block"
          style={{ left, top, maxWidth, fontSize: labelSize }}
        >
          {name}
        </Label>
      ))}
    </div>
  );
}

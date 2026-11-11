import type { FloorPlan as FloorPlanData } from "@/content/schemas/floor-plan";
import type { PlanFrame } from "@/lib/plan-frame";
import { lightPatch, type SunPosition } from "@/lib/sun";
import { svgNumber, svgPoints } from "@/lib/svg";

const wallWidth = 0.16;
const windowGap = 0.22;
const softness = 0.07;

type FloorPlanProps = {
  plan: FloorPlanData;
  frame: PlanFrame;
  sun: SunPosition;
  idPrefix: string;
};

export function FloorPlan({ plan, frame, sun, idPrefix }: FloorPlanProps) {
  const [cx, cy] = frame.center;
  const softenId = `${idPrefix}soften`;
  const clipId = (roomId: string) => `${idPrefix}${roomId}`;
  const sunlitRooms = plan.rooms
    .map((room) => ({
      room,
      patches: room.windows.flatMap((window) => {
        const patch = lightPatch(window, room, sun, plan.northRotation);
        return patch ? [patch] : [];
      }),
    }))
    .filter(({ patches }) => patches.length > 0);

  return (
    <g transform={`rotate(${-plan.northRotation} ${cx} ${cy})`}>
      <defs>
        <filter
          id={softenId}
          filterUnits="userSpaceOnUse"
          x={svgNumber(cx - frame.viewRadius)}
          y={svgNumber(cy - frame.viewRadius)}
          width={svgNumber(2 * frame.viewRadius)}
          height={svgNumber(2 * frame.viewRadius)}
        >
          <feGaussianBlur stdDeviation={softness} />
        </filter>
        {plan.rooms.map((room) => (
          <clipPath key={room.id} id={clipId(room.id)}>
            <polygon points={svgPoints(room.polygon)} />
          </clipPath>
        ))}
      </defs>

      {plan.rooms.map((room) => (
        <polygon
          key={room.id}
          points={svgPoints(room.polygon)}
          className="fill-paper"
        />
      ))}

      {sunlitRooms.map(({ room, patches }) => (
        <g key={room.id} clipPath={`url(#${clipId(room.id)})`}>
          <g filter={`url(#${softenId})`} className="fill-clay/55">
            {patches.map((patch, index) => (
              <polygon key={index} points={svgPoints(patch)} />
            ))}
          </g>
        </g>
      ))}

      {plan.rooms.map((room) => (
        <polygon
          key={room.id}
          points={svgPoints(room.polygon)}
          className="fill-none stroke-ink"
          strokeWidth={wallWidth}
        />
      ))}

      {plan.rooms.flatMap((room) =>
        room.windows.map(({ start: [x1, y1], end: [x2, y2] }, index) => (
          <g key={`${room.id}-${index}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-paper"
              strokeWidth={windowGap}
            />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-ink"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        )),
      )}
    </g>
  );
}

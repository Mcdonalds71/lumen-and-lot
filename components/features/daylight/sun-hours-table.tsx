import { Label } from "@/components/ui/label";
import type { FloorPlan } from "@/content/schemas/floor-plan";
import { cx } from "@/lib/cx";
import { type RoomSunlight, windowDirections } from "@/lib/sun";
import { formatClock, formatDuration } from "@/lib/time";

type SunHoursTableProps = {
  plan: FloorPlan;
  sunlight: readonly RoomSunlight[];
  sunlitNow: ReadonlySet<string>;
  timeZone: string;
  caption: string;
};

function formatPeriod(start: Date, end: Date, timeZone: string): string {
  const [from, to] = [formatClock(start, timeZone), formatClock(end, timeZone)];
  return from === to ? from : `${from}–${to}`;
}

export function SunHoursTable({
  plan,
  sunlight,
  sunlitNow,
  timeZone,
  caption,
}: SunHoursTableProps) {
  const byRoom = new Map(sunlight.map((room) => [room.id, room]));

  return (
    <table className="w-full text-left text-small">
      <caption className="mb-6 text-left">
        <Label>{caption}</Label>
      </caption>
      <thead>
        <tr className="border-b border-ink">
          {["Room", "Direct sun", "When"].map((heading) => (
            <th
              key={heading}
              scope="col"
              className="pr-4 pb-3 font-mono text-label font-normal text-muted uppercase last:pr-0"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {plan.rooms.map((room) => {
          const light = byRoom.get(room.id);
          const directions = windowDirections(room, plan.northRotation);
          const inSun = sunlitNow.has(room.id);
          return (
            <tr key={room.id} className="border-b border-rule align-top">
              <th scope="row" className="py-4 pr-4 font-normal">
                <span className="flex items-baseline gap-2">
                  <span
                    aria-hidden
                    className={cx("size-2 shrink-0", inSun && "bg-clay")}
                  />
                  <span>
                    {room.name}
                    {inSun && <span className="sr-only">, in sun now</span>}
                    <span className="block text-caption text-muted">
                      {directions.length > 0
                        ? `Windows face ${directions.join(", ")}`
                        : "No windows"}
                    </span>
                  </span>
                </span>
              </th>
              <td className="py-4 pr-4 tabular-nums">
                {light && light.minutes > 0
                  ? formatDuration(light.minutes)
                  : "None"}
              </td>
              <td className="py-4 tabular-nums">
                {light?.periods.map(({ start, end }) => (
                  <span key={start.getTime()} className="block">
                    {formatPeriod(start, end, timeZone)}
                  </span>
                ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

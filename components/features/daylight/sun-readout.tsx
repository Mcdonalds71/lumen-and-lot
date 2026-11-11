import { Label } from "@/components/ui/label";
import { compassPoint, type SunPosition } from "@/lib/sun";

type SunReadoutProps = {
  dayName: string;
  date: string;
  clock: string;
  zoneName: string;
  sun: SunPosition;
  sunlitRooms: readonly string[];
};

export function SunReadout({
  dayName,
  date,
  clock,
  zoneName,
  sun,
  sunlitRooms,
}: SunReadoutProps) {
  const facts = [
    { term: "Sun height", detail: `${Math.max(0, Math.round(sun.altitude))}°` },
    {
      term: "Sun direction",
      detail: `${compassPoint(sun.azimuth)}, ${Math.round(sun.azimuth)}°`,
    },
  ];

  return (
    <div>
      <Label as="p">
        {dayName} · {date}
      </Label>
      <p className="mt-3 font-display text-display-lg tabular-nums">{clock}</p>
      <p className="mt-2 text-small text-muted">{zoneName} time</p>
      <dl className="mt-8 grid grid-cols-2 border-t border-rule">
        {facts.map(({ term, detail }) => (
          <div key={term} className="border-b border-rule py-3">
            <dt className="text-caption text-muted">{term}</dt>
            <dd className="mt-1 tabular-nums first-letter:uppercase">
              {detail}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-small">
        {sunlitRooms.length > 0
          ? `In sun now: ${sunlitRooms.join(", ")}.`
          : "No room has direct sun right now."}
      </p>
    </div>
  );
}

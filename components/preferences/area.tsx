import { areaPreference } from "@/lib/preferences";
import { formatArea } from "@/lib/units";

export function Area({ squareMeters }: { squareMeters: number }) {
  return (
    <span className="tabular-nums">
      {areaPreference.values.map((unit) => (
        <span key={unit} {...{ [areaPreference.optionAttribute]: unit }}>
          {formatArea(squareMeters, unit)}
        </span>
      ))}
    </span>
  );
}

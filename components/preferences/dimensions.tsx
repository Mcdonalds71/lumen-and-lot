import { areaPreference } from "@/lib/preferences";
import { formatDimensions, type Measurements } from "@/lib/units";

export function Dimensions({ size }: { size: Measurements }) {
  return (
    <span className="tabular-nums">
      {areaPreference.values.map((unit) => (
        <span key={unit} {...{ [areaPreference.optionAttribute]: unit }}>
          {formatDimensions(size, unit)}
        </span>
      ))}
    </span>
  );
}

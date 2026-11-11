import { areaPreference } from "@/lib/preferences";
import { formatAreaRange } from "@/lib/units";

type AreaRangeProps = { min: number; max?: number | undefined };

export function AreaRange({ min, max }: AreaRangeProps) {
  return (
    <span className="tabular-nums">
      {areaPreference.values.map((unit) => (
        <span key={unit} {...{ [areaPreference.optionAttribute]: unit }}>
          {formatAreaRange(min, max, unit)}
        </span>
      ))}
    </span>
  );
}

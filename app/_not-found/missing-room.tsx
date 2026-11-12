import { cx } from "@/lib/cx";

const plan = [
  "M 170 60 V 10 H 10 V 150 H 170 V 84",
  "M 90 10 V 64",
  "M 90 88 V 150",
  "M 10 96 H 60",
  "M 34 7 H 66 M 34 13 H 66",
  "M 114 147 H 146 M 114 153 H 146",
  "M 170 60 H 194 A 24 24 0 0 1 170 84",
];

export function MissingRoom({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 160"
      aria-hidden
      className={cx("h-auto w-full overflow-visible", className)}
    >
      <g fill="none" stroke="currentColor" className="text-ink">
        {plan.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g className="text-clay">
        <rect
          x={176}
          y={30}
          width={56}
          height={100}
          fill="none"
          stroke="currentColor"
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
        />
        <text
          x={204}
          y={94}
          fontSize={40}
          textAnchor="middle"
          fill="currentColor"
          className="font-display"
        >
          ?
        </text>
      </g>
    </svg>
  );
}

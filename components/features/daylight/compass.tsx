import { Label } from "@/components/ui/label";
import type { Point } from "@/lib/geometry";
import { asPercent, onBearing, type PlanFrame } from "@/lib/plan-frame";
import { normalizeBearing, type SunPosition } from "@/lib/sun";
import { svgNumber } from "@/lib/svg";

export type SunPath = { rise: number; set: number };

const cardinals = [
  { bearing: 0, letter: "N" },
  { bearing: 90, letter: "E" },
  { bearing: 180, letter: "S" },
  { bearing: 270, letter: "W" },
] as const;

const ticks = Array.from({ length: 24 }, (_, index) => index * 15);

function ringPoint(frame: PlanFrame, bearing: number, radius: number): Point {
  const [x, y] = onBearing(frame, bearing, radius);
  return [svgNumber(x), svgNumber(y)];
}

function arc(frame: PlanFrame, from: number, to: number): string {
  const radius = svgNumber(frame.ringRadius);
  const [x1, y1] = ringPoint(frame, from, frame.ringRadius);
  const [x2, y2] = ringPoint(frame, to, frame.ringRadius);
  const largeArc = normalizeBearing(to - from) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
}

type CompassProps = { frame: PlanFrame; sun: SunPosition; sunPath: SunPath };

export function Compass({ frame, sun, sunPath }: CompassProps) {
  const [cx, cy] = frame.center;
  const unit = frame.viewRadius / 100;
  const [sunX, sunY] = ringPoint(frame, sun.azimuth, frame.ringRadius);

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={svgNumber(frame.ringRadius)}
        className="fill-none stroke-muted/40"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      {ticks.map((bearing) => {
        const length = (bearing % 90 === 0 ? 3.2 : 1.4) * unit;
        const [x1, y1] = ringPoint(frame, bearing, frame.ringRadius);
        const [x2, y2] = ringPoint(frame, bearing, frame.ringRadius - length);
        return (
          <line
            key={bearing}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="stroke-muted"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
      <path
        d={arc(frame, sunPath.rise, sunPath.set)}
        className="fill-none stroke-clay/35"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      {sun.altitude > 0 && (
        <>
          <path
            d={arc(frame, sunPath.rise, sun.azimuth)}
            className="fill-none stroke-clay"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={sunX}
            cy={sunY}
            r={svgNumber(3.2 * unit)}
            className="fill-clay/20"
          />
          <circle
            cx={sunX}
            cy={sunY}
            r={svgNumber(1.6 * unit)}
            className="fill-clay"
          />
        </>
      )}
    </g>
  );
}

export function CompassLetters({ frame }: { frame: PlanFrame }) {
  const radius = (frame.ringRadius + frame.viewRadius) / 2;
  return cardinals.map(({ bearing, letter }) => (
    <Label
      key={letter}
      tone={letter === "N" ? "ink" : "muted"}
      className="absolute -translate-1/2"
      style={asPercent(frame, onBearing(frame, bearing, radius))}
    >
      {letter}
    </Label>
  ));
}

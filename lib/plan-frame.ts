import {
  boundsCenter,
  centroid,
  type Point,
  rotatePoint,
  segmentLength,
} from "./geometry";
import { svgNumber } from "./svg";

export type PlanFrame = {
  center: Point;
  northRotation: number;
  ringRadius: number;
  viewRadius: number;
};

type FramedPlan = {
  northRotation: number;
  rooms: readonly { polygon: readonly Point[] }[];
};

export type RoomLabel = { left: string; top: string; maxWidth: string };

export const labelScale = 0.017;

const ringSpacing = 1.12;
const viewSpacing = 1.16;
const glyphWidth = 0.68;
const lineHeight = 1.3;
const labelMargin = 0.85;

export function planFrame({ northRotation, rooms }: FramedPlan): PlanFrame {
  const points = rooms.flatMap((room) => room.polygon);
  const center = boundsCenter(points);
  const planRadius = Math.max(
    ...points.map((point) => segmentLength([center, point])),
  );
  const ringRadius = planRadius * ringSpacing;
  return {
    center,
    northRotation,
    ringRadius,
    viewRadius: ringRadius * viewSpacing,
  };
}

export function viewBox({ center: [cx, cy], viewRadius }: PlanFrame): string {
  return [cx - viewRadius, cy - viewRadius, 2 * viewRadius, 2 * viewRadius]
    .map(svgNumber)
    .join(" ");
}

export function northUp(frame: PlanFrame, point: Point): Point {
  return rotatePoint(point, -frame.northRotation, frame.center);
}

export function onBearing(
  frame: PlanFrame,
  bearing: number,
  radius: number,
): Point {
  const [cx, cy] = frame.center;
  return rotatePoint([cx, cy - radius], bearing, frame.center);
}

export function asPercent(
  { center: [cx, cy], viewRadius }: PlanFrame,
  [x, y]: Point,
): { left: string; top: string } {
  const percent = (value: number, origin: number) =>
    `${(((value - origin + viewRadius) / (2 * viewRadius)) * 100).toFixed(3)}%`;
  return { left: percent(x, cx), top: percent(y, cy) };
}

export function roomLabel(
  frame: PlanFrame,
  name: string,
  polygon: readonly Point[],
): RoomLabel | undefined {
  const corners = polygon.map((point) => northUp(frame, point));
  const span = (values: number[]) =>
    (Math.max(...values) - Math.min(...values)) * labelMargin;
  const width = span(corners.map(([x]) => x));
  const height = span(corners.map(([, y]) => y));
  const fontSize = labelScale * 2 * frame.viewRadius;
  const words = name.split(" ");
  const longestWord = Math.max(...words.map((word) => word.length));
  const fits =
    longestWord * glyphWidth * fontSize <= width &&
    words.length * lineHeight * fontSize <= height;
  if (!fits) return undefined;
  return {
    ...asPercent(frame, northUp(frame, centroid(polygon))),
    maxWidth: `${((width / (2 * frame.viewRadius)) * 100).toFixed(3)}%`,
  };
}

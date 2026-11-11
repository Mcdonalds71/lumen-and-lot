export type Point = readonly [x: number, y: number];

export type Segment = readonly [start: Point, end: Point];

const epsilon = 1e-9;

export function edges(polygon: readonly Point[]): Segment[] {
  const [first] = polygon;
  if (!first) return [];
  const next = [...polygon.slice(1), first];
  return polygon.map((point, index) => [point, next[index] ?? first]);
}

export function polygonArea(polygon: readonly Point[]): number {
  const twiceArea = edges(polygon).reduce(
    (sum, [[x1, y1], [x2, y2]]) => sum + x1 * y2 - x2 * y1,
    0,
  );
  return Math.abs(twiceArea) / 2;
}

export function segmentLength([[x1, y1], [x2, y2]]: Segment): number {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function midpoint([[x1, y1], [x2, y2]]: Segment): Point {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

export function isPointOnSegment(
  [px, py]: Point,
  [[ax, ay], [bx, by]]: Segment,
): boolean {
  const cross = (px - ax) * (by - ay) - (py - ay) * (bx - ax);
  if (Math.abs(cross) > epsilon) return false;
  const dot = (px - ax) * (bx - ax) + (py - ay) * (by - ay);
  const lengthSquared = (bx - ax) ** 2 + (by - ay) ** 2;
  return dot >= -epsilon && dot <= lengthSquared + epsilon;
}

export function edgeContaining(
  segment: Segment,
  polygon: readonly Point[],
): Segment | undefined {
  return edges(polygon).find(
    (edge) =>
      isPointOnSegment(segment[0], edge) && isPointOnSegment(segment[1], edge),
  );
}

export function isOnBoundary(point: Point, polygon: readonly Point[]): boolean {
  return edges(polygon).some((edge) => isPointOnSegment(point, edge));
}

export function containsPoint(
  [px, py]: Point,
  polygon: readonly Point[],
): boolean {
  return edges(polygon).reduce((inside, [[x1, y1], [x2, y2]]) => {
    const crosses =
      y1 > py !== y2 > py && px < ((x2 - x1) * (py - y1)) / (y2 - y1) + x1;
    return crosses ? !inside : inside;
  }, false);
}

export function centroid(polygon: readonly Point[]): Point {
  const sums = edges(polygon).reduce(
    (total, [[x1, y1], [x2, y2]]) => {
      const cross = x1 * y2 - x2 * y1;
      return {
        twiceArea: total.twiceArea + cross,
        x: total.x + (x1 + x2) * cross,
        y: total.y + (y1 + y2) * cross,
      };
    },
    { twiceArea: 0, x: 0, y: 0 },
  );
  return [sums.x / (3 * sums.twiceArea), sums.y / (3 * sums.twiceArea)];
}

export function boundsCenter(points: readonly Point[]): Point {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  return [
    (Math.min(...xs) + Math.max(...xs)) / 2,
    (Math.min(...ys) + Math.max(...ys)) / 2,
  ];
}

export function rotatePoint(
  [x, y]: Point,
  degrees: number,
  [cx, cy]: Point,
): Point {
  const radians = (degrees * Math.PI) / 180;
  const [dx, dy] = [x - cx, y - cy];
  return [
    cx + dx * Math.cos(radians) - dy * Math.sin(radians),
    cy + dx * Math.sin(radians) + dy * Math.cos(radians),
  ];
}

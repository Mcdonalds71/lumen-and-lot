import { describe, expect, it } from "vitest";

import {
  edgeContaining,
  edges,
  isOnBoundary,
  isPointOnSegment,
  midpoint,
  type Point,
  polygonArea,
  segmentLength,
} from "@/lib/geometry";

const rectangle: Point[] = [
  [0, 0],
  [4, 0],
  [4, 3],
  [0, 3],
];

const lShape: Point[] = [
  [0, 0],
  [6, 0],
  [6, 2],
  [2, 2],
  [2, 5],
  [0, 5],
];

describe("edges", () => {
  it("closes the polygon back to its first point", () => {
    expect(edges(rectangle)).toEqual([
      [
        [0, 0],
        [4, 0],
      ],
      [
        [4, 0],
        [4, 3],
      ],
      [
        [4, 3],
        [0, 3],
      ],
      [
        [0, 3],
        [0, 0],
      ],
    ]);
  });

  it("returns nothing for an empty polygon", () => {
    expect(edges([])).toEqual([]);
  });
});

describe("polygonArea", () => {
  it("measures rectangles and L-shapes", () => {
    expect(polygonArea(rectangle)).toBe(12);
    expect(polygonArea(lShape)).toBe(18);
  });

  it("does not depend on winding direction", () => {
    expect(polygonArea([...rectangle].reverse())).toBe(12);
  });
});

describe("segments", () => {
  it("measures length and finds the midpoint", () => {
    expect(
      segmentLength([
        [0, 0],
        [3, 4],
      ]),
    ).toBe(5);
    expect(
      midpoint([
        [1, 2],
        [3, 6],
      ]),
    ).toEqual([2, 4]);
  });
});

describe("isPointOnSegment", () => {
  const wall = [
    [0, 0],
    [4, 0],
  ] as const;

  it("accepts points along the segment, ends included", () => {
    expect(isPointOnSegment([0, 0], wall)).toBe(true);
    expect(isPointOnSegment([2.5, 0], wall)).toBe(true);
    expect(isPointOnSegment([4, 0], wall)).toBe(true);
  });

  it("rejects points off the line or past either end", () => {
    expect(isPointOnSegment([2, 0.01], wall)).toBe(false);
    expect(isPointOnSegment([4.5, 0], wall)).toBe(false);
    expect(isPointOnSegment([-0.5, 0], wall)).toBe(false);
  });
});

describe("edgeContaining", () => {
  it("finds the wall a window sits on", () => {
    expect(
      edgeContaining(
        [
          [1, 3],
          [2.5, 3],
        ],
        rectangle,
      ),
    ).toEqual([
      [4, 3],
      [0, 3],
    ]);
  });

  it("finds nothing for a segment that crosses the room", () => {
    expect(
      edgeContaining(
        [
          [0, 0],
          [4, 3],
        ],
        rectangle,
      ),
    ).toBeUndefined();
  });
});

describe("isOnBoundary", () => {
  it("tells boundary points from interior points", () => {
    expect(isOnBoundary([2, 2], lShape)).toBe(true);
    expect(isOnBoundary([1, 1], lShape)).toBe(false);
  });
});

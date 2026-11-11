import { describe, expect, it } from "vitest";

import {
  asPercent,
  northUp,
  onBearing,
  planFrame,
  roomLabel,
  viewBox,
} from "@/lib/plan-frame";

const plan = {
  northRotation: 90,
  rooms: [
    {
      polygon: [
        [0, 0],
        [6, 0],
        [6, 8],
        [0, 8],
      ] as const,
    },
  ],
};

describe("planFrame", () => {
  const frame = planFrame(plan);

  it("centers on the plan and rings it with room to spare", () => {
    expect(frame.center).toEqual([3, 4]);
    expect(frame.ringRadius).toBeGreaterThan(5);
    expect(frame.viewRadius).toBeGreaterThan(frame.ringRadius);
  });

  it("describes a square view around the center", () => {
    const [x, y, width, height] = viewBox(frame).split(" ").map(Number);
    expect(width).toBe(height);
    expect((x ?? 0) + (width ?? 0) / 2).toBeCloseTo(3);
    expect((y ?? 0) + (height ?? 0) / 2).toBeCloseTo(4);
  });

  it("turns the plan so true north points up", () => {
    const [x, y] = northUp(frame, [6, 4]);
    expect(x).toBeCloseTo(3);
    expect(y).toBeCloseTo(1);
  });

  it("places bearings clockwise from the top", () => {
    const [x, y] = onBearing(frame, 90, 2);
    expect(x).toBeCloseTo(5);
    expect(y).toBeCloseTo(4);
  });

  it("labels a room only when its name fits at the drawing's scale", () => {
    const room = [
      [0, 0],
      [6, 0],
      [6, 8],
      [0, 8],
    ] as const;
    const closet = [
      [0, 0],
      [0.8, 0],
      [0.8, 0.8],
      [0, 0.8],
    ] as const;
    expect(roomLabel(frame, "Living and kitchen", room)).toMatchObject({
      left: "50.000%",
      top: "50.000%",
    });
    expect(roomLabel(frame, "Laundry", closet)).toBeUndefined();
  });

  it("converts view points to percentages", () => {
    expect(asPercent(frame, frame.center)).toEqual({
      left: "50.000%",
      top: "50.000%",
    });
  });
});

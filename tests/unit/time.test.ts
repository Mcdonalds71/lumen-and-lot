import { describe, expect, it } from "vitest";

import {
  calendarDateIn,
  formatCalendarDate,
  formatClock,
  formatDuration,
  formatLongDate,
  formatReadingTime,
} from "@/lib/time";

describe("formatClock", () => {
  it("shows the time in the residence's own time zone", () => {
    const noonUtc = Date.UTC(2026, 2, 20, 16);
    expect(formatClock(noonUtc, "America/Toronto")).toBe("12:00\u00a0PM");
    expect(formatClock(noonUtc, "Europe/Copenhagen")).toBe("5:00\u00a0PM");
  });
});

describe("calendarDateIn", () => {
  it("gives the local date, which can differ from the UTC one", () => {
    const lateEvening = Date.UTC(2026, 10, 11, 3);
    expect(calendarDateIn(lateEvening, "America/Toronto")).toBe("2026-11-10");
    expect(calendarDateIn(lateEvening, "Europe/Lisbon")).toBe("2026-11-11");
  });
});

describe("formatCalendarDate", () => {
  it("writes the month and day", () => {
    expect(formatCalendarDate("2026-12-21")).toBe("December 21");
  });
});

describe("formatLongDate", () => {
  it("adds the year", () => {
    expect(formatLongDate("2026-08-25")).toBe("August 25, 2026");
  });
});

describe("formatDuration", () => {
  it("uses hours and minutes, dropping whichever is zero", () => {
    expect(formatDuration(345)).toBe("5\u00a0h 45\u00a0min");
    expect(formatDuration(120)).toBe("2\u00a0h");
    expect(formatDuration(30)).toBe("30\u00a0min");
  });
});

describe("formatReadingTime", () => {
  it("keeps the number and its unit on one line", () => {
    expect(formatReadingTime(4)).toBe("4\u00a0min read");
  });
});

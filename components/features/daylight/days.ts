import { calendarDateIn } from "@/lib/time";

export const marchEquinox = "2026-03-20";

export const days = [
  {
    id: "winter",
    label: "Winter",
    name: "Winter solstice",
    date: "2026-12-21",
  },
  {
    id: "equinox",
    label: "Equinox",
    name: "March equinox",
    date: marchEquinox,
  },
  {
    id: "summer",
    label: "Summer",
    name: "Summer solstice",
    date: "2026-06-21",
  },
  { id: "today", label: "Today", name: "Today", date: undefined },
] as const;

export type Day = (typeof days)[number];

export type DayId = Day["id"];

export const defaultDay = days[1];

export function dayById(id: DayId): Day {
  return days.find((day) => day.id === id) ?? defaultDay;
}

export function dateOf(day: Day, timeZone: string): string {
  return day.date ?? calendarDateIn(Date.now(), timeZone);
}

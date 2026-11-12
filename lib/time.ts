const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(
  locale: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const key = `${locale}|${JSON.stringify(options)}`;
  const cached = formatters.get(key);
  if (cached) return cached;
  const created = new Intl.DateTimeFormat(locale, options);
  formatters.set(key, created);
  return created;
}

export function formatClock(instant: Date | number, timeZone: string): string {
  return formatter("en-US", { timeZone, hour: "numeric", minute: "2-digit" })
    .format(instant)
    .replace(/\s/g, "\u00a0");
}

export function calendarDateIn(
  instant: Date | number,
  timeZone: string,
): string {
  return formatter("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant);
}

function formatDate(
  date: string,
  options: Pick<Intl.DateTimeFormatOptions, "year" | "month" | "day">,
): string {
  const [year = 0, month = 1, day = 1] = date.split("-").map(Number);
  return formatter("en-US", { timeZone: "UTC", ...options }).format(
    Date.UTC(year, month - 1, day),
  );
}

export function formatCalendarDate(date: string): string {
  return formatDate(date, { month: "long", day: "numeric" });
}

export function formatLongDate(date: string): string {
  return formatDate(date, { year: "numeric", month: "long", day: "numeric" });
}

export function formatReadingTime(minutes: number): string {
  return `${minutes}\u00a0min read`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}\u00a0min`;
  return rest === 0 ? `${hours}\u00a0h` : `${hours}\u00a0h ${rest}\u00a0min`;
}

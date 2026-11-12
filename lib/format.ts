export function formatIndex(index: number): string {
  return String(index).padStart(2, "0");
}

export function formatCount(count: number, singular: string): string {
  return `${count} ${count === 1 ? singular : `${singular}s`}`;
}

export function initials(name: string): string {
  const words = name.trim().split(/\s+/u);
  const first = words[0] ?? "";
  const last = words.length > 1 ? (words.at(-1) ?? "") : "";
  return [first, last]
    .map((word) => Array.from(word)[0] ?? "")
    .join("")
    .toLocaleUpperCase("en-US");
}

export function releaseLine(range: string): string {
  const match = /(\d+)(?:\.(\d+))?/u.exec(range);
  if (!match) throw new Error(`"${range}" has no version number.`);
  const [, major = "", minor] = match;
  return major === "0" && minor !== undefined ? `0.${minor}` : major;
}

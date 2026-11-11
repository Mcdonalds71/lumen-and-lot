export function formatIndex(index: number): string {
  return String(index).padStart(2, "0");
}

export function formatCount(count: number, singular: string): string {
  return `${count} ${count === 1 ? singular : `${singular}s`}`;
}

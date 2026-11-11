export const compareLimit = 3;

export const compareStorageKey = "lumen-and-lot:compare";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseCompareList(raw: string | null): string[] {
  if (!raw) return [];
  const slugs = raw.split(",").filter((slug) => slugPattern.test(slug));
  return [...new Set(slugs)].slice(0, compareLimit);
}

export function serializeCompareList(slugs: readonly string[]): string {
  return slugs.join(",");
}

export function isCompareFull(slugs: readonly string[]): boolean {
  return slugs.length >= compareLimit;
}

export function addToCompare(slugs: readonly string[], slug: string): string[] {
  if (slugs.includes(slug) || isCompareFull(slugs)) return [...slugs];
  return [...slugs, slug];
}

export function removeFromCompare(
  slugs: readonly string[],
  slug: string,
): string[] {
  return slugs.filter((candidate) => candidate !== slug);
}

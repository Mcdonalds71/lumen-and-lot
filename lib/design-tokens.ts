export type TokenMap = ReadonlyMap<string, string>;

export type FluidSize = { min: number; max: number };

export type ColorToken = { name: string; value: string };

export type TypeStep = {
  name: string;
  size: FluidSize;
  lineHeight: number;
  letterSpacing: string;
};

export const rootFontSize = 16;

const declaration = /--(?<name>[\w-]+):\s*(?<value>[^;]+);/g;
const clamp = /^clamp\(\s*(?<min>[\d.]+)rem\s*,.+,\s*(?<max>[\d.]+)rem\s*\)$/;

export function parseTokens(css: string): TokenMap {
  const tokens = new Map<string, string>();
  for (const { groups } of css.matchAll(declaration)) {
    if (groups?.name && groups.value) {
      tokens.set(groups.name, groups.value.trim());
    }
  }
  return tokens;
}

export function parseClamp(value: string): FluidSize {
  const groups = clamp.exec(value)?.groups;
  if (!groups?.min || !groups.max) {
    throw new RangeError(
      `Expected clamp(<min>rem, <preferred>, <max>rem), received "${value}".`,
    );
  }
  return { min: Number(groups.min), max: Number(groups.max) };
}

export function parseRem(value: string): number {
  const rem = /^(?<rem>[\d.]+)rem$/.exec(value.trim())?.groups?.rem;
  if (!rem) throw new RangeError(`Expected a rem value, received "${value}".`);
  return Number(rem);
}

export function remToPx(rem: number): number {
  return rem * rootFontSize;
}

export function requireToken(tokens: TokenMap, name: string): string {
  const value = tokens.get(name);
  if (value === undefined) throw new Error(`Missing design token --${name}.`);
  return value;
}

function namesWithPrefix(tokens: TokenMap, prefix: string): string[] {
  return [...tokens.keys()]
    .filter((name) => name.startsWith(prefix) && !name.includes("--"))
    .map((name) => name.slice(prefix.length));
}

export function colorTokens(tokens: TokenMap): ColorToken[] {
  return namesWithPrefix(tokens, "color-").map((name) => ({
    name,
    value: requireToken(tokens, `color-${name}`),
  }));
}

export function typeStep(tokens: TokenMap, name: string): TypeStep {
  const key = `text-${name}`;
  return {
    name,
    size: parseClamp(requireToken(tokens, key)),
    lineHeight: Number(requireToken(tokens, `${key}--line-height`)),
    letterSpacing: tokens.get(`${key}--letter-spacing`) ?? "0",
  };
}

export function typeScale(tokens: TokenMap): TypeStep[] {
  return namesWithPrefix(tokens, "text-").map((name) => typeStep(tokens, name));
}

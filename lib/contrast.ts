type Rgb = readonly [red: number, green: number, blue: number];

const hexColor = /^#[\da-f]{6}$/i;

export const minimumContrast = {
  text: 4.5,
  largeText: 3,
  nonText: 3,
} as const;

function toRgb(hex: string): Rgb {
  if (!hexColor.test(hex)) {
    throw new RangeError(`Expected a color like #1a2b3c, received "${hex}".`);
  }

  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
}

function toLinear(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const [red, green, blue] = toRgb(hex);
  return (
    0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue)
  );
}

export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export type ContrastLevel = "text" | "large-text" | "decorative";

export function contrastLevel(ratio: number): ContrastLevel {
  if (ratio >= minimumContrast.text) return "text";
  if (ratio >= minimumContrast.largeText) return "large-text";
  return "decorative";
}

const formats = {
  portrait: { width: 1600, height: 2000 },
  landscape: { width: 2400, height: 1600 },
  square: { width: 1800, height: 1800 },
  wide: { width: 2400, height: 1350 },
} as const;

export type ImageFormat = keyof typeof formats;

export function image(src: string, alt: string, format: ImageFormat) {
  return { src, alt, ...formats[format] };
}

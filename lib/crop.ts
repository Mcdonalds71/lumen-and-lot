export type Size = { width: number; height: number };

export type Focus = readonly [x: number, y: number];

export type Region = Size & { left: number; top: number };

function place(focus: number, sourceLength: number, cropLength: number) {
  const centered = focus * sourceLength - cropLength / 2;
  return Math.round(Math.min(Math.max(centered, 0), sourceLength - cropLength));
}

export function coverScale(source: Size, target: Size): number {
  return Math.min(source.width / target.width, source.height / target.height);
}

export function coverRegion(source: Size, target: Size, focus: Focus): Region {
  const scale = coverScale(source, target);
  const width = Math.min(Math.round(target.width * scale), source.width);
  const height = Math.min(Math.round(target.height * scale), source.height);
  const [x, y] = focus;
  return {
    left: place(x, source.width, width),
    top: place(y, source.height, height),
    width,
    height,
  };
}

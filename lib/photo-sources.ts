export type PhotoSource =
  | { site: "Unsplash"; id: string; handle: string }
  | { site: "Pexels"; id: number; handle: string };

export function downloadUrl(source: PhotoSource, width: number): string {
  switch (source.site) {
    case "Unsplash":
      return `https://images.unsplash.com/${source.id}?w=${width}&q=90&fm=jpg`;
    case "Pexels":
      return `https://images.pexels.com/photos/${source.id}/pexels-photo-${source.id}.jpeg?w=${width}`;
  }
}

export function profileUrl(source: PhotoSource): string {
  switch (source.site) {
    case "Unsplash":
      return `https://unsplash.com/@${source.handle}`;
    case "Pexels":
      return `https://www.pexels.com/@${source.handle}/`;
  }
}

export function sourceWidth(
  target: { width: number; height: number },
  widestAspect = 1.5,
): number {
  return Math.max(target.width, Math.ceil(target.height * widestAspect));
}

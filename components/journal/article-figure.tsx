import { RevealImage } from "@/components/ui/reveal-image";
import type { ImageAsset } from "@/content/schemas/common";
import { cx } from "@/lib/cx";

const widths = {
  wide: { column: "col-[wide]", sizes: "(min-width: 110rem) 100rem, 90vw" },
  text: { column: "col-[text]", sizes: "(min-width: 48rem) 40rem, 90vw" },
} as const;

type ArticleFigureProps = {
  image: ImageAsset;
  caption: string;
  width?: keyof typeof widths;
};

export function ArticleFigure({
  image,
  caption,
  width = "wide",
}: ArticleFigureProps) {
  const { column, sizes } = widths[width];

  return (
    <figure className={cx("my-14 md:my-24", column)}>
      <RevealImage
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes={sizes}
        className="w-full"
      />
      <figcaption className="mx-auto mt-4 max-w-measure text-small text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

import Image from "next/image";

import { CityList } from "@/components/markets/city-list";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";
import { cx } from "@/lib/cx";

const lineOffsets = ["", "md:ml-[22%]", "md:text-right"];

export function Hero() {
  const { lines, image } = home.hero;

  return (
    <div className="relative -mt-header h-svh min-h-[36rem] overflow-hidden bg-ink text-paper">
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="100vw"
        preload
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/40 to-ink/75"
      />
      <Container className="relative flex h-full flex-col justify-end gap-10 pb-margin">
        <h1
          aria-label={lines.join(" ")}
          className="font-display text-display-xl"
        >
          {lines.map((line, index) => (
            <span
              key={line}
              aria-hidden
              className={cx("block overflow-hidden", lineOffsets[index])}
            >
              <span
                className="block animate-rise"
                style={{ animationDelay: `calc(${index} * var(--stagger))` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <CityList tone="paper" />
      </Container>
    </div>
  );
}

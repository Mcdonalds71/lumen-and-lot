import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { colors } from "@/lib/colors";

export const ogSize = { width: 1200, height: 630 };

export const ogContentType = "image/png";

function readFont(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file));
}

const fontFiles = Promise.all([
  readFont("instrument-serif-regular.ttf"),
  readFont("geist-mono-regular.ttf"),
]);

const label = {
  fontFamily: "Geist Mono",
  fontSize: 22,
  letterSpacing: 1.8,
  textTransform: "uppercase",
  color: colors.muted,
} as const;

type OgCardProps = { kicker: string; title: string; detail: string };

function OgCard({ kicker, title, detail }: OgCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        backgroundColor: colors.paper,
        color: colors.ink,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingBottom: 24,
          borderBottomWidth: 2,
          borderBottomStyle: "solid",
          borderBottomColor: colors.rule,
        }}
      >
        <span style={{ fontFamily: "Instrument Serif", fontSize: 40 }}>
          {site.name}
        </span>
        <span style={label}>{kicker}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <span
          style={{
            fontFamily: "Instrument Serif",
            fontSize: title.length > 28 ? 96 : 128,
            lineHeight: 0.95,
            letterSpacing: -1,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
        <span style={label}>{detail}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...label, fontSize: 18 }}>
          A concept studio by {site.author.name}
        </span>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.clay,
          }}
        />
      </div>
    </div>
  );
}

export async function ogImage(card: OgCardProps): Promise<ImageResponse> {
  const [serif, mono] = await fontFiles;
  return new ImageResponse(<OgCard {...card} />, {
    ...ogSize,
    fonts: [
      { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
      { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
    ],
  });
}

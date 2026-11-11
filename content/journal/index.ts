import { z } from "zod";

import BuyingANewHomeFromAbroad, {
  metadata as buyingANewHomeFromAbroad,
} from "./buying-a-new-home-from-abroad.mdx";
import DesigningForDaylight, {
  metadata as designingForDaylight,
} from "./designing-for-daylight.mdx";
import HowToReadAnEnergyCertificate, {
  metadata as howToReadAnEnergyCertificate,
} from "./how-to-read-an-energy-certificate.mdx";
import { articleMetadataSchema } from "../schemas/article";

const entries = [
  {
    slug: "designing-for-daylight",
    Content: DesigningForDaylight,
    metadata: designingForDaylight,
  },
  {
    slug: "how-to-read-an-energy-certificate",
    Content: HowToReadAnEnergyCertificate,
    metadata: howToReadAnEnergyCertificate,
  },
  {
    slug: "buying-a-new-home-from-abroad",
    Content: BuyingANewHomeFromAbroad,
    metadata: buyingANewHomeFromAbroad,
  },
];

export const articles = entries.map(({ slug, Content, metadata }) => {
  const parsed = articleMetadataSchema.safeParse(metadata);
  if (!parsed.success) {
    throw new Error(
      `Invalid metadata in ${slug}.mdx:\n${z.prettifyError(parsed.error)}`,
    );
  }
  return { slug, Content, ...parsed.data };
});

export type Article = (typeof articles)[number];

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

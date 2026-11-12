type Thing = Record<string, unknown>;

type Person = { name: string; url: string };

export type Crumb = { name: string; url: string };

export function websiteData({
  name,
  description,
  url,
  author,
}: {
  name: string;
  description: string;
  url: string;
  author: Person;
}): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    creator: { "@type": "Person", ...author },
  };
}

export function breadcrumbData(crumbs: readonly Crumb[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function articleData({
  headline,
  description,
  url,
  image,
  datePublished,
  author,
}: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  author: Person;
}): Thing {
  const person = { "@type": "Person", ...author };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    mainEntityOfPage: url,
    author: person,
    publisher: person,
  };
}

export function serializeJsonLd(data: Thing): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

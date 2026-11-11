import type { Route } from "next";

type NavigationItem = { label: string; href: Route };

export const primaryNavigation = [
  { label: "Residences", href: "/residences" },
  { label: "Projects", href: "/projects" },
  { label: "Interiors", href: "/interiors" },
  { label: "Journal", href: "/journal" },
  { label: "Studio", href: "/studio" },
] as const satisfies readonly NavigationItem[];

export const footerNavigation = [
  {
    title: "Homes",
    items: [
      { label: "Residences", href: "/residences" },
      { label: "Compare homes", href: "/compare" },
      { label: "Start a brief", href: "/brief" },
    ],
  },
  {
    title: "Studio",
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Interiors", href: "/interiors" },
      { label: "Journal", href: "/journal" },
      { label: "About the studio", href: "/studio" },
    ],
  },
  {
    title: "This site",
    items: [
      { label: "Colophon", href: "/colophon" },
      { label: "Design system", href: "/system" },
    ],
  },
] as const satisfies readonly {
  title: string;
  items: readonly NavigationItem[];
}[];

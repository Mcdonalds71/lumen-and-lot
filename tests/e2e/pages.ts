type Page = { name: string; path: string; screenshot?: boolean };

export const pages: readonly Page[] = [
  { name: "home", path: "/", screenshot: true },
  { name: "system", path: "/system", screenshot: true },
  { name: "residences", path: "/residences", screenshot: true },
  { name: "residence", path: "/residences/harbor-room", screenshot: true },
  { name: "projects", path: "/projects" },
  { name: "project", path: "/projects/stair-house" },
  { name: "interiors", path: "/interiors", screenshot: true },
  { name: "journal", path: "/journal" },
  { name: "article", path: "/journal/designing-for-daylight" },
  { name: "studio", path: "/studio" },
  { name: "brief", path: "/brief", screenshot: true },
  { name: "compare", path: "/compare" },
  {
    name: "comparison",
    path: "/compare?homes=harbor-room,high-terrace,orchard-house",
    screenshot: true,
  },
  { name: "colophon", path: "/colophon" },
];

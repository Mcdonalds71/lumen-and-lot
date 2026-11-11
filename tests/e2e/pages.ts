type Page = { name: string; path: string; screenshot?: boolean };

export const pages: readonly Page[] = [
  { name: "home", path: "/", screenshot: true },
  { name: "system", path: "/system", screenshot: true },
  { name: "residences", path: "/residences", screenshot: true },
  { name: "residence", path: "/residences/harbor-room" },
  { name: "projects", path: "/projects" },
  { name: "project", path: "/projects/stair-house" },
  { name: "interiors", path: "/interiors" },
  { name: "journal", path: "/journal" },
  { name: "article", path: "/journal/designing-for-daylight" },
  { name: "studio", path: "/studio" },
  { name: "brief", path: "/brief" },
  { name: "compare", path: "/compare" },
  { name: "colophon", path: "/colophon" },
];

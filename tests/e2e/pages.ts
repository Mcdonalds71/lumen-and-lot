type Page = {
  name: string;
  path: string;
  screenshot?: boolean;
  status?: number;
};

export const pages: readonly Page[] = [
  { name: "home", path: "/", screenshot: true },
  { name: "system", path: "/system", screenshot: true },
  { name: "residences", path: "/residences", screenshot: true },
  { name: "residence", path: "/residences/harbor-room", screenshot: true },
  { name: "projects", path: "/projects", screenshot: true },
  { name: "project", path: "/projects/stair-house", screenshot: true },
  { name: "interiors", path: "/interiors", screenshot: true },
  { name: "journal", path: "/journal", screenshot: true },
  {
    name: "article",
    path: "/journal/designing-for-daylight",
    screenshot: true,
  },
  { name: "studio", path: "/studio", screenshot: true },
  { name: "brief", path: "/brief", screenshot: true },
  { name: "compare", path: "/compare" },
  {
    name: "comparison",
    path: "/compare?homes=harbor-room,high-terrace,orchard-house",
    screenshot: true,
  },
  { name: "colophon", path: "/colophon", screenshot: true },
  {
    name: "not-found",
    path: "/no-such-room",
    screenshot: true,
    status: 404,
  },
  { name: "unknown-home", path: "/residences/no-such-home", status: 404 },
];

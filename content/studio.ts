import { type Studio, studioSchema } from "./schemas/studio";

export const studio: Studio = studioSchema.parse({
  statement:
    "We design, build and furnish small buildings, and we stay with each one until the last shelf is up.",
  principles: [
    {
      title: "Light first",
      body: "We place the rooms around the path of the sun before we draw a single wall.",
    },
    {
      title: "One team",
      body: "The people who draw a home also build and furnish it, so nothing is lost between trades.",
    },
    {
      title: "Small on purpose",
      body: "We work on a handful of homes at a time. That keeps every detail within reach.",
    },
  ],
  process: [
    {
      title: "Site and brief",
      duration: "4 to 6 weeks",
      body: "We walk the site at different hours, trace the sun across it and agree on what the homes need to do.",
    },
    {
      title: "Design",
      duration: "3 to 4 months",
      body: "Plans, sections and models. Every room is tested against the sun before the drawings are final.",
    },
    {
      title: "Permits",
      duration: "3 to 9 months",
      body: "We prepare the permit drawings and see them through the local approval process. The timing depends on the city.",
    },
    {
      title: "Build",
      duration: "12 to 18 months",
      body: "Our own site team builds, with a small group of trades we have worked with for years.",
    },
    {
      title: "Furnish and hand over",
      duration: "6 to 8 weeks",
      body: "We finish and furnish each home, walk through it with its owner and come back after a year to see how it is living.",
    },
  ],
  team: [
    { name: "Ingrid Holm", role: "Architect", market: "copenhagen" },
    { name: "Tomás Rocha", role: "Architect", market: "lisbon" },
    { name: "Amara Okafor", role: "Interiors", market: "toronto" },
    { name: "Daniel Reyes", role: "Construction", market: "hudson-valley" },
    { name: "Sofie Brandt", role: "Joinery", market: "copenhagen" },
    { name: "Leo Marchetti", role: "Site lead", market: "toronto" },
  ],
  awards: [
    {
      year: 2025,
      name: "Small Housing Prize",
      result: "Winner",
      project: "stair-house",
    },
    {
      year: 2024,
      name: "Good Light Award",
      result: "Shortlist",
      project: "courtyard-block",
    },
    {
      year: 2023,
      name: "Infill Housing Medal",
      result: "Commended",
      project: "mill-apartments",
    },
    {
      year: 2022,
      name: "Quiet Rooms Prize",
      result: "Finalist",
      project: "laneway-house",
    },
  ],
});

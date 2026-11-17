import { projectImage, studioCredits } from "./images";
import type { ProjectInput } from "../schemas/project";

const slug = "mews-house";

export const mewsHouse = {
  slug,
  name: "Mews House",
  market: "london",
  locality: "Clerkenwell",
  year: 2025,
  type: "Conversion",
  areaM2: 132,
  homes: 1,
  summary:
    "A mews workshop turned into one home. A long rooflight replaces the old workshop roof, so daylight reaches deep into a house with windows on one side only.",
  cover: projectImage(
    slug,
    "cover",
    "The brick mews house on its corner, with ivy over the front",
    "wide",
  ),
  sections: [
    {
      title: "One window wall",
      body: [
        "The mews is narrow, and the house can only open to the cobbles at the front. Where the carriage doors stood, we set a steel-framed glass wall into the brick opening.",
      ],
      image: projectImage(
        slug,
        "section-1",
        "A steel-framed glass wall set into the old brick front",
        "landscape",
      ),
    },
    {
      title: "A rooflight along the spine",
      body: [
        "A rooflight runs the length of the plan. It lights the stair, the kitchen and the bathroom, none of which touch the front wall.",
      ],
      image: projectImage(
        slug,
        "section-2",
        "The timber-lined stair, looking up to the rooflight",
        "portrait",
      ),
    },
    {
      title: "Brick, oak and lime",
      body: [
        "We kept the old brick wherever it showed, laid oak on the floors and finished the new walls in lime plaster.",
      ],
      image: projectImage(
        slug,
        "section-3",
        "Old brick showing through white lime plaster",
        "square",
      ),
    },
  ],
  drawings: [
    {
      title: "Long section",
      image: projectImage(
        slug,
        "drawing-1",
        "Section through the house and its rooflight",
        "landscape",
      ),
    },
    {
      title: "Ground floor plan",
      image: projectImage(
        slug,
        "drawing-2",
        "Plan of the ground floor",
        "landscape",
      ),
    },
  ],
  beforeAfter: {
    before: projectImage(
      slug,
      "before",
      "The workshop as we found it: sooty brick, broken roof panels and old workbenches",
      "landscape",
    ),
    after: projectImage(
      slug,
      "after",
      "The finished living room under the long rooflight",
      "landscape",
    ),
    caption: "The workshop as we found it, and the finished living room.",
  },
  credits: studioCredits,
} satisfies ProjectInput;

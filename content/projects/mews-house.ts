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
    "The brick front of the mews house and its carriage doors",
    "wide",
  ),
  sections: [
    {
      title: "One window wall",
      body: [
        "The mews is narrow, and the house can only open to the cobbles at the front. We kept the old carriage doors and set glass behind them.",
      ],
      image: projectImage(
        slug,
        "section-1",
        "Glass behind the open carriage doors",
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
        "The stair under the long rooflight",
        "portrait",
      ),
    },
    {
      title: "Brick, oak and lime",
      body: [
        "We cleaned the old London stock brick, laid oak on the floors and finished the new walls in lime plaster.",
      ],
      image: projectImage(
        slug,
        "section-3",
        "Lime plaster beside cleaned brick",
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
      "The workshop as we found it",
      "landscape",
    ),
    after: projectImage(
      slug,
      "after",
      "The finished living room under the rooflight",
      "landscape",
    ),
    caption: "The workshop as we found it, and the finished living room.",
  },
  credits: studioCredits,
} satisfies ProjectInput;

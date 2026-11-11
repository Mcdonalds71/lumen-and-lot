import { projectImage, studioCredits } from "./images";
import type { ProjectInput } from "../schemas/project";

const slug = "mill-apartments";

export const millApartments = {
  slug,
  name: "Mill Apartments",
  market: "hudson-valley",
  locality: "Kingston",
  year: 2022,
  type: "Conversion",
  areaM2: 640,
  homes: 6,
  summary:
    "Six apartments inside a brick mill on the edge of Kingston. We kept the timber frame and the tall windows, and arranged the new homes so each one has light from two sides.",
  cover: projectImage(
    slug,
    "cover",
    "The brick mill with its tall windows lit at dusk",
    "wide",
  ),
  sections: [
    {
      title: "What we kept",
      body: [
        "The brick walls, timber posts and big windows were sound. We repaired them instead of replacing them, and left the old beams visible in every apartment.",
      ],
      image: projectImage(
        slug,
        "section-1",
        "Restored brick walls and timber posts",
        "landscape",
      ),
    },
    {
      title: "Light from two sides",
      body: [
        "Each home runs from one side of the building to the other, so morning and evening light both reach the living rooms.",
      ],
      image: projectImage(
        slug,
        "section-2",
        "A living room lit from both ends",
        "portrait",
      ),
    },
    {
      title: "A shared garden",
      body: [
        "The old loading yard became a garden for the residents, with raised beds and a long table under a pergola.",
      ],
      image: projectImage(
        slug,
        "section-3",
        "Raised beds in the former loading yard",
        "square",
      ),
    },
  ],
  drawings: [
    {
      title: "Typical floor plan",
      image: projectImage(
        slug,
        "drawing-1",
        "Typical floor plan of the mill apartments",
        "landscape",
      ),
    },
    {
      title: "Cross section",
      image: projectImage(
        slug,
        "drawing-2",
        "Cross section through two apartments",
        "landscape",
      ),
    },
  ],
  beforeAfter: {
    before: projectImage(
      slug,
      "before",
      "The mill before work began",
      "landscape",
    ),
    after: projectImage(slug, "after", "The restored mill", "landscape"),
    caption: "The mill before work began, and the restored building.",
  },
  credits: studioCredits,
} satisfies ProjectInput;

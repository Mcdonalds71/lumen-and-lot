import { projectImage, studioCredits } from "./images";
import type { ProjectInput } from "../schemas/project";

const slug = "courtyard-block";

export const courtyardBlock = {
  slug,
  name: "Courtyard Block",
  market: "copenhagen",
  locality: "Vesterbro",
  year: 2023,
  type: "Renovation",
  areaM2: 1150,
  homes: 12,
  summary:
    "Twelve apartments renovated around a shared courtyard. New balconies face the yard, the stairwells open to daylight, and the courtyard was replanted for the people who live there.",
  cover: projectImage(
    slug,
    "cover",
    "Balconies on every floor around the courtyard",
    "wide",
  ),
  sections: [
    {
      title: "Into the yard",
      body: [
        "Most apartments looked onto the street. We added balconies on the courtyard side, so every home now has a quiet place outdoors.",
      ],
      image: projectImage(
        slug,
        "section-1",
        "Looking down into the shaded courtyard past the balconies",
        "landscape",
      ),
    },
    {
      title: "Brighter stairs",
      body: [
        "The stairwells were dark and narrow. New roof lights and pale limewashed walls carry daylight down all five floors.",
      ],
      image: projectImage(
        slug,
        "section-2",
        "A white stairwell with oak treads under a round roof light",
        "portrait",
      ),
    },
    {
      title: "Warmer walls",
      body: [
        "We insulated the facades from the inside and replaced the windows, so the apartments hold their heat through the long winter.",
      ],
      image: projectImage(
        slug,
        "section-3",
        "A small casement window open in a deep white wall",
        "square",
      ),
    },
  ],
  drawings: [
    {
      title: "Courtyard plan",
      image: projectImage(
        slug,
        "drawing-1",
        "Plan of the block around its courtyard",
        "landscape",
      ),
    },
    {
      title: "Section through the stair",
      image: projectImage(
        slug,
        "drawing-2",
        "Section through a stairwell and its roof light",
        "landscape",
      ),
    },
  ],
  beforeAfter: {
    before: projectImage(
      slug,
      "before",
      "The courtyard before the renovation: bare asphalt and bins",
      "landscape",
    ),
    after: projectImage(
      slug,
      "after",
      "The replanted courtyard, with new balconies",
      "landscape",
    ),
    caption: "The courtyard before the renovation, and after replanting.",
  },
  credits: studioCredits,
} satisfies ProjectInput;

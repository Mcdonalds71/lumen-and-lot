import { z } from "zod";

import { courtyardBlock } from "./courtyard-block";
import { lanewayHouse } from "./laneway-house";
import { millApartments } from "./mill-apartments";
import { stairHouse } from "./stair-house";
import { uniqueBy } from "../schemas/common";
import { type Project, projectSchema } from "../schemas/project";

export const projects: readonly Project[] = z
  .array(projectSchema)
  .check(uniqueBy("project", (project) => project.slug))
  .parse([lanewayHouse, millApartments, courtyardBlock, stairHouse]);

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function nextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}

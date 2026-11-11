import { z } from "zod";

export const energySystems = [
  "EnerGuide",
  "HERS Index",
  "Energimærke",
  "Certificado Energético",
] as const;

export const energyLabelSchema = z.discriminatedUnion("system", [
  z.object({
    system: z.literal("EnerGuide"),
    gigajoulesPerYear: z.number().positive(),
  }),
  z.object({
    system: z.literal("HERS Index"),
    score: z.number().int(),
  }),
  z.object({
    system: z.literal("Energimærke"),
    rating: z.enum(["A2020", "A2015", "A2010", "B", "C", "D", "E", "F", "G"]),
  }),
  z.object({
    system: z.literal("Certificado Energético"),
    rating: z.enum(["A+", "A", "B", "B-", "C", "D", "E", "F"]),
  }),
]);

export type EnergyLabel = z.infer<typeof energyLabelSchema>;

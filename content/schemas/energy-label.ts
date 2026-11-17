import { z } from "zod";

export const energySystems = [
  "EnerGuide",
  "HERS Index",
  "Energimærke",
  "Certificado Energético",
  "EPC",
] as const;

export const energimaerkeRatings = [
  "A2020",
  "A2015",
  "A2010",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
] as const;

export const certificadoRatings = [
  "A+",
  "A",
  "B",
  "B-",
  "C",
  "D",
  "E",
  "F",
] as const;

export const epcRatings = ["A", "B", "C", "D", "E", "F", "G"] as const;

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
    rating: z.enum(energimaerkeRatings),
  }),
  z.object({
    system: z.literal("Certificado Energético"),
    rating: z.enum(certificadoRatings),
  }),
  z.object({
    system: z.literal("EPC"),
    rating: z.enum(epcRatings),
    score: z.number().int().positive(),
  }),
]);

export type EnergyLabel = z.infer<typeof energyLabelSchema>;

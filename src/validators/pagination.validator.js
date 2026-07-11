import { z } from "zod";

export const browseListingsSchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(20).default(10),

    location: z.string().trim().optional(),

    minBudget: z.coerce.number().int().positive().optional(),

    maxBudget: z.coerce.number().int().positive().optional(),
  })
  .refine(
    (data) =>
      !data.minBudget ||
      !data.maxBudget ||
      data.minBudget <= data.maxBudget,
    {
      message: "Minimum budget cannot exceed maximum budget",
      path: ["minBudget"],
    }
  );
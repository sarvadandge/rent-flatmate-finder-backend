import { z } from "zod";

export const tenantProfileSchema = z
    .object({
        preferredLocation: z
            .string()
            .trim()
            .min(3, "Location must be at least 3 characters")
            .max(100),

        minBudget: z
            .number()
            .int()
            .positive(),

        maxBudget: z
            .number()
            .int()
            .positive(),

        moveInDate: z.coerce.date(),
    })
    .refine(
        (data) => data.minBudget <= data.maxBudget,
        {
            message: "Minimum budget cannot exceed maximum budget",
            path: ["minBudget"],
        }
    )
    .refine(
        (data) => data.moveInDate >= new Date(new Date().setHours(0, 0, 0, 0)),
        {
            message: "Move-in date cannot be in the past",
            path: ["moveInDate"],
        }
    );
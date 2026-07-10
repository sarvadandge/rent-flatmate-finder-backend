import { z } from "zod";

export const listingSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters")
        .max(100),

    description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters")
        .max(1000),

    location: z
        .string()
        .trim()
        .min(3, "Location must be at least 3 characters")
        .max(100),

    rent: z
        .number()
        .int()
        .positive("Rent must be greater than zero"),

    availableFrom: z.coerce
        .date()
        .refine(
            (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
            {
                message: "Available date cannot be in the past",
            }
        ),

    roomType: z.enum([
        "SINGLE",
        "DOUBLE",
        "TRIPLE",
        "SHARED",
        "STUDIO",
        "OTHER",
    ]),

    furnishingStatus: z.enum([
        "UNFURNISHED",
        "SEMI_FURNISHED",
        "FULLY_FURNISHED",
    ]),
});
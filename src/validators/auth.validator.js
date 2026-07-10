import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50),

  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters"),

  role: z.enum(["OWNER", "TENANT"]),
});
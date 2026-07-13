import { z } from "zod";

export const updateInterestStatusSchema = z.object({
    status: z.enum([
        "ACCEPTED",
        "DECLINED",
    ]),
});
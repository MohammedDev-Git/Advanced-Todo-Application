import z from "zod";

export const memberTaskSchema = z.object({
    tasks: z.array(z.string().max(30, "max 30 chars")),
})
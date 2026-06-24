import z from "zod";

export const taskDetailsSchema = z.object({
    title: z.string().min(1, "Enter a title").max(30, "max 30 chars"),
    categories: z.array(z.string().max(15, "max 15 chars")),
    description: z.string().max(300, "max 300 chars"),
    deadline: z.string(),
})
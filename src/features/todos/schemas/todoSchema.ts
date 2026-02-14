import { z } from "zod";

export const todoSchema = z.object({
    title: z.string().max(10, "Max 10 characters").min(1, "Please enter a title"),
    category1: z.string().max(6, "Max 6 characters").optional(),
    category2: z.string().max(6, "Max 6 characters").optional(),
})
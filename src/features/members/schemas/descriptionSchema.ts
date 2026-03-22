import z from "zod";

export const descriptionSchema = z.object({
    text: z.string().max(400,"Maximum 400 characters"),
})

export type DescriptionType = z.infer<typeof descriptionSchema>;
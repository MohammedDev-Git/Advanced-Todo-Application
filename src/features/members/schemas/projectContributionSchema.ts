import z from "zod";

export const projectContributionSchema = z.object({

    category: z.array(z.string().max(10,"Maximum 10 characters")),
    id: z.string(),
    title: z.string().min(1,"Title is required").max(15, "Maximum 15 characters"),
    description: z.string().max(300, "Maximum 300 characters"),
    sourceCode: z.string().url("Invalid url").or(z.literal("")),
    liveCode: z.string().url("Invalid url").or(z.literal("")),

})
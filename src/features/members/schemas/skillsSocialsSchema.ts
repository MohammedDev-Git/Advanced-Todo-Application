import z from "zod";

export const skillsSocialsSchema = z.object({
    tempStack: z.array(z.string().max(10, "Maximum 10 characters")),
    tempLinks: z.array(z.url("Invalid url").or(z.literal(""))),
})
import z from "zod";

export const skillsSocialsSchema = z.object({
    tempStack: z.array(z.string().max(10, "max 10 chars")),
    tempLinks: z.array(z.url("Invalid url").or(z.literal(""))),
})

export const tempStackSchema = skillsSocialsSchema.pick({
    tempStack: true,
})
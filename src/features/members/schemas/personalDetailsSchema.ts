import z from "zod";

const egyptianNumberRegex = /^(01[0125]\d{8}|)$/;

export const personalDetailsSchema = z.object({
    name: z.string().min(1, "Name is required").max(30, "Maximum 30 characters"),
    role: z.string().min(1, "Role is required").max(30, "Maximum 30 characters"),
    email: z.email().max(30, "Maximum 30 characters"),
    phone: z.string().regex(egyptianNumberRegex, "Enter a valid Egyptian number"),
})
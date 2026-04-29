import z from "zod";

const egyptianNumberRegex = /^(01[0125]\d{8}|)$/;

export const personalDetailsSchema = z.object({
    name: z.string().min(1, "Name is required").max(20, "Maximum 20 characters"),
    role: z.string().min(1, "Role is required").max(20, "Maximum 20 characters"),
    
    // @gmail.com = 10 characters
    // 30 - 10 = 20 characters maximum
    email: z.email().max(30, "Maximum 20 Characters"),
    phone: z.string().regex(egyptianNumberRegex, "Enter a valid Egyptian number"),
})
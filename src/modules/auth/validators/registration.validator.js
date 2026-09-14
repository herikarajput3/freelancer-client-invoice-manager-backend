import { z } from "zod";

const registrationSchema = z.object({
    email: z
        .string()
        .trim()
        .email(),

    password: z
        .string()
        .min(8),

    businessName: z
        .string()
        .trim()
        .min(1),
});

export default registrationSchema;
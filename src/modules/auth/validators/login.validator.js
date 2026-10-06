import { z } from "zod";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email(),

    password: z
        .string()
        .min(8),
});

export default loginSchema;
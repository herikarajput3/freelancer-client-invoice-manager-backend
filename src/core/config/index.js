import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

    PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(5000),

    MONGODB_URI: z
        .string()
        .trim()
        .min(1, "MONGODB_URI is required"),

    JWT_SECRET: z.string().optional(),

    JWT_EXPIRES_IN: z.string().optional(),

    CORS_ORIGIN: z.string().optional(),
});

const env = envSchema.parse(process.env);

const config = {
    nodeEnv: env.NODE_ENV,

    port: env.PORT,

    rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100,
    },

    database: {
        uri: env.MONGODB_URI,
    },

    jwt: {
        secret: env.JWT_SECRET,
        expiresIn: env.JWT_EXPIRES_IN,
    },

    cors: {
        origin: env.CORS_ORIGIN,
    },
};

export default config;
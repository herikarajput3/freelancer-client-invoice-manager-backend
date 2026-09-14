import { describe, expect, it } from "vitest";

import registrationSchema from "../../../modules/auth/validators/registration.validator.js";

describe("Registration Validator", () => {
    it("accepts valid registration data", () => {
        const result = registrationSchema.safeParse({
            email: "freelancer@example.com",
            password: "securepassword",
            businessName: "Acme Studio",
        });

        expect(result.success).toBe(true);
    });

    it("rejects an invalid email", () => {
        const result = registrationSchema.safeParse({
            email: "invalid-email",
            password: "securepassword",
            businessName: "Acme Studio",
        });

        expect(result.success).toBe(false);
    });

    it("rejects a password shorter than eight characters", () => {
        const result = registrationSchema.safeParse({
            email: "freelancer@example.com",
            password: "short",
            businessName: "Acme Studio",
        });

        expect(result.success).toBe(false);
    });

    it("rejects an empty business name", () => {
        const result = registrationSchema.safeParse({
            email: "freelancer@example.com",
            password: "securepassword",
            businessName: "",
        });

        expect(result.success).toBe(false);
    });

    it("rejects missing email", () => {
        const result = registrationSchema.safeParse({
            password: "securepassword",
            businessName: "Acme Studio",
        });

        expect(result.success).toBe(false);
    });

    it("rejects missing password", () => {
        const result = registrationSchema.safeParse({
            email: "freelancer@example.com",
            businessName: "Acme Studio",
        });

        expect(result.success).toBe(false);
    });

    it("rejects missing business name", () => {
        const result = registrationSchema.safeParse({
            email: "freelancer@example.com",
            password: "securepassword",
        });

        expect(result.success).toBe(false);
    });

    it("trims the email and business name", () => {
        const result = registrationSchema.safeParse({
            email: "  freelancer@example.com  ",
            password: "securepassword",
            businessName: "  Acme Studio  ",
        });

        expect(result.success).toBe(true);

        expect(result.data.email).toBe("freelancer@example.com");
        expect(result.data.businessName).toBe("Acme Studio");
    });
});
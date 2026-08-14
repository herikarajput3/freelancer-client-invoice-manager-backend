import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import validate from "../../../core/middlewares/validate.js";
import ValidationError from "../../../core/shared/errors/ValidationError.js";

describe("validate middleware", () => {
    const schema = z.object({
        name: z.string().min(2),
        email: z.email(),
    });

    it("accepts valid request data", () => {
        const req = {
            body: {
                name: "John",
                email: "john@example.com",
            },
        };

        const next = vi.fn();

        validate({ body: schema })(req, {}, next);

        expect(next).toHaveBeenCalledOnce();
        expect(next).toHaveBeenCalledWith();

        expect(req.validated.body).toEqual(req.body);
    });

    it("passes ValidationError for invalid data", () => {
        const req = {
            body: {
                name: "J",
                email: "invalid",
            },
        };

        const next = vi.fn();

        validate({ body: schema })(req, {}, next);

        const error = next.mock.calls[0][0];

        expect(error).toBeInstanceOf(ValidationError);
        expect(error.statusCode).toBe(422);
        expect(error.errors.length).toBeGreaterThan(0);
    });
});
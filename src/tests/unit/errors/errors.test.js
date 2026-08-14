import { describe, expect, it } from "vitest";

import {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
} from "../../../core/shared/errors/index.js";

describe("application errors", () => {
    it("creates a BadRequestError", () => {
        const error = new BadRequestError(
            "Invalid request.",
            "BAD_REQUEST"
        );

        expect(error.statusCode).toBe(400);
        expect(error.code).toBe("BAD_REQUEST");
        expect(error.message).toBe("Invalid request.");
    });

    it("creates an UnauthorizedError", () => {
        const error = new UnauthorizedError(
            "Authentication required.",
            "AUTHENTICATION_REQUIRED"
        );

        expect(error.statusCode).toBe(401);
    });

    it("creates a ForbiddenError", () => {
        const error = new ForbiddenError(
            "Access denied.",
            "FORBIDDEN"
        );

        expect(error.statusCode).toBe(403);
    });

    it("creates a NotFoundError", () => {
        const error = new NotFoundError(
            "Resource not found.",
            "RESOURCE_NOT_FOUND"
        );

        expect(error.statusCode).toBe(404);
    });

    it("creates a ConflictError", () => {
        const error = new ConflictError(
            "Resource already exists.",
            "RESOURCE_CONFLICT"
        );

        expect(error.statusCode).toBe(409);
    });
});
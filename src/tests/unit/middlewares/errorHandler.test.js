import { describe, expect, it, vi } from "vitest";

import errorHandler from "../../../core/middlewares/errorHandler.js";
import NotFoundError from "../../../core/shared/errors/NotFoundError.js";
import ValidationError from "../../../core/shared/errors/ValidationError.js";

describe("errorHandler", () => {
    it("returns an application error response", () => {
        const json = vi.fn();
        const status = vi.fn(() => ({ json }));

        const res = { status };

        const error = new NotFoundError(
            "Client not found.",
            "CLIENT_NOT_FOUND"
        );

        errorHandler(error, {}, res, vi.fn());

        expect(status).toHaveBeenCalledWith(404);

        expect(json).toHaveBeenCalledWith({
            success: false,
            message: "Client not found.",
            error: {
                code: "CLIENT_NOT_FOUND",
            },
        });
    });

    it("returns validation errors correctly", () => {
        const json = vi.fn();
        const status = vi.fn(() => ({ json }));

        const res = { status };

        const error = new ValidationError(
            "Validation failed.",
            [
                {
                    field: "email",
                    message: "Invalid email.",
                },
            ]
        );

        errorHandler(error, {}, res, vi.fn());

        expect(status).toHaveBeenCalledWith(422);

        expect(json).toHaveBeenCalledWith({
            success: false,
            message: "Validation failed.",
            errors: [
                {
                    field: "email",
                    message: "Invalid email.",
                },
            ],
        });
    });
});
import { describe, expect, it, vi } from "vitest";

import notFound from "../../../core/middlewares/notFound.js";
import NotFoundError from "../../../core/shared/errors/NotFoundError.js";

describe("notFound middleware", () => {
    it("passes a NotFoundError to next", () => {
        const req = {
            originalUrl: "/does-not-exist",
        };

        const next = vi.fn();

        notFound(req, {}, next);

        const error = next.mock.calls[0][0];

        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.statusCode).toBe(404);
    });
});
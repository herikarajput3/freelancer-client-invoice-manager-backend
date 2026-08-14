import { describe, expect, it, vi } from "vitest";

import sendResponse from "../../../core/responses/sendResponse.js";

describe("sendResponse", () => {
    it("returns a standard success response", () => {
        const json = vi.fn();
        const status = vi.fn(() => ({ json }));
        const res = { status };

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Success.",
            data: { id: "123" },
        });

        expect(status).toHaveBeenCalledWith(200);

        expect(json).toHaveBeenCalledWith({
            success: true,
            message: "Success.",
            data: { id: "123" },
        });
    });

    it("returns pagination when provided", () => {
        const json = vi.fn();
        const status = vi.fn(() => ({ json }));
        const res = { status };

        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: [],
            pagination: {
                page: 1,
                limit: 20,
                totalItems: 40,
                totalPages: 2,
                hasNext: true,
                hasPrevious: false,
            },
        });

        expect(json).toHaveBeenCalledWith({
            success: true,
            data: [],
            pagination: {
                page: 1,
                limit: 20,
                totalItems: 40,
                totalPages: 2,
                hasNext: true,
                hasPrevious: false,
            },
        });
    });

    it("returns no body for 204", () => {
        const send = vi.fn();
        const status = vi.fn(() => ({ send }));
        const res = { status };

        sendResponse(res, {
            statusCode: 204,
            success: true,
        });

        expect(status).toHaveBeenCalledWith(204);
        expect(send).toHaveBeenCalled();
    });
});
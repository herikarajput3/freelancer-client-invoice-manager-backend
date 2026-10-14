import request from "supertest";
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
    refreshAccessToken: vi.fn(),
}));

vi.mock(
    "../../../src/modules/auth/services/refresh-token.service.js",
    () => ({
        default: {
            refreshAccessToken: mocks.refreshAccessToken,
        },
    }),
);

vi.mock(
    "../../../src/modules/auth/services/token.service.js",
    () => ({
        default: {
            getTokenExpirationDate: vi.fn(
                () => new Date("2026-12-31T00:00:00.000Z"),
            ),
        },
    }),
);

import { UnauthorizedError } from "../../../src/core/shared/errors/index.js";

const { default: app } = await import("../../app.js");

describe("POST /api/v1/auth/refresh", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("refreshes tokens when a valid refresh cookie is supplied", async () => {
        mocks.refreshAccessToken.mockResolvedValue({
            accessToken: "new-access-token",
            refreshToken: "new-refresh-token",
        });

        const response = await request(app)
            .post("/api/v1/auth/refresh")
            .set("Cookie", "refreshToken=old-refresh-token");

        expect(response.status).toBe(200);

        expect(mocks.refreshAccessToken).toHaveBeenCalledWith(
            "old-refresh-token",
        );

        expect(response.body).toEqual({
            success: true,
            message: "Access token refreshed successfully",
            data: {
                accessToken: "new-access-token",
            },
        });

        expect(response.body.data).not.toHaveProperty("refreshToken");

        const setCookie = response.headers["set-cookie"];

        expect(setCookie).toBeDefined();
        expect(setCookie).toEqual(
            expect.arrayContaining([
                expect.stringContaining("refreshToken=new-refresh-token"),
            ]),
        );

        const refreshCookie = setCookie.find((cookie) =>
            cookie.startsWith("refreshToken="),
        );

        expect(refreshCookie).toContain("HttpOnly");
        expect(refreshCookie).toContain("SameSite=Lax");
        expect(refreshCookie).toContain("Path=/api/v1/auth");
    });

    it("rejects a refresh request when the cookie is missing", async () => {
        mocks.refreshAccessToken.mockRejectedValue(
            new UnauthorizedError(
                "Invalid or expired refresh token.",
                "INVALID_REFRESH_TOKEN",
            ),
        );

        const response = await request(app)
            .post("/api/v1/auth/refresh");

        expect(mocks.refreshAccessToken).toHaveBeenCalledWith(
            undefined,
        );

        expect(response.status).toBe(401);
        expect(response.headers["set-cookie"]).toBeUndefined();
    });

    it("rejects an invalid refresh cookie", async () => {
        mocks.refreshAccessToken.mockRejectedValue(
            new UnauthorizedError(
                "Invalid or expired refresh token.",
                "INVALID_REFRESH_TOKEN",
            ),
        );

        const response = await request(app)
            .post("/api/v1/auth/refresh")
            .set("Cookie", "refreshToken=invalid-token");

        expect(mocks.refreshAccessToken).toHaveBeenCalledWith(
            "invalid-token",
        );

        expect(response.status).toBe(401);
        expect(response.headers["set-cookie"]).toBeUndefined();
    });
});
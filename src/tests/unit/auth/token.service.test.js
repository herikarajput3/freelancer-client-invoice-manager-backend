import { describe, expect, it } from "vitest";

import tokenService from "../../../../src/modules/auth/services/token.service.js";

describe("Token Service", () => {
    const payload = {
        userId: "507f1f77bcf86cd799439011",
    };

    describe("generateAccessToken", () => {
        it("generates an access token containing the user identity", () => {
            const token = tokenService.generateAccessToken(payload);

            expect(token).toEqual(expect.any(String));

            const decoded = tokenService.verifyAccessToken(token);

            expect(decoded.userId).toBe(payload.userId);
        });
    });

    describe("generateRefreshToken", () => {
        it("generates a refresh token", () => {
            const token = tokenService.generateRefreshToken(payload);

            expect(token).toEqual(expect.any(String));
        });
    });

    describe("verifyAccessToken", () => {
        it("verifies a valid access token", () => {
            const token = tokenService.generateAccessToken(payload);

            const decoded = tokenService.verifyAccessToken(token);

            expect(decoded.userId).toBe(payload.userId);
        });

        it("rejects an invalid token", () => {
            expect(() =>
                tokenService.verifyAccessToken("invalid-token"),
            ).toThrow();
        });

        it("rejects a tampered token", () => {
            const token = tokenService.generateAccessToken(payload);
            const tamperedToken = `${token}tampered`;

            expect(() =>
                tokenService.verifyAccessToken(tamperedToken),
            ).toThrow();
        });
    });
});
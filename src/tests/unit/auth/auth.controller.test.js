import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
    register: vi.fn(),
    login: vi.fn(),
    refreshAccessToken: vi.fn(),
    sendResponse: vi.fn(),
    getTokenExpirationDate: vi.fn(
        () => new Date("2026-12-31T00:00:00.000Z"),
    ),
}));

vi.mock(
    "../../../modules/auth/services/token.service.js",
    () => ({
        default: {
            getTokenExpirationDate: mocks.getTokenExpirationDate,
        },
    }),
);

vi.mock(
    "../../../modules/auth/services/registration.service.js",
    () => ({
        default: { register: mocks.register },
    }),
);

vi.mock(
    "../../../modules/auth/services/login.service.js",
    () => ({
        default: { login: mocks.login },
    }),
);

vi.mock(
    "../../../modules/auth/services/refresh-token.service.js",
    () => ({
        default: {
            refreshAccessToken: mocks.refreshAccessToken,
        },
    }),
);

vi.mock(
    "../../../core/responses/sendResponse.js",
    () => ({
        default: mocks.sendResponse,
    }),
);

import authController from "../../../modules/auth/controllers/auth.controller.js";

describe("Auth Controller", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("registers a user, sets the refresh cookie, and excludes the refresh token from JSON", async () => {
        const requestBody = {
            email: "freelancer@example.com",
            password: "securepassword",
            businessName: "Acme Studio",
        };

        const registrationResult = {
            user: {
                id: "user-id",
                email: requestBody.email,
                businessProfileId: "profile-id",
            },
            accessToken: "access-token",
            refreshToken: "refresh-token",
        };

        const req = {
            validated: { body: requestBody },
        };
        const res = { cookie: vi.fn() };
        const next = vi.fn();

        mocks.register.mockResolvedValue(registrationResult);

        await authController.register(req, res, next);

        expect(mocks.register).toHaveBeenCalledWith(requestBody);

        expect(res.cookie).toHaveBeenCalledWith(
            "refreshToken",
            "refresh-token",
            expect.objectContaining({
                httpOnly: true,
                sameSite: "lax",
                path: "/api/v1/auth",
                expires: new Date("2026-12-31T00:00:00.000Z"),
            }),
        );

        expect(mocks.sendResponse).toHaveBeenCalledWith(res, {
            statusCode: 201,
            success: true,
            message: "Registration successful",
            data: {
                user: registrationResult.user,
                accessToken: "access-token",
            },
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("passes registration errors to the error handler", async () => {
        const error = new Error("Registration failed");
        const req = { validated: { body: {} } };
        const res = { cookie: vi.fn() };
        const next = vi.fn();

        mocks.register.mockRejectedValue(error);

        await authController.register(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(mocks.sendResponse).not.toHaveBeenCalled();
    });

    it("logs in a user and sets the refresh cookie", async () => {
        const loginData = {
            email: "freelancer@example.com",
            password: "securepassword",
        };

        mocks.login.mockResolvedValue({
            user: { id: "user-id", email: loginData.email },
            accessToken: "new-access-token",
            refreshToken: "new-refresh-token",
        });

        const req = { validated: { body: loginData } };
        const res = { cookie: vi.fn() };
        const next = vi.fn();

        await authController.login(req, res, next);

        expect(mocks.login).toHaveBeenCalledWith(loginData);

        expect(res.cookie).toHaveBeenCalledWith(
            "refreshToken",
            "new-refresh-token",
            expect.objectContaining({
                httpOnly: true,
                sameSite: "lax",
                path: "/api/v1/auth",
            }),
        );

        expect(mocks.sendResponse).toHaveBeenCalledWith(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: {
                user: { id: "user-id", email: loginData.email },
                accessToken: "new-access-token",
            },
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("refreshes tokens using the refresh cookie and returns only the access token", async () => {
        const req = {
            cookies: { refreshToken: "old-refresh-token" },
        };
        const res = { cookie: vi.fn() };
        const next = vi.fn();

        mocks.refreshAccessToken.mockResolvedValue({
            accessToken: "new-access-token",
            refreshToken: "new-refresh-token",
        });

        await authController.refresh(req, res, next);

        expect(mocks.refreshAccessToken).toHaveBeenCalledWith(
            "old-refresh-token",
        );

        expect(res.cookie).toHaveBeenCalledWith(
            "refreshToken",
            "new-refresh-token",
            expect.objectContaining({
                httpOnly: true,
                sameSite: "lax",
                path: "/api/v1/auth",
                expires: new Date("2026-12-31T00:00:00.000Z"),
            }),
        );

        expect(mocks.sendResponse).toHaveBeenCalledWith(res, {
            statusCode: 200,
            success: true,
            message: "Access token refreshed successfully",
            data: { accessToken: "new-access-token" },
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("passes refresh errors to the error handler", async () => {
        const error = new Error("Invalid or expired refresh token.");
        const req = { cookies: { refreshToken: "invalid-token" } };
        const res = { cookie: vi.fn() };
        const next = vi.fn();

        mocks.refreshAccessToken.mockRejectedValue(error);

        await authController.refresh(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.cookie).not.toHaveBeenCalled();
        expect(mocks.sendResponse).not.toHaveBeenCalled();
    });
});
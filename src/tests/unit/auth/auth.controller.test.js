import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
    register: vi.fn(),
    sendResponse: vi.fn(),
}));

vi.mock(
    "../../../modules/auth/services/registration.service.js",
    () => ({
        default: {
            register: mocks.register,
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

    it("registers a user and sends a created response", async () => {
        const requestBody = {
            email: "freelancer@example.com",
            password: "securepassword",
            businessName: "Acme Studio",
        };

        const registrationResult = {
            user: {
                _id: "user-id",
                email: requestBody.email,
                businessProfileId: "profile-id",
            },
            accessToken: "access-token",
            refreshToken: "refresh-token",
        };

        const req = {
            body: requestBody,
        };

        const res = {};
        const next = vi.fn();

        mocks.register.mockResolvedValue(
            registrationResult,
        );

        await authController.register(req, res, next);

        expect(mocks.register).toHaveBeenCalledWith(
            requestBody,
        );

        expect(mocks.sendResponse).toHaveBeenCalledWith(
            res,
            201,
            "Registration successful",
            registrationResult,
        );

        expect(next).not.toHaveBeenCalled();
    });

    it("passes registration errors to the error handler", async () => {
        const error = new Error("Registration failed");

        const req = {
            body: {},
        };

        const res = {};
        const next = vi.fn();

        mocks.register.mockRejectedValue(error);

        await authController.register(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(mocks.sendResponse).not.toHaveBeenCalled();
    });
});
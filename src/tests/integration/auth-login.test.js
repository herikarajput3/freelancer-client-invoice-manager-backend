import request from "supertest";
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
    login: vi.fn(),
}));

vi.mock(
    "../../../src/modules/auth/services/login.service.js",
    () => ({
        default: {
            login: mocks.login,
        },
    }),
);

const { default: app } = await import("../../app.js");

describe("POST /api/v1/auth/login", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("logs in a user through the HTTP API", async () => {
        const loginData = {
            email: "freelancer@example.com",
            password: "securepassword",
        };

        const loginResult = {
            user: {
                id: "user-id",
                email: loginData.email,
                businessProfileId: "profile-id",
            },
            accessToken: "access-token",
            refreshToken: "refresh-token",
        };

        mocks.login.mockResolvedValue(
            loginResult,
        );

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send(loginData);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            success: true,
            message: "Login successful",
            data: loginResult,
        });

        expect(mocks.login).toHaveBeenCalledWith(
            loginData,
        );
    });

    it("rejects invalid login data", async () => {
        const invalidLoginData = {
            email: "invalid-email",
            password: "short",
        };

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send(invalidLoginData);

        expect(response.status).toBe(422);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe(
            "Validation failed.",
        );

        expect(mocks.login).not.toHaveBeenCalled();
    });

    it("rejects a login request with missing required fields", async () => {
        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "freelancer@example.com",
            });

        expect(response.status).toBe(422);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe(
            "Validation failed.",
        );

        expect(mocks.login).not.toHaveBeenCalled();
    });
});
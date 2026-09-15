import request from "supertest";
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
    register: vi.fn(),
}));

vi.mock(
    "../../../src/modules/auth/services/registration.service.js",
    () => ({
        default: {
            register: mocks.register,
        },
    }),
);

const { default: app } = await import("../../app.js");

describe("POST /api/v1/auth/register", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("registers a user through the HTTP API", async () => {
        const registrationData = {
            email: "freelancer@example.com",
            password: "securepassword",
            businessName: "Acme Studio",
        };

        const registrationResult = {
            user: {
                id: "user-id",
                email: registrationData.email,
                businessProfileId: "profile-id",
            },
            accessToken: "access-token",
            refreshToken: "refresh-token",
        };

        mocks.register.mockResolvedValue(
            registrationResult,
        );

        const response = await request(app)
            .post("/api/v1/auth/register")
            .send(registrationData);

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            success: true,
            message: "Registration successful",
            data: registrationResult,
        });

        expect(mocks.register).toHaveBeenCalledWith(
            registrationData,
        );
    });

    it("rejects invalid registration data", async () => {
        const invalidRegistrationData = {
            email: "invalid-email",
            password: "short",
            businessName: "",
        };

        const response = await request(app)
            .post("/api/v1/auth/register")
            .send(invalidRegistrationData);

        expect(response.status).toBe(422);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe(
            "Validation failed.",
        );

        expect(mocks.register).not.toHaveBeenCalled();
    });

    it("rejects a registration request with missing required fields", async () => {
        const response = await request(app)
            .post("/api/v1/auth/register")
            .send({
                email: "freelancer@example.com",
            });

        expect(response.status).toBe(422);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe(
            "Validation failed.",
        );

        expect(mocks.register).not.toHaveBeenCalled();
    });
});
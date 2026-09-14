import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    startSession: vi.fn(),
    findByEmail: vi.fn(),
    createUser: vi.fn(),
    createProfile: vi.fn(),
    createSession: vi.fn(),
    hashPassword: vi.fn(),
    hashSessionToken: vi.fn(),
    generateAccessToken: vi.fn(),
    generateRefreshToken: vi.fn(),
    getTokenExpirationDate: vi.fn(),
}));

vi.mock("mongoose", () => ({
    default: {
        startSession: mocks.startSession,
    },
}));

vi.mock(
    "../../../modules/auth/repositories/user.repository.js",
    () => ({
        default: {
            findByEmail: mocks.findByEmail,
            createUser: mocks.createUser,
        },
    }),
);

vi.mock(
    "../../../modules/business-profile/services/business-profile.service.js",
    () => ({
        default: {
            createProfile: mocks.createProfile,
        },
    }),
);

vi.mock(
    "../../../modules/auth/repositories/authentication-session.repository.js",
    () => ({
        default: {
            createSession: mocks.createSession,
        },
    }),
);

vi.mock(
    "../../../modules/auth/services/password.service.js",
    () => ({
        default: {
            hashPassword: mocks.hashPassword,
        },
    }),
);

vi.mock(
    "../../../modules/auth/services/session-token.service.js",
    () => ({
        default: {
            hashSessionToken: mocks.hashSessionToken,
        },
    }),
);

vi.mock(
    "../../../modules/auth/services/token.service.js",
    () => ({
        default: {
            generateAccessToken: mocks.generateAccessToken,
            generateRefreshToken: mocks.generateRefreshToken,
            getTokenExpirationDate:
                mocks.getTokenExpirationDate,
        },
    }),
);

import registrationService from "../../../modules/auth/services/registration.service.js";

describe("Registration Service", () => {
    const registrationData = {
        email: "freelancer@example.com",
        password: "securepassword",
        businessName: "Acme Studio",
    };

    const transactionSession = {
        withTransaction: vi.fn(),
        endSession: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();

        mocks.startSession.mockResolvedValue(
            transactionSession,
        );

        transactionSession.withTransaction.mockImplementation(
            async (callback) => callback(),
        );

        transactionSession.endSession.mockResolvedValue();

        mocks.findByEmail.mockResolvedValue(null);

        mocks.hashPassword.mockResolvedValue(
            "hashed-password",
        );

        mocks.createProfile.mockResolvedValue({
            _id: "profile-id",
        });

        mocks.createUser.mockResolvedValue({
            _id: "user-id",
            email: registrationData.email,
            businessProfileId: "profile-id",
        });

        mocks.generateAccessToken.mockReturnValue(
            "access-token",
        );

        mocks.generateRefreshToken.mockReturnValue(
            "refresh-token",
        );

        mocks.hashSessionToken.mockReturnValue(
            "refresh-token-hash",
        );

        mocks.getTokenExpirationDate.mockReturnValue(
            new Date("2026-09-21T00:00:00.000Z"),
        );

        mocks.createSession.mockResolvedValue({
            _id: "session-id",
        });
    });

    it("registers a user and creates the required onboarding records", async () => {
        const result =
            await registrationService.register(
                registrationData,
            );

        expect(mocks.findByEmail).toHaveBeenCalledWith(
            registrationData.email,
            { session: transactionSession },
        );

        expect(mocks.hashPassword).toHaveBeenCalledWith(
            registrationData.password,
        );

        expect(mocks.createProfile).toHaveBeenCalledWith(
            {
                businessName:
                    registrationData.businessName,
                email: registrationData.email,
            },
            { session: transactionSession },
        );

        expect(mocks.createUser).toHaveBeenCalledWith(
            {
                email: registrationData.email,
                passwordHash: "hashed-password",
                businessProfileId: "profile-id",
            },
            { session: transactionSession },
        );

        expect(mocks.createSession).toHaveBeenCalledWith(
            {
                userId: "user-id",
                refreshTokenHash:
                    "refresh-token-hash",
                expiresAt:
                    new Date(
                        "2026-09-21T00:00:00.000Z",
                    ),
            },
            { session: transactionSession },
        );

        expect(result).toEqual({
            user: {
                _id: "user-id",
                email: registrationData.email,
                businessProfileId: "profile-id",
            },
            accessToken: "access-token",
            refreshToken: "refresh-token",
        });
    });

    it("rejects registration when the email already exists", async () => {
        mocks.findByEmail.mockResolvedValue({
            _id: "existing-user",
        });

        await expect(
            registrationService.register(
                registrationData,
            ),
        ).rejects.toMatchObject({
            code: "USER_ALREADY_EXISTS",
        });

        expect(mocks.hashPassword).not.toHaveBeenCalled();
        expect(mocks.createProfile).not.toHaveBeenCalled();
        expect(mocks.createUser).not.toHaveBeenCalled();
        expect(mocks.createSession).not.toHaveBeenCalled();
    });

    it("ends the database session after registration", async () => {
        await registrationService.register(
            registrationData,
        );

        expect(
            transactionSession.endSession,
        ).toHaveBeenCalled();
    });
});
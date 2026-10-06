import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
    findByEmail: vi.fn(),
    createSession: vi.fn(),
    comparePassword: vi.fn(),
    hashSessionToken: vi.fn(),
    generateAccessToken: vi.fn(),
    generateRefreshToken: vi.fn(),
    getTokenExpirationDate: vi.fn(),
}));

vi.mock(
    "../../../modules/auth/repositories/user.repository.js",
    () => ({
        default: {
            findByEmail: mocks.findByEmail,
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
            comparePassword:
                mocks.comparePassword,
        },
    }),
);

vi.mock(
    "../../../modules/auth/services/session-token.service.js",
    () => ({
        default: {
            hashSessionToken:
                mocks.hashSessionToken,
        },
    }),
);

vi.mock(
    "../../../modules/auth/services/token.service.js",
    () => ({
        default: {
            generateAccessToken:
                mocks.generateAccessToken,

            generateRefreshToken:
                mocks.generateRefreshToken,

            getTokenExpirationDate:
                mocks.getTokenExpirationDate,
        },
    }),
);

import loginService from "../../../modules/auth/services/login.service.js";

describe("Login Service", () => {
    const loginData = {
        email: "freelancer@example.com",
        password: "securepassword",
    };

    beforeEach(() => {
        vi.clearAllMocks();

        mocks.findByEmail.mockResolvedValue({
            _id: "user-id",
            email: loginData.email,
            passwordHash: "hashed-password",
            businessProfileId: "profile-id",
        });

        mocks.comparePassword.mockResolvedValue(true);

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
            new Date("2026-10-10T00:00:00.000Z"),
        );

        mocks.createSession.mockResolvedValue({
            _id: "session-id",
        });
    });

    it("logs in a user with valid credentials", async () => {
        const result =
            await loginService.login(loginData);

        expect(mocks.findByEmail).toHaveBeenCalledWith(
            loginData.email,
        );

        expect(
            mocks.comparePassword,
        ).toHaveBeenCalledWith(
            loginData.password,
            "hashed-password",
        );

        expect(
            mocks.generateAccessToken,
        ).toHaveBeenCalledWith({
            userId: "user-id",
        });

        expect(
            mocks.generateRefreshToken,
        ).toHaveBeenCalledWith({
            userId: "user-id",
        });

        expect(
            mocks.hashSessionToken,
        ).toHaveBeenCalledWith(
            "refresh-token",
        );

        expect(
            mocks.getTokenExpirationDate,
        ).toHaveBeenCalledWith(
            "refresh-token",
        );

        expect(
            mocks.createSession,
        ).toHaveBeenCalledWith({
            userId: "user-id",
            refreshTokenHash:
                "refresh-token-hash",
            expiresAt:
                new Date(
                    "2026-10-10T00:00:00.000Z",
                ),
        });

        expect(result).toEqual({
            user: {
                id: "user-id",
                email: loginData.email,
                businessProfileId: "profile-id",
            },
            accessToken: "access-token",
            refreshToken: "refresh-token",
        });
    });
});
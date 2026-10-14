import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
    verifyAccessToken: vi.fn(),
}));

vi.mock(
    "../../../modules/auth/services/token.service.js",
    () => ({
        default: {
            verifyAccessToken: mocks.verifyAccessToken,
        },
    }),
);

import authenticate from "../../../core/middlewares/authenticate.js";

describe("Authenticate Middleware", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        vi.clearAllMocks();

        req = {
            get: vi.fn(),
            user: undefined,
        };

        res = {};
        next = vi.fn();
    });

    it("rejects a request when the authorization header is missing", () => {
        req.get.mockReturnValue(undefined);

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledOnce();

        const error = next.mock.calls[0][0];

        expect(error).toMatchObject({
            message: "Authentication is required.",
            code: "AUTHENTICATION_REQUIRED",
        });

        expect(mocks.verifyAccessToken).not.toHaveBeenCalled();
    });

    it("rejects a malformed authorization scheme", () => {
        req.get.mockReturnValue("Basic abc123");

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledOnce();

        expect(next.mock.calls[0][0]).toMatchObject({
            message: "A valid Bearer token is required.",
            code: "INVALID_ACCESS_TOKEN",
        });

        expect(mocks.verifyAccessToken).not.toHaveBeenCalled();
    });

    it("rejects a Bearer header without a token", () => {
        req.get.mockReturnValue("Bearer");

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledOnce();

        expect(next.mock.calls[0][0]).toMatchObject({
            code: "INVALID_ACCESS_TOKEN",
        });

        expect(mocks.verifyAccessToken).not.toHaveBeenCalled();
    });

    it("rejects extra values in the authorization header", () => {
        req.get.mockReturnValue("Bearer token123 extra");

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledOnce();

        expect(next.mock.calls[0][0]).toMatchObject({
            code: "INVALID_ACCESS_TOKEN",
        });

        expect(mocks.verifyAccessToken).not.toHaveBeenCalled();
    });

    it("attaches the user identity when the access token is valid", () => {
        req.get.mockReturnValue("Bearer valid-access-token");

        mocks.verifyAccessToken.mockReturnValue({
            userId: "user-123",
            tokenType: "access",
        });

        authenticate(req, res, next);

        expect(mocks.verifyAccessToken).toHaveBeenCalledWith(
            "valid-access-token",
        );

        expect(req.user).toEqual({
            userId: "user-123",
        });

        expect(next).toHaveBeenCalledOnce();
        expect(next).toHaveBeenCalledWith();
    });

    it("rejects a token whose payload has no userId", () => {
        req.get.mockReturnValue("Bearer token-without-user");

        mocks.verifyAccessToken.mockReturnValue({
            tokenType: "access",
        });

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledOnce();

        expect(next.mock.calls[0][0]).toMatchObject({
            code: "INVALID_ACCESS_TOKEN",
        });

        expect(req.user).toBeUndefined();
    });

    it("rejects a token whose userId is empty", () => {
        req.get.mockReturnValue("Bearer token-with-empty-user");

        mocks.verifyAccessToken.mockReturnValue({
            userId: "",
            tokenType: "access",
        });

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledOnce();

        expect(next.mock.calls[0][0]).toMatchObject({
            code: "INVALID_ACCESS_TOKEN",
        });

        expect(req.user).toBeUndefined();
    });

    it("converts JWT verification errors into an authentication error", async () => {
        const jwt = await import("jsonwebtoken");

        req.get.mockReturnValue("Bearer invalid-token");

        mocks.verifyAccessToken.mockImplementation(() => {
            throw new jwt.JsonWebTokenError("Invalid token");
        });

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledOnce();

        expect(next.mock.calls[0][0]).toMatchObject({
            message: "Invalid or expired access token.",
            code: "INVALID_ACCESS_TOKEN",
        });
    });

    it("forwards unexpected errors to the error handler", () => {
        const error = new Error("Unexpected service failure");

        req.get.mockReturnValue("Bearer some-token");

        mocks.verifyAccessToken.mockImplementation(() => {
            throw error;
        });

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
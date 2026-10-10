import { UnauthorizedError } from "../../../core/shared/errors/index.js";
import authenticationSessionRepository from "../repositories/authentication-session.repository.js";
import sessionTokenService from "./session-token.service.js";
import tokenService from "./token.service.js";

const INVALID_REFRESH_TOKEN = {
    message: "Invalid or expired refresh token.",
    code: "INVALID_REFRESH_TOKEN",
};

const throwInvalidRefreshToken = () => {
    throw new UnauthorizedError(
        INVALID_REFRESH_TOKEN.message,
        INVALID_REFRESH_TOKEN.code,
    );
};

const refreshAccessToken = async (refreshToken) => {
    if (
        typeof refreshToken !== "string" ||
        !refreshToken.trim()
    ) {
        throwInvalidRefreshToken();
    }

    let payload;

    try {
        payload = tokenService.verifyRefreshToken(refreshToken);
    } catch {
        throwInvalidRefreshToken();
    }

    const refreshTokenHash =
        sessionTokenService.hashSessionToken(refreshToken);

    const session =
        await authenticationSessionRepository.findByRefreshTokenHash(
            refreshTokenHash,
        );

    if (!session) {
        throwInvalidRefreshToken();
    }

    const sessionIsExpired =
        !(session.expiresAt instanceof Date) ||
        Number.isNaN(session.expiresAt.getTime()) ||
        session.expiresAt.getTime() <= Date.now();

    const sessionIsRevoked = session.revokedAt != null;

    const userId = session.userId?.toString();

    if (
        sessionIsExpired ||
        sessionIsRevoked ||
        !userId ||
        payload.userId !== userId
    ) {
        throwInvalidRefreshToken();
    }

    const accessToken = tokenService.generateAccessToken({
        userId,
    });

    return { accessToken };
};

const refreshTokenService = {
    refreshAccessToken,
};

export default refreshTokenService;
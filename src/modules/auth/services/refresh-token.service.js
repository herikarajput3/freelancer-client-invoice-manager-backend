import mongoose from "mongoose";

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

    if (
        !mongoose.isValidObjectId(payload.sessionId) ||
        typeof payload.userId !== "string"
    ) {
        throwInvalidRefreshToken();
    }

    const session =
        await authenticationSessionRepository
            .findByIdWithRefreshTokenHash(payload.sessionId);

    if (!session) {
        throwInvalidRefreshToken();
    }

    const now = Date.now();

    const sessionIsExpired =
        !(session.expiresAt instanceof Date) ||
        Number.isNaN(session.expiresAt.getTime()) ||
        session.expiresAt.getTime() <= now;

    if (session.revokedAt != null || sessionIsExpired) {
        throwInvalidRefreshToken();
    }

    if (session.userId.toString() !== payload.userId) {
        throwInvalidRefreshToken();
    }

    const currentRefreshTokenHash =
        sessionTokenService.hashSessionToken(refreshToken);

    if (session.refreshTokenHash !== currentRefreshTokenHash) {
        await authenticationSessionRepository.revokeSession(
            session._id,
        );

        throwInvalidRefreshToken();
    }

    const nextRefreshToken = tokenService.generateRefreshToken({
        userId: payload.userId,
        sessionId: session._id.toString(),
    });

    const nextRefreshTokenHash =
        sessionTokenService.hashSessionToken(nextRefreshToken);

    const expiresAt =
        tokenService.getTokenExpirationDate(nextRefreshToken);

    const rotatedSession =
        await authenticationSessionRepository.rotateSession({
            sessionId: session._id,
            currentRefreshTokenHash,
            nextRefreshTokenHash,
            expiresAt,
        });

    if (!rotatedSession) {
        // The token may have been used again after our initial lookup.
        await authenticationSessionRepository.revokeSession(
            session._id,
        );

        throwInvalidRefreshToken();
    }

    const accessToken = tokenService.generateAccessToken({
        userId: payload.userId,
    });

    return {
        accessToken,
        refreshToken: nextRefreshToken,
    };
};

const refreshTokenService = {
    refreshAccessToken,
};

export default refreshTokenService;
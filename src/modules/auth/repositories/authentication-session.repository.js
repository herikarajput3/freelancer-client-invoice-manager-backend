import AuthenticationSession from "../models/authentication-session.model.js";

const createSession = (sessionData, options = {}) =>
    AuthenticationSession.create([sessionData], options).then(
        ([session]) => session,
    );

const findByRefreshTokenHash = (refreshTokenHash) =>
    AuthenticationSession.findOne({ refreshTokenHash }).select(
        "+refreshTokenHash",
    );

const findActiveSession = (sessionId) =>
    AuthenticationSession.findOne({
        _id: sessionId,
        revokedAt: null,
        expiresAt: { $gt: new Date() },
    });

const revokeSession = (sessionId) =>
    AuthenticationSession.findByIdAndUpdate(
        sessionId,
        { revokedAt: new Date() },
        { new: true },
    );

const authenticationSessionRepository = {
    createSession,
    findByRefreshTokenHash,
    findActiveSession,
    revokeSession,
};

export default authenticationSessionRepository;
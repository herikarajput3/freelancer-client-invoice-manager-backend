import jwt from "jsonwebtoken";

import config from "../../../core/config/index.js";

const JWT_ALGORITHM = "HS256";

const generateAccessToken = (payload) =>
    jwt.sign(
        {
            ...payload,
            tokenType: "access",
        },
        config.jwt.secret,
        {
            algorithm: JWT_ALGORITHM,
            expiresIn: config.jwt.accessExpiresIn,
        },
    );

const generateRefreshToken = (payload) =>
    jwt.sign(
        {
            ...payload,
            tokenType: "refresh",
        },
        config.jwt.secret,
        {
            algorithm: JWT_ALGORITHM,
            expiresIn: config.jwt.refreshExpiresIn,
        },
    );

const verifyAccessToken = (token) => {
    const payload = jwt.verify(
        token,
        config.jwt.secret,
        {
            algorithms: [JWT_ALGORITHM],
        },
    );

    if (payload?.tokenType !== "access") {
        throw new jwt.JsonWebTokenError(
            "Invalid access token type.",
        );
    }

    return payload;
};

const verifyRefreshToken = (token) => {
    const payload = jwt.verify(
        token,
        config.jwt.secret,
        {
            algorithms: [JWT_ALGORITHM],
        },
    );

    if (payload?.tokenType !== "refresh") {
        throw new jwt.JsonWebTokenError(
            "Invalid refresh token type.",
        );
    }

    return payload;
};

const getTokenExpirationDate = (token) => {
    const decodedToken = jwt.decode(token);

    if (!decodedToken?.exp) {
        throw new Error("Token expiration is missing.");
    }

    return new Date(decodedToken.exp * 1000);
};

const tokenService = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    getTokenExpirationDate,
};

export default tokenService;
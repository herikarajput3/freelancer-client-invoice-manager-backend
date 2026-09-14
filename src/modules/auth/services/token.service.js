import jwt from "jsonwebtoken";

import config from "../../../core/config/index.js";

const generateAccessToken = (payload) =>
    jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.accessExpiresIn,
    });

const generateRefreshToken = (payload) =>
    jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.refreshExpiresIn,
    });

const verifyAccessToken = (token) =>
    jwt.verify(token, config.jwt.secret);

const verifyRefreshToken = (token) =>
    jwt.verify(token, config.jwt.secret);

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
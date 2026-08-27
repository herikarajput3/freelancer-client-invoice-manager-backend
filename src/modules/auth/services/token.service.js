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

const tokenService = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
};

export default tokenService;
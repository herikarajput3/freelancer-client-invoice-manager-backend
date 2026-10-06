import { UnauthorizedError, } from "../../../core/shared/errors/index.js";
import userRepository from "../repositories/user.repository.js";
import authenticationSessionRepository from "../repositories/authentication-session.repository.js";
import passwordService from "./password.service.js";
import tokenService from "./token.service.js";
import sessionTokenService from "./session-token.service.js";

const login = async ({
    email,
    password,
}) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new UnauthorizedError(
            "Invalid email or password.",
            "INVALID_CREDENTIALS",
        );
    }

    const isPasswordValid =
        await passwordService.comparePassword(
            password,
            user.passwordHash,
        );

    if (!isPasswordValid) {
        throw new UnauthorizedError(
            "Invalid email or password.",
            "INVALID_CREDENTIALS",
        );
    }

    const accessToken =
        tokenService.generateAccessToken({
            userId: user._id.toString(),
        });

    const refreshToken =
        tokenService.generateRefreshToken({
            userId: user._id.toString(),
        });

    const refreshTokenHash =
        sessionTokenService.hashSessionToken(
            refreshToken,
        );

    const expireAt =
        tokenService.getTokenExpirationDate(
            refreshToken,
        );

    await authenticationSessionRepository.createSession({
        userId: user._id.toString(),
        refreshTokenHash,
        expiresAt: expireAt,
    });

    return {
        user: {
            id: user._id,
            email: user.email,
            businessProfileId: user.businessProfileId,
        },
        accessToken,
        refreshToken,
    };
};

const loginService = {
    login,
};

export default loginService;
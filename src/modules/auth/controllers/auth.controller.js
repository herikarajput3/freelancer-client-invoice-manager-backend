import registrationService from "../services/registration.service.js";
import loginService from "../services/login.service.js";
import sendResponse from "../../../core/responses/sendResponse.js";
import config from "../../../core/config/index.js";
import tokenService from "../services/token.service.js";
import refreshTokenService from "../services/refresh-token.service.js";

const REFRESH_TOKEN_COOKIE = "refreshToken";

const getRefreshTokenCookieOptions = (refreshToken) => ({
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax",
    path: "/api/v1/auth",
    expires: tokenService.getTokenExpirationDate(refreshToken),
});

const sendAuthenticationResponse = (
    res,
    result,
    { statusCode, message },
) => {
    res.cookie(
        REFRESH_TOKEN_COOKIE,
        result.refreshToken,
        getRefreshTokenCookieOptions(result.refreshToken),
    );

    const { refreshToken, ...responseData } = result;

    return sendResponse(res, {
        statusCode,
        success: true,
        message,
        data: responseData,
    });
};
const register = async (req, res, next) => {
    try {
        const result = await registrationService.register(
            req.validated.body,
        );

        return sendAuthenticationResponse(res, result, {
            statusCode: 201,
            message: "Registration successful",
        });
    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await loginService.login(req.validated.body);

        return sendAuthenticationResponse(res, result, {
            statusCode: 200,
            message: "Login successful",
        });
    } catch (error) {
        return next(error);
    }
};


const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        const result =
            await refreshTokenService.refreshAccessToken(
                refreshToken,
            );

        res.cookie(
            REFRESH_TOKEN_COOKIE,
            result.refreshToken,
            getRefreshTokenCookieOptions(result.refreshToken),
        );

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Access token refreshed successfully",
            data: {
                accessToken: result.accessToken,
            },
        });
    } catch (error) {
        return next(error);
    }
};


const authController = {
    register,
    login,
    refresh,
};

export default authController;
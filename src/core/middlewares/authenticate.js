import jwt from "jsonwebtoken";
import tokenService from "../../modules/auth/services/token.service.js";
import { UnauthorizedError } from "../shared/errors/index.js";

const authenticate = (req, res, next) => {
    const authorizationHeader = req.get("authorization");
    if (!authorizationHeader) {
        return next(
            new UnauthorizedError(
                "Authentication is required.",
                "AUTHENTICATION_REQUIRED",
            ),
        );
    }

    const [scheme, token, ...extraParts] =
        authorizationHeader.trim().split(/\s+/);

    if (
        scheme?.toLowerCase() !== "bearer" ||
        !token ||
        extraParts.length > 0
    ) {
        return next(
            new UnauthorizedError(
                "A valid Bearer token is required.",
                "INVALID_ACCESS_TOKEN",
            ),
        );
    }

    try {
        const payload = tokenService.verifyAccessToken(token);

        if (
            typeof payload !== "object" ||
            typeof payload.userId !== "string" ||
            !payload.userId
        ) {
            return next(
                new UnauthorizedError(
                    "A valid Bearer token is required.",
                    "INVALID_ACCESS_TOKEN",
                ),
            );
        }

        req.user = {
            userId: payload.userId,
        };

        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(
                new UnauthorizedError(
                    "Invalid or expired access token.",
                    "INVALID_ACCESS_TOKEN",
                ),
            );
        }
        return next(error);
    }
};

export default authenticate;
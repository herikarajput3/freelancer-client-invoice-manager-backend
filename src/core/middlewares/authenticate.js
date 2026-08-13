import { UnauthorizedError } from "../shared/errors/index.js";

const authenticate = (req, res, next) => {
    return next(
        new UnauthorizedError(
            "Authentication is not implemented yet.",
            "AUTHENTICATION_NOT_CONFIGURED"
        )
    );
};

export default authenticate;
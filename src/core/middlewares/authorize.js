import { ForbiddenError } from "../shared/errors/index.js";

const authorize = (...requirements) => {
    return (req, res, next) => {
        return next(
            new ForbiddenError(
                "Authorization is not implemented yet.",
                "AUTHORIZATION_NOT_CONFIGURED"
            )
        );
    };
};

export default authorize;
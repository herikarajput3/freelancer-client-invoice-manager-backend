import { NotFoundError } from "../shared/errors/index.js";

const notFound = (req, res, next) => {
    next(
        new NotFoundError(
            `Route ${req.originalUrl} not found.`,
            "ROUTE_NOT_FOUND"
        )
    );
};

export default notFound;
import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "./AppError.js";

class NotFoundError extends AppError {
    constructor(
        message = "Resource not found.",
        code = "RESOURCE_NOT_FOUND"
    ) {
        super({
            message,
            statusCode: HTTP_STATUS.NOT_FOUND,
            code,
        });
    }
}

export default NotFoundError;
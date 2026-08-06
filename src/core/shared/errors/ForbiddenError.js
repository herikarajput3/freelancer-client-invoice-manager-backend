import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "./AppError.js";

class ForbiddenError extends AppError {
    constructor(
        message = "Forbidden.",
        code = "FORBIDDEN"
    ) {
        super({
            message,
            statusCode: HTTP_STATUS.FORBIDDEN,
            code,
        });
    }
}

export default ForbiddenError;
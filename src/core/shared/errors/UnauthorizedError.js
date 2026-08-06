import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "./AppError.js";

class UnauthorizedError extends AppError {
    constructor(
        message = "Unauthorized.",
        code = "UNAUTHORIZED"
    ) {
        super({
            message,
            statusCode: HTTP_STATUS.UNAUTHORIZED,
            code,
        });
    }
}

export default UnauthorizedError;
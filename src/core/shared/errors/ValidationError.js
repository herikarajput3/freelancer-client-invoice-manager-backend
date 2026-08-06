import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "./AppError.js";

class ValidationError extends AppError {
    constructor(
        message = "Validation failed.",
        code = "VALIDATION_ERROR"
    ) {
        super({
            message,
            statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
            code,
        });
    }
}

export default ValidationError;
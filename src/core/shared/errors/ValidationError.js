import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "./AppError.js";

class ValidationError extends AppError {
    constructor(
        message = "Validation failed.",
        errors = []
    ) {
        super({
            message,
            statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
            code: "VALIDATION_ERROR",
        });

        this.errors = errors;
    }
}

export default ValidationError;
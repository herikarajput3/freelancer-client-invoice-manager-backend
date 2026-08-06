import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "./AppError.js";

class ConflictError extends AppError {
    constructor(
        message = "Conflict.",
        code = "CONFLICT"
    ) {
        super({
            message,
            statusCode: HTTP_STATUS.CONFLICT,
            code,
        });
    }
}

export default ConflictError;
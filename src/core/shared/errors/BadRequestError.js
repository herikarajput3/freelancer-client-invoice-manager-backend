import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "./AppError.js";

class BadRequestError extends AppError {
    constructor(
        message = "Bad request.",
        code = "BAD_REQUEST"
    ) {
        super({
            message,
            statusCode: HTTP_STATUS.BAD_REQUEST,
            code,
        });
    }
}

export default BadRequestError;
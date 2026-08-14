import config from "../config/index.js";
import logger from "../infrastructure/logger/index.js";
import sendResponse from "../responses/sendResponse.js";
import HTTP_STATUS from "../shared/constants/httpStatus.js";
import AppError from "../shared/errors/AppError.js";
import ValidationError from "../shared/errors/ValidationError.js";

const errorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        return sendResponse(res, {
            statusCode: error.statusCode,
            success: false,
            message: error.message,
            errors: error.errors,
        });
    }

    if (error instanceof AppError) {
        return sendResponse(res, {
            statusCode: error.statusCode,
            success: false,
            message: error.message,
            error: {
                code: error.code,
            },
        });
    }

    logger.error(
        {
            error,
            method: req.method,
            url: req.originalUrl,
        },
        "Unhandled application error"
    );

    return sendResponse(res, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message:
            config.nodeEnv === "production"
                ? "Internal Server Error."
                : error.message,
        error: {
            code: "INTERNAL_SERVER_ERROR",
        },
    });
};

export default errorHandler;
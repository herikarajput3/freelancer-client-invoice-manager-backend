import config from "../config/index.js";
import logger from "../infrastructure/logger/index.js";
import sendResponse from "../responses/sendResponse.js";
import HTTP_STATUS from "../shared/constants/httpStatus.js";
import AppError from "../shared/errors/AppError.js";

const errorHandler = (error, req, res, next) => {
    let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    let code = "INTERNAL_SERVER_ERROR";
    let details;

    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
        code = error.code;
        details = error.details;
    } else {
        logger.error(error);
    }

    return sendResponse(res, {
        statusCode,
        success: false,
        message,
        data: null,
        meta: {
            code,
            ...(details && { details }),
            ...(config.nodeEnv !== "production" && {
                stack: error.stack,
            }),
        },
    });
};

export default errorHandler;
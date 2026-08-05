function sendResponse(
    res,
    {
        statusCode,
        success,
        message,
        data,
        meta
    }
) {
    const response = {
        success,
        message,
        data,
        meta,
    };

    res.status(statusCode).json(response);
}

export default sendResponse;
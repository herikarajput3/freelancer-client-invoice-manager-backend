const sendResponse = (
    res,
    {
        statusCode,
        success,
        message,
        data,
        pagination,
        error,
        errors,
    }
) => {
    if (statusCode === 204) {
        return res.status(statusCode).send();
    }

    const response = {
        success,
        message,
    };

    if (data !== undefined) {
        response.data = data;
    }

    if (pagination !== undefined) {
        response.pagination = pagination;
    }

    if (error !== undefined) {
        response.error = error;
    }

    if (errors !== undefined) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

export default sendResponse;
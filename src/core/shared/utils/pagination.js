const getPagination = (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;

    return {
        page,
        limit,
        skip,
    };
};

const getPaginationMeta = (page, limit, totalItems) => {
    const totalPages = Math.ceil(totalItems / limit);

    return {
        page,
        limit,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
    };
};

export {
    getPagination,
    getPaginationMeta,
};
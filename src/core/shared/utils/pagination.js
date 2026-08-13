const getPagination = (page = 1, limit = 20) => {
    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.max(Number(limit) || 20, 1);

    const skip = (currentPage - 1) * pageSize;

    return {
        page: currentPage,
        limit: pageSize,
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
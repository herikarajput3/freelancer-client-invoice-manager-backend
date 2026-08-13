const optionalAuth = (req, res, next) => {
    next();
};

export default optionalAuth;
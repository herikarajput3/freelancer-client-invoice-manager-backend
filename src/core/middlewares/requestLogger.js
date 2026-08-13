import logger from "../infrastructure/logger/index.js";

const requestLogger = (req, res, next) => {
    const startTime = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - startTime;

        logger.info(
            {
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration,
            },
            "HTTP request completed"
        );
    });

    next();
};

export default requestLogger;
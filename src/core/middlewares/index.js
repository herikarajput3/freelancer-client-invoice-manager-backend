import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import requestLogger from "./requestLogger.js";
import notFound from "./notFound.js";
import errorHandler from "./errorHandler.js";

const setupGlobalMiddleware = (app) => {
    app.use(helmet());

    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(requestLogger);

    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            standardHeaders: "draft-8",
            legacyHeaders: false,
        })
    );
};

export default setupGlobalMiddleware;
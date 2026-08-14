import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import requestLogger from "./requestLogger.js";
import config from "../config/index.js";

const setupGlobalMiddleware = (app) => {
    app.use(helmet());

    app.use(
        cors({
            origin: config.cors.origin,
            credentials: true,
        })
    );

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(requestLogger);

    app.use(
        rateLimit({
            windowMs: config.rateLimit.windowMs,
            limit: config.rateLimit.max,
            standardHeaders: "draft-8",
            legacyHeaders: false,
        })
    );
};

export default setupGlobalMiddleware;
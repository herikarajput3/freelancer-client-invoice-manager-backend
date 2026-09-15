import express from "express";
import mongoose from "mongoose";

import authRoutes from "./modules/auth/routes/auth.routes.js";
import errorHandler from "./core/middlewares/errorHandler.js";
import notFound from "./core/middlewares/notFound.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    const databaseHealthy =
        mongoose.connection.readyState === 1;

    if (!databaseHealthy) {
        return res.status(503).json({
            status: "unhealthy",
            database: "disconnected",
        });
    }

    return res.status(200).json({
        status: "healthy",
        database: "connected",
    });
});

app.use("/api/v1/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
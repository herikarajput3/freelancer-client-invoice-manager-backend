import express from "express";
import mongoose from "mongoose";

const app = express();

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

export default app;
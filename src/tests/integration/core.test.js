import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";

import setupGlobalMiddleware from "../../core/middlewares/index.js";
import errorHandler from "../../core/middlewares/errorHandler.js";
import notFound from "../../core/middlewares/notFound.js";
import { NotFoundError } from "../../core/shared/errors/index.js";

const createTestApp = () => {
    const app = express();

    setupGlobalMiddleware(app);

    app.get("/test/success", (req, res) => {
        res.status(200).json({
            success: true,
        });
    });

    app.get("/test/error", (req, res, next) => {
        next(
            new NotFoundError(
                "Test resource not found.",
                "TEST_NOT_FOUND"
            )
        );
    });

    app.use(notFound);
    app.use(errorHandler);

    return app;
};

describe("core middleware pipeline", () => {
    it("handles a successful request", async () => {
        const app = createTestApp();

        const response = await request(app)
            .get("/test/success");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
        });
    });

    it("handles an application error", async () => {
        const app = createTestApp();

        const response = await request(app)
            .get("/test/error");

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            success: false,
            message: "Test resource not found.",
            error: {
                code: "TEST_NOT_FOUND",
            },
        });
    });

    it("handles an unknown route", async () => {
        const app = createTestApp();

        const response = await request(app)
            .get("/does-not-exist");

        expect(response.status).toBe(404);
        expect(response.body.error.code).toBe(
            "ROUTE_NOT_FOUND"
        );
    });
});
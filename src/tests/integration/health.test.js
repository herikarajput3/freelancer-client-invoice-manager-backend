import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockMongoose = {
    connection: {
        readyState: 1,
    },
};

vi.mock("mongoose", () => ({
    default: mockMongoose,
}));

const { default: app } = await import("../../app.js");

describe("GET /health", () => {
    beforeEach(() => {
        mockMongoose.connection.readyState = 1;
    });

    it("returns 200 when the database is connected", async () => {
        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "healthy",
            database: "connected",
        });
    });

    it("returns 503 when the database is not connected", async () => {
        mockMongoose.connection.readyState = 0;

        const response = await request(app).get("/health");

        expect(response.status).toBe(503);
        expect(response.body).toEqual({
            status: "unhealthy",
            database: "disconnected",
        });
    });
});
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockMongoose = {
    connect: vi.fn(),
    disconnect: vi.fn(),
};

const mockLogger = {
    info: vi.fn(),
    error: vi.fn(),
};

vi.mock("mongoose", () => ({
    default: mockMongoose,
}));

vi.mock("../../../../core/config/index.js", () => ({
    default: {
        database: {
            uri: "mongodb://test-uri",
        },
    },
}));

vi.mock("../../../../core/infrastructure/logger/index.js", () => ({
    default: mockLogger,
}));

const { connectDatabase, disconnectDatabase } = await import(
    "../../../../core/infrastructure/database/connection.js"
);

describe("Database connection", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("connectDatabase", () => {
        it("connects to MongoDB successfully", async () => {
            mockMongoose.connect.mockResolvedValueOnce();

            await connectDatabase();

            expect(mockMongoose.connect).toHaveBeenCalledWith(
                "mongodb://test-uri",
            );

            expect(mockLogger.info).toHaveBeenCalledWith(
                "MongoDB connection established",
            );
        });

        it("logs and rethrows connection errors", async () => {
            const error = new Error("Connection failed");

            mockMongoose.connect.mockRejectedValueOnce(error);

            await expect(connectDatabase()).rejects.toThrow(
                "Connection failed",
            );

            expect(mockLogger.error).toHaveBeenCalledWith(
                { err: error },
                "MongoDB connection failed",
            );
        });
    });

    describe("disconnectDatabase", () => {
        it("disconnects from MongoDB successfully", async () => {
            mockMongoose.disconnect.mockResolvedValueOnce();

            await disconnectDatabase();

            expect(mockMongoose.disconnect).toHaveBeenCalledTimes(1);

            expect(mockLogger.info).toHaveBeenCalledWith(
                "MongoDB connection closed",
            );
        });

        it("logs and rethrows disconnection errors", async () => {
            const error = new Error("Disconnection failed");

            mockMongoose.disconnect.mockRejectedValueOnce(error);

            await expect(disconnectDatabase()).rejects.toThrow(
                "Disconnection failed",
            );

            expect(mockLogger.error).toHaveBeenCalledWith(
                { err: error },
                "MongoDB disconnection failed",
            );
        });
    });
});
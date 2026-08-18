import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

describe("configuration", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        vi.resetModules();

        process.env = {
            ...originalEnv,
            NODE_ENV: "test",
            PORT: "5000",
            MONGODB_URI: "mongodb://localhost:27017/test",
        };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it("loads valid configuration", async () => {
        const { default: config } = await import("../../core/config/index.js");

        expect(config.nodeEnv).toBe("test");
        expect(config.port).toBe(5000);
        expect(config.database.uri).toBe(
            "mongodb://localhost:27017/test",
        );
    });

    it("uses the default port when PORT is not provided", async () => {
        delete process.env.PORT;

        const { default: config } = await import("../../core/config/index.js");

        expect(config.port).toBe(5000);
    });

    it("rejects missing MONGODB_URI", async () => {
        delete process.env.MONGODB_URI;

        await expect(
            import("../../core/config/index.js"),
        ).rejects.toThrow();
    });

    it("rejects an invalid PORT", async () => {
        process.env.PORT = "invalid";

        await expect(
            import("../../core/config/index.js"),
        ).rejects.toThrow();
    });
});
import app from "./app.js";
import config from "./core/config/index.js";
import logger from "./core/infrastructure/logger/index.js";
import {
    connectDatabase,
    disconnectDatabase,
} from "./core/infrastructure/database/connection.js";

let server;

const startServer = async () => {
    try {
        await connectDatabase();

        server = app.listen(config.port, () => {
            logger.info(
                { port: config.port },
                "HTTP server started",
            );
        });
    } catch (error) {
        logger.error({ err: error }, "Server startup failed");

        process.exit(1);
    }
};

const shutdown = async (signal) => {
    logger.info({ signal }, "Shutdown signal received");

    try {
        if (server) {
            await new Promise((resolve, reject) => {
                server.close((error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                });
            });

            logger.info("HTTP server closed");
        }

        await disconnectDatabase();

        logger.info("Graceful shutdown completed");

        process.exit(0);
    } catch (error) {
        logger.error({ err: error }, "Graceful shutdown failed");

        process.exit(1);
    }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
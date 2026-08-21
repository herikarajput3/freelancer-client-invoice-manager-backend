import app from "./app.js";
import config from "./core/config/index.js";
import logger from "./core/infrastructure/logger/index.js";
import { connectDatabase } from "./core/infrastructure/database/connection.js";

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(config.port, () => {
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

startServer();
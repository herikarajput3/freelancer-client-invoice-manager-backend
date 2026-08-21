import mongoose from "mongoose";
import config from "../../config/index.js";
import logger from "../logger/index.js";

const connectDatabase = async () => {
    try {
        await mongoose.connect(config.database.uri);

        logger.info("MongoDB connection established");
    } catch (error) {
        logger.error({ err: error }, "MongoDB connection failed");

        throw error;
    }
};

const disconnectDatabase = async () => {
    try {
        await mongoose.disconnect();

        logger.info("MongoDB connection closed");
    } catch (error) {
        logger.error({ err: error }, "MongoDB disconnection failed");

        throw error;
    }
};

export { connectDatabase, disconnectDatabase };
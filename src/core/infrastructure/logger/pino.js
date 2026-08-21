import pino from "pino";
import config from "../../config/index.js";

const isProduction = config.nodeEnv === "production";

const logger = pino({
    level: isProduction ? "info" : "debug",

    timestamp: pino.stdTimeFunctions.isoTime,

    redact: {
        paths: [
            "password",
            "confirmPassword",
            "token",
            "accessToken",
            "refreshToken",
            "authorization",
            "cookie",
        ],
        censor: "[REDACTED]", // REDACTED is used for censoring sensitive data
    },

    transport: !isProduction
        ? {
              target: "pino-pretty",
              options: {
                  colorize: true,
                  translateTime: "SYS:standard",
                  ignore: "pid,hostname",
              },
          }
        : undefined,
});

export default logger;
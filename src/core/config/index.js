const config = {
    nodeEnv: process.env.NODE_ENV,

    port: process.env.PORT,

    database: {
        uri: process.env.MONGODB_URI,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },

    cors: {
        origin: process.env.CORS_ORIGIN,
    },
};

export default config;
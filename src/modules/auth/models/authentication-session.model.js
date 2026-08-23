import mongoose from "mongoose";

const authenticationSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        refreshTokenHash: {
            type: String,
            required: true,
            select: false,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        revokedAt: {
            type: Date,
            default: null,
        },
    },
    {
        collection: "authentication_sessions",
        timestamps: true,
    },
);

authenticationSessionSchema.index({ userId: 1 });
authenticationSessionSchema.index({ refreshTokenHash: 1 });
authenticationSessionSchema.index({ expiresAt: 1 });

const AuthenticationSession = mongoose.model(
    "AuthenticationSession",
    authenticationSessionSchema,
);

export default AuthenticationSession;
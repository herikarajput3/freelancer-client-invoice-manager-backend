import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },

        passwordHash: {
            type: String,
            required: true,
            select: false,
        },

        businessProfileId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        collection: "users",
        timestamps: true,
    },
);

const User = mongoose.model("User", userSchema);

export default User;
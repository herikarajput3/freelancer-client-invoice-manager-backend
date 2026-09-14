import crypto from "node:crypto";

const hashSessionToken = (token) =>
    crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

const sessionTokenService = {
    hashSessionToken,
};

export default sessionTokenService;
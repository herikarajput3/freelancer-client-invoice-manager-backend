import { describe, expect, it } from "vitest";

import User from "../../../modules/auth/models/user.model.js";

describe("User Model", () => {
    it("defines businessProfileId as a BusinessProfile reference", () => {
        const path = User.schema.path("businessProfileId");

        expect(path).toBeDefined();
        expect(path.options.ref).toBe("BusinessProfile");
        expect(path.options.required).toBe(true);
        expect(path.options.unique).toBe(true);
    });
});
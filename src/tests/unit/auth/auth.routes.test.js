import {
    describe,
    expect,
    it,
    vi,
} from "vitest";

vi.mock(
    "../../../modules/auth/controllers/auth.controller.js",
    () => ({
        default: {
            register: vi.fn(),
        },
    }),
);

vi.mock(
    "../../../modules/auth/validators/registration.validator.js",
    () => ({
        default: {},
    }),
);

vi.mock(
    "../../../core/middlewares/validate.js",
    () => ({
        default: vi.fn(() => vi.fn()),
    }),
);

import authRoutes from "../../../modules/auth/routes/auth.routes.js";

describe("Auth Routes", () => {
    it("defines the registration POST route", () => {
        const registrationRoute =
            authRoutes.stack.find(
                (layer) =>
                    layer.route?.path === "/register",
            );

        expect(registrationRoute).toBeDefined();

        expect(
            registrationRoute.route.methods.post,
        ).toBe(true);

        expect(
            registrationRoute.route.stack.length,
        ).toBeGreaterThanOrEqual(2);
    });
});
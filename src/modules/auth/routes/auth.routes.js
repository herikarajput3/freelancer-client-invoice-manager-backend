import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import registrationSchema from "../validators/registration.validator.js";
import loginSchema from "../validators/login.validator.js";
import validate from "../../../core/middlewares/validate.js";

const router = Router();

router.post(
    "/register",
    validate({
        body: registrationSchema,
    }),
    authController.register,
);

router.post(
    "/login",
    validate({
        body: loginSchema,
    }),
    authController.login,
);

export default router;
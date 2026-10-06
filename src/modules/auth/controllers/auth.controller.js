import registrationService from "../services/registration.service.js";
import loginService from "../services/login.service.js";
import sendResponse from "../../../core/responses/sendResponse.js";

const register = async (req, res, next) => {
    try {
        const result = await registrationService.register(
            req.validated.body,
        );

        return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Registration successful",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await loginService.login(req.validated.body);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        console.log("login error", error);
        return next(error);
    }
};

const authController = {
    register,
    login,
};

export default authController;
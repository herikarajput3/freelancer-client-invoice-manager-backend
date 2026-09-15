import registrationService from "../services/registration.service.js";
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

const authController = {
    register,
};

export default authController;
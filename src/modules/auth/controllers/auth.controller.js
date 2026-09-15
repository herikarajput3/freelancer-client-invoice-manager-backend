import registrationService from "../services/registration.service.js";
import sendResponse from "../../../core/responses/sendResponse.js";

const register = async (req, res, next) => {
    try {
        const result = await registrationService.register(
            req.body,
        );

        return sendResponse(
            res,
            201,
            "Registration successful",
            result,
        );
    } catch (error) {
        return next(error);
    }
};

const authController = {
    register,
};

export default authController;
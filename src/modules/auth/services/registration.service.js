import mongoose from "mongoose";

import { ConflictError } from "../../../core/shared/errors/index.js";
import businessProfileService from "../../business-profile/services/business-profile.service.js";
import authenticationSessionRepository from "../repositories/authentication-session.repository.js";
import userRepository from "../repositories/user.repository.js";
import passwordService from "./password.service.js";
import sessionTokenService from "./session-token.service.js";
import tokenService from "./token.service.js";

const register = async ({
    email,
    password,
    businessName,
}) => {
    const session = await mongoose.startSession();

    try {
        let registrationResult;

        await session.withTransaction(async () => {
            const existingUser =
                await userRepository.findByEmail(
                    email,
                    { session },
                );

            if (existingUser) {
                throw new ConflictError(
                    "An account with this email already exists.",
                    "USER_ALREADY_EXISTS",
                );
            }

            const passwordHash =
                await passwordService.hashPassword(password);

            const businessProfile =
                await businessProfileService.createProfile(
                    {
                        businessName,
                        email,
                    },
                    { session },
                );

            const user = await userRepository.createUser(
                {
                    email,
                    passwordHash,
                    businessProfileId:
                        businessProfile._id,
                },
                { session },
            );

            const accessToken =
                tokenService.generateAccessToken({
                    userId: user._id.toString(),
                });

            const refreshToken =
                tokenService.generateRefreshToken({
                    userId: user._id.toString(),
                });

            const refreshTokenHash =
                sessionTokenService.hashSessionToken(
                    refreshToken,
                );

            const expiresAt =
                tokenService.getTokenExpirationDate(
                    refreshToken,
                );

            await authenticationSessionRepository.createSession(
                {
                    userId: user._id,
                    refreshTokenHash,
                    expiresAt,
                },
                { session },
            );

            registrationResult = {
                user: {
                    id: user._id,
                    email: user.email,
                    businessProfileId: user.businessProfileId,
                },
                accessToken,
                refreshToken,
            };
        });

        return registrationResult;
    }
    catch (error) {
        if (
            error?.code === 11000 &&
            error?.keyPattern?.email
        ) {
            throw new ConflictError(
                "An account with this email already exists.",
                "USER_ALREADY_EXISTS",
            );
        }

        throw error;
    }
    finally {
        await session.endSession();
    }
};

const registrationService = {
    register,
};

export default registrationService;
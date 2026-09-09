import { beforeEach, describe, expect, it, vi } from "vitest";

const mockBusinessProfileRepository = vi.hoisted(() => ({
    createProfile: vi.fn(),
    findById: vi.fn(),
    updateProfile: vi.fn(),
}));

vi.mock(
    "../../../modules/business-profile/repositories/business-profile.repository.js",
    () => ({
        default: mockBusinessProfileRepository,
    }),
);

import businessProfileService from "../../../modules/business-profile/services/business-profile.service.js";

describe("Business Profile Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("createProfile", () => {
        it("creates a business profile through the repository", async () => {
            const profileData = {
                businessName: "Acme Studio",
                ownerName: "John Doe",
            };

            const createdProfile = {
                _id: "profile-id",
                ...profileData,
            };

            mockBusinessProfileRepository.createProfile.mockResolvedValue(
                createdProfile,
            );

            const result =
                await businessProfileService.createProfile(profileData);

            expect(
                mockBusinessProfileRepository.createProfile,
            ).toHaveBeenCalledWith(profileData);

            expect(result).toEqual(createdProfile);
        });
    });

    describe("getProfile", () => {
        it("retrieves a business profile through the repository", async () => {
            const profile = {
                _id: "profile-id",
                businessName: "Acme Studio",
            };

            mockBusinessProfileRepository.findById.mockResolvedValue(
                profile,
            );

            const result =
                await businessProfileService.getProfile("profile-id");

            expect(
                mockBusinessProfileRepository.findById,
            ).toHaveBeenCalledWith("profile-id");

            expect(result).toEqual(profile);
        });
    });

    describe("updateProfile", () => {
        it("updates a business profile through the repository", async () => {
            const profileData = {
                businessName: "Updated Studio",
            };

            const updatedProfile = {
                _id: "profile-id",
                ...profileData,
            };

            mockBusinessProfileRepository.updateProfile.mockResolvedValue(
                updatedProfile,
            );

            const result =
                await businessProfileService.updateProfile(
                    "profile-id",
                    profileData,
                );

            expect(
                mockBusinessProfileRepository.updateProfile,
            ).toHaveBeenCalledWith(
                "profile-id",
                profileData,
            );

            expect(result).toEqual(updatedProfile);
        });
    });
});
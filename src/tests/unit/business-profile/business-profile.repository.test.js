import { beforeEach, describe, expect, it, vi } from "vitest";

const mockBusinessProfile = vi.hoisted(() => ({
    create: vi.fn(),
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
}));

vi.mock(
    "../../../modules/business-profile/models/business-profile.model.js",
    () => ({
        default: mockBusinessProfile,
    }),
);

import businessProfileRepository from "../../../modules/business-profile/repositories/business-profile.repository.js";

describe("Business Profile Repository", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("createProfile", () => {
        it("creates a business profile with the provided data", async () => {
            const profileData = {
                businessName: "Acme Studio",
                ownerName: "John Doe",
            };

            const createdProfile = {
                _id: "profile-id",
                ...profileData,
            };

            mockBusinessProfile.create.mockResolvedValue(createdProfile);

            const result =
                await businessProfileRepository.createProfile(profileData);

            expect(mockBusinessProfile.create).toHaveBeenCalledWith(
                profileData,
            );
            expect(result).toEqual(createdProfile);
        });
    });

    describe("findById", () => {
        it("finds a business profile by its id", async () => {
            const profile = {
                _id: "profile-id",
                businessName: "Acme Studio",
            };

            mockBusinessProfile.findById.mockResolvedValue(profile);

            const result =
                await businessProfileRepository.findById("profile-id");

            expect(mockBusinessProfile.findById).toHaveBeenCalledWith(
                "profile-id",
            );
            expect(result).toEqual(profile);
        });
    });

    describe("updateProfile", () => {
        it("updates a business profile with validators enabled", async () => {
            const profileData = {
                businessName: "Updated Studio",
            };

            const updatedProfile = {
                _id: "profile-id",
                ...profileData,
            };

            mockBusinessProfile.findByIdAndUpdate.mockResolvedValue(
                updatedProfile,
            );

            const result =
                await businessProfileRepository.updateProfile(
                    "profile-id",
                    profileData,
                );

            expect(
                mockBusinessProfile.findByIdAndUpdate,
            ).toHaveBeenCalledWith(
                "profile-id",
                profileData,
                {
                    new: true,
                    runValidators: true,
                },
            );

            expect(result).toEqual(updatedProfile);
        });
    });
});
import businessProfileRepository from "../repositories/business-profile.repository.js";

const createProfile = (profileData, options) =>
    options
        ? businessProfileRepository.createProfile(
            profileData,
            options,
        )
        : businessProfileRepository.createProfile(
            profileData,
        );

const getProfile = (profileId) =>
    businessProfileRepository.findById(profileId);

const updateProfile = (profileId, profileData) =>
    businessProfileRepository.updateProfile(
        profileId,
        profileData,
    );

const businessProfileService = {
    createProfile,
    getProfile,
    updateProfile,
};

export default businessProfileService;
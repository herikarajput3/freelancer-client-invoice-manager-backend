import BusinessProfile from "../models/business-profile.model.js";

const createProfile = async (profileData, options = {}) => {
    const [profile] = await BusinessProfile.create(
        [profileData],
        options,
    );

    return profile;
};

const findById = (profileId) =>
    BusinessProfile.findById(profileId);

const updateProfile = (profileId, profileData) =>
    BusinessProfile.findByIdAndUpdate(
        profileId,
        profileData,
        {
            new: true,
            runValidators: true,
        },
    );

const businessProfileRepository = {
    createProfile,
    findById,
    updateProfile,
};

export default businessProfileRepository;
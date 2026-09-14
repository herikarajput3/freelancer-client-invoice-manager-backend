import BusinessProfile from "../models/business-profile.model.js";

const createProfile = (profileData, options = {}) =>
    BusinessProfile.create([profileData], options).then(
        ([profile]) => profile,
    );

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
import User from "../models/user.model.js";

const createUser = async (userData, options = {}) => {
    const [user] = await User.create([userData], options);
    return user;
};
const findByEmail = (email, options = {}) =>
    User.findOne({
        email: email.toLowerCase(),
    })
        .select("+passwordHash")
        .session(options.session ?? null);

const findById = (userId, options = {}) =>
    User.findById(userId).session(
        options.session ?? null,
    );

const userRepository = {
    createUser,
    findByEmail,
    findById,
};

export default userRepository;
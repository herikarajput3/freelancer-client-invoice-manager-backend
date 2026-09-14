import User from "../models/user.model.js";

const createUser = (userData, options = {}) =>
    User.create([userData], options).then(([user]) => user);
const findByEmail = (email, options = {}) =>
    User.findOne({
        email: email.toLowerCase(),
    })
        .select("+passwordHash")
        .session(options.session ?? null);

const findById = (userId, options = {}) =>
    User.findById(userId).session(options.session ?? null);

const userRepository = {
    createUser,
    findByEmail,
    findById,
};

export default userRepository;
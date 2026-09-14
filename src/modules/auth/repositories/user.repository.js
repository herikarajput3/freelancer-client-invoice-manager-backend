import User from "../models/user.model.js";

const createUser = (userData) => User.create(userData);

const findByEmail = (email) =>
    User.findOne({ email: email.toLowerCase() }).select("+passwordHash");

const findById = (userId) => User.findById(userId);

const userRepository = {
    createUser,
    findByEmail,
    findById,
};

export default userRepository;
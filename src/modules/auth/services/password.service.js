import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

const hashPassword = (password) =>
    bcrypt.hash(password, SALT_ROUNDS);

const comparePassword = (password, passwordHash) =>
    bcrypt.compare(password, passwordHash);

const passwordService = {
    hashPassword,
    comparePassword,
};

export default passwordService;
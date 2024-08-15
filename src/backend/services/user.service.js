const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');

/**
 * Registers a new user.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The created user with a JWT token.
 * @throws {Error} If input validation fails or user already exists.
 */
const registerUser = async (swagId, firstName, lastName, email, password) => {
    if (!(swagId && email && password && firstName && lastName)) {
        throw new Error("All input is required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
        throw new Error("E-mail already in use");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        swag_id: swagId,
        first_name: firstName, 
        last_name: lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
    });

    const token = generateToken(user);

    user.token = token;
    await user.save();

    return user;
};

/**
 * Logs in a user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The logged-in user with a JWT token.
 * @throws {Error} If input validation fails or credentials are invalid.
 */
const loginUser = async (email, password) => {
    if (!(email && password)) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    user.token = token;
    await user.save();

    return user;
};

/**
 * Fetches the profile of a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The user profile.
 * @throws {Error} If the user does not exist.
 */
const getProfile = async (userId) => {
    if (!userId) {
        throw new Error("User Id is required");
    }

    const user = await User.findById(userId)
    .select('-password -__v -token')
    .lean();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};

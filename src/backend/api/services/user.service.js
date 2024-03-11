const bcrypt = require("bcrypt");
const User = require("../models/User");
const { GenerateOTP } = require("../utils/otp");

const createUser = async (req, res, userData) => {
    try {
        const { firstname, surname, mobile_no, DOB, gender, password } = req.body;

        const otp = GenerateOTP();
        // Implement your function to send otp to mobile number

        const hashedPassword = await bcrypt.hash(password, 6);

        const newUser = new User({
            firstname,
            surname,
            mobile_no,
            otp,
            DOB,
            gender,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error("Error Creating User:", error);
        throw error;
    }
};

/**
 * Find User By Email
 * @param {String} email - Email of the user to find
 * @returns {Promise<User>} - Promise resolving to the found user or null if not found
 */
const getUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error("Error finding user", error)
        throw error;
    }
};

/**
 * Get Profile
 * @param {Object} userData - User data object containing email
 * @returns {Promise<Object>} - Promise resolving to the sanitized user profile or null if not found
 */
const getProfile = async (userData) => {
    try {
        const user = await getUser(userData.email);
        if (user) {
            // Avoid deleting the password property from the user object directly,
            // Instead, create a sanitized object to return
            const sanitizedUser = user.toObject();
            delete sanitizedUser.password;
            return sanitizedUser;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error Getting User Profile", error)
        throw error;
    }
};

module.exports = {
    createUser,
    getUser,
    getProfile
};

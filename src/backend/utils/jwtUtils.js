const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const generateToken = (user) => {
    return jwt.sign(
        { user_id: user._id, swag_id: user.swag_id, email: user.email, firstname: user.first_name, lastname: user.last_name },
        jwtConfig.TOKEN_KEY,
        { expiresIn: "2h" }
    );
};

module.exports = { generateToken };

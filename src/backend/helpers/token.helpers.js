const crypto = require('crypto');

// Function to generate random token
const generateRandomToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

module.exports = {
    generateRandomToken
};

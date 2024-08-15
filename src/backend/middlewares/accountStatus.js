const User = require('../models/user');

const checkBanStatus = (req, res, next) => {
    const userId = req.user.id; 

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send('Internal server error');
        if (user.isBanned) return res.status(403).send('Your account is banned. Please contact customer support.');
        next();
    });
}

module.exports = checkBanStatus;
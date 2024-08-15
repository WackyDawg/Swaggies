const httpStatus = require('http-status');
const walletService = require('../services/wallet.service');

const checkPinAttempts = async (req, res, next) => {
  const userId = req.user.user_id;
  const wallet = await walletService.getWalletByUserId(userId);

  if (wallet.isBanned) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "Your account is banned. Please contact customer support."
    });
  }

  const attemptsLeft = 4 - wallet.pinAttempts;
  if (wallet.pinAttempts >= 4) {
    wallet.isBanned = true;
    await wallet.save();
    return res.status(httpStatus.FORBIDDEN).json({
      message: "Your account is banned due to too many incorrect PIN attempts."
    });
  }

  req.attemptsLeft = attemptsLeft; 
  next();
};

module.exports = checkPinAttempts;

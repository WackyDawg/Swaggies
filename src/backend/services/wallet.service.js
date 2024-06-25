const bcrypt = require('bcryptjs');
const Wallet = require("../models/wallet");
const User = require("../models/user");
const WalletTransaction = require("../models/wallet_transaction");
const Transaction = require("../models/transaction");
const NotFoundError = require("../utils/errors/notfound.error");
const { makePayment, verifyPayment, withdrawPayment } = require("../helpers/payment.helpers");


/**
 * Validates if the user has a wallet.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The user's wallet or a message indicating no wallet exists.
 */
const validateUserWallet = async (userId) => {
   try {
      const userWallet = await Wallet.findOne({ userId });

      if (!userWallet) {
        throw new NotFoundError("You Do Not Have Any Wallet");
      }

      return userWallet; 
   } catch (error) { 
      if (error.isOperational) { 
          console.error("User error:", error.message);
          throw error; 
      } else {
          console.error("Internal server error while validating user wallet:", error);
          throw new Error("Internal Server Error");
      }
   }
}

// /**
//  * Retrieves the user's wallet by user ID.
//  * @param {string} userId - The ID of the user.
//  * @returns {Promise<Object>} The user's wallet or null if no wallet exists.
//  */
// const getUserWallet = async (userId) => {
//     try {
//         const userWallet = await Wallet.findOne({ userId });
//         return userWallet;
//     } catch (error) {
//         console.error("Error retrieving user wallet:", error);
//         throw new Error("Internal server Error");
//     }
// };

/**
 * Creates a new wallet for the user.
 * Ensures the user can only create up to three wallets.
 * @param {string} userId - The ID of the user.
 * @param {string} walletName - The name of the wallet.
 * @returns {Promise<Object>} The created wallet.
 * @throws {Error} If the user has already created three wallets.
 */
const createWallet = async (userId, walletName) => {
   try {
      const userWalletCount = await Wallet.countDocuments({ userId });

      if (userWalletCount >= 3) {
          throw new Error("You can only have up to 3 wallets at a time");
      }

      const wallet = await Wallet.create({
          userId,
          walletName,
      });

      return wallet;
   } catch (error) {
      console.error("Error creating user wallet:", error);
      throw new Error("Internal server Error");
   }
}

/**
 * Set Wallet Pin
 * @param {Object} walletData
 * @returns {Promise<Wallet>}
 */
const setWalletPin = async (walletData) => {
    const { userId, walletName, pin } = walletData;

    if (!pin) {
        throw new Error("Please input a pin");
    }

    const hashPin = await bcrypt.hash(pin.toString(), 10);

    let wallet = await Wallet.findOne({ userId, walletName });

    if (!wallet) {
        throw new Error("Wallet not found");
    } 

    if (!wallet.walletPin) {
        wallet.walletPin = hashPin;
        await wallet.save();
    } else {
        throw new Error("Wallet already has a pin set");
    }

    return wallet;
}

/**
 * Fund Wallet
 * @param {Object} walletData
 * @returns {String} paymentLink
 */

const fundWallet = async (walletData) => {
   const user = walletData.user;
   const amount = walletData.amount;
   const frontendBaseUrl = walletData.frontend_base_url;

   let appUrl;
   if (!frontendBaseUrl) {
    appUrl = process.env.APP_URL ? process.env.APP_URL : "http://localhost:3000";
   } else {
    appUrl = frontendBaseUrl
   }

   return makePayment(amount, user, `${appUrl}/api/1.0/wallet/verify`, "Wallet Funding");
}

const verifyWalletFunding = async (walletData) => {
    const user = walletData.user;
    console.log(user._id);
    const payment = await verifyPayment(walletData.transaction_id);
  console.log(payment.customer.email)
    if (payment.customer.email !== user.email) {
      return Promise.reject({
        success: false,
        message: "Could not verify payment",
      });
    }
  };

const transferFund = async () => {
    // Implementation here
}

const withdrawFund = async () => {
    // Implementation here
}

const getWalletBalance = async () => {
    // Implementation here
}

const getBanks = async () => {
    // Implementation here
}

module.exports = {
    validateUserWallet,
    createWallet,
    setWalletPin,
    //getUserWallet,
    fundWallet,
    verifyWalletFunding,
    transferFund,
    withdrawFund,
    getWalletBalance,
    getBanks
};

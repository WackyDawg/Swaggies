const bcrypt = require("bcryptjs");
const Wallet = require("../models/wallet");
const User = require("../models/user");
const WalletTransaction = require("../models/wallet_transaction");
const Transaction = require("../models/transaction");
const NotFoundError = require("../utils/errors/notfound.error");
const {
  makePayment,
  verifyPayment,
  makeTransfer,
  makeP2PTransfer,
  withdrawPayment,
} = require("../helpers/payment.helpers");

async function getWalletByUserId(userId) {
  try {
    return await Wallet.findOne({ userId });
  } catch (error) {
    throw new Error("Internal server error");
  }
}

async function getTransactionsByWalletId (walletId, limit, skip) {
   try {
    return await WalletTransaction.find({ walletId: walletId })
    .skip(skip)
    .limit(limit)
    .exec();
   } catch (error) {
    throw new Error("Internal server error");
   }
}

const getTotalTransactionsCount = async (walletId) => {
  try {
    return await WalletTransaction.countDocuments({ walletId: walletId });
  } catch (error) {
    throw new Error("Internal server error"); 
  }
};


// Increment PIN attempts
const incrementPinAttempts = async (userId) => {
  await Wallet.findOneAndUpdate(
    { userId },
    { $inc: { pinAttempts: 1 } },
    { new: true }
  );
};

// Reset PIN attempts
const resetPinAttempts = async (userId) => {
  await Wallet.findOneAndUpdate({ userId }, { pinAttempts: 0 }, { new: true });
};

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
      console.error(
        "Internal server error while validating user wallet:",
        error
      );
      throw new Error("Internal Server Error");
    }
  }
};

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
const createWallet = async (userId, walletType) => {
  try {
    const userWalletCount = await Wallet.countDocuments({ userId });

    if (userWalletCount >= 3) {
      throw new Error("You can only have up to 3 wallets at a time");
    }

    const wallet = await Wallet.create({
      userId,
      walletType,
    });

    return wallet;
  } catch (error) {
    console.error("Error creating user wallet:", error);
    throw new Error("Internal server Error");
  }
};

/**
 * Set Wallet Pin
 * @param {Object} walletData
 * @returns {Promise<Wallet>}
 */
const setWalletPin = async (walletData) => {
  const { userId, pin } = walletData;

  if (!pin) {
    throw new Error("Please input a pin");
  }

  const hashPin = await bcrypt.hash(pin.toString(), 10);

  let wallet = await Wallet.findOne({ userId });

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
};

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
    appUrl = process.env.APP_URL
      ? process.env.APP_URL
      : "http://localhost:9000";
  } else {
    appUrl = frontendBaseUrl;
  }

  return makePayment(
    amount,
    user,
    `${appUrl}/api/1.0/wallet/verify`,
    "Wallet Funding"
  );
};

const verifyWalletFunding = async (walletData) => {
  try {
    const payment = await verifyPayment(walletData.transaction_id);
    const user = await User.findOne({ email: payment.customer.email });

    if (!user || payment.customer.email !== user.email) {
      return Promise.reject({
        success: false,
        message: "Could not verify payment",
      });
    }

    const existingTransaction = await Transaction.findOne({
      userId: user._id,
      transactionId: payment.id,
    });

    if (existingTransaction) {
      return Promise.resolve({
        success: true,
        message: "Transaction already exists",
      });
    }

    const newTransaction = new Transaction({
      userId: user._id,
      transactionId: payment.id,
      tx_ref: payment.tx_ref,
      name: payment.customer.name,
      email: payment.customer.email,
      amount: payment.amount,
      currency: payment.currency,
      transaction_type: "funding",
      paymentStatus: payment.status,
      paymentGateway: "flutterwave",
    });

    await newTransaction.save();

    const userWallet = await Wallet.findOne({ userId: user._id });

    if (!userWallet) {
      return Promise.reject({
        success: false,
        message: "User does not have a wallet",
      });
    }

    const newWalletTransaction = new WalletTransaction({
      amount: payment.amount,
      userId: user._id,
      walletId: userWallet._id,
      transactionId: payment.id,
      tx_ref: payment.tx_ref,
      isInflow: true,
      paymentMethod: "flutterwave",
      transaction_type: "funding",
      currency: payment.currency,
      status: payment.status,
    });

    await newWalletTransaction.save();

    const updatedWallet = await Wallet.findOneAndUpdate(
      { userId: user._id },
      { $inc: { balance: payment.amount } },
      { new: true }
    );

    if (!updatedWallet) {
      return Promise.reject({
        success: false,
        message: "Failed to update wallet balance",
      });
    }


    return Promise.resolve({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return Promise.reject({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

const transferFund = async (transferData) => {
  const {
    user,
    pin,
    amount,
    account_bank,
    account_number,
    swag_id,
    narration,
    transferType,
  } = transferData;
  
  const userId = user.user_id;
  const senderSwagId = user.swag_id;

  const wallet = await getWalletByUserId(userId);
  if (!wallet) throw new NotFoundError("Wallet Not Found");

  // Validate PIN
  const isPinValid = await bcrypt.compare(pin.toString(), wallet.walletPin);
  if (!isPinValid) {
    await incrementPinAttempts(userId);
    const maxAttempts = 4;
    const currentAttempts = wallet.pinAttempts || 0;

    if (currentAttempts >= maxAttempts) {
      await Wallet.findOneAndUpdate({ userId }, { isBanned: true });
      throw new Error("Account banned due to multiple failed PIN attempts");
    }

    const attemptsLeft = maxAttempts - currentAttempts;
    throw new Error(`Invalid PIN. Attempts left: ${attemptsLeft}`);
  }

  // Reset pin attempts on successful validation
  await resetPinAttempts(userId);

  // Check wallet balance
  if (wallet.balance < amount) throw new Error("Insufficient balance");

  wallet.balance -= amount;
  await wallet.save();

  let transferResponse;

  // Handle transfer types: Bank or P2P
  if (transferType === "bank") {
    transferResponse = await makeTransfer(amount, account_bank, account_number, narration);
  } else if (transferType === "p2p") {
    // Prevent self-transfer
    if (Array.isArray(swag_id) && swag_id.includes(senderSwagId) || swag_id === senderSwagId) {
      throw new Error("You cannot send funds to self.");
    }

    // Handle P2P transfer(s)
    if (Array.isArray(swag_id)) {
      transferResponse = await Promise.all(swag_id.map(id => makeP2PTransfer(id, amount)));
    } else {
      transferResponse = await makeP2PTransfer(swag_id, amount);
    }
  }

  const transactionType = transferType === "p2p" ? "p2p" : "disburse";
  
  // Generate description based on transfer type
  const generateDescription = (response) => {
    if (transferType === 'bank') {
      return `${user.firstname} ${user.lastname} to ${transferResponse.data.full_name || account_number}\nSent ₦${amount} to ${transferResponse.data.bank_name} - ${transferResponse.data.account_number}`;
    } else {
      return `${user.firstname} ${user.lastname} sent ₦${amount} to recipient  ${response.data.full_name} (${response.data.swagid || swag_id})`;
    }
  };

  // Normalize transferResponse into an array
  const transactions = Array.isArray(transferResponse) ? transferResponse : [transferResponse];

  // Store wallet transactions and main transactions
  await Promise.all(
    transactions.map(response => {
      const isP2P = transferType === 'p2p';
      const description = generateDescription(response);
      
      return Promise.all([
        WalletTransaction.create({
          amount,
          userId,
          walletId: wallet._id,
          description: narration || description,
          account_number: isP2P ? undefined : transferResponse.data.account_number,
          bank_name: isP2P ? undefined : transferResponse.data.bank_name,
          full_name: isP2P ? undefined : transferResponse.data.full_name,
          transactionId: response.data.id,
          tx_ref: isP2P ? response.data.reference : transferResponse.data.reference,
          currency: "NGN",
          isInflow: false,
          paymentMethod: isP2P ? 'p2p_transfer' : 'bank_transfer',
          status: response.status,
          recipient: isP2P ? response.data.swagid : undefined,
          transaction_type: transactionType,
        }),
        
        Transaction.create({
          amount,
          userId,
          walletId: wallet._id,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          transactionId: response.data.id,
          tx_ref: isP2P ? response.data.reference : transferResponse.data.reference,
          currency: "NGN",
          isInflow: false,
          paymentMethod: isP2P ? 'p2p_transfer' : 'bank_transfer',
          paymentStatus: response.status,
          paymentGateway: "flutterwave",
          transaction_type: transactionType,
        })
      ]);
    })
  );

  return transferResponse;
};


const getWalletBalance = async (userId) => {
   try {
    const wallet = await getWalletByUserId(userId);
    if(!wallet) {
      throw new NotFoundError("Wallet Not Found");
    }
    return wallet.balance;
   } catch (error) {
     return ({
      success: false,
      message: "Failed to fetch wallet balance",
      error: error.message
     })
   }
};

const saveBeneficiary = async () => {
   try {
    
   } catch (error) {
    
   }
}

const getTransactions = async (userId, limit, page) => {
  try {
   const wallet = await getWalletByUserId(userId);

   if (!wallet) {
      throw new NotFoundError("Wallet Not Found");
   }

   const walletId = wallet._id;
   const skip = (page - 1) * limit;

   const [transactions, total] = await Promise.all([
       getTransactionsByWalletId(walletId, limit, skip),
       getTotalTransactionsCount(walletId),
   ]);

   return { transactions, total };
  } catch (error) {
   console.error('Error fetching transactions:', error);
   throw error;
  }
}


const getBanks = async () => {
  // Implementation here
};

module.exports = {
  validateUserWallet,
  createWallet,
  setWalletPin,
  //getUserWallet,
  fundWallet,
  getWalletByUserId,
  saveBeneficiary,
  incrementPinAttempts,
  resetPinAttempts,
  verifyWalletFunding,
  transferFund,
  getWalletBalance,
  getTransactions,
  getBanks,
};

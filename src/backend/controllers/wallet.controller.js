const httpStatus = require("http-status");
const walletService = require("../services/wallet.service");
const wallet = require("../models/wallet");

exports.validateUserWallet = async (req, res) => {
  try {
    const userId = req.user.user_id;
    //console.log('User ID (validateUserWallet):', userId); 
    const wallet = await walletService.validateUserWallet(userId);
    res.status(httpStatus.OK).json(wallet);
  } catch (error) {
    console.error("Validate Wallet Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

exports.createUserWallet = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { walletName } = req.body;

    const existingWallet = await walletService.validateUserWallet(userId);
    if (existingWallet) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "User already has a wallet" });
    }

    const wallet = await walletService.createWallet(userId, walletName);
    res.status(httpStatus.OK).json(wallet);
  } catch (error) {
    console.error("Create Wallet Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


exports.setWalletPin = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const {  pin, confirm_pin } = req.body;

    if (pin !== confirm_pin) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "PIN and confirm PIN do not match" });
    }

    const wallet = await walletService.setWalletPin({ userId, pin });
    res.status(httpStatus.OK).json({
      success: true,
      message: "Set pin successfully!",
      result: wallet
    });
  } catch (error) {
    console.error("Set Wallet Pin Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

exports.fundWallet = async (req, res) => {
  try {
    const { amount, frontend_base_url } = req.body;
    const user = req.user;

    const walletData = {
      amount,
      user,
      frontend_base_url
    }

    const paymentLink = await walletService.fundWallet(walletData); 
    return res.status(httpStatus.CREATED).send({
      success: true,
      message: "Initialized Wallet Funding",
      paymentLink,
    });
  } catch (error) {
    console.error("FundWallet Error >>", error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Failed to initialize wallet funding",
      error: error.message,
    });
  }
}

exports.verifyWalletFunding = async (req, res) => {
  try {
    const { transaction_id } = req.query;
    const walletData = { transaction_id };

    const verificationResult = await walletService.verifyWalletFunding(walletData);
    console.log(verificationResult)

    if (!verificationResult.success) {
      return res.status(400).json({
        response: 'Could not verify payment',
        message: verificationResult.message,
      });
    }

    res.status(200).json({
      response: 'wallet funded successfully',
      message: verificationResult.message,
    });
  } catch (err) {
    console.error('Response Error:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.transferFunds = async (req, res) => {
  try {
    const { amount, account_bank, account_number, swag_id, pin, narration, transferType } = req.body;
    const user = req.user;
    const userId = user.user_id;

    const wallet = await walletService.getWalletByUserId(userId);
    if (wallet.isBanned) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "Your account is banned. Please contact customer support."
      })
    }

    const transferData = {
      user,
      amount,
      account_bank,
      account_number,
      swag_id,
      pin,
      narration,
      transferType
    };

    const transfer = await walletService.transferFund(transferData);

    return res.status(httpStatus.CREATED).send({
      success: true,
      message: "Transfer Successful",
      transfer,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Failed to transfer funds",
      error: error.message,
    });
  }
};
const httpStatus = require("http-status");
const walletService = require("../services/wallet.service");

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
      ///console.log('User ID (createUserWallet):', userId);
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
      const { walletName, pin, confirm_pin } = req.body;
  
      if (pin !== confirm_pin) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "PIN and confirm PIN do not match" });
      }
  
      const wallet = await walletService.setWalletPin({ userId, walletName, pin });
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
        
        const paymentLink = await walletService.fundWallet(walletData); // Use await to get the resolved value
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
    const user = req.user;
    const { transaction_id, status, tx_ref } = req.query;

    if (!transaction_id || !status || !tx_ref) {
      throw new BadRequestError("Could not verify payment");
    }

    const walletData = {
      transaction_id,
      status,
      tx_ref,
      user
    };

    await walletService.verifyWalletFunding(walletData);

    return res.status(httpStatus.Created).send({
      success: true,
      message: "Wallet Funded Successfully"
    });
   } catch (error) {
    
   }
};
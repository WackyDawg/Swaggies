const express =  require('express')
const walletController = require("../controllers/wallet.controller.js");
const { walletValidation } = require("../validations")
const validateToken  = require("../middlewares/authMiddleware.js")

const walletRouter = express.Router();


walletRouter.get('/validate', validateToken, walletController.validateUserWallet);
walletRouter.post('/create-wallet', validateToken, walletController.createUserWallet);
walletRouter.post('/setpin-wallet', validateToken, walletController.setWalletPin);
walletRouter.post('/deposit-wallet',[ validateToken ] , walletController.fundWallet);
walletRouter.get('/verify', [  ], walletController.verifyWalletFunding);

module.exports = walletRouter;
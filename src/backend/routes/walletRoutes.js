const express =  require('express')
const walletController = require("../controllers/wallet.controller.js");
const { walletValidation } = require("../validations")
const validateToken  = require("../middlewares/authMiddleware.js");
const { validate } = require('../models/user.js');

const walletRouter = express.Router();


walletRouter.get('/validate', validateToken, walletController.validateUserWallet);
walletRouter.post('/create-wallet', validateToken, walletController.createUserWallet);
walletRouter.post('/setpin-wallet', validateToken, walletController.setWalletPin);
walletRouter.post('/deposit-wallet',[ validateToken ] , walletController.fundWallet);
walletRouter.get('/verify', [  ], walletController.verifyWalletFunding);
walletRouter.post("/transfer", [ validateToken ], walletController.transferFunds);
walletRouter.get("/balance", [ validateToken ], walletController.getWalletBalance)
walletRouter.get("/transactions", [ validateToken ], walletController.getWalletransaction)

module.exports = walletRouter;
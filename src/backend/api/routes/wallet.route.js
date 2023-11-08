import express from 'express'
import walletController from '../controllers/wallet.controller.js'
//import { walletValidation } from "../validations.js";
//import { auth } from "../middlewares/auth.js";
//import { setWalletPin } from "../middlewares/set-wallet-pin.js";

const router = expressRouter();

router.post("/wallet/set-pin", [auth, walletValidation.setWalletPin], walletController.setWalletPin)
router.post("/wallet/fund", [auth, setWalletPin, walletValidation.fundWallet], walletController.fundWallet)
router.get("/wallet/verify", [auth, setWalletPin], walletController.verifyWalletFunding)
router.post("/wallet/transfer", [auth, setWalletPin, walletValidation.transferFund], walletController.transferFund)
router.post("/wallet/withdraw", [auth, setWalletPin, walletValidation.withdrawFund], walletController.withdrawFund)
router.get("/wallet/balance", [auth, setWalletPin], walletController.getWalletBalance);
router.get("/wallet/banks", [auth, setWalletPin], walletController.getBanks);

module.exports = router;
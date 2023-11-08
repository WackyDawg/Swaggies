import express from 'express';
import transactionController from '../controllers/transaction.controller.js';
//import { auth } from "../middlewares/auth.js";

const router = expressRouter();

router.get('/transactions', [auth], transactionController.getTransactions)

module.exports = router;
const express = require('express');
const verificationController = require('../controllers/verificationController.js');
const validateToken  = require("../middlewares/authMiddleware.js")


const verificationRouter = express.Router();

verificationRouter.post('/bvn/verification', [ validateToken ], verificationController.initiateBvnConsent);

module.exports = verificationRouter; 
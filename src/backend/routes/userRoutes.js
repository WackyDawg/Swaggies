const express = require('express');
const userController = require('../controllers/user.controller');
const validateToken  = require("../middlewares/authMiddleware.js")


const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/profile', validateToken, userController.getProfile);
//userRouter.post('/auth/profile', userController.loginUser);

module.exports = userRouter;

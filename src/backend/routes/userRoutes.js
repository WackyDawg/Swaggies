const express = require('express');
const userController = require('../controllers/user.controller'); 

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
//userRouter.post('/auth/profile', userController.loginUser);

module.exports = userRouter;

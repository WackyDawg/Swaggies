import express from "express";
import userController from "../controllers/user.controller.js"
import { userValidation } from "../validations/index.js"
//import { auth } from "../middlewares/auth.js";

router.post('/register', userValidation.register, userController.register)
router.post('/login', userValidation.login, userController.login)
router.get('/auth/profile', [auth], userController.getProfile)

module.exports = router;
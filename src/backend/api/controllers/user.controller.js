import { userService,walletService } from "../services/index.js"
import httpStatus from "http-status";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import jwtConfig from "../config/jwt.js"
import catchAsync from "../utils/catchasync.js";
import UnAuthorizedError from "../utils/errors/unauthorized.error.js"

const register = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }
    const user = await userService.createUser(req.body);
  
    await walletService.createWallet(user[0]);
  
    return res.status(httpStatus.CREATED).send({
      success: true,
      message: "Registered successfully!",
    });
  });
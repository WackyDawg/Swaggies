const httpStatus = require("http-status");
const userService = require("../services/user.service")

 

exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await userService.registerUser(first_name, last_name, email, password);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Registered successfully!",
      results: user
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred during registration. Please try again later."
    });
  }
}; 

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Logged in successfully!",
      results: user 
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred during login. Please try again later."
    });
  }
}

exports.getProfile = async (req, res) => {
  const userId = req.user.user_id;
  //console.log(userId)
  const user = await userService.getProfile(userId);

  return res.status(httpStatus.OK).send({
    success: true,
    message: "Returned profile successfully",
    result: user,
  });
};
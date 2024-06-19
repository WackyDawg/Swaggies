const httpStatus = require("http-status");
const userService = require("../services/user.service")

 

exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await userService.registerUser(first_name, last_name, email, password);
    res.status(httpStatus.CREATED).json(user);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    res.status(httpStatus.OK).json(user);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getProfile(userId);
    res.status(httpStatus.OK).json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
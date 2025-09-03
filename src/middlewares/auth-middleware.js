const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/server-config");
const { UserController } = require("../controllers/index");
const { UserService } = require("../services");


const userService = new UserService();

async function isAuthenticated(req, res, next) {
  try {
    
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Authorization token missing",
        data: {},
        success: false,
        error: "token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const user = await userService.get(decoded.id);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid token: user not found",
        data: {},
        success: false,
        error: "invalid user",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Unauthorized access",
      data: {},
      success: false,
      error: error.message,
    });
  }
}




module.exports = {
  isAuthenticated
}
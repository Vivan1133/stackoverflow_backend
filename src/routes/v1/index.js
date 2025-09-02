const express = require("express");
const { UserController } = require("../../controllers/index");
const { UserMiddleWare } = require("../../middlewares/index");
const router = express.Router();

// api/v1/signup
router.post("/auth/signup", UserMiddleWare.validateSignupRequest, UserController.create);
router.post("/auth/signin", UserMiddleWare.validateSignInRequest, UserController.signin);

module.exports = router;
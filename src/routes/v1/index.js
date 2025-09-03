const express = require("express");
const { UserController, QuestionController, AnswerController, VoteController } = require("../../controllers/index");
const { UserMiddleWare, AuthMiddleWare,  } = require("../../middlewares/index");
const router = express.Router();

// api/v1/auth/signup
router.post("/auth/signup", UserMiddleWare.validateSignupRequest, UserController.create);
router.post("/auth/signin", UserMiddleWare.validateSignInRequest, UserController.signin);


// api/v1/questions
router.post("/questions", AuthMiddleWare.isAuthenticated, QuestionController.create); // create a question
router.get("/questions", QuestionController.getAll);    // get all questions
router.get("/questions/:id", QuestionController.get);   // get question with its answer

router.post("/questions/:id/answers", AuthMiddleWare.isAuthenticated, AnswerController.create);
router.put("/answers/:id/accept", AuthMiddleWare.isAuthenticated, AnswerController.acceptAnswer);

router.post("/questions/:id/vote", AuthMiddleWare.isAuthenticated, VoteController.voteOnQuestion);
router.post("/answers/:id/vote", AuthMiddleWare.isAuthenticated, VoteController.voteOnAnswer);

module.exports = router;
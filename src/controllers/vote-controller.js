const { StatusCodes } = require("http-status-codes");
const { VoteService } = require("../services");

const voteService = new VoteService();

const voteOnQuestion = async (req, res) => {
  try {
    const response = await voteService.voteOnQuestion(req.params.id, req.user.id, req.body.value);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Vote registered successfully",
      data: response,
      error: {}
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Failed to register vote",
      data: {},
      error: error
    });
  }
};


const voteOnAnswer = async (req, res) => {
  try {
    const response = await voteService.voteOnAnswer(req.params.id, req.user.id, req.body.value);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Vote registered successfully",
      data: response,
      error: {}
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Failed to register vote",
      data: {},
      error: error
    });
  }
};


module.exports = {
  voteOnQuestion,
  voteOnAnswer
};

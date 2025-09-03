const { StatusCodes } = require("http-status-codes");
const { AnswerService } = require("../services/index");

const answerService = new AnswerService();

const create = async (req, res) => {
    try {
        const response = await answerService.create({
            body: req.body.body,
            questionId: req.body.questionId,
            userId: req.body.userId,
            isAccepted: req.body.isAccepted
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "posted the answer",
            data: response,
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "cannot post the answer",
            data: {},
            error: error
        });
    }
}


const acceptAnswer = async (req, res) => {
    try {
        const response = await answerService.acceptAnswer(req.params.id, req.user.id);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Answer accepted successfully",
            data: response,
            error: {}
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:"Could not accept answer",
            data: {},
            error: error
        });
    }
};
module.exports = {
    create,
    acceptAnswer
}
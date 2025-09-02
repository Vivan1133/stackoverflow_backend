const { StatusCodes } = require("http-status-codes");
const { QuestionService } = require("../services/index");

const questionService = new QuestionService();

const create = async (req, res) => {
    try {
        const response = await questionService.create(req.data);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "created the user",
            data: response,
            error: {}
        })
    } catch (error) {
        
    }
}
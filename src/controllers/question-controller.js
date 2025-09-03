const { StatusCodes } = require("http-status-codes");
const { QuestionService } = require("../services/index");

const questionService = new QuestionService();

const create = async (req, res) => {
    try {
        const response = await questionService.create({
           title: req.body.title,
           body: req.body.body,
           userId: req.body.userId 
        });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "created the question",
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "cannot create the question",
            data: {},
            error: error
        })
    }
}

const destroy = async (req, res) => {
    try {
        const response = await questionService.create(req.data);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "deleted the user",
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "cannot delete the user",
            data: {},
            error: error
        })
    }
}


const update = async (req, res) => {
    try {
        const response = await questionService.update(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            userId: req.body.userId 
        })
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "updated the user",
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "cannot update the user",
            data: {},
            error: error
        })
    }
}

const get = async (req, res) => {
    try {
        const response = await questionService.get(req.params.id);

        if(!response) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Question not found",
                data: {},
                error: {err: "not able to find the question"}
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "fetched the questions",
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "cannot fetch the question",
            data: {},
            error: error
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await questionService.getAll();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "fetched the questions",
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "cannot fetch the questions",
            data: {},
            error: error
        })
    }
}

module.exports = {
    create,
    update,
    get,
    getAll,
    destroy
}
const { UserService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");

const userService = new UserService();


const create = async (req, res) => {
    try {
        const response = await userService.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(StatusCodes.CREATED).json({
            message: "sucessfully created the user",
            success: true,
            error: {},
            data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "can not create the user",
            data: {},
            error: error
        })
    }
}

const destroy = async (req, res) => {
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: "sucessfully deleted the user",
            success: true,
            error: {},
            data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "can not delete the user",
            data: {},
            error: error
        })
    }
}

const get = async (req, res) => {
    try {
        const response = await userService.get(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: "sucessfully fetched the user",
            success: true,
            error: {},
            data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "can not fetch the user",
            data: {},
            error: error
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await userService.getAll();
        return res.status(StatusCodes.OK).json({
            message: "sucessfully fetched the all users",
            success: true,
            error: {},
            data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "can not fetch the users",
            data: {},
            error: error
        })
    }
}

const update = async (req, res) => {
    try {
        const response = await userService.update(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            message: "sucessfully updated the user",
            success: true,
            error: {},
            data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "can not update the user",
            data: {},
            error: error
        })
    }
}

const signin = async (req, res) => {
    try {
        const response = await userService.signin({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(StatusCodes.OK).json({
            message: "sucessfully signed-in the user",
            success: true,
            error: {},
            data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "can not sign in",
            success: false,
            error: error,
            data: {}
        })
    }
}

module.exports = {
    create,
    destroy,
    get,
    getAll,
    update,
    signin
}
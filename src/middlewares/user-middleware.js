const { StatusCodes } = require("http-status-codes")

function validateSignupRequest(req, res, next) {
    if(!req.body.username) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "missing username while signup request",
            data: {},
            error: "username missing"
        })
    }

    if(!req.body.email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "missing email while signup request",
            data: {},
            error: "email missing"
        })
    }

    if(!req.body.password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "missing password while signup request",
            data: {},
            error: "password missing"
        })
    }

    next();
}

function validateSignInRequest(req, res, next) {
    if(!req.body.email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "missing email while signin request",
            data: {},
            error: "email missing"
        })
    }

    if(!req.body.password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "missing password while signin request",
            data: {},
            error: "password missing"
        })
    }

    next();
}

module.exports = {
    validateSignupRequest,
    validateSignInRequest
}
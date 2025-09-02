const CrudService = require("./crud-service");
const { UserRepository } = require("../repositories/index");
const { AppError } = require("../utils/errors/app-error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/server-config")

class UserService extends CrudService {
    constructor() {
        const userRepository = new UserRepository();
        super(userRepository);
        this.userRepository = userRepository;
    }

    async create(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const response = await this.repository.create({ ...data, password: hashedPassword });
            return response;
        } catch (error) {
            console.log("something went wrong in crud service");
            throw { error };
        }
    }


    comparePassword(plainTextPassword, hashedPassword) {
        try {
            const response = bcrypt.compareSync(plainTextPassword, hashedPassword);
            return response;
        } catch (error) {
            console.log("something went wrong while comparing password");
            throw error;
        }
    }

    createToken(user) {
        try {
            const token = jwt.sign(user, JWT_SECRET_KEY, {
                expiresIn: "1d"
            })
            return token;
        } catch (error) {
            console.log("something went wrong in the token creation");
            throw error;
        }
    }


    async signin(data) {
        try {
            const user = await this.userRepository.getByEmail(data.email);
            if(!user) {
                throw new Error("no username found with provided email");
            }
            
            if(!this.comparePassword(data.password, user.password)) {
                throw new Error("password matching failed");
            }

            const JWT_TOKEN = this.createToken({ id: user.id, email: user.email });
            return JWT_TOKEN;

        } catch (error) {
            console.log("something went wrong while signin in")
            throw error;
        }
    }

    validateToken = (token) => {
        try {
            const response = jwt.verify(token, JWT_SECRET_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in the token validation");
            throw error;
        }
    }

    isAuthenticated = async (token) => {
        try {
            const response = this.validateToken(token);
            if(!response) {
                throw { error: "token validation failed" };
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw { error: "no such user exists anymore "};
            }
            return user.id;

        } catch (error) {
            console.log("something went wrong in the token validation");
            throw error;
        }
    }



}

module.exports = UserService;
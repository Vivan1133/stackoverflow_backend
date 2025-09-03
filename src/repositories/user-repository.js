const CrudRepository = require("./crud-repository");
const { User } = require("../models/index")


class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getByEmail(email) {
        try {
            const response = await User.findOne({
                where: {
                    email: email
                }
            })
            return response;
        } catch (error) {
            console.log("something went wrong in the repo layet");
            throw error;
        }
    }

    async updateReputation(userId, change) {
        const user = await User.get(userId);
        if (user) {
            user.reputation += change;
            await user.save();
        }
        return user;
    }
}

module.exports = UserRepository;
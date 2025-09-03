const CrudRepository = require("./crud-repository");
const { Answer } = require("../models/index")


class AnswerRepository extends CrudRepository {
    constructor() {
        super(Answer);
    }

    async markAccepted(answerId) {
        await Answer.update(
            { isAccepted: true },
            { where: { id: answerId } }
        );
        return await Answer.findByPk(answerId);
    }
}

module.exports = AnswerRepository;
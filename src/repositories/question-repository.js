const { Question, Answer } = require("../models/index");
const CrudRepository = require("./crud-repository");

class QuestionRepository extends CrudRepository {
    constructor() {
        super(Question);
    }

    async get(id) {
        try {
            const response = await Question.findByPk(id, {
                include: {
                    model: Answer,
                    required: false
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QuestionRepository;
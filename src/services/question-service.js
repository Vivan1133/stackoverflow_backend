const QuestionRepository = require("../repositories/index");

class QuestionService extends CrudService {
    constructor() {
        const questionRepository = new QuestionRepository();
        super(questionRepository);
    }

}

module.exports = QuestionService;
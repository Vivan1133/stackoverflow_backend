const { QuestionRepository } = require("../repositories/index");
const CrudService = require("./crud-service");

class QuestionService extends CrudService {
    constructor() {
        const questionRepository = new QuestionRepository();
        super(questionRepository);
        this.questionRepository = questionRepository;
    }

    

}

module.exports = QuestionService;
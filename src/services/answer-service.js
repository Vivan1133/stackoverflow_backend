const CrudService = require("./crud-service");
const { AnswerRepository, QuestionRepository } = require("../repositories/index");



class AnswerService extends CrudService {
    constructor() {
        const answerRepository = new AnswerRepository();
        super(answerRepository);
        this.answerRepository = answerRepository;
        this.questionRepository = new QuestionRepository();
    }

    async acceptAnswer(answerId, userId) {
        const answer = await this.answerRepository.get(answerId);
        if (!answer) {
            const error = new Error("Answer not found");
            error.statusCode = 404;
            throw error;
        }

        const question = await this.questionRepository.get(answer.questionId);
        if (!question) {
            const error = new Error("Question not found");
            error.statusCode = 404;
            throw error;
        }

        if (question.userId !== userId) {
            const error = new Error("You are not authorized to accept an answer for this question");
            error.statusCode = 403;
            throw error;
        }

    const updatedAnswer = await this.answerRepository.markAccepted(answerId);

    return updatedAnswer;
  } 
}

module.exports = AnswerService;
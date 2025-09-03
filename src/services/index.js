const AnswerService = require("./answer-service");
const CrudService = require("./crud-service");
const QuestionService = require("./question-service");
const UserService = require("./user-service");
const VoteService = require("./vote-service");

module.exports = {
    CrudService,
    UserService,
    QuestionService,
    AnswerService,
    VoteService
}
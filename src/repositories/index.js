const AnswerRepository = require("./answer-repository");
const CrudRepository = require("./crud-repository");
const QuestionRepository = require("./question-repository");
const UserRepository = require("./user-repository");
const VoteRepository = require("./vote-repository");

module.exports = {
    CrudRepository,
    UserRepository,
    QuestionRepository,
    AnswerRepository,
    VoteRepository
}
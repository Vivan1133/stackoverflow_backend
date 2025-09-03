const { VoteRepository, QuestionRepository, UserRepository, AnswerRepository } = require("../repositories");

class VoteService {
  constructor() {
    this.voteRepository = new VoteRepository();
    this.questionRepository = new QuestionRepository();
    this.userRepository = new UserRepository();
    this.answerRepository = new AnswerRepository();
  }

  async voteOnQuestion(questionId, userId, value) {
    if (![1, -1].includes(value)) {
      const error = new Error("Vote value must be 1 (upvote) or -1 (downvote)");
      error.statusCode = 400;
      throw error;
    }

    const question = await this.questionRepository.get(questionId);
    if (!question) {
      const error = new Error("Question not found");
      error.statusCode = 404;
      throw error;
    }

    if (question.userId === userId) {
      const error = new Error("You cannot vote on your own question");
      error.statusCode = 403;
      throw error;
    }

    const existingVote = await this.voteRepository.findVote(userId, questionId, "question");

    if (!existingVote) {
      // Create new vote
      await this.voteRepository.createVote(userId, questionId, "question", value);
      await this.userRepository.updateReputation(question.userId, this._getReputationChange("question", value));
    } else if (existingVote.value !== value) {
      // Update vote (switch from up to down or vice versa)
      await this.voteRepository.updateVote(existingVote.id, value);
      await this.userRepository.updateReputation(question.userId, this._getReputationChange("question", value * 2)); 
      // *2 because we remove old value and add new one
    }

    return { votableType: "question", votableId: questionId, userId, value };
  }

    async voteOnAnswer(answerId, userId, value) {
        
        if (![1, -1].includes(value)) {
            const error = new Error("Vote value must be 1 (upvote) or -1 (downvote)");
            error.statusCode = 400;
            throw error;
        }

        const answer = await this.answerRepository.get(answerId);
            if (!answer) {
            const error = new Error("Answer not found");
            error.statusCode = 404;
            throw error;
        }

        if (answer.userId === userId) {
            const error = new Error("You cannot vote on your own answer");
            error.statusCode = 403;
            throw error;
        }

        const existingVote = await this.voteRepository.findVote(userId, answerId, "answer");

        if (!existingVote) {
            // Create new vote
            await this.voteRepository.createVote(userId, answerId, "answer", value);
            await this.userRepository.updateReputation(answer.userId, this._getReputationChange("answer", value));
        } else if (existingVote.value !== value) {
            // Switch vote
            await this.voteRepository.updateVote(existingVote.id, value);
            await this.userRepository.updateReputation(answer.userId, this._getReputationChange("answer", value * 2));
        }

        return { votableType: "answer", votableId: answerId, userId, value };
    }

    _getReputationChange(type, value) {
        if (type === "question") {
            return value === 1 ? 5 : -2;
        }
        if (type === "answer") {
            return value === 1 ? 10 : -2;
        }
        return 0;
    }

}

module.exports = VoteService;

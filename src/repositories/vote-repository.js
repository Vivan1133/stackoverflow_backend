const { Vote } = require("../models");

class VoteRepository {
  async findVote(userId, votableId, votableType) {
    return await Vote.findOne({ where: { userId, votableId, votableType } });
  }

  async createVote(userId, votableId, votableType, value) {
    return await Vote.create({ userId, votableId, votableType, value });
  }

  async updateVote(voteId, value) {
    return await Vote.update({ value }, { where: { id: voteId } });
  }
}

module.exports = VoteRepository;

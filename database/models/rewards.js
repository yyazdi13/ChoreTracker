const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  reward: {
    type: String
  },

  chosen: {
    type: bool
  }
});

module.exports = Reward = mongoose.Schema("Rewards", rewardSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  reward: {
    type: String
  },

  chosen: {
    type: Boolean
  }
});

module.exports = Reward = mongoose.model("rewards", rewardSchema);

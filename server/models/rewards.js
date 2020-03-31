const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  reward: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  chosen: Boolean
});

const Reward = mongoose.model("Rewards", rewardSchema);
module.exports = Reward;

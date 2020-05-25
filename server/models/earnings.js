const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earningsSchema = new Schema({
  amount: {
    type: Schema.Types.Mixed,
    ref: "Chore",
    require: true,
  },

  user: [
    {
      type: Schema.Types.Mixed,
      ref: "User",
    },
  ],

  total: Number,

  saved: Number,
});

const Earnings = mongoose.model("Earnings", earningsSchema);
module.exports = Earnings;

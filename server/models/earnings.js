const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earningsSchema = new Schema({
  current: Number,

  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  saved: Number
});

const Earnings = mongoose.model("Earnings", earningsSchema);
module.exports = Earnings;

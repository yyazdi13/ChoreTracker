const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earningsSchema = new Schema({
  current: {
    type: Number
  },

  saved: {
    type: Number
  }
});

module.exports = Earnings = mongoose.model("earnings", earningsSchema);

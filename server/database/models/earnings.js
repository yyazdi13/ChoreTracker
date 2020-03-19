const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earningsSchema = new Schema({
  current: {
    type: decimal
  },

  saved: {
    type: decimal
  }
});

module.exports = Earnings = mongoose.Schema("earnings", earningsSchema);

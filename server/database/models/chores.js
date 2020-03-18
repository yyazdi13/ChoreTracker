const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ChoreSchema = new Schema({
  chore: {
    type: String,
    required: true
  },
  amount: {
    type: Decimal,
    required: true
  },
  done: {
    type: Bool,
    required: true
  }
});

module.exports = Chore = mongoose.Schema("chores", ChoreSchema);

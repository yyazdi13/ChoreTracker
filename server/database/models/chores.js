const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ChoreSchema = new Schema({
  chore: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
});

module.exports = Chore = mongoose.model("chores", ChoreSchema);

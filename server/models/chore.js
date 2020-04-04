const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ChoreSchema = new Schema({
  chore: String,

  owner: [
    {
      type: Schema.Types.Mixed,
      ref: "User",
      require: false
    }
  ],

  amount: Number,

  done: Boolean
});

const Chore = mongoose.model("Chore", ChoreSchema);
module.exports = Chore;

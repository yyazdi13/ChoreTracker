const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

mongoose.promise = Promise;

//Create the schema
const UserSchema = new Schema({
  id: Schema.ObjectId,

  username: String,

  password: String,

  //role: [
  // {
  //  type: {
  // type: String,
  //enum: ["parent", "child"],
  //  required: true
  //  },

  date: {
    type: Date,
    default: Date.now
  }
});

//]
//});

//Verify user and hash the password
UserSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, 12);
};
UserSchema.methods.comparePassword = function(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

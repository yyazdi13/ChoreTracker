const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

mongoose.promise = Promise;

//Create the schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  role: [
    {
      type: {
        type: String,
        enum: ["parent", "child"],
        required: true
      },

      password: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

//Verify user
UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPasswword => {
    return bcrypt.hashSync(plainTextPasswword, 10);
  }
};

UserSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js------No Password Provided");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
});

module.exports = User = mongoose.model("Users", UserSchema);

const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../database/models/user");

//Call the login, saves the id for the user
passport.serializeUser((user, done) => {
  console.log("serializeUser called, user: ");
  console.log(user);
  done(null, { _id: user._id });
});

//Find the user
passport.deserializeUser((id, done) => {
  console.log("DeserializeUser called");
  User.findOne({ _id: id }, "username", (err, user) => {
    console.log("Deserialize user, user:");
    console.log(user);
    done(null, user);
  });
});
//Use Strategies
passport.use(LocalStrategy);

module.exports = passport;

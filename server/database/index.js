//Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Connect to Mongo Database
mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ChoreLogin", {
  useNewUrlParser: true,
  useFindAndModify: false
});

//your local database url
//27017 is the default mongoDB port
//const uri = "mongodb://localhost:27017/ChoreLogin";

//mongoose.connect(uri).then(
//() => {
/** ready to use. The `mongoose.connect()` promise resolves to undefined. */

console.log("Connected to Mongo");
//},
err => {
  /** handle initial connection error */

  console.log("error connecting to Mongo: ");
  console.log(err);
};
//);

module.exports = mongoose.connection;

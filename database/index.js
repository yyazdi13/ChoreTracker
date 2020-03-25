//Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Connect to Mongo Database
MONGO_URI = "mongodb://localhost/choretracker";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("MongoDB connected"))
  .catch(err => console.log(err));

//mongoose.connect(db, { useNewUrlParser: true }, err => {
// if (err) console.error(err);
//  else console.log("connected to mongodb");
//});

//mongoose.connect(
// process.env.MONGODB_URI || "mongodb://localhost/ChoreTracker",
//{
//useNewUrlParser: true,
//  useFindAndModify: false
// }
//);

//your local database url
//27017 is the default mongoDB port
//const uri = "mongodb://localhost:27017/ChoreTracker";

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

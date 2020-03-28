const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
// const dbConnection = require("./database/index");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const path = require('path');
const router = require('express').Router();
const db = require('../server/database/index');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Route requires
const user = require("./routes/user");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("chore_tracker/build"));
}

// Sessions
// app.use(
//   rewards({
//     secret: "test-test", //pick a random string to make the hash that is generated secure
//     store: new MongoStore({ mongooseConnection: dbConnection }),
//     resave: false, //required
//     saveUninitialized: false //required
//   })
// );

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rewards", { useNewUrlParser: true });


// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/user", user);

app.get("/save", (req, res) => {
 db.Reward.find({}, (err,data) => {
    if (err) throw err;
    else res.json(data);
  })

})

router.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

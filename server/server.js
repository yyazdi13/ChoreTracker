const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
//const dbConnection = require("./database/index");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");

const app = express();
const PORT = process.env.PORT || 3000;

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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ChoreLogin");

// Sessions
app.use(
  session({
    secret: "foo", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: connection })
    //resave: false, //required
    //saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/user", user);

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

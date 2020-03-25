const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
//const mongoose = require("mongoose");
const user = require("./routes/user");
const dbConnection = require("./database/index");
//const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Route requires
//app.use(routes);

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//const mongoURI = "mongodb://localhost/ChoreTracker";

//mongoose
//.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//.then(() => console.log("MonogDB connected"))
//.catch(err => console.log(err));
// })

// .

//Set up connect mongodb-session store
//mongoose.connect(
// process.env.MONGODB_URI || "mongodb://localhost:27071/ChoreTracker",
//{
// useNewUrlParser: true,
//useFindAndModify: false
// }
//);
// Sessions
app.use(
  session({
    secret: "foo", //pick a random string to make the hash that is generated secure
    //store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: true, //required
    saveUninitialized: true //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/user", user);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/register", (req, res) => {
  res.render("register.js");
});

app.get("/login", (req, res) => {
  res.render("login.js");
});

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

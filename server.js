const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const Reward = require("./server/models/rewards");
const cors = require("cors");
const controller = require("./server/controller");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ChoreTracker",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("successfully connected to the database");

    //.then(console.log("MongoDB connected"))
    // .catch(err => console.log(err))
  }
);

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true //allow settings of cookies
  })
);
controller(app);

app.use(
  session({
    secret: "foo",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 * 30 }
  })
);

// Send every request to the React app
// Define any API routes before this runs
//app.get("*", function(req, res) {
// res.sendFile(path.join(__dirname, "./client/build/index.html"));
//});


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

//app.listen(3001, () => console.log("listening"));

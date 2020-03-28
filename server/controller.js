const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
var { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("./models/user");
const Chore = require("./models/chore");
const app = express();

//Validate username and password
module.exports = function(app) {
  const regValidation = [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username is required"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    //check("role")
    // .not()
    //.isEmpty()
    // .withMessage("Role is required, enter parent or child"),
    check(
      "passwordconf",
      "Password confirmation is required and should be the same as the password"
    ).custom(function(value, { req }) {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return value;
    }),

    check("username").custom(value => {
      return User.findOne({ username: value }).then(function(user) {
        if (user) {
          throw new Error("This username already exist");
        }
      });
    })
  ];

  //Routes
  app.post("/api/register", regValidation, register);
  app.get("/", (req, res) => res.json("need a connection"));
  app.post("/api/login", logValidation, loginUser);

  //Check the validation
  function register(req, res) {
    console.log(req.body);
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    //validation completes create the user
    var user = new User(req.body);
    user.password = user.hashPassword(user.password);
    user
      .save()
      .then(user => {
        return res.json(user);
      })
      .catch(err => res.send(err));
  }
};

//user login
const logValidation = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username is required"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
];

function loginUser(req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() });
  }

  User.findOne({
    user: req.body.username
  })
    .then(function(user) {
      if (!user) {
        return res.send({ error: true, message: "User does not exist" });
      }
      if (!user.comparePassword(req.body.password, user.password)) {
        console.log(req.body);
        return res.send({ error: true, message: "Wrong password" });
      }
      req.session.user = user;
      req.session.isLoggedIn = true;
      res.send(user);
      return res.send({ message: "You are signed in " });
    })
    .catch(function(error) {
      console.log(error);
    });
}
function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    res.send(true);
  } else {
    res.send(false);
  }
}

app.get("/api/isLoggedin", isLoggedIn);

//choreValidation - Enter a new chore
const choreValidation = [
  check("chore")
    .not()
    .isEmpty()
    .withMessage("Please select a chore")
];

function addChore(req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() });
  }
  var chore = new Chore(req.body);
  if (req.session.user) {
    chore.user = req.session.user._id;
    chore
      .save()
      .then(chore => {
        res.json(chore);
      })
      .catch(error => {
        res.json(error);
      });
  } else {
    return res.send({ error: "You are not logged in!" });
  }
}
app.post("/api/addchore", choreValidation, addChore);

//Find chore
app.post("api/chore/:id", (req, res) => {
  Chore.findById(req.params.id).then(function(chore) {
    chore.save().then(function(chore) {
      res.send(chore);
    });
  });
});
///Get all chores
function showChores(req, res) {
  Chore.find()
    .populate("user", ["username"])
    .then(chore => {
      res.json(chore);
    })
    .catch(error => {
      res.json(error);
    });
}
app.get("/api/showChores", isLoggedIn, showChores);

//Logout
app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.send({ message: "Logged out" });
});

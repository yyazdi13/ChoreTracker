const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const expressValidator = require("express-validator");
const session = require("express-session");
var { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
//const obj = JSON.parse(JSON.stringify(req.body));
const express = require("express");
const User = require("./models/user");
const Chore = require("./models/chore");
const Reward = require("./models/rewards");
const Earnings = require("./models/earnings");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Validate username and password
module.exports = function (app) {
  const regValidation = [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    check(
      "passwordconf",
      "Password confirmation is required and should be the same as the password"
    ).custom(function (value, { req }) {
      if (value !== req.body.password) {
        console.log(value);
        throw new Error("Passwords do not match");
      }

      return value;
    }),

    check("username").custom(value => {
      return User.findOne({ username: value }).then(function (user) {
        if (user) {
          throw new Error("This username already exists");
        }
      });
    }),
  ];
  //Routes
  app.post("/api/register", regValidation, register);
  // app.get("/", (req, res) => res.json("need a connection"));
  app.post("/api/login", logValidation, loginUser);
  app.post("/api/addchore", choreValidation, addChore);
  app.get("/api/addchore", isLoggedIn, addChore);
  app.get("/save", (req, res) => {
    Reward.find({}, (err, data) => {
      if (err) throw err;
      else res.json(data);
    });
  });

  app.get("/user", (req, res) => {
    User.findOne({ username: req.query.q })
      .then(response => {
        res.send(response);
      })
      .catch(err => res.status(422).end());
  });
  app.post("/api/addReward", (req, res) => {
    console.log(req.body);
    Reward.create(req.body, (err, data) => {
      if (err) throw err;
      else res.json(data);
    });
  });
  app.get("/api/findChores", (req, res) => {
    Chore.find({}, (err, data) => {
      if (err) throw err;
      else res.json(data);
    });
  });
  app.get("/api/findChoreAmount", (req, res) => {
    Chore.findOne({ chore: req.query.q }, (err, data) => {
      if (err) throw err;
      else res.json(data);
    });
  });
  app.post("/api/postChores", (req, res) => {
    Chore.create(
      {
        chore: req.body.chore,
        owner: req.session.user.username,
        amount: req.body.amount,
      },
      (err, data) => {
        if (err) console.log(err);
        else res.send(data);
      }
    );
  });

  //Earnings routes
  app.post("/api/postEarnings", (req, res) => {
    Earnings.create(
      {
        user: req.session.user.username,
        amount: req.body.amount,
        total: req.body.total,
        saved: req.body.saved,
      },
      (err, data) => {
        if (err) console.log(err);
        else res.send(data);
      }
    );
  });

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
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password").not().isEmpty().withMessage("Password is required"),
];

function loginUser(req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() });
  }
  console.log(req.body);
  User.findOne({
    username: req.body.username
  })
    .then(function (user) {
      console.log("The username", user);
      if (!user) {
        return res.send({ error: true, message: "User does not exist" });
      }
      if (!user.comparePassword(req.body.password, user.password)) {
        console.log(req.body);
        return res.send({ error: true, message: "Wrong password" });
      }
      req.session.user = user;
      req.session.isLoggedIn = true;
      // res.send(user);
      return res.send({ message: "You are signed in" });
    })
    .catch(function (error) {
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

app.get("/api/findChores", (req, res) => {
  Chore.find({}, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});
app.post("/api/postChores", (req, res) => {
  Chore.create(
    {
      chore: req.body.chore,
      owner: req.session.user.username,
      amount: req.body.amount,
    },
    (err, data) => {
      if (err) console.log(err);
      else res.send(data);
    }
  );
});

//choreValidation - Enter a new chore
const choreValidation = [
  check("chore").not().isEmpty().withMessage("Please add a chore"),
];

function addChore(req, res) {
  console.log(req.body);
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() });
  }

  var chore = new Chore(req.body);
  if (req.session.user) {
    chore.user = req.session.user.id;
    chore
      .save()
      .then((chore) => {
        res.json(chore);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    return res.send({ error: "You are not logged in!" });
  }
}

//Find chore
app.post("api/chore/:id", (req, res) => {
  Chore.findById(req.params.id).then(function (chore) {
    chore.save().then(function (chore) {
      res.send(chore);
    });
  });
});
///Get all chores
function showChores(req, res) {
  Chore.find()
    .populate("owner", ["username"])
    .then((chore) => {
      res.json(chore);
    })
    .catch((error) => {
      res.json(error);
    });
}

//Logout
app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.send({ message: "Logged out" });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

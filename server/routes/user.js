const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");

router.post("/", (req, res) => {
  console.log("user register");

  const { username, role, password } = req.body;
  //Validate user
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("user post error: ", err);
    } else if (user) {
      res.json({
        error: "Username already in use"
      });
    } else {
      const newUser = new User({
        username: req.body.username,
        role: req.body.role,
        password: req.body.password
      });

      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post(
  "/login",
  function(req, res, next) {
    console.log("routes/user.js, login, req.body:");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
);

router.get("/", (req, res, next) => {
  console.log("===user!===");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "Logging out " });
  } else {
    res.send({ msg: "No user to log out" });
  }
});

module.exports = router;

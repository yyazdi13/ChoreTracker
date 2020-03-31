const mongoose = require("mongoose");
const db = require("../server/models/user");

//This file inserts users

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ChoreLogin");
const userSeed = [
  {
    username: "PHarris",
    password: "test777",
    date: new Date(Date.now())
  },
  {
    username: "EReed",
    password: "test098",
    date: new Date(Date.now())
  }
];

db.User.remove({})
  .then(() => User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

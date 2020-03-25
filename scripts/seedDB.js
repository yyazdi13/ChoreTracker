const mongoose = require("mongoose");
const db = require("../database/models/user");

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

User.deleteMany({})
  .then(() => User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

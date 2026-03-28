const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const USER = mongoose.model("USER", userSchema);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },
});

const TODO = mongoose.model("TODO", todoSchema);

module.exports = {
  USER,
  TODO,
};

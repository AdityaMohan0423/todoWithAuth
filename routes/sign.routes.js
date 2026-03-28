const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { USER } = require("../models/modes.js");

//signup endpoint
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExist = await USER.findOne({ username: username });

  if (userExist) return res.status(409).send("User already exist !!");

  await USER.create({
    username: username,
    password: password,
  });

  res.send("User created successfully");
});

//signin endpoint
router.get("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExist = await USER.findOne({
    username: username,
    password: password,
  });

  if (!userExist) res.status(404).send("User does not exist!");

  const token = jwt.sign(
    {
      username: userExist.username,
      userId: userExist._id,
    },
    process.env.SECRET,
  );

  res.json({
    token: token,
    message: "SignIn Successfull",
  });
});

//to get all users
router.get("/getusers", async (req, res) => {
  const users = await USER.find();
  res.json({
    message: "All users",
    USERS: users,
  });
});

module.exports = {
  signRoutes: router,
};

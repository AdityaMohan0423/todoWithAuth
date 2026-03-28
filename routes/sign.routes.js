const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
let { USERS, global_userId } = require("../database/data.js");

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExist = USERS.find((el) => el.username === username);

  if (userExist) return res.status(409).send("User already exist !!");

  USERS.push({
    username: username,
    userId: global_userId++,
    password: password,
  });

  res.send("User created successfully");
});

router.get("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExist = USERS.find(
    (el) => el.username === username && el.password === password,
  );

  if (!userExist) res.status(404).send("User does not exist!");

  const token = jwt.sign(
    {
      username: userExist.userId,
    },
    "secret123",
  );

  res.json({
    token: token,
    message: "SignIn Successfull",
  });
});

router.get("/getusers", (req, res) => {
  console.log(USERS);
  res.json({
    message: "All users",
    USERS: USERS,
  });
});

module.exports = {
  signRoutes: router,
};

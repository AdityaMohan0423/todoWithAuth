const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware/authCheck.js");
const { TODO } = require("../models/modes.js");

//getting todos
router.get("/todos", authCheck, async (req, res) => {
  const todos = await TODO.find();
  res.json(todos);
});

//creating todos
router.post("/todos", authCheck, async (req, res) => {
  const title = req.body.title;
  const userId = req.body.userId;
  const description = req.body.description;

  await TODO.create({
    title: title,
    description: description,
    userId: userId,
  });

  res.send(`todo created with id :`);
});

module.exports = {
  todoRoutes: router,
};

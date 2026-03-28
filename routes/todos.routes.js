const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware/authCheck.js");
const { TODOS, gloabal_todoId } = require("../database/data.js");

//getting todos
router.get("/todos", authCheck, (req, res) => {});

//creating todos
router.post("/todos", authCheck, (req, res) => {
  const title = req.body.title;
  const userId = req.body.userId;
  const description = req.body.description;

  TODOS.push({
    title: title,
    description: description,
    userId: userId,
    todoId: gloabal_todoId++,
  });

  console.log(TODOS);
  res.send(`todo created with id : ${gloabal_todoId - 1}`);
});

module.exports = {
  todoRoutes: router,
};

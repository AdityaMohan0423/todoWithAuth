const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware/authCheck.js");
let { TODOS, gloabal_todoId } = require("../database/data.js");

//getting todos
router.get("/todos", authCheck, (req, res) => {
  res.json(TODOS);
}); // #require auth check

//creating todos
router.post("/todos", authCheck, (req, res) => {
  // #require auth check
  const title = req.body.title;
  const userId = req.body.userId;
  const description = req.body.description;

  TODOS.push({
    title: title,
    description: description,
    userId: userId,
    todoId: gloabal_todoId++,
  });

  res.send(`todo created with id : ${gloabal_todoId - 1}`);
});

module.exports = {
  todoRoutes: router,
};

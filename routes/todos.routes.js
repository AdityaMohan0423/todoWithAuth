const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware/authCheck.js");
const { TODO } = require("../models/modes.js");

//getting todos
router.get("/todos", authCheck, async (req, res) => {
  const todos = await TODO.find({
    userId: req.body.userId,
  }).sort({ _id: -1 }); // sorted from newest to oldest
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
//to update todo
router.put("/todos/:id", async (req, res) => {
  try {
    await TODO.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
    });
    res.send("Todo Updated Successfully");
  } catch (e) {
    res.send("Error Occured: ", e);
  }
});

//to delete todo
router.delete("/delete/:id", authCheck, async (req, res) => {
  const todo = await TODO.findOneAndDelete({
    _id: req.params.id,
    userId: req.body.userId,
  });

  if (!todo) return res.status(404).send("Can't delete todo!!");

  res.send("Todo delete !");
});

module.exports = {
  todoRoutes: router,
};

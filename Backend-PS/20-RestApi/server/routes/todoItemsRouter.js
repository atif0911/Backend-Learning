const express = require("express");
const todoItemsRouter = express.Router();

const todoItemsController = require("../controllers/todoItemsController");

todoItemsRouter.post("/", todoItemsController.createTodoItem);

module.exports = todoItemsRouter;
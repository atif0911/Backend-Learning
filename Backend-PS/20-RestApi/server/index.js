const path = require("path");

const express = require("express");
require("dotenv").config(); // load .env

const rootDir = require("./utils/pathUtil");

const MONGO_URL = process.env.MONGO_URL;

const error = require("./controllers/error");
const { default: mongoose } = require("mongoose");
const todoItemsRouter = require("./routes/todoItemsRouter");

const app = express();

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/todo", todoItemsRouter);

app.use(error.notFoundController);

const PORT = 3000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB ", err);
  });

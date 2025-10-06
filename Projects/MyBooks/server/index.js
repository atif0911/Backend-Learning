const express = require("express");
const cors = require("cors");
require("dotenv").config();

const databaseConnection = require("./database");
const bookRouter = require("./Routes/book.routes");
const userRouter = require("./Routes/user.routes");
const authMiddleware=require('./Middleware/auth.middleware')

databaseConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World ,lessfk");
});

app.use("/book",authMiddleware, bookRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Port listening on PORT : ",PORT);
});

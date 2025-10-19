const express = require("express");
const cors = require("cors");
require("dotenv").config();

const databaseConnection = require("./database");
const notesRouter = require("./Routes/notes.routes");
const userRouter = require("./Routes/user.routes");
const authMiddleware=require("./Middleware/auth.middleware")

databaseConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/notes",authMiddleware, notesRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at : http://localhost:${PORT}`);
});

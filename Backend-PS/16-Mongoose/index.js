const path = require("path");

const express = require("express");

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const error = require("./controllers/error");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(error.notFoundController);

const PORT = 3000;

require("dotenv").config(); // load .env
const MONGO_URL = process.env.MONGO_URL;

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

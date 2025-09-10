const path = require("path");

const express = require("express");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require("dotenv").config(); // load .env
const MONGO_URL = process.env.MONGO_URL;

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter =require('./routes/authRouter')
const error = require("./controllers/error");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'sessions'
})

app.use(express.urlencoded());
app.use(session({
  secret: 'I am so sad',
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next()
  } else {
    res.redirect("/login")
  }
});
app.use("/host", hostRouter);


app.use(express.static(path.join(__dirname, "public")));

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

const path = require("path");

const express = require('express');

const storeRouter = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const error = require('./controllers/error');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(error.notFoundController);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on address http://localhost:${PORT}`);
});
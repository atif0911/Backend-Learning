const mongoose = require("mongoose");

const databaseConnection = async () => {
  const DB_URL = process.env.DB_URL;
    mongoose.connect(DB_URL).then(() => {
        console.log("Database connected Successfully!");
    }).catch((error) => {
        console.log("Database connection failed ", error);
    });
};

module.exports = databaseConnection;
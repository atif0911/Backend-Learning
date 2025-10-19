const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  MiddleName: {
    type: String,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
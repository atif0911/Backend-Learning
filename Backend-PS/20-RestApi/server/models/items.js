const mongoose = require("mongoose");

const todoItemSc = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: Date,
  completed: {
    type: Boolean,
    default: false,
  },
  timestamps: true,
});

module.exports = mongoose.model("TodoItems", todoItemSc);

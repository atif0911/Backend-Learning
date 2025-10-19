const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    PaperCode: {
      type: String,
      required: true,
    },
    PaperName: {
      type: String,
      required: true,
    },
    Topic: {
      type: String,
    },
    Description: {
      type: String,
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("notes", notesSchema);

module.exports = { Notes };

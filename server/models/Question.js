const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
const mongoose = require("mongoose");

const aiQuestionSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AIQuestion",
  aiQuestionSchema
);
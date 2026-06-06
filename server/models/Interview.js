const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    questions: [
      {
        question: String,
        answer: String,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);
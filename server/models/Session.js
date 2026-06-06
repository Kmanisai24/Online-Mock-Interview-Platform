const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Started", "Completed"],
      default: "Started",
    },

    answers: [
      {
        question: String,
        answer: String,
        isCorrect: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
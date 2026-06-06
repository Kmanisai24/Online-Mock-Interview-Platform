const express = require("express");
const router = express.Router();

const {
  getAIQuestions,
  generateInterviewQuestions,
} = require("../controllers/aiController");

router.get("/questions", getAIQuestions);

router.post(
  "/generate",
  generateInterviewQuestions
);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  generateFeedback,
} = require("../controllers/feedbackController");

router.post("/evaluate", generateFeedback);

module.exports = router;
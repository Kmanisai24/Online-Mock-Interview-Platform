const express = require("express");
const router = express.Router();

const {
  startSession,
  submitAnswer,
  completeSession,
  getSessions,
  getSessionById,
  getLeaderboard,
  getAnalytics,
} = require("../controllers/sessionController");

const { protect } = require("../middleware/authMiddleware");

// Leaderboard
router.get("/leaderboard/top", protect, getLeaderboard);

// Analytics Dashboard
router.get("/analytics/dashboard", protect, getAnalytics);

// Session History
router.get("/", protect, getSessions);
router.get("/:id", protect, getSessionById);

// Start Session
router.post("/", protect, startSession);

// Submit Answer
router.post("/:id/answer", protect, submitAnswer);

// Complete Session
router.put("/:id/complete", protect, completeSession);

module.exports = router;
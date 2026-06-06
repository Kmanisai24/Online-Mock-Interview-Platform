const User = require("../models/User");
const Interview = require("../models/Interview");
const Session = require("../models/Session");
const AIQuestion = require("../models/AIQuestion");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInterviews = await Interview.countDocuments();
    const totalSessions = await Session.countDocuments();
    const totalAIQuestions = await AIQuestion.countDocuments();

    res.status(200).json({
      totalUsers,
      totalInterviews,
      totalSessions,
      totalAIQuestions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
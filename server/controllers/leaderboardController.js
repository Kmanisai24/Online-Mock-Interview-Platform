const Session = require("../models/Session");

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Session.find()
      .populate("user", "name email")
      .sort({ score: -1 });

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLeaderboard,
};
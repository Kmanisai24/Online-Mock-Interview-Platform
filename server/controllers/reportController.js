const Session = require("../models/Session");

const getReport = async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session Not Found",
      });
    }

    const correctAnswers = session.answers.filter(
      (answer) => answer.isCorrect
    ).length;

    const wrongAnswers =
      session.answers.length - correctAnswers;

    const percentage =
      session.answers.length > 0
        ? (
            (correctAnswers / session.answers.length) *
            100
          ).toFixed(2)
        : 0;

    res.status(200).json({
      score: session.score,
      correctAnswers,
      wrongAnswers,
      percentage,
      status: session.status,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getReport,
};
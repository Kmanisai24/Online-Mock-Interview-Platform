const Session = require("../models/Session");
const Interview = require("../models/Interview");
const Question = require("../models/Question");

const startSession = async (req, res) => {
  try {
    const { interviewId } = req.body;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        message: "Interview Not Found",
      });
    }

    const session = await Session.create({
      user: req.user.id,
      interview: interviewId,
    });

    res.status(201).json({
      message: "Interview Session Started",
      session,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session Not Found",
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question Not Found",
      });
    }

    const isCorrect =
      question.answer.toLowerCase().trim() ===
      answer.toLowerCase().trim();

    session.answers.push({
      question: question.question,
      answer,
      isCorrect,
    });

    if (isCorrect) {
      session.score += 1;
    }

    await session.save();

    res.status(200).json({
      message: "Answer Submitted",
      score: session.score,
      answers: session.answers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const completeSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session Not Found",
      });
    }

    session.status = "Completed";

    await session.save();

    res.status(200).json({
      message: "Interview Completed",
      score: session.score,
      status: session.status,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      user: req.user.id,
    }).populate("interview");

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("interview");

    if (!session) {
      return res.status(404).json({
        message: "Session Not Found",
      });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Session.aggregate([
      {
        $group: {
          _id: "$user",
          totalScore: {
            $sum: "$score",
          },
        },
      },
      {
        $sort: {
          totalScore: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalSessions = await Session.countDocuments({
      user: req.user.id,
    });

    const completedSessions = await Session.countDocuments({
      user: req.user.id,
      status: "Completed",
    });

    const sessions = await Session.find({
      user: req.user.id,
    });

    let totalScore = 0;
    let highestScore = 0;

    sessions.forEach((session) => {
      totalScore += session.score;

      if (session.score > highestScore) {
        highestScore = session.score;
      }
    });

    const averageScore =
      totalSessions > 0
        ? totalScore / totalSessions
        : 0;

    res.status(200).json({
      totalSessions,
      completedSessions,
      averageScore,
      highestScore,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  startSession,
  submitAnswer,
  completeSession,
  getSessions,
  getSessionById,
  getLeaderboard,
  getAnalytics,
};
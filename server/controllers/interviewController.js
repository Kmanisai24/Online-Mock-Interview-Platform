const Interview = require("../models/Interview");

const createInterview = async (req, res) => {
  try {
    const { title, role, level, questions } = req.body;

    const interview = await Interview.create({
      title,
      role,
      level,
      questions,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Interview Created Successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      createdBy: req.user.id,
    });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview Not Found",
      });
    }

    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    const { title, role, level, questions } = req.body;

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview Not Found",
      });
    }

    interview.title = title || interview.title;
    interview.role = role || interview.role;
    interview.level = level || interview.level;
    interview.questions = questions || interview.questions;

    const updatedInterview = await interview.save();

    res.status(200).json({
      message: "Interview Updated Successfully",
      interview: updatedInterview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview Not Found",
      });
    }

    await interview.deleteOne();

    res.status(200).json({
      message: "Interview Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
};
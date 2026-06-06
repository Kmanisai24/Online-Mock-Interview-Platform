const Question = require("../models/Question");

const createQuestion = async (req, res) => {
  try {
    const { category, difficulty, question, answer } = req.body;

    const newQuestion = await Question.create({
      category,
      difficulty,
      question,
      answer,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Question Created Successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({
      createdBy: req.user.id,
    });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question Not Found",
      });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { category, difficulty, question, answer } = req.body;

    const existingQuestion = await Question.findById(req.params.id);

    if (!existingQuestion) {
      return res.status(404).json({
        message: "Question Not Found",
      });
    }

    existingQuestion.category =
      category || existingQuestion.category;

    existingQuestion.difficulty =
      difficulty || existingQuestion.difficulty;

    existingQuestion.question =
      question || existingQuestion.question;

    existingQuestion.answer =
      answer || existingQuestion.answer;

    const updatedQuestion = await existingQuestion.save();

    res.status(200).json({
      message: "Question Updated Successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question Not Found",
      });
    }

    await question.deleteOne();

    res.status(200).json({
      message: "Question Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
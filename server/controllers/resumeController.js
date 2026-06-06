const fs = require("fs");
const pdfParse = require("pdf-parse");

const AIQuestion = require("../models/AIQuestion");
const {
  generateQuestionsFromSkills,
} = require("../services/geminiService");

const uploadResume = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text.toLowerCase();

    const skills = [];

    const skillKeywords = [
      "java",
      "python",
      "javascript",
      "react",
      "node.js",
      "mongodb",
      "mysql",
      "aws",
      "azure",
      "oracle cloud",
      "git",
      "github",
      "rest api",
      "ci/cd",
      "html",
      "css",
    ];

    skillKeywords.forEach((skill) => {
      if (text.includes(skill.toLowerCase())) {
        skills.push(skill);
      }
    });

    // Generate AI Questions using Gemini
    const generatedQuestions =
      await generateQuestionsFromSkills(skills);

    // Save Questions to MongoDB
    for (const question of generatedQuestions) {
      await AIQuestion.create({
        skill: "Gemini AI",
        question,
      });
    }

    res.status(200).json({
      skills,
      generatedQuestions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};
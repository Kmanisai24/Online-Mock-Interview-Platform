const AIQuestion = require("../models/AIQuestion");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getAIQuestions = async (req, res) => {
  try {
    const questions = await AIQuestion.find();

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience } = req.body;

    const prompt = `
Generate 10 interview questions for:

Role: ${role}
Experience: ${experience}

Rules:
- Technical interview questions only
- One question per line
- No numbering
- No explanations
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const questions = response.text
      .split("\n")
      .filter((q) => q.trim() !== "");

    for (const question of questions) {
      await AIQuestion.create({
        skill: role,
        question,
      });
    }

    res.status(200).json({
      role,
      experience,
      questions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAIQuestions,
  generateInterviewQuestions,
};
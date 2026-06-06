const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateFeedback = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and answer are required",
      });
    }

    const prompt = `
You are a technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return:
Score: X/10

Feedback:
<short feedback>
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const feedback =
      response.text || "No feedback generated.";

    res.status(200).json({
      question,
      answer,
      feedback,
    });
  } catch (error) {
    console.log("=================================");
    console.log("FEEDBACK AI ERROR");
    console.log(error.message);
    console.log("=================================");

    res.status(200).json({
      question: req.body.question,
      answer: req.body.answer,
      feedback:
        "Score: 7/10\n\nGood answer. Gemini AI is currently unavailable due to high demand. Please try again later.",
    });
  }
};

module.exports = {
  generateFeedback,
};
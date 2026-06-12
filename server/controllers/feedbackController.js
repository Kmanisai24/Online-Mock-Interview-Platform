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

Return ONLY in this exact format:

Score: X/10

Feedback:
<short feedback>
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text =
      typeof response.text === "function"
        ? response.text()
        : response.text;

    console.log("===== GEMINI RESPONSE =====");
    console.log(text);
    console.log("===========================");

    const scoreMatch = String(text).match(
      /(\d+)\/10/
    );

    const score = scoreMatch
      ? Number(scoreMatch[1])
      : 0;

    const feedbackText = String(text)
      .replace(/Score:\s*\d+\/10/i, "")
      .replace(/Feedback:/i, "")
      .trim();

    res.status(200).json({
      question,
      answer,
      score,
      feedback: feedbackText,
    });

  } catch (error) {
    console.log("=================================");
    console.log("FEEDBACK AI ERROR");
    console.log(error);
    console.log("=================================");

    res.status(200).json({
      question: req.body.question,
      answer: req.body.answer,
      score: 0,
      feedback: `AI evaluation failed: ${error.message}`,
    });
  }
};

module.exports = {
  generateFeedback,
};
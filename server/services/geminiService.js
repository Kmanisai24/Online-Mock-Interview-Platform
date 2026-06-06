require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

console.log("=================================");
console.log("GEMINI SERVICE LOADED");
console.log("API KEY:", process.env.GEMINI_API_KEY);
console.log("=================================");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateQuestionsFromSkills = async (skills) => {
  try {
    console.log("Skills:", skills);

    const prompt = `
Generate 10 technical interview questions based on these skills:

${skills.join(", ")}

Rules:
- Return only interview questions
- One question per line
- No numbering
- No explanations
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("=================================");
    console.log("FULL RESPONSE:");
    console.log(response);
    console.log("=================================");

    const text =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    console.log("TEXT:");
    console.log(text);

    const questions = text
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    console.log("Generated Questions:", questions);

    return questions;
  } catch (error) {
    console.log("=================================");
    console.log("GEMINI ERROR");
    console.log(error);
    console.log("=================================");

    return [];
  }
};

module.exports = {
  generateQuestionsFromSkills,
};
import api from "./api";

export const getFeedback = async (question, answer) => {
  const response = await api.post(
    "/feedback/evaluate",
    {
      question,
      answer,
    }
  );

  return response.data;
};
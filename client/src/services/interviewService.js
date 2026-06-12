import axios from "axios";

const API = "http://localhost:5000/api";

export const getInterviewQuestions = async () => {
  const response = await axios.get(`${API}/ai/questions`);
  return response.data;
};

export const submitAnswer = async (data) => {
  const response = await axios.post(`${API}/feedback/evaluate`, data);
  return response.data;
};
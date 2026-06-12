import { useState } from "react";
import { getFeedback } from "../services/feedbackService";

function FeedbackPage() {
  const [question, setQuestion] = useState("What is JVM?");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    try {
      setLoading(true);

      const result = await getFeedback(question, answer);

      setFeedback(result.feedback);
    } catch (error) {
      console.error(error);
      alert("Failed to get feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Feedback Generator</h1>

      <h3>Question</h3>
      <p>{question}</p>

      <textarea
        rows="6"
        cols="70"
        placeholder="Enter your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleEvaluate}>
        {loading ? "Generating..." : "Get Feedback"}
      </button>

      {feedback && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Feedback</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            {feedback}
          </pre>
        </div>
      )}
    </div>
  );
}

export default FeedbackPage;
import { useEffect, useState } from "react";
import { getFeedback } from "../services/feedbackService";

function FinalReport() {
  const answers =
    JSON.parse(
      localStorage.getItem("interviewAnswers")
    ) || [];

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingResults =
      localStorage.getItem("interviewResults");

    if (existingResults) {
      setResults(
        JSON.parse(existingResults)
      );

      setLoading(false);
    } else {
      evaluateAnswers();
    }
  }, []);

  const evaluateAnswers = async () => {
    try {
      const feedbackResults = [];

      for (const item of answers) {
        const feedback =
          await getFeedback(
            item.question,
            item.answer
          );

        feedbackResults.push({
          ...item,
          score: feedback.score || 0,
          feedback:
            feedback.feedback ||
            "No feedback available",
        });
      }

      setResults(feedbackResults);

      localStorage.setItem(
        "interviewResults",
        JSON.stringify(feedbackResults)
      );

    } catch (error) {
      console.error(
        "Error evaluating answers:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Evaluating Answers...
      </h2>
    );
  }

  const totalScore = results.reduce(
    (sum, item) =>
      sum + Number(item.score || 0),
    0
  );

  const averageScore =
    results.length > 0
      ? (
          totalScore /
          results.length
        ).toFixed(1)
      : 0;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        AI Interview Report
      </h1>

      <h2
        style={{
          textAlign: "center",
        }}
      >
        Average Score:{" "}
        {averageScore}/10
      </h2>

      {results.map(
        (item, index) => (
          <div
            key={index}
            style={{
              border:
                "1px solid #ddd",
              borderRadius:
                "10px",
              padding: "15px",
              marginBottom:
                "20px",
            }}
          >
            <h3>
              Question {index + 1}
            </h3>

            <p>
              <strong>
                Question:
              </strong>{" "}
              {item.question}
            </p>

            <p>
              <strong>
                Your Answer:
              </strong>{" "}
              {item.answer}
            </p>

            <p>
              <strong>
                Score:
              </strong>{" "}
              {item.score}/10
            </p>

            <p>
              <strong>
                Feedback:
              </strong>{" "}
              {item.feedback}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default FinalReport;
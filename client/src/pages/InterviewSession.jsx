import { useState } from "react";
import { Link } from "react-router-dom";

function InterviewSession() {
  const [questions] = useState(() => {
    const savedQuestions = localStorage.getItem(
      "interviewQuestions"
    );

    if (savedQuestions) {
      return JSON.parse(savedQuestions);
    }

    return [
      "What is Java?",
      "Explain OOP concepts.",
      "What is React?",
    ];
  });

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  const [completed, setCompleted] =
    useState(false);

  const handleNext = () => {
    if (!answer.trim()) {
      alert("Please enter an answer");
      return;
    }

    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestion],
        answer,
      },
    ];

    setAnswers(updatedAnswers);
    setAnswer("");

    if (
      currentQuestion + 1 <
      questions.length
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    } else {
      localStorage.setItem(
        "interviewAnswers",
        JSON.stringify(updatedAnswers)
      );

      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h1>Interview Completed 🎉</h1>

        {answers.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>
              Question {index + 1}
            </h3>

            <p>
              <strong>Question:</strong>{" "}
              {item.question}
            </p>

            <p>
              <strong>Your Answer:</strong>{" "}
              {item.answer}
            </p>
          </div>
        ))}

        <Link to="/report">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            View Report
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Mock Interview Session</h1>

      <Link to="/">
        ← Back to Dashboard
      </Link>

      <br />
      <br />

      <h2>
        Question {currentQuestion + 1} of{" "}
        {questions.length}
      </h2>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3>
          {questions[currentQuestion]}
        </h3>
      </div>

      <textarea
        rows="8"
        cols="80"
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={handleNext}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {currentQuestion ===
        questions.length - 1
          ? "Finish Interview"
          : "Next Question"}
      </button>
    </div>
  );
}

export default InterviewSession;
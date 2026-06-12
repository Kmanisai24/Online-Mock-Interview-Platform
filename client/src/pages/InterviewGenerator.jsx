import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function InterviewGenerator() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!role || !experience) {
      alert("Please enter role and experience");
      return;
    }

    try {
      const response = await api.post("/ai/generate", {
        role,
        experience,
      });

      setResult(response.data);

      if (response.data.questions) {
        localStorage.setItem(
          "interviewQuestions",
          JSON.stringify(response.data.questions)
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate questions");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>AI Interview Generator</h1>

      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: "bold",
        }}
      >
        ← Back to Dashboard
      </a>

      <br />
      <br />

      <input
        type="text"
        placeholder="Role (e.g. Java Full Stack Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <br />

      <input
        type="text"
        placeholder="Experience (e.g. Fresher)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <br />

      <button
        onClick={handleGenerate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Generate Interview
      </button>

      {result && (
        <>
          <h2 style={{ marginTop: "30px" }}>
            Generated Questions
          </h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            {result.questions?.map((question, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  textAlign: "left",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <strong>Q{index + 1}.</strong> {question}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "20px" }}>
            <Link to="/interview-session">
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
                Start Interview
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default InterviewGenerator;
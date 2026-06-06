import { useState } from "react";
import api from "../services/api";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await api.post(
        "/resume/upload",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Resume Upload</h1>

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
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br />
      <br />

      <button
        onClick={handleUpload}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Upload Resume
      </button>

      {result && (
        <>
          <h2 style={{ marginTop: "30px" }}>
            Skills
          </h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            {result.skills?.map((skill) => (
              <li
                key={skill}
                style={{
                  marginBottom: "8px",
                  fontSize: "18px",
                }}
              >
                {skill}
              </li>
            ))}
          </ul>

          <h2 style={{ marginTop: "40px" }}>
            Generated Questions
          </h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {result.generatedQuestions?.map(
              (question, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "15px",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    textAlign: "left",
                    backgroundColor: "#f9f9f9",
                    boxShadow:
                      "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <strong>
                    Q{index + 1}.
                  </strong>{" "}
                  {question}
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default ResumeUpload;
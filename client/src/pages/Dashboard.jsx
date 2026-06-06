import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1>AI Mock Interview Platform</h1>

      <h3>Features</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Link to="/resume">
          Resume Upload
        </Link>

        <Link to="/interview-generator">
          AI Interview Generator
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
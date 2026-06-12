import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>AI Mock Interview Platform</h1>

      <div style={{ marginTop: "30px" }}>
        <p>
          <Link to="/resume">Resume Upload</Link>
        </p>

        <p>
          <Link to="/interview-generator">
            Interview Generator
          </Link>
        </p>

        <p>
          <Link to="/interview-session">
            Interview Session
          </Link>
        </p>

        <p>
          <Link to="/feedback">
            AI Feedback
          </Link>
        </p>

        <p>
          <Link to="/report">
            Final Report
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
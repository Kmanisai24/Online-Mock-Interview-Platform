import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import InterviewGenerator from "./pages/InterviewGenerator";
import InterviewSession from "./pages/InterviewSession";
import FeedbackPage from "./pages/FeedbackPage";
import FinalReport from "./pages/FinalReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resume" element={<ResumeUpload />} />
        <Route
          path="/interview-generator"
          element={<InterviewGenerator />}
        />
        <Route
          path="/interview-session"
          element={<InterviewSession />}
        />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/report" element={<FinalReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
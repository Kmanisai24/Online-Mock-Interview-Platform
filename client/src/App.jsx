import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import InterviewGenerator from "./pages/InterviewGenerator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/resume"
          element={<ResumeUpload />}
        />

        <Route
          path="/interview-generator"
          element={<InterviewGenerator />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
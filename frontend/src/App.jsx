// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddJobPage from "./components/AddJobPage";
import JobDetailsPage from "./components/JobDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

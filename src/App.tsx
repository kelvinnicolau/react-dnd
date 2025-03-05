import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BeautifulDnD from "./pages/BeautifulDnd";
import DndKitPage from "./pages/DndKitPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beautiful-dnd" element={<BeautifulDnD />} />
        <Route path="/dnd-kit" element={<DndKitPage />} />
      </Routes>
    </Router>
  );
};

export default App;

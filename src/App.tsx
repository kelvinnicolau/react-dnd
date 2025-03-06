import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BeautifulDnD from "./pages/BeautifulDnd";
import DndKitPage from "./pages/DndKitPage";
import ReactDndPage from "./pages/ReactDndPage";
import Tasks from "./pages/Tasks";
import Planos from "./pages/Planos";
import "./styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beautiful-dnd" element={<BeautifulDnD />} />
        <Route path="/react-dnd" element={<ReactDndPage />} />
        <Route path="/dnd-kit" element={<DndKitPage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/planos" element={<Planos />} />
      </Routes>
    </Router>
  );
};

export default App;

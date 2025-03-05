import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Teste de Bibliotecas Drag and Drop</h1>
      <ul>
        <li>
          <Link to="/beautiful-dnd">react-beautiful-dnd</Link>
        </li>
        <li>
          <Link to="/react-dnd">react-dnd</Link>
        </li>
        <li>
          <Link to="/dnd-kit">dnd-kit</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;

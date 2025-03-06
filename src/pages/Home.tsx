import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-800 p-0">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">
        Projeto de Testes de Drag and Drop
      </h1>
      <div className="space-y-4">
        <Link
          to="/beautiful-dnd"
          className="block w-64 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md text-center transition duration-300"
        >
          react-beautiful-dnd
        </Link>
        <Link
          to="/dnd-kit"
          className="block w-64 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md text-center transition duration-300"
        >
          dnd-kit
        </Link>
        <Link
          to="/react-dnd"
          className="block w-64 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md text-center transition duration-300"
        >
          react-dnd
        </Link>
        <Link
          to="/tasks"
          className="block w-64 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md text-center transition duration-300"
        >
          Tasks - Pronto
        </Link>
        <Link
          to="/planos"
          className="block w-64 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md text-center transition duration-300"
        >
          Planos
        </Link>
      </div>
    </div>
  );
};

export default Home;

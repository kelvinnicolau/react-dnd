import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableAreaProps {
  id: string;
  children: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        minHeight: "200px",
      }}
    >
      {children}
    </div>
  );
};

export default DroppableArea;

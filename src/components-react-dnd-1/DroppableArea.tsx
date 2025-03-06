import React, { useRef } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";

interface DroppableAreaProps {
  onDrop: (id: string) => void;
  children: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, children }) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "ITEM",
    drop: (item: { id: string }, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop()) {
        // Garante que o drop só ocorra uma vez
        onDrop(item.id);
      }
    },
  });

  drop(dropRef);

  return (
    <div
      ref={dropRef}
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        border: "2px solid #ccc",
        borderRadius: "8px",
        minHeight: "200px",
      }}
    >
      {children}
    </div>
  );
};

export default DroppableArea;

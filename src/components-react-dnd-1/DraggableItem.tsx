import React, { useRef } from "react";
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";

interface Item {
  id: string;
  name: string;
  description: string;
}

interface DraggableItemProps {
  item: Item;
  index?: number; // Usado apenas na área de destino para ordenação
  onDrop: (id: string) => void;
  moveItem?: (dragIndex: number, hoverIndex: number) => void; // Para reordenação na área de destino
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  index,
  onDrop,
  moveItem,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Configuração do Drag (arrastar o item)
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { id: item.id, index },
    end: (draggedItem: { id: string }, monitor: DragSourceMonitor) => {
      if (monitor.didDrop()) {
        onDrop(draggedItem.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Configuração do Drop (apenas na área de destino para reordenação)
  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (
      draggedItem: { id: string; index: number },
      monitor: DropTargetMonitor
    ) => {
      if (
        !moveItem ||
        draggedItem.id === item.id ||
        draggedItem.index === undefined ||
        index === undefined
      )
        return;

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex !== hoverIndex) {
        moveItem(dragIndex, hoverIndex);
        draggedItem.index = hoverIndex; // Atualiza o índice do item arrastado
      }
    },
  });

  // Conecta drag e drop ao mesmo ref (drop só é usado na área de destino)
  drag(moveItem ? drop(ref) : ref);

  return (
    <div
      ref={ref}
      style={{
        padding: "16px",
        margin: "0 0 8px 0",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <strong>{item.name}</strong>
      <p>{item.description}</p>
    </div>
  );
};

export default DraggableItem;

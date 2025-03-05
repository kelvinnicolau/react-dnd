import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "../components/React-DND/DraggableItem";
import DroppableArea from "../components/React-DND/DroppableArea";

interface Item {
  id: string;
  name: string;
  description: string;
}

const ReactDndPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "Item 1", description: "Descrição do Item 1" },
    { id: "2", name: "Item 2", description: "Descrição do Item 2" },
    { id: "3", name: "Item 3", description: "Descrição do Item 3" },
    { id: "4", name: "Item 4", description: "Descrição do Item 4" },
    { id: "5", name: "Item 5", description: "Descrição do Item 5" },
  ]);

  const [droppedItems, setDroppedItems] = useState<Item[]>([]);

  const handleDrop = useCallback(
    (id: string) => {
      const itemToMove = items.find((item) => item.id === id);
      if (!itemToMove || droppedItems.some((item) => item.id === id)) return; // Evita duplicação

      setDroppedItems((prev) => [...prev, itemToMove]);
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [items, droppedItems]
  );

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setDroppedItems((prevItems) => {
      const updatedItems = [...prevItems];
      const [draggedItem] = updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, draggedItem);
      return updatedItems;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>React DnD - Arraste e Solte</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Seção de Itens */}
          <div style={{ flex: 1 }}>
            <h2>Itens Disponíveis</h2>
            {items.map((item) => (
              <DraggableItem key={item.id} item={item} onDrop={handleDrop} />
            ))}
          </div>

          {/* Seção de Destino */}
          <div style={{ flex: 1 }}>
            <h2>Área de Destino</h2>
            <DroppableArea onDrop={handleDrop}>
              {droppedItems.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  index={index}
                  onDrop={handleDrop}
                  moveItem={moveItem}
                />
              ))}
            </DroppableArea>
          </div>
        </div>
        <br />
        <a href="/">Voltar para Home</a>
      </div>
    </DndProvider>
  );
};

export default ReactDndPage;

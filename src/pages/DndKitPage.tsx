import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItem";
import DroppableArea from "../components/DroppableArea";

interface Item {
  id: string;
  name: string;
  description: string;
}

const DndKitPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "Item 1", description: "Descrição do Item 1" },
    { id: "2", name: "Item 2", description: "Descrição do Item 2" },
    { id: "3", name: "Item 3", description: "Descrição do Item 3" },
    { id: "4", name: "Item 4", description: "Descrição do Item 4" },
    { id: "5", name: "Item 5", description: "Descrição do Item 5" },
  ]);

  const [droppedItems, setDroppedItems] = useState<Item[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Se o item foi solto na área de destino
    if (over.id === "droppable-area") {
      const itemToMove = items.find((item) => item.id === active.id);
      if (itemToMove) {
        // Adiciona o item à área de destino
        setDroppedItems((prev) => [...prev, itemToMove]);
        // Remove o item da lista de itens disponíveis
        setItems((prev) => prev.filter((item) => item.id !== active.id));
      }
    } else if (droppedItems.some((item) => item.id === over.id)) {
      // Reordenar itens na área de destino
      const oldIndex = droppedItems.findIndex((item) => item.id === active.id);
      const newIndex = droppedItems.findIndex((item) => item.id === over.id);

      if (oldIndex !== newIndex) {
        setDroppedItems((items) => arrayMove(items, oldIndex, newIndex));
      }
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>DnD Kit - Arraste e Solte</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Seção de Itens */}
        <div style={{ flex: 1 }}>
          <h2>Itens Disponíveis</h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  <div
                    style={{
                      padding: "16px",
                      margin: "0 0 8px 0",
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Seção de Destino */}
        <div style={{ flex: 1 }}>
          <h2>Área de Destino</h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <DroppableArea id="droppable-area">
              <SortableContext
                items={droppedItems}
                strategy={verticalListSortingStrategy}
              >
                {droppedItems.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    <div
                      style={{
                        padding: "16px",
                        margin: "0 0 8px 0",
                        backgroundColor: "#e0f7fa",
                        border: "1px solid #0097a7",
                        borderRadius: "4px",
                      }}
                    >
                      <strong>{item.name}</strong>
                      <p>{item.description}</p>
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DroppableArea>
          </DndContext>
        </div>
      </div>
      <br />
      <a href="/">Voltar para Home</a>
    </div>
  );
};

export default DndKitPage;

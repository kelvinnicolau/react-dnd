import { useState } from "react";
import type { Column as ColumnType, Plan } from "../types";
import { Column } from "../components/planos/Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
];

const INITIAL_PLANS: Plan[] = [
  {
    id: "1",
    title: "BASIC 30",
    status: "TODO",
    value: 30.0,
  },
  {
    id: "2",
    title: "MAX 30",
    status: "TODO",
    value: 30.0,
  },
  {
    id: "3",
    title: "BASIC 60",
    status: "TODO",
    value: 60.0,
  },
  {
    id: "4",
    title: "MAX 60",
    status: "TODO",
    value: 60.0,
  },
  {
    id: "5",
    title: "VIP 60",
    status: "TODO",
    value: 60.0,
  },
  {
    id: "6",
    title: "BASIC 100",
    status: "TODO",
    value: 100.0,
  },
  {
    id: "7",
    title: "MAX 100",
    status: "TODO",
    value: 100.0,
  },
  {
    id: "8",
    title: "VIP 100",
    status: "TODO",
    value: 100.0,
  },
  {
    id: "9",
    title: "MAX 250",
    status: "TODO",
    value: 250.0,
  },
  {
    id: "10",
    title: "VIP 250",
    status: "TODO",
    value: 250.0,
  },
  {
    id: "11",
    title: "VIP 500",
    status: "TODO",
    value: 500.0,
  },
  {
    id: "12",
    title: "VIP 1000000",
    status: "TODO",
    value: 1000000.0,
  },
];

export default function Planos() {
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const planId = active.id as string;
    const newStatus = over.id as Plan["status"];

    setPlans(() =>
      plans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              status: newStatus,
            }
          : plan
      )
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Lista de Planos</h1>
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                plans={plans.filter((plan) => plan.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}

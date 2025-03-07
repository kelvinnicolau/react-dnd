import { useState } from "react";
import type { Column as ColumnType, Plan } from "../types";
import { Column } from "../components/planos/Column";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  pointerWithin,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
    order: 0,
  },
  {
    id: "2",
    title: "MAX 30",
    status: "TODO",
    value: 30.0,
    order: 1,
  },
  {
    id: "3",
    title: "BASIC 60",
    status: "TODO",
    value: 60.0,
    order: 2,
  },
  {
    id: "4",
    title: "MAX 60",
    status: "TODO",
    value: 60.0,
    order: 3,
  },
  {
    id: "5",
    title: "VIP 60",
    status: "TODO",
    value: 60.0,
    order: 4,
  },
  {
    id: "6",
    title: "BASIC 100",
    status: "TODO",
    value: 100.0,
    order: 5,
  },
  {
    id: "7",
    title: "MAX 100",
    status: "TODO",
    value: 100.0,
    order: 6,
  },
  {
    id: "8",
    title: "VIP 100",
    status: "TODO",
    value: 100.0,
    order: 7,
  },
  {
    id: "9",
    title: "MAX 250",
    status: "TODO",
    value: 250.0,
    order: 8,
  },
  {
    id: "10",
    title: "VIP 250",
    status: "TODO",
    value: 250.0,
    order: 9,
  },
  {
    id: "11",
    title: "VIP 500",
    status: "TODO",
    value: 500.0,
    order: 10,
  },
  {
    id: "12",
    title: "VIP 1000000",
    status: "TODO",
    value: 1000000.0,
    order: 11,
  },
];

export default function Planos() {
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activePlan = plans.find((plan) => plan.id === activeId);
    const overPlan = plans.find((plan) => plan.id === overId);

    // Moving between columns
    if (activePlan && !overPlan) {
      const newStatus = overId as Plan["status"];
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === activeId ? { ...plan, status: newStatus } : plan
        )
      );
      return;
    }

    console.log("teste");

    // Reordering within the same column
    if (activePlan && overPlan && activePlan.status === overPlan.status) {
      const oldIndex = plans.findIndex((plan) => plan.id === activeId);
      const newIndex = plans.findIndex((plan) => plan.id === overId);

      const newPlans = [...plans];
      const [movedPlan] = newPlans.splice(oldIndex, 1);
      newPlans.splice(newIndex, 0, movedPlan);

      setPlans(newPlans);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Lista de Planos</h1>
      <div className="flex gap-8">
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={pointerWithin} // More lenient detection
        >
          {COLUMNS.map((column) => (
            <SortableContext
              key={column.id}
              items={plans
                .filter((plan) => plan.status === column.id)
                .map((plan) => plan.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                column={column}
                plans={plans.filter((plan) => plan.status === column.id)}
              />
            </SortableContext>
          ))}
        </DndContext>
      </div>
    </div>
  );
}

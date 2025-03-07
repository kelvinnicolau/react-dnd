import { useDroppable } from "@dnd-kit/core";
import { PlanCard } from "./PlanCard";
import { Column as ColumnType, Plan } from "../../types";

type ColumnProps = {
  column: ColumnType;
  plans: Plan[];
};

export function Column({ column, plans }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <div
        ref={setNodeRef}
        className={`
          flex flex-1 flex-col gap-4 min-h-[100px] transition-all duration-150
          ${isOver ? "bg-neutral-700" : "bg-neutral-800"} // Visual feedback
        `}
      >
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}

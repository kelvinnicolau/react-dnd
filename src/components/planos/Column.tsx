import { useDroppable } from "@dnd-kit/core";
import { PlanCard } from "./PlanCard";
import { Column as ColumnType, Plan, Task } from "../../types";

type ColumnProps = {
  column: ColumnType;
  plans: Plan[];
};

export function Column({ column, plans }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {plans.map((plan) => {
          return <PlanCard key={plan.id} plan={plan} />;
        })}
      </div>
    </div>
  );
}

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

  // Verifica se é a primeira coluna (TODO)
  const isFirstColumn = column.id === "TODO";

  return (
    <div
      className={`flex w-80 flex-col rounded-lg p-4 ${
        isFirstColumn ? "" : "bg-neutral-800" // Apenas a segunda coluna tem background
      }`}
    >
      <div
        ref={setNodeRef}
        className={`
          flex flex-1 flex-col gap-4 transition-all duration-150
          ${
            isOver ? "bg-neutral-700" : ""
          } // Visual feedback apenas na segunda coluna
        `}
        style={{ height: "500px" }} // Altura fixa para a coluna
      >
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} isFirstColumn={isFirstColumn} />
        ))}
      </div>
    </div>
  );
}

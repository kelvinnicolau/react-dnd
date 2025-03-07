import { useSortable } from "@dnd-kit/sortable";
import { Plan } from "../../types";

type PlanCardProps = {
  plan: Plan;
  isFirstColumn: boolean; // Prop para identificar se o card está na primeira coluna
};

export function PlanCard({ plan, isFirstColumn }: PlanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: plan.id });

  // Estilo baseado na coluna
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition: isDragging
      ? "none"
      : transition || "transform 0.15s ease-out, opacity 0.1s ease-out",
    opacity: isDragging ? 0.6 : isFirstColumn ? 0.5 : 1, // Opacidade reduzida na primeira coluna
    zIndex: isDragging ? 10 : 0,
    borderRadius: "0.5rem",
    height: "36px", // Altura fixa para os cards
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        cursor-grab bg-neutral-700 p-4 shadow-sm
        hover:shadow-md active:shadow-lg
        transition-opacity duration-150 ease-out
        flex items-center justify-center // Centraliza o texto vertical e horizontalmente
      `}
    >
      <h3 className="font-medium text-neutral-100">{plan.title}</h3>
    </div>
  );
}

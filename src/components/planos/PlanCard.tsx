import { useDraggable } from "@dnd-kit/core";
import { Plan, Task } from "../../types";

type PlanCardProps = {
  plan: Plan;
};

export function PlanCard({ plan }: PlanCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: plan.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium text-neutral-100">{plan.title}</h3>
    </div>
  );
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};
export type Plan = {
  id: string;
  status: TaskStatus;
  title: string;
  value: number;
  order?: number;
};

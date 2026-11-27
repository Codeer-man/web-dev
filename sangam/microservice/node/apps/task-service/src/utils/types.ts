export type TaskStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  created_by: string;
  created_at: Date;
  updated_at: Date;
};

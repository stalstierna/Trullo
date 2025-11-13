import { UserTypes } from "./user";

export type TaskTypes = {
  _id: string;
  title: string;
  status: "to-do" | "in progress" | "blocked" | "done";
  assignedTo?: UserTypes;
};

export type TaskCardProps = {
  title: string;
  tasks: TaskTypes[];
  color: string;
  onAddTask: (
    title: string,
    status: TaskTypes["status"],
    assignedTo?: TaskTypes["assignedTo"]
  ) => void;
};

export type TaskProps = {
  task: TaskTypes;
};

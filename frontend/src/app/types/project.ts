import { TaskTypes } from "./task";
import { UserTypes } from "./user";

export type ProjectTypes = {
  _id: string;
  title: string;
  description?: string;
  tasks: TaskTypes[];
  members: UserTypes[];
  // createdBy: UserTypes;
};

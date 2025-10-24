import { TaskProps } from "../types/task";
import { FaPlus } from "react-icons/fa6";

export default function Task({ task }: TaskProps) {
  return (
    <div className="bg-zinc-700 rounded-md flex flex-row justify-between items-center py-2 px-4">
      <div className="flex flex-col gap-1">
        <div className="h-2 w-12 bg-green-700 rounded-3xl"></div>
        <p className="px-1">{task.title}</p>
      </div>
      <button className="flex justify-center items-center h-6 w-6 bg-amber-600 rounded-full">
        {task.assignedTo ? (
          <p className="text-xs leading-none font-semibold">
            {task.assignedTo?.name.slice(0, 2).toUpperCase()}
          </p>
        ) : (
          <FaPlus />
        )}
      </button>
    </div>
  );
}

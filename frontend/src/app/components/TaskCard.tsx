import Task from "./Task";
import { TaskTypes, TaskCardProps } from "../types/task";

export default function TaskCard({ title, tasks }: TaskCardProps) {
  return (
    <article className="bg-zinc-900 rounded-xl h-fit w-72 text-white px-3 py-4 shadow-md shadow-zinc-800">
      <h2 className="px-3 pb-4">{title}</h2>
      <div className="flex flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-sm text-gray-400 italic px-3">Inga tasks</p>
        )}
      </div>
      <button className="bg-zinc-800 px-3 mt-3 w-full text-left rounded-md py-1">
        + Lägg till task
      </button>
    </article>
  );
}

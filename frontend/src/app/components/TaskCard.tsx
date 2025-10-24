import Task from "./Task";
import { TaskCardProps, TaskTypes } from "../types/task";
import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";

export default function TaskCard({
  title,
  tasks,
  color,
  onAddTask,
}: TaskCardProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newTaskTitle.trim()) return;
    const status = title.toLowerCase() as TaskTypes["status"];
    await onAddTask(newTaskTitle, status);
    setNewTaskTitle("");
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewTaskTitle("");
    setIsAdding(false);
  };

  return (
    <article className="bg-zinc-900 rounded-xl h-fit w-72 text-white px-3 py-4 shadow-md shadow-zinc-800 ">
      <div className="flex items-center gap-3 pb-4">
        <FaRegCircle className={color} />
        <h2>{title}</h2>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-sm text-gray-400 italic px-3">Inga tasks</p>
        )}
      </div>

      {isAdding ? (
        <div className="flex flex-col mt-3 w-full">
          <input
            type="text"
            className="flex-1 px-2 py-1 mb-3 rounded-md bg-zinc-800 text-white"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Ny task..."
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-green-600 hover:opacity-70 px-3 rounded-md py-1 cursor-pointer text-xs"
              onClick={handleAdd}
            >
              Spara
            </button>
            <button
              className="bg-red-600 hover:opacity-70 px-3 rounded-md py-1 cursor-pointer text-xs"
              onClick={handleCancel}
            >
              Avbryt
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-zinc-800 px-3 mt-3 w-full text-left rounded-md py-1 cursor-pointer hover:opacity-70"
          onClick={() => setIsAdding(true)}
        >
          + Lägg till task
        </button>
      )}
    </article>
  );
}

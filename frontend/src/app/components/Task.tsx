import { useEffect, useState } from "react";
import { TaskProps, TaskTypes } from "../types/task";
import { UserTypes } from "../types/user";
import { FaPlus } from "react-icons/fa6";

export default function Task({ task }: TaskProps) {
  const [currentTask, setCurrentTask] = useState(task);
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const handleShowUsers = async () => {
    if (users.length === 0) {
      setLoadingUsers(true);
      try {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Kunde inte hämta användare", err);
      } finally {
        setLoadingUsers(false);
      }
    }
    setShowUsers((prev) => !prev);
  };

  const handleAssign = async (user: UserTypes) => {
    try {
      const res = await fetch(
        `http://localhost:3000/tasks/${currentTask._id}/assign`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assignedTo: user }),
        }
      );

      if (!res.ok) throw new Error("Kunde inte uppdatera task");
      const updated: TaskTypes = await res.json();
      setCurrentTask(updated);
      setShowUsers(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-zinc-700 rounded-md flex flex-row justify-between items-center py-2 px-4 cursor-grab hover:outline">
        <div className="flex flex-col gap-1">
          <div className="h-2 w-12 bg-green-700 rounded-3xl"></div>
          <p className="px-1">{currentTask.title}</p>
        </div>
        <button
          onClick={handleShowUsers}
          className="flex justify-center items-center h-5 w-5 bg-amber-600 hover:opacity-70 rounded-full cursor-pointer"
        >
          {currentTask.assignedTo ? (
            <p className="text-[10px] leading-none font-semibold">
              {currentTask.assignedTo?.name.slice(0, 2).toUpperCase()}
            </p>
          ) : (
            <FaPlus className="text-sm" />
          )}
        </button>
      </div>
      {showUsers && (
        <div className="flex justify-end gap-2">
          {loadingUsers ? (
            <p className="text-sm text-gray-400 p-2">Laddar användare...</p>
          ) : users.length > 0 ? (
            users.map((user) => (
              <button
                key={user._id}
                onClick={() => handleAssign(user)}
                className="flex px-2 py-0.5 text-[10px] font-semibold bg-zinc-800 hover:opacity-70 rounded-xl transition cursor-pointer"
              >
                {user.name.toUpperCase()}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-400 p-2">Inga användare hittades</p>
          )}
        </div>
      )}
    </>
  );
}

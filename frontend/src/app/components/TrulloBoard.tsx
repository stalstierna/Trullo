"use client";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskTypes } from "../types/task";
import UserList from "./UserList";

export default function TrulloBoard() {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        // const res = await fetch("http://trullo-pi.vercel.app/tasks");
        const res = await fetch("http://localhost:3000/tasks");
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: TaskTypes[] = await res.json();
        console.log("Tasks från backend:", data);
        setTasks(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  console.log(tasks);

  if (loading) return <p>Laddar tasks...</p>;
  if (error) return <p className="text-red-600">Fel: {error}</p>;

  return (
    <section className="flex justify-between gap-2">
      <TaskCard
        title="To-Do"
        tasks={tasks.filter((t) => t.status === "to-do")}
      />
      <TaskCard
        title="In Progress"
        tasks={tasks.filter((t) => t.status === "in progress")}
      />
      <TaskCard title="Done" tasks={tasks.filter((t) => t.status === "done")} />

      <UserList />
    </section>
  );
}

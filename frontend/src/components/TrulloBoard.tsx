"use client";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskTypes } from "../types/task";
import UserList from "./UserList";
import { ProjectTypes } from "../types/project";

export type TrulloBoardProps = {
  projectId: string;
};

export default function TrulloBoard({ projectId }: TrulloBoardProps) {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        // const res = await fetch("http://trullo-pi.vercel.app/tasks");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`
        );
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: ProjectTypes = await res.json();
        setTasks(data.tasks);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [projectId]);

  const handleAddTask = async (title: string, status: TaskTypes["status"]) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/task`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, status }),
        }
      );
      if (!res.ok) throw new Error("Något gick fel vid skapande av task");
      const data = await res.json();
      const newTask: TaskTypes = data.task;
      setTasks((prev) => [...prev, { ...newTask }]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Laddar tasks...</p>;
  if (error) return <p className="text-red-600">Fel: {error}</p>;

  return (
    <section className="flex justify-between gap-10">
      <TaskCard
        key="to-do-card"
        title="To-Do"
        color="text-pink-500"
        tasks={tasks.filter((t) => t.status === "to-do")}
        onAddTask={handleAddTask}
      />
      <TaskCard
        key="in progress-card"
        title="In Progress"
        color="text-orange-400"
        tasks={tasks.filter((t) => t.status === "in progress")}
        onAddTask={handleAddTask}
      />
      <TaskCard
        key="done-card"
        title="Done"
        color="text-green-500"
        tasks={tasks.filter((t) => t.status === "done")}
        onAddTask={handleAddTask}
      />

      <UserList projectId={projectId} />
    </section>
  );
}

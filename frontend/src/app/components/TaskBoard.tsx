import TaskCard from "./TaskCard";
export default function TaskBoard() {
  return (
    <section className="flex gap-6">
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </section>
  );
}

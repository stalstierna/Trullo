import Task from "./Task";
export default function TaskCard() {
  return (
    <article className="bg-zinc-900 rounded-xl h-fit w-72 text-white px-3 py-4">
      <h2 className="px-3 pb-4">Task</h2>
      <div className="flex flex-col gap-3">
        <Task />
        <Task />
      </div>
      <button className="bg-zinc-800 px-3 mt-3 w-full text-left rounded-md py-1">
        + Lägg till task
      </button>
    </article>
  );
}

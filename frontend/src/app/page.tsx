import Header from "./components/Header";
import TaskBoard from "./components/TaskBoard";
import TaskBoardHeader from "./components/TaskBoardHeader";
import TaskCard from "./components/TaskCard";
export default function Home() {
  return (
    <>
      <TaskBoardHeader />
      <div className=" px-10 py-10">
        <TaskBoard />
      </div>
    </>
  );
}

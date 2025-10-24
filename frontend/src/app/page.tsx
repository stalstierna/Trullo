import TaskBoard from "./components/TrulloBoard";
import TaskBoardHeader from "./components/TrulloBoardHeader";
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

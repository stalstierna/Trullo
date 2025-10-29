type Project = {
  _id: string;
  title: string;
  description?: string;
};

export default function TrulloBoardHeader({ project }: { project: Project }) {
  return (
    <>
      <section
        className="px-10 h-14 flex items-center bg-zinc-900/20 border-b border-black"
        style={{ backdropFilter: "blur(1px)" }}
      >
        <h2 className="text-white font-bold text-xl text-shadow-lg text-shadow-zinc-500">
          {project.title}
        </h2>
      </section>
    </>
  );
}

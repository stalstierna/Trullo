import TrulloBoard from "../components/TrulloBoard";
import TrulloBoardHeader from "../components/TrulloBoardHeader";

type PageProps = {
  params: { projectId: string };
};

export default async function ProjectPage({ params }: PageProps) {
  const projectId = "6900c42d8d6b315420f6188d";

  const res = await fetch(`http://localhost:3000/projects/${projectId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch project:", res.status, await res.text());
    return <p>Projektet kunde inte hämtas</p>;
  }
  const project = await res.json();

  return (
    <>
      <TrulloBoardHeader project={project} />
      <div className=" px-10 py-10">
        <TrulloBoard />
      </div>
    </>
  );
}

import TrulloBoard from "../components/TrulloBoard";
import TrulloBoardHeader from "../components/TrulloBoardHeader";

type PageProps = {
  params: { projectId: string };
};

export default async function ProjectPage({ params }: PageProps) {
  const projectId = "6902312071e8889e25c12022";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch project:", res.status, await res.text());
    return <p>Projektet kunde inte hämtas</p>;
  }
  const project = await res.json();

  return (
    <>
      <TrulloBoardHeader project={project} />
      <div className=" px-10 py-10">
        <TrulloBoard projectId={projectId} />
      </div>
    </>
  );
}

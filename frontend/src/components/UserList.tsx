import { useState, useEffect } from "react";
import { UserTypes } from "../types/user";
import { FaPen } from "react-icons/fa6";
import { FaPlus, FaCircleChevronRight } from "react-icons/fa6";
import { ProjectTypes } from "../types/project";
import { TrulloBoardProps } from "./TrulloBoard";

export default function UserList({ projectId }: TrulloBoardProps) {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/`
        );
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: ProjectTypes = await res.json();
        setUsers(data.members);
        // console.log(data.createdBy);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [projectId]);

  if (loading) return <p>Laddar användare...</p>;
  if (error) return <p className="text-red-600">Fel: {error}</p>;

  return (
    <article className="relative h-fit min-w-60 text-white px-3 py-4 border border-black overflow-hidden">
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        // style={{
        //   backgroundImage:
        //     'url("https://images.unsplash.com/photo-1615800098779-1be32e60cca3?crop=entropy&cs=srgb&fm=jpg&q=85")',
        // }}
      ></div> */}

      {/* 🔥 overlay som bara täcker kortet */}
      <div
        className="absolute inset-0 bg-zinc-900/20"
        style={{ backdropFilter: "blur(1px)" }}
      ></div>
      <div className="relative z-20">
        <h3 className="px-3 pb-2 text-black font-semibold">Medlemmar:</h3>
        <div className="flex flex-col ">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="border-b-[0.5px] border-black h-10 flex items-center justify-between"
              >
                <div className="flex items-center ">
                  <FaCircleChevronRight className="text-md text-amber-600 bg-white rounded-full" />
                  <p className="text-sm px-3 text-black">{user.name}</p>
                </div>
                {/* <FaPen className="h-3" /> */}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic px-3">Inga användare</p>
          )}
        </div>
        <div className=" flex justify-end pt-3 ">
          <button className="flex justify-center items-center h-5 w-5 bg-green-700 hover:opacity-70 rounded-full cursor-pointer text-sm">
            <FaPlus />
          </button>
        </div>
      </div>
    </article>
  );
}

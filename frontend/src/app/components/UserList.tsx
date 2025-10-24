import { useState, useEffect } from "react";
import { UserTypes } from "../types/user";
import { FaPen } from "react-icons/fa6";

export default function UserList() {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // const res = await fetch("http://trullo-pi.vercel.app/tasks");
        const res = await fetch("http://localhost:3000/users");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: UserTypes[] = await res.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <p>Laddar användare...</p>;
  if (error) return <p className="text-red-600">Fel: {error}</p>;

  return (
    <article className="bg-zinc-900/50 h-fit w-56 text-white px-3 py-4 ">
      <h3 className="px-3 pb-2 text-white">Medlemmar</h3>
      <div className="flex flex-col ">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="border-b-[0.5px] h-10 flex items-center justify-between"
            >
              <p className="text-sm px-3">{user.name}</p>
              <FaPen className="h-3" />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic px-3">Inga användare</p>
        )}
      </div>
    </article>
  );
}

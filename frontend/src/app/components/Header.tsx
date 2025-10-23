export default function Header() {
  return (
    <header className="bg-zinc-800 text-white flex justify-between items-center h-16 px-10">
      <h1 className="text-2xl leading-none">Trullo</h1>
      <div className="flex gap-3">
        <input
          placeholder="Sök"
          className="bg-zinc-700 border-white border rounded-sm w-3xl px-2"
        ></input>
        <button className="bg-blue-400 border-0 rounded-sm px-3 py-1">
          Skapa
        </button>
      </div>
      <div className="flex gap-4">
        <button className="rounded-md bg-blue-400 w-8 h-8 flex justify-center items-center text-sm">
          R
        </button>
        <button className="rounded-full bg-pink-700 w-8 h-8 flex justify-center items-center text-sm">
          <p className="leading-none">AS</p>
        </button>
      </div>
    </header>
  );
}

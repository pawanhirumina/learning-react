import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <main className="w-full h-screen flex-col flex items-center justify-center">
      <h1 className="text-center text-6xl">Counter : {count ?? 0}</h1>
      <div className="mt-4">
        <button className="bg-green-200 font-bold text-green-900 py-2 px-3 border m-1 rounded-md" onClick={() => setCount((prev) => prev + 1)}>Add +1</button>
        <button className="bg-red-200 font-bold text-red-900 py-2 px-3 border m-1 rounded-md" onClick={() => setCount((prev) => prev - 1)}>Add -1</button>
      </div>
    </main>
  );
}

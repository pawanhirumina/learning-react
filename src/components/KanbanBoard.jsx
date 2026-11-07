import { useState } from "react";
export default function KanbanBoard() {
  const boradContent = [
    {
      id: "todo",
      tasks: [],
      styles: "bg-yellow-500 text-yellow-900",
    },
    {
      id: "doing",
      tasks: [],
      styles: "bg-blue-500 text-blue-900",
    },
    {
      id: "done",
      tasks: [],
      styles: "bg-green-500 text-green-900",
    },
  ];
  const [board, setBoard] = useState(boradContent);
  const [title, setTitle] = useState("");
  function addTask() {
    const taskObject = {
      id: Date.now(),
      title: title,
    };

    setBoard(
      board.map((col) => {
        if (col.id === "todo") {
          return { ...col, tasks: [...col.tasks, taskObject] };
        } else {
          return col;
        }
      }),
    );
    setTitle("");
  }

  function deleteTask() {}
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center text-center bg-zinc-900">
      <div className="flex items-center  gap-2">
        <input
          className="border text-white py-2 px-3 my-2"
          placeholder="Task Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="cursor-pointer bg-white py-2 px-3" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className="flex gap-2">
        {board.map((b) => (
          <div
            key={b.id}
            className="w-[300px] h-[450px] bg-zinc-800 rounded-md"
          >
            <h1
              className={`py-2 px-3 text-1xl font-bold uppercase ${b.styles}`}
            >
              {b.id} ({b.tasks.length})
            </h1>
            <div className="flex w-full flex-col gap-2 ">
              {b.tasks.map((t) => (
                <div className="flex justify-around bg-zinc-100 py-3">
                  <h1>{t.title}</h1>
                  <button
                    onClick={() => deleteTask(b.id)}
                    className="bg-red-400"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

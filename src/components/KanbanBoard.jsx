import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
export default function KanbanBoard() {
  const columnRefs = useRef({});
  const [error, setError] = useState(false);
  const boardContent = [
    {
      id: "todo",
      name: "Todo",
      tasks: [],
      pill: "bg-sky-500",
    },
    {
      id: "doing",
      name: "In Progress",
      tasks: [],
      pill: "bg-violet-500",
    },
    {
      id: "review",
      name: "In Review",
      tasks: [],
      pill: "bg-amber-500",
    },
    {
      id: "done",
      name: "Done",
      tasks: [],
      pill: "bg-emerald-500",
    },
  ];
  const [board, setBoard] = useState(boardContent);
  const [title, setTitle] = useState("");
  function addTask() {
    const taskObject = {
      id: crypto.randomUUID(),
      title: title,
      date: new Date().toLocaleString(),
    };
    if (!title.trim()) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    setBoard(
      board.map((col) => {
        if (col.id === "todo") {
          return { ...col, tasks: [...col.tasks, taskObject] };
        } else {
          return col;
        }
      })
    );
    setTitle("");
  }
  function deleteTask(columnId, taskId) {
    setBoard(
      board.map((col) => {
        if (col.id === columnId) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
        } else {
          return col;
        }
      })
    );
  }
  function moveTask(fromId, taskId, toId) {
    if (fromId === toId) return;
    const taskToMove = board
      .find((col) => col.id === fromId)
      ?.tasks.find((t) => t.id === taskId);
    if (!taskToMove) return;
    setBoard(
      board.map((col) => {
        if (col.id === fromId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== taskId),
          };
        }
        if (col.id === toId) {
          return {
            ...col,
            tasks: [...col.tasks, taskToMove],
          };
        }
        return col;
      })
    );
  }
  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-zinc-900">
      <header className="w-full max-w-6xl my-10 px-3">
        <div className="max-w-md flex flex-row items-center gap-2">
          <input
            className={`flex-1 rounded-lg border bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${error ? "border-red-500" : "border-zinc-700 focus:border-zinc-500"
              }`}
            placeholder="Task Title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(false);
            }}
            onFocus={() => {
              setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${error ? "bg-red-500 text-white" : "bg-white text-zinc-900 hover:bg-zinc-200"
              }`}
            onClick={addTask}
          >
            Add Task
          </motion.button>
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-400">Task title can&apos;t be empty</p>
        )}
      </header>
      <div className="w-full max-w-6xl px-3 flex flex-1 gap-2 pb-6">
        {board.map((b) => (
          <div
            key={b.id}
            ref={(el) => (columnRefs.current[b.id] = el)}
            className="flex-1 min-h-[400px] bg-zinc-800 rounded-xl"
          >
            {/* Header — flex, title left, pill right */}
            <div className="flex items-center justify-between px-3 py-2.5">
              <h1 className="text-sm font-medium text-white">{b.name}</h1>
              <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${b.pill}`}
              >
                {b.tasks.length}
              </span>
            </div>
            <div className="flex w-full flex-col gap-2 px-2 pb-2">
              {b.tasks.length === 0 ? (
                <p className="px-2 py-6 text-center text-sm text-zinc-500">
                  No tasks yet
                </p>
              ) : (
                b.tasks.map((t) => (
                  <motion.div
                    layout
                    dragSnapToOrigin
                    dragMomentum={false}
                    drag
                    whileDrag={{ scale: 1.02, zIndex: 20 }}
                    onDragEnd={(e, info) => {
                      let target = null;
                      for (const id of board.map((col) => col.id)) {
                        const el = columnRefs.current[id];
                        if (!el) continue;
                        const rect = el.getBoundingClientRect();
                        const inside =
                          info.point.x >= rect.left &&
                          info.point.x <= rect.right &&
                          info.point.y >= rect.top &&
                          info.point.y <= rect.bottom;
                        if (inside) {
                          target = id;
                          break;
                        }
                      }
                      if (target && target !== b.id) {
                        moveTask(b.id, t.id, target);
                      }
                    }}
                    dragElastic
                    key={t.id}
                    className="group flex cursor-grab flex-row items-center justify-between gap-2 rounded-lg bg-zinc-900 px-3 py-2.5 text-white active:cursor-grabbing"
                  >
                    <div className="flex min-w-0 flex-col items-start">
                      <h1 className="truncate text-sm font-bold">{t.title}</h1>
                      <p className="text-xs text-zinc-400">{t.date}</p>
                    </div>
                    <button
                      onClick={() => deleteTask(b.id, t.id)}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 opacity-0 transition-opacity hover:bg-red-600 hover:text-white group-hover:opacity-100"
                    >
                      <Trash size={12} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
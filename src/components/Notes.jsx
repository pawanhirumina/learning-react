import { useState } from "react";
import { Trash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
export function AddNoteModel({ isOpen, onClose, onSave, title, setTitle, description, setDescription }) {
  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim() || !description.trim()) return;
    onSave();
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-zinc-950 text-white rounded-xl p-5 w-full max-w-sm flex flex-col gap-3">
        <h2 className="font-semibold text-lg">New Note</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ring-1 rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-zinc-800"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="ring-1 rounded-lg h-24 py-2 px-3 outline-none focus:ring-2 focus:ring-zinc-800 resize-none"
          placeholder="Description"
        />
        <div className="flex gap-2 justify-end mt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-zinc-900 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addNote = () => {
    if (!title.trim() || !description.trim()) return;
    setNotes(prev => [...prev, { id: Date.now(), title, description }]);
    setTitle("");
    setDescription("");
  };


  function deleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id))
  }


  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <motion.button onTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} className="bg-zinc-900 text-white px-4 py-2 rounded-lg">
            + New Note
          </motion.button>
        </header>

        {notes.length === 0 ? (
          <p className="text-zinc-500 text-center mt-20">No notes yet. Click New Note to start.</p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence initial={false}>
              {notes.map(n => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.28, ease: [0, 0.71, 0.2, 1.01] }}
                  animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ y: 20, opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                  key={n.id}
                  className="bg-zinc-900 rounded-xl p-4">
                  <div className="w-full flex justify-between items-center">
                    <p className="font-bold">{n.title}</p>
                    <button onClick={() => deleteNote(n.id)} className="cursor-pointer w-4 h-4 flex items-center justify-center rounded-lg text-red-900"><Trash size={16} /></button>
                  </div>
                  <p className="text-sm text-zinc-600 mt-1">{n.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AddNoteModel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={addNote}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
}
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Loader2 } from "lucide-react";

export default function Faq() {
  const [openId, setOpenId] = useState(null);
  const [aiQuery, setAiQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const handleAsk = () => {
    if (!aiQuery.trim()) return;
    setOpenId("ai");
    setTriggerFetch(true);
  };

  useEffect(() => {
    if (!triggerFetch) return;
    const controller = new AbortController();
    const fetchAi = async () => {
      setLoading(true);
      setAiAnswer(null);
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: aiQuery }),
          signal: controller.signal,
        });
        const data = await res.json();
        setAiAnswer(data.answer);
      } catch (err) {
        if (err.name !== "AbortError") {
          setAiAnswer("Failed to get answer");
        }
      } finally {
        setLoading(false);
        setTriggerFetch(false);
      }
    };
    fetchAi();
    return () => controller.abort();
  }, [triggerFetch, aiQuery]);

  const faqs = [
    {
      id: 1,
      q: "How can I contact you?",
      a: "You can contact me via email at pawan@example.com or DM me on Instagram @pawan.hirumina - I usually reply within 24h.",
    },
    {
      id: 2,
      q: "What is your tech stack?",
      a: "I build with Next.js / React, Vite, Tailwind CSS, and TypeScript. Currently learning Rust for backend stuff.",
    },
    {
      id: 3,
      q: "Are you available for freelance work?",
      a: "Yes! I'm open for small freelance projects, landing pages, and portfolio sites. Hit me up with your idea.",
    },
    {
      id: 4,
      q: "Do you share your source code?",
      a: "Yep, most of my learning projects are on GitHub. For client work, I can share private repos on request.",
    },
  ];

  return (
    <main className="bg-zinc-900 text-white w-full min-h-screen justify-center flex flex-row items-center">
      <div className="flex w-[500px] flex-col">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <motion.div
              layout
              key={faq.id}
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="bg-zinc-800 rounded-sm my-2 p-4 cursor-pointer flex flex-col gap-2"
            >
              <h2 className="flex justify-between items-center">
                {faq.q}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                  <ChevronDown size={18} className="text-zinc-400" />
                </motion.div>
              </h2>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-300 pt-1 text-">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        <motion.div
          layout
          className="bg-zinc-800 rounded-sm my-2 p-4 flex flex-col gap-2 border border-zinc-700"
        >
          <div className="flex justify-between items-center gap-3 w-full">
            <div className="flex items-center gap-2 flex-1">
              <Sparkles size={16} className="text-zinc-400 shrink-0" />
              <input
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAsk();
                  }
                  if (e.key === "Escape") {
                    setOpenId(null);
                  }
                }}
                placeholder="Ask Ai"
                className="bg-transparent outline-none w-full text-white placeholder:text-zinc-500 text-"
              />
            </div>

            <button
              onClick={() => {
                if (aiQuery.trim() && aiAnswer) {
                  setOpenId(openId === "ai" ? null : "ai");
                } else if (aiQuery.trim()) {
                  handleAsk();
                } else {
                  setOpenId(openId === "ai" ? null : "ai");
                }
              }}
              className="p-1 cursor-pointer"
            >
              <motion.div animate={{ rotate: openId === "ai" ? 180 : 0 }}>
                <ChevronDown size={18} className="text-zinc-400" />
              </motion.div>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {openId === "ai" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-zinc-700/50 mt-1">
                  {loading ? (
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Loader2 size={14} className="animate-spin" /> Thinking...
                    </div>
                  ) : aiAnswer ? (
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {aiAnswer}
                    </p>
                  ) : (
                    <p className="text-zinc-500 text-">Press Enter to ask</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}

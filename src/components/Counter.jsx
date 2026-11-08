import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
export default function Counter() {
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState(1)
  const [holdingPlus, setHoldingPlus] = useState(false)
  const [holdingMinus, setHoldingMinus] = useState(false)

  return (
    <main className="w-full h-screen flex-col flex items-center justify-center">
      <div className="flex gap-6 ">
        <motion.button
          tap={{ hold: 0.5, repeat: 0.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative overflow-hidden w-12 h-12 rounded-full cursor-pointer bg-zinc-100 font-bold text-green-900 border m-1"
          onTapStart={() => {
            setHoldingPlus(true);
            setCount((prev) => prev + 1);
            setDirection(+1)
          }}
          onTapCancel={() => setHoldingPlus(false)}
          onTap={(event) => {
            if (event.type !== "pointerup") {
              setCount((prev) => prev + 1);
              setDirection(+1)
            } else {
              setHoldingPlus(false)
            }
          }}
        >
          <h1 className="relative z-10">

            +1
          </h1>
          <motion.div
            animate={{ scaleY: holdingPlus ? 1 : 0 }}
            transition={{ duration: holdingPlus ? 0.5 : 0.1 }}
            className="absolute inset-0 origin-left bg-green-300"></motion.div>
        </motion.button>


        <div className="inline-block overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.span

              className="text-5xl h-16 w-16 overflow-hidden flex items-center justify-center "
              key={count}
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: direction * 10, opacity: 0 }}
              exit={{ y: direction * -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 50 }}

            >
              {count ?? 0}
            </motion.span>
          </AnimatePresence>
        </div>
        <motion.button
          tap={{ hold: 0.5, repeat: 0.1 }}
          onTapStart={() => {
            setHoldingMinus(true)
            setCount((prev) => Math.max(0, prev - 1));
            setDirection(-1)
          }}

          onTapCancel={() => setHoldingMinus(false)}
          onTap={(event) => {
            if (event.type !== "pointerup") {
              setCount((prev) => Math.max(0, prev - 1));
              setDirection(-1)
            } else {
              setHoldingMinus(false)
            }
          }}
          whileTap={{ scale: 0.9 }}
          className="relative overflow-hidden w-12 h-12 rounded-full cursor-pointer bg-zinc-100 font-bold text-red-900  border m-1"
        >
          <h1 className="relative z-10">

            -1
          </h1>
          <motion.div
            animate={{ scaleY: holdingMinus ? 1 : 0 }}
            transition={{ duration: holdingMinus ? 0.5 : 0.1 }}
            className="absolute inset-0 origin-left bg-red-300"></motion.div>
        </motion.button>
      </div>
    </main >
  );
}

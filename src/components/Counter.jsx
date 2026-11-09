import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
export default function Counter() {
  const [count, setCount] = useState(100);
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


        <div className=" overflow-hidden">

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={count}
              className="text-5xl  mx-12 w-20 h-16 flex items-center justify-center"
              initial={{ y: direction * 18, opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ y: direction * -18, opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: [0, 0.71, 0.2, 1.01] }}
            >
              {count}
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

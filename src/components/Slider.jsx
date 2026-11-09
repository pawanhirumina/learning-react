import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./slider/index.css"
export default function Slider() {
    const [value, setValue] = useState(10)
    const valueText = value === 100 ? "Max" : value === 0 ? "Low" : value

    return (
        <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
                <div className="flex flex-col items-center gap-2">
                    <motion.input
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        whileTap={{ scale: 0.97 }}
                        animate={{ scale: 1 }}
                        type="range"
                        className="w-64 range-reset bg-red-100"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 20,
                            mass: 0.8
                        }}

                    /><br />
                    <motion.p
                        key={value}
                        animate={{
                            x: value === 100 ? [0, -10, 10, -10, 10, 0] : 0,
                            opacity: 1,
                            filter: "blur(0px)"
                        }}
                        exit={{ opacity: 0, filter: "blur(4000px)" }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            mass: 0.8
                        }}
                        className={`${value === 100 ? "text-red-400" : value === 50 ? "text-blue-400" : value === 0 ? "text-yellow-400" : "text-white"}`}>{valueText}</motion.p>
                </div>
            </AnimatePresence>
        </div >
    )
}
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Clock() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const formatSegment = (val) => String(val).padStart(2, "0")


    return (
        <main className="w-full h-screen flex items-center justify-center bg-zinc-950 font-sans text-white text-6xl font-bold tracking-tighter">
            <div className="flex mx-10 items-center overflow-hidden h-50">
                <AnimatedBlock value={formatSegment(time.getHours())} />
                <span className="text-zinc-600 mx-2 mx-3">:</span>
                <AnimatedBlock value={formatSegment(time.getMinutes())} />
                <span className="text-zinc-600 mx-2 mx-3">:</span>
                <AnimatedBlock value={formatSegment(time.getSeconds())} />
            </div>
        </main>
    )
}



function AnimatedBlock({ value }) {
    return (
        <div className="flex mx-2 relative h-20 items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={value}
                    initial={{ y: -40, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="inline-block"
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </div>
    )
}

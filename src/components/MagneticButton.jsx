import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
export default function MagneticButton() {
    const [holding, setHolding] = useState(false)
    const buttonRef = useRef(null)
    const x = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 150, damping: 15 })


    return (
        <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <motion.button
                    ref={buttonRef}
                    onMouseMove={(e) => {
                        buttonRef.current.getBoundingClientRect()
                        const box = buttonRef.current.getBoundingClientRect();
                        const boxCenter = box.left + box.width / 2;
                        const mouseX = e.clientX;
                        const distance = Math.abs(boxCenter - mouseX);
                        if (distance < 100) {
                            x.set((mouseX - boxCenter) * 0.3)
                        } else {
                            x.set(0)
                        }
                    }}
                    onTapStart={() => {
                        setHolding(true);
                    }}
                    onTap={(event) => {
                        if (event.type !== "pointerup") {
                            setHolding(true);
                        } else {
                            setHolding(false)
                        }
                    }}
                    onTapCancel={() => setHolding(false)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ x: springX }}
                    onMouseLeave={() => x.set(0)}
                    className="relative z-99 overflow-hidden  cursor-pointer px-4 py-2 bg-zinc-800 text-white rounded-md"
                >
                    <span className="relative z-10">Click Me</span>
                    <motion.span
                        animate={{ scaleX: holding ? 1 : 0 }}
                        transition={{ duration: holding ? 0.5 : 0.1 }}
                        className="absolute inset-0 origin-left bg-slate-900"></motion.span>


                </motion.button>
            </div>
        </div >
    )
}
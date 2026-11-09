import { useState } from "react";
import { motion } from "framer-motion";

export default function CounterAnimated() {
    const [count, setCount] = useState(0);

    return (
        <div className="w-full h-screen flex flex-row gap-8 items-center justify-center bg-gray-50">
            <div className="flex flex-col items-start gap-2">
                <input
                    max="9"
                    min="0"
                    value={Number.isNaN(count) ? "" : count}
                    onChange={(e) => setCount(e.target.valueAsNumber || 0)}
                    className="border border-gray-300 rounded-md p-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                />
            </div>

            <div className="relative w-8 h-8 border border-gray-200 rounded bg-white flex items-center justify-center">
                <NumberWindow count={count} />
            </div>
        </div>
    );
}

function NumberWindow({ count }) {
    return (
        <div className="h-6 w-6 overflow-hidden relative">
            <motion.div
                className="absolute left-0 right-0 flex flex-col"
                animate={{ y: -count * 24 }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.8
                }}
            >
                {Array.from({ length: 10 }, (_, i) => (
                    <span
                        key={i}
                        className="w-6 h-6 flex items-center justify-center text-base font-bold text-gray-700 select-none"
                    >
                        {i}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

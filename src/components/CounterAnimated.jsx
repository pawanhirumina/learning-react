// there is an text input field, i can change it to 0 to 9
// also there has to be an array that shows the numbers from 0 to 9 vertically
// when i change the number on the input field the number in the array should be in the center  and also using the framer motion spring animation

// input field = 1
// 0
// |1|
// 2
// 3

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CounterAnimated() {
    const [count, setCount] = useState(0);
    return (
        <div className="w-full flex-row h-screen flex gap-2 items-center justify-center bg-center">
            <div className="flex items-center flex-col justify-center w-100 h-100 bg-zinc-100 ">
                <h1>Counter Animated</h1>

                <input max="9" min="0" onChange={(e) => setCount(e.target.valueAsNumber)} className="border border-gray-300 rounded-md p-2" type="number" />
            </div>
            <div className="relative flex  justify-center w-100 h-100 bg-zinc-100">

                <motion.div
                    className=""
                    animate={{ y: 188 - count * 24 }}
                    transition={{ type: "spring" }}
                >

                    <div>
                        {Array.from({ length: 10 }, (_, i) => (
                            <p key={i} className={`w-6 h-6 border flex items-center justify-center`}>{i}</p>
                        ))}
                    </div>

                </motion.div>

                <div className="absolute border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-green-900 border">
                </div>
            </div>
        </div>
    )
}
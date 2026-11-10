



import { motion } from "framer-motion";
import { useState } from "react"
export default function TabPill() {
    const [selected, setIsSelected] = useState(1)

    const links = [
        { id: 1, text: "Home" },
        { id: 2, text: "About" },
        { id: 3, text: "Contact" },
        { id: 4, text: "Links" }
    ]

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-zinc-950">
            <div className="my-2">
                <p className="text-white">Inspired by Apple's liquid glass</p>
            </div>
            <div className="flex mx-auto rounded-md px-4 py-2 justify-center flex-row ">

                {links.map((l) => (
                    <div className="relative gap-4 px-3 py-2 " key={l.id} >
                        <motion.a
                            href="#"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setIsSelected(l.id)
                            }
                            }
                            className="text-2xl  relative cursor-pointer text-white z-10">{l.text}</motion.a>
                        {selected === l.id && (
                            <motion.div
                                layoutId="underblob"
                                className="z-0 backdrop-blur border border-white/20 inset-0 top-0 bottom-0 left-0 right-0  bg-white/10 absolute  rounded-full"
                                transition={{ type: "spring", stiffness: 70, damping: 10 }}
                            ></motion.div>
                        )}

                    </div>
                ))
                }
            </div >
        </div >
    )
}



import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react"
export default function PricingToggle() {

    const [selected, setIsSelected] = useState(1)
    const packages = [
        {
            id: 1,
            name: "Yearly",
            price: 9900,
            per: " / year",
            button: "Buy Yearly",
            badge: "Save 31% · 2 months free",
            offers: [
                "Unlimited projects",
                "100GB storage",
                "Priority support",
                "4K exports, no watermark",
                "Cancel anytime",
            ],
        },
        {
            id: 2,
            name: "Monthly",
            price: 1200,
            per: " / month",
            button: "Buy Monthly",
            badge: "No commitment",
            offers: [
                "Unlimited projects",
                "100GB storage",
                "Standard support",
                "4K exports, no watermark",
                "Cancel anytime",
            ],
        },
    ];

    const selectedPackage = packages.find((p) => p.id === selected);
    const roundPrice = selectedPackage.price.toLocaleString();
    const buttonText = selectedPackage.button;
    return (
        <main className="bg-zinc-950 flex items-center justify-center w-full h-screen">
            <div className="flex w-[360px] h-auto  px-4 py-6  mx-auto flex-col rounded-3xl  bg-zinc-800">
                <div className="relative flex flex-row gap-3 w-auto bg-zinc-900 rounded-full">
                    {packages.map((p) => (
                        <div key={p.id} className="relative text-center flex-1">
                            <motion.button onClick={(e) => setIsSelected(p.id)} className="cursor-pointer w-full text-center relative z-10 text-white  px-3 py-2">{p.name}</motion.button>
                            {selected === p.id && (
                                <motion.div
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    layoutId="package-name"
                                    className="top-0 left-0 right-0 absolute inset-0 bg-zinc-700  rounded-full">
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                <div>
                    <div

                        className="flex flex-col flex-1"
                    >
                        <span className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    className="inline-block text-center w-full my-4 text-5xl text-white"
                                    key={selected}
                                    initial={{ y: 10, filter: "blur(1px)" }}
                                    animate={{ y: 0, filter: "blur(0px)" }}
                                    exit={{ y: -10, filter: "blur(1px)" }}
                                    transition={{ type: "tween", duration: 0.2 }}
                                >

                                    LKR {roundPrice} <span className="text-xs">{selectedPackage.per}</span>
                                </motion.h1>
                            </AnimatePresence>
                        </span>
                        <AnimatePresence mode="wait">
                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 10 }}
                                key={selected}
                                className="flex flex-col gap-4"
                            >
                                {selectedPackage.offers.map((offer, i) => (
                                    <motion.span
                                        animate={{ opacity: 1, y: 0 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        transition={{ delay: i * 0.08 }} key={offer}
                                        className="flex  justify-between">
                                        <p
                                            className="text-white">
                                            {offer}
                                        </p>
                                        <Check className="text-white" />
                                    </motion.span>

                                ))}
                                <motion.button whileTap={{ scale: 0.98 }} className="cursor-pointer py-2 px-4 rounded-full text-1xl text-white border flex-1">{buttonText}</motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div >
        </main >
    )
}
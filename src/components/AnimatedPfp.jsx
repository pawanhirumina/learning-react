import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion"
export default function AnimatedPfp() {


    const x = useMotionValue(64)
    const y = useMotionValue(64)


    const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 })
    const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 })

    const pfpUrl = "https://res.cloudinary.com/bcdhsln3/image/upload/v1792656144/dev-dashboard/kkav47ryqa9jutofwh35.jpg"
    const secondImg = "https://res.cloudinary.com/bcdhsln3/image/upload/v1794489990/dev-dashboard/m9gze5bgsfkcdkm39ybd.png"

    const radius = useMotionValue(0)
    const springRadius = useSpring(radius, {
        stiffness: 150,
        damping: 20
    })

    const mask = useMotionTemplate`radial-gradient(${springRadius}px circle at ${springX}px ${springY}px, black 40%, transparent 70%)`

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
    }

    return (
        <main className="w-full flex items-center justify-center h-screen bg-zinc-950">
            <div>
                <motion.div onMouseEnter={() => radius.set(200)} onMouseLeave={() => radius.set(0)} whileHover={{ scale: 1.04 }} onMouseMove={handleMouseMove} className="relative w-64 h-64">
                    <img

                        src={pfpUrl}
                        alt="Profile Image"
                        className="absolute inset-0 w-64 h-64 rounded-full"

                    />
                    <motion.img

                        style={{ WebkitMaskImage: mask, maskImage: mask }}
                        src={secondImg}
                        alt="Profile Image"
                        className="absolute inset-0 w-64 h-64 rounded-full"
                    />
                </motion.div>

            </div>
        </main >
    )
}

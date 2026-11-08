import { useState, useEffect } from "react"


export default function Clock() {
    const [time, setTime] = useState(new Date())
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000) 

        return () => clearInterval(intervalId)
    }, [])

    return (
        <main 
        className="w-full h-screen flex backdrop-blur-md items-center justify-center bg-cover bg-black/10 bg-center"
        >
            <div >
            </div>
            <div 
            className="w-full h-screen flex items-center justify-center bg-cover bg-black/60 bg-center">
                <h1 className="text-8xl font-bold text-white">{time.toLocaleTimeString()}</h1>
            </div>
        </main>
    )
}
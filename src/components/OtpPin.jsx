




import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"

export default function OtpPin() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isError, setIsError] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const inputRefs = useRef([]);


  const CORRECT_OTP = "123456"


  const isComplete = otp.every((digit) => digit !== "");
  const otpValue = otp.join("");

  function handleChange(e, index) {
    const value = e.target.value;
    setIsError(false)
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^[0-9]+$/.test(paste)) return;

    const newOtp = paste
      .split("")
      .concat(new Array(6 - paste.length).fill(""))
      .slice(0, 6);
    setOtp(newOtp);
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isComplete) return;
    if (otpValue !== CORRECT_OTP) {
      setIsError(true)
    } else {
      setIsDone(true);
      // alert(`Code is ${otpValue}`)
    }
  }

  return (
    <main className="w-full h-screen flex flex-col gap-6 items-center justify-center bg-zinc-950">
      <AnimatePresence>
        {isDone && <Verify onClose={() => setIsDone(false)} />}
      </AnimatePresence>
      <p className="text-slate-100">
        Try code : <span className="font-bold">123456</span>
      </p>
      <motion.form
        animate={{ x: isError ? [0, -10, 10, -10, 10, 0] : 0 }}
        onSubmit={handleSubmit}
        className="flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`w-12 h-12  text-slate-100 ${isError ? "border-red-500 border focus:border-red-500 text-red-500" : "border"} text-center text-xl font-bold rounded-md  focus:outline-none focus:ring-1 focus:ring-zinc-900`}
            maxLength={1}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
              handleKeyDown(e, index)
            }}
            onPaste={handlePaste}

          />
        ))}
      </motion.form>

      <div className="text-center">
        <button

          onClick={handleSubmit}
          disabled={!isComplete}
          className={`mt-3  ${isError ? "bg-red-500" : "bg-zinc-900"} text-white py-2 px-6 rounded-md disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          Verify
        </button>
      </div>
    </main>
  );
}


function Verify({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950/100"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl max-w-sm w-full text-center mx-4"
      >
        <h2 className="text-xl font-bold text-white mb-2">Verification Successful!</h2>
        <p className="text-zinc-400 text-sm mb-6">Your identity has been confirmed securely.</p>
        <button
          onClick={onClose}
          className="w-full bg-zinc-100 text-zinc-950 py-2 rounded-md font-medium hover:bg-zinc-200 transition-colors"

        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}
